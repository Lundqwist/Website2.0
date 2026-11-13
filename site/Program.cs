// Program.cs: the starting point of the new lundqwist.se.
//
// One small ASP.NET Core app does three jobs:
//   1. /api/...   JSON for the React app, read from MariaDB with EF Core
//   2. /v1/...    passed on to the first version of the site (../v1), which
//                 runs as its own app on another port
//   3. the rest   the built React app in wwwroot (see client/)

using Lundqwist.Site.Data;
using Lundqwist.Site.Models;
using Lundqwist.Site.Services;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Yarp.ReverseProxy.Configuration;
using Yarp.ReverseProxy.Transforms;

var builder = WebApplication.CreateBuilder(args);

// ── Services ────────────────────────────────────────────────────────────────

// On the NAS, DSM's reverse proxy handles HTTPS and passes requests on over
// plain http. These headers tell us the visitor's real address and that they
// used HTTPS. Only a proxy on the same machine is trusted (the default).
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
});

// The database: the same MariaDB database as v1. This site keeps its own
// list of applied migrations, so the two sites never mix theirs up.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<SiteDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString),
        mysql => mysql.MigrationsHistoryTable("__EFMigrationsHistory_Site")));

builder.Services.AddSingleton<MarkdownRenderer>();

// The first version of the site. Requests are passed on to it with YARP
// ("Yet Another Reverse Proxy", Microsoft's proxy library).
//   /v1/...        sent as it is; v1 knows it lives under /v1 (its PathBase)
//   /media/...     images uploaded in v1's admin; texts link to them like this
//   /showcase/...  v1's showcase folder; same reason
var v1Address = builder.Configuration["V1:Address"] ?? "http://127.0.0.1:8091";
builder.Services.AddReverseProxy().LoadFromMemory(
    routes:
    [
        new RouteConfig { RouteId = "v1", ClusterId = "v1", Match = new RouteMatch { Path = "/v1/{**rest}" } }
            .WithTransformUseOriginalHostHeader(),
        new RouteConfig { RouteId = "v1-media", ClusterId = "v1", Match = new RouteMatch { Path = "/media/{**rest}" } }
            .WithTransformPathPrefix("/v1").WithTransformUseOriginalHostHeader(),
        new RouteConfig { RouteId = "v1-showcase", ClusterId = "v1", Match = new RouteMatch { Path = "/showcase/{**rest}" } }
            .WithTransformPathPrefix("/v1").WithTransformUseOriginalHostHeader(),
    ],
    clusters:
    [
        new ClusterConfig
        {
            ClusterId = "v1",
            Destinations = new Dictionary<string, DestinationConfig>
            {
                ["v1"] = new() { Address = v1Address },
            },
        },
    ]);

var app = builder.Build();

// ── Database: apply new migrations and insert the first portfolio items ─────
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<SiteDbContext>();
    db.Database.Migrate();
    await SeedData.EnsureSeededAsync(db);
}

// ── Middleware: the steps every request passes through, in this order ───────
app.UseForwardedHeaders();

if (!app.Environment.IsDevelopment())
{
    app.UseHsts();   // tell browsers to always use HTTPS
}
app.UseHttpsRedirection();

// The React app's files. Vite puts a fingerprint in every file name under
// /assets, so those can be cached for a long time; index.html must always be
// fetched fresh, because it names the current files.
app.UseDefaultFiles();
app.UseStaticFiles(new StaticFileOptions
{
    OnPrepareResponse = ctx =>
    {
        var path = ctx.Context.Request.Path.Value ?? "";
        ctx.Context.Response.Headers.CacheControl = path.StartsWith("/assets/")
            ? "public, max-age=31536000, immutable"
            : "no-cache";
    },
});

// ── API ─────────────────────────────────────────────────────────────────────

// The list on the Portfolio page
app.MapGet("/api/portfolio", async (SiteDbContext db) =>
    await db.PortfolioItems
        .OrderBy(p => p.SortOrder).ThenBy(p => p.Title)
        .Select(p => new { p.Slug, p.Title, p.Summary, p.ImageUrl })
        .ToListAsync());

// One item's own page
app.MapGet("/api/portfolio/{slug}", async (string slug, SiteDbContext db, MarkdownRenderer markdown) =>
{
    var item = await db.PortfolioItems.FirstOrDefaultAsync(p => p.Slug == slug);
    if (item is null) return Results.NotFound();

    return Results.Ok(new
    {
        item.Slug,
        item.Title,
        item.Summary,
        item.ImageUrl,
        BodyHtml = markdown.Render(item.Body),
        item.LinkUrl,
        item.LinkLabel,
    });
});

// The About page: the text is the one edited on /v1/Admin/About, and the CVs
// are the PDFs v1 builds from the CV in the database.
app.MapGet("/api/about", async (SiteDbContext db, MarkdownRenderer markdown) =>
{
    var page = await db.PageContents.FirstOrDefaultAsync(p => p.Key == PageContent.AboutKey);

    return new
    {
        Title = string.IsNullOrWhiteSpace(page?.Title) ? "About me" : page.Title,
        BodyHtml = markdown.Render(page?.Body),
        CvLinks = new[]
        {
            new { Label = "CV in English", Url = "/v1/CV/Pdf?lang=en" },
            new { Label = "CV på svenska", Url = "/v1/CV/Pdf?lang=sv" },
        },
    };
});

// An /api address that doesn't exist is a plain 404, not the React app
app.Map("/api/{**rest}", () => Results.NotFound());

// ── Old addresses ───────────────────────────────────────────────────────────
// Links to the first version that are already out there (the CV PDF in job
// applications, bookmarks) are sent on to their new home under /v1.
foreach (var section in new[] { "CV", "Stories", "Gaming", "Admin", "Privacy" })
{
    app.MapGet($"/{section}/{{**rest}}", (HttpContext http) =>
        Results.Redirect("/v1" + http.Request.Path + http.Request.QueryString));
}

app.MapReverseProxy();

// Everything else is a page inside the React app (/portfolio, /about, ...):
// send index.html and let React Router show the right page.
app.MapFallbackToFile("index.html", new StaticFileOptions
{
    OnPrepareResponse = ctx => ctx.Context.Response.Headers.CacheControl = "no-cache",
});

app.Run();

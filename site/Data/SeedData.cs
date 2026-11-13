using Lundqwist.Site.Models;
using Microsoft.EntityFrameworkCore;

namespace Lundqwist.Site.Data;

// The first portfolio items. They are inserted once, when the table is empty;
// after that the rows in the database are the truth (edit them there, for
// example with phpMyAdmin on the NAS).
public static class SeedData
{
    public static async Task EnsureSeededAsync(SiteDbContext db)
    {
        if (await db.PortfolioItems.AnyAsync()) return;

        db.PortfolioItems.AddRange(
            new PortfolioItem
            {
                Slug = "lundqwist-se-v1",
                Title = "lundqwist.se, first version",
                Summary = "My first personal site: CV in English and Swedish with PDF export, stories, " +
                          "projects and gaming pages, and an admin area for editing it all. " +
                          "Built with C#, ASP.NET Core 8 MVC, Entity Framework Core and MariaDB, " +
                          "and hosted at home on a Synology NAS.",
                ImageUrl = "/images/portfolio/lundqwist-se-v1.jpg",
                LinkUrl = "/v1/",
                LinkLabel = "Open the first version",
                SortOrder = 10,
            },
            new PortfolioItem
            {
                Slug = "network-dashboard",
                Title = "Network Dashboard",
                Summary = "A self-hosted dashboard for a side monitor that shows my home network at a glance: " +
                          "PC, Raspberry Pi, NAS, Pi-hole, websites, camera, printer, tasks and weather.",
                ImageUrl = "/images/portfolio/network-dashboard.jpg",
                LinkUrl = "https://github.com/Lundqwist/NetworkDashboard",
                LinkLabel = "Source on GitHub",
                SortOrder = 20,
            },
            new PortfolioItem
            {
                Slug = "package-tracking",
                Title = "Package Tracking",
                Summary = "A team project from the Lexicon full-stack course: a package tracking site in English " +
                          "and Swedish with a map, delivery estimate and progress tracker, in plain HTML, CSS and JavaScript.",
                ImageUrl = "/images/portfolio/placeholder.svg",
                LinkUrl = "https://github.com/Lundqwist/PackageTrackingTeamBlue",
                LinkLabel = "Source on GitHub",
                SortOrder = 30,
            },
            new PortfolioItem
            {
                Slug = "quest-xp-tracker",
                Title = "Quest XP Tracker",
                Summary = "A World of Warcraft addon in Lua that tracks the XP of every quest in your log, " +
                          "shows how close it gets you to the next level and spots quest items you no longer need.",
                ImageUrl = "/images/portfolio/quest-xp-tracker.png",
                LinkUrl = "https://github.com/Lundqwist/WoW_Forever_QuestXPTracker",
                LinkLabel = "Source on GitHub",
                SortOrder = 40,
            });

        await db.SaveChangesAsync();
    }
}

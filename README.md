# lundqwist.se

The personal website of **Bjarne M. Lundqwist**. This repository holds two sites:

| Folder | What | Address |
|---|---|---|
| [`site/`](site) | The current site: Portfolio, Projects and About. **C# / ASP.NET Core 8**, **Entity Framework Core**, **MariaDB** and **React** | https://lundqwist.se |
| [`v1/`](v1) | The first version: CV, stories, projects, gaming and an admin area. ASP.NET Core 8 MVC, EF Core, MariaDB. Kept running as a portfolio piece | https://lundqwist.se/v1/ |

Both are self-hosted on a Synology DS220+ and share one MariaDB database.

## How the pieces fit

```
Internet ──https──► DSM reverse proxy ──► site  (localhost:8090)
                                            │  /api/...        JSON from MariaDB (EF Core)
                                            │  /v1/, /media/, /showcase/  ──► v1 (localhost:8091)
                                            │  everything else  the React app
                                            ▼
                                         MariaDB (192.168.50.2:3306)
```

- **`site/`** is one small ASP.NET Core app (`Program.cs`). It answers `/api/portfolio`,
  `/api/portfolio/{slug}` and `/api/about`, serves the built React app from `wwwroot/`,
  and passes `/v1/...` on to the first version with YARP.
- **`site/client/`** is the React app (Vite, React Router). Pages are in `src/pages`,
  the look of the whole site is in `src/styles.css`.
- **`v1/`** runs unchanged except for one setting, `PathBase=/v1`, which makes all its
  links start with `/v1`. Its own README describes it in detail.
- Old addresses (`/CV`, `/CV/Pdf`, `/Stories`, `/Gaming`, `/Admin`, `/Privacy`) are
  redirected to `/v1/...`, so links that are already out there keep working.

## Content

| What | Where it comes from | How to change it |
|---|---|---|
| Portfolio items | Table `PortfolioItems` | Edit the rows in the database (phpMyAdmin on the NAS). `site/Data/SeedData.cs` only fills an empty table |
| Portfolio pictures | `site/client/public/images/portfolio/` | Add the file, set the row's `ImageUrl` to `/images/portfolio/<file>`, deploy |
| A portfolio item's page text | Column `Body` (Markdown) | Edit the row |
| About text | Table `PageContents`, row `About` (owned by v1) | https://lundqwist.se/v1/Admin/About |
| CV PDFs (English, Swedish) | Built by v1 from the CV in the database | https://lundqwist.se/v1/Admin |
| Front page pictures | `site/client/public/images/{portfolio,projects,about}.webp` | Replace the files (square-ish, about 500 px wide or more), deploy |

## Running locally

The database connection string is read from `dotnet user-secrets` (both projects
share the same secret, `ConnectionStrings:DefaultConnection`).

```powershell
# 1. The first version, under /v1 (only needed for /v1 links and the CV PDFs)
dotnet run --project v1 --no-launch-profile -- --environment=Development --urls=http://localhost:8091 --PathBase=/v1

# 2. The new site's C# app
dotnet run --project site          # http://localhost:5080

# 3. The React app with live reload while you edit
cd site\client
npm install
npm run dev                        # http://localhost:5173 (passes /api and /v1 on to 5080)
```

Without step 3, run `npm run build` once in `site\client`; the C# app then serves
the built React app itself on port 5080.

Database changes: edit the models in `site/Models`, then
`dotnet ef migrations add <Name> --project site`. Migrations are applied when the
site starts. The new site keeps its migration list in `__EFMigrationsHistory_Site`,
separate from v1's.

## Deploying

```powershell
.\deploy.ps1              # both sites
.\deploy.ps1 -Only site   # only the new site
```

It builds the React app, publishes both projects and copies them to
`\\LUNARBASE\docker\personalsite` (`site/` and `app/`), together with
`deploy/docker-compose.yml`. Then in DSM: Container Manager → Project →
*personalsite* → Action → **Restart**. When `docker-compose.yml` has changed,
Stop the project and **Build** it instead, so the containers are recreated.

## Copyright

© 2026 Bjarne M. Lundqwist. All rights reserved. See [`v1/README.md`](v1/README.md)
for the full notice and the third-party components of the first version. The new
site also uses React, React Router and Vite (MIT), YARP (MIT) and the Raleway
typeface (SIL Open Font License 1.1), bundled with the site.

<!-- The text on this item's portfolio page. Based on the project's README (github.com/Lundqwist/Website2.0); edit it freely. -->

The site you are on. It replaced my [first version](/portfolio/lundqwist-se-v1) in November 2026, and it is also the front door for everything else I host under lundqwist.se.

## What it is built with

| Part | Technology |
|---|---|
| Front end | **React** with Vite and React Router |
| API | **C# / ASP.NET Core 8** minimal API |
| Data | **Entity Framework Core** with migrations, **MariaDB** |
| Routing to other apps | **YARP** reverse proxy |
| Hosting | **Docker** on a Synology DS220+ at home, behind DSM's reverse proxy, which ends HTTPS |

## How it fits together

Every request comes in through one door. DSM's reverse proxy ends HTTPS and hands the request to the `personalsite` container, which either:

- serves the React app (files under `/assets` carry a fingerprint in their names and are cached for a year; `index.html` is always fetched fresh),
- answers `/api/...` itself, for example the portfolio list and each item's page, or
- passes the request on with YARP to another app: the first version of the site under `/v1`, and my [WoW characters](/portfolio/wow-characters) pages under `/wowcharacters`.

Each of those apps listens only on `127.0.0.1`, so the only way in is through the front site. Old addresses from the first version (`/CV`, `/Stories` and others) are redirected to their new place under `/v1`.

## Design decisions

- **Keep the first version running** instead of rewriting it: it still owns the CV, its PDF export and the admin area, and the new site reads the About text from the same database.
- **One database, clear ownership:** both sites use the `personal_site` database, but the new site owns only its own tables and its own migrations history table, so the two never fight over the schema.
- **Data changes as migrations:** adding or removing a portfolio item is a small data-only EF Core migration, so the live database and a fresh one always end up the same.
- **Page texts as Markdown files** next to the code, rendered on the server, so a project's page can be updated with a normal commit.

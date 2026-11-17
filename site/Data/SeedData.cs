using Lundqwist.Site.Models;
using Microsoft.EntityFrameworkCore;

namespace Lundqwist.Site.Data;

// The first portfolio items. They are inserted once, when the table is empty;
// after that the rows in the database are the truth (edit them there, for
// example with phpMyAdmin on the NAS).
public static class SeedData
{
    // Shared with the migration that added these two to the live database
    public const string LunarJournalSummary =
        "A World of Warcraft: Forever addon in Lua that keeps a journal while you play: quests and who gave them, " +
        "the people you meet, time spent running, riding, fishing and crafting, deaths, and the in-game time of day. " +
        "The modern client hides the combat log from addons, so kills are counted from the units the game shows.";

    public const string StoryMakerSummary =
        "A Windows program in C# (.NET 8, WinForms) that reads the Lunar Journal saves, hands them to an AI of your " +
        "choosing (a free local model through Ollama, or Claude through Anthropic's C# SDK, OpenAI or Gemini) and " +
        "gets back a chapter of the character's life, told as his own memories. Edit it, then post it as a new " +
        "chapter through a token-protected API on the WoW characters pages.";

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
                GitHubUrl = "https://github.com/Lundqwist/Website2.0/tree/main/v1",
                LinkUrl = "/v1/",
                LinkLabel = "Open the first version",
                SortOrder = 10,
            },
            new PortfolioItem
            {
                Slug = "jawbreakers",
                Title = "Jawbreakers guild site",
                Summary = "The website of my World of Warcraft: Forever guild: members by class with Armory links, an event calendar, " +
                          "a crafting page with every profession's recipes, materials and who in the guild can make them, " +
                          "and an admin area for editing it all. Built with C#, ASP.NET Core 8 minimal API, Entity Framework Core " +
                          "and SQLite, with a plain HTML, CSS and JavaScript front end, and hosted at home on a Synology NAS.",
                ImageUrl = "/images/portfolio/jawbreakers.jpg",
                GitHubUrl = "https://github.com/Lundqwist/Jawbreakers-Guild",
                LinkUrl = "/jawbreakers/",
                LinkLabel = "Open the guild site",
                SortOrder = 15,
            },
            new PortfolioItem
            {
                Slug = "network-dashboard",
                Title = "Network Dashboard",
                Summary = "A self-hosted dashboard for a side monitor that shows my home network at a glance: " +
                          "PC, Raspberry Pi, NAS, Pi-hole, websites, camera, printer, tasks and weather.",
                ImageUrl = "/images/portfolio/network-dashboard.jpg",
                GitHubUrl = "https://github.com/Lundqwist/NetworkDashboard",
                SortOrder = 20,
            },
            new PortfolioItem
            {
                Slug = "smart-asset-tracking",
                Title = "Smart Asset Tracking",
                Summary = "A menu-driven C# / .NET 10 console application for tracking company assets (laptops, phones, " +
                          "office equipment) across offices in several countries and currencies, with logins and roles, " +
                          "a dashboard, reports and exports. Built with Entity Framework Core and SQL Server Express.",
                ImageUrl = "/images/portfolio/smart-asset-tracking.png",
                GitHubUrl = "https://github.com/Lundqwist/Smart-Asset-Tracking",
                SortOrder = 25,
            },
            new PortfolioItem
            {
                Slug = "sql-first",
                Title = "SQL First: School Manager",
                Summary = "A C# / .NET 10 console application that manages a school's programs, courses and students " +
                          "with hand-written SQL against SQL Server Express: joins, parameterised queries, search, " +
                          "add and remove, and a setup script that creates the database with sample data.",
                ImageUrl = "/images/portfolio/sql-first.png",
                GitHubUrl = "https://github.com/Lundqwist/SQL_First",
                SortOrder = 27,
            },
            new PortfolioItem
            {
                Slug = "package-tracking",
                Title = "Package Tracking",
                Summary = "A team project from the Lexicon full-stack course: a package tracking site in English " +
                          "and Swedish with a map, delivery estimate and progress tracker, in plain HTML, CSS and JavaScript.",
                ImageUrl = "/images/portfolio/package-tracking.jpg",
                GitHubUrl = "https://github.com/Lundqwist/PackageTrackingTeamBlue",
                LinkUrl = "https://lundqwist.github.io/PackageTrackingTeamBlue/",
                LinkLabel = "Open the page",
                SortOrder = 30,
            },
            new PortfolioItem
            {
                Slug = "quest-xp-tracker",
                Title = "Quest XP Tracker",
                Summary = "A World of Warcraft addon in Lua that tracks the XP of every quest in your log, " +
                          "shows how close it gets you to the next level and spots quest items you no longer need.",
                ImageUrl = "/images/portfolio/quest-xp-tracker.png",
                GitHubUrl = "https://github.com/Lundqwist/WoW_Forever_QuestXPTracker",
                SortOrder = 40,
            },
            new PortfolioItem
            {
                Slug = "favorite-items",
                Title = "FavoriteItems",
                Summary = "A World of Warcraft: Forever addon in Lua for marking specific items as favorites with a heart. " +
                          "If a favorite is sold to a vendor, a warning pops up with a button to buy it back. " +
                          "Works with the Baganator bag addon through its plugin API, and with the default bags.",
                ImageUrl = "/images/portfolio/favorite-items.png",
                GitHubUrl = "https://github.com/Lundqwist/FavoriteItems",
                SortOrder = 45,
            },
            new PortfolioItem
            {
                Slug = "lunar-journal",
                Title = "Lunar Journal",
                Summary = LunarJournalSummary,
                ImageUrl = "/images/portfolio/lunar-journal.jpg",
                GitHubUrl = "https://github.com/Lundqwist/LunarJournal",
                LinkUrl = "/projects/lunar-journal",
                LinkLabel = "About the project",
                SortOrder = 50,
            },
            new PortfolioItem
            {
                Slug = "storymaker",
                Title = "StoryMaker",
                Summary = StoryMakerSummary,
                ImageUrl = "/images/portfolio/storymaker.png",
                GitHubUrl = "https://github.com/Lundqwist/LunarJournal",
                LinkUrl = "/wowcharacters/forever/chapter.html?c=gilded-gobsong&n=1",
                LinkLabel = "Read a chapter",
                SortOrder = 55,
            });

        await db.SaveChangesAsync();
    }
}

using Lundqwist.Site.Models;
using Microsoft.EntityFrameworkCore;

namespace Lundqwist.Site.Data;

// The first portfolio items. They are inserted once, when the table is empty;
// after that the rows in the database are the truth (edit them there, for
// example with phpMyAdmin on the NAS).
public static class SeedData
{
    // Shared with the migrations that added these two to the live database and later updated them.
    // Their longer texts are in Content/portfolio/lunar-journal.md and storymaker.md.
    public const string LunarJournalSummary =
        "A World of Warcraft: Forever addon in Lua that keeps a journal while you play: quests and who gave them, " +
        "the people you meet, time spent running, riding, fishing and crafting, deaths, your own notes, and the " +
        "in-game time of day. StoryMaker turns the journal into the character's story.";

    public const string StoryMakerSummary =
        "A Windows program in C# (.NET 8, WinForms) that turns the Lunar Journal into a character's story. It hands " +
        "the journal to an AI of your choosing (free and offline through Ollama, or Claude through Anthropic's C# " +
        "SDK, OpenAI or Gemini), which writes a chapter as the character's own memories, years later. Edit it as " +
        "Markdown with a live preview, add screenshots from the game and sounds, then post it as the next chapter " +
        "on the WoW characters pages, or save it on your PC.";

    // Added on 2026-11-24 (migration LatestProjectsNoCourseWork); longer texts in Content/portfolio.
    public const string LundqwistSeSummary =
        "This site: a React (Vite) front end on a C# / ASP.NET Core 8 minimal API with Entity Framework Core and " +
        "MariaDB. It also acts as the front door for my other apps, passing their addresses on with YARP, and keeps " +
        "the first version of the site running under /v1. Self-hosted in Docker on a Synology NAS.";

    public const string WowCharactersSummary =
        "Pages for my World of Warcraft characters, retail and WoW: Forever: picture, gear, stats and professions " +
        "read live from Blizzard's official API (OAuth2, cached an hour), a crafting page with every known recipe, " +
        "and each character's story told in chapters. ASP.NET Core 8 with plain HTML, CSS and JavaScript.";

    public const string HomeLabTvSummary =
        "A Samsung Smart TV (Tizen) app that puts my home lab on the living-room TV: Raspberry Pi and NAS health, " +
        "Pi-hole, websites and services, network, camera, weather and news, driven by the remote. Plain HTML, CSS " +
        "and JavaScript for the TV's older browser engine, fed by a read-only Network Dashboard server in Docker.";

    // Added on 2026-11-24 (migration AiWorkbenchPortfolioItem), updated the same day for songs and movies
    // (migration AiWorkbenchCreateSummary); longer text in Content/portfolio/ai-workbench.md.
    public const string AiWorkbenchSummary =
        "A Windows program in Python (PySide6) that runs AI entirely on my own PC with Ollama: answers from my own " +
        "documents with sources, invoices read into checked rows, cited research reports from the web, songs with " +
        "singing and narrated short movies made from one sentence, and a voice assistant woken with \"Hey Luna\" " +
        "that asks on screen before doing anything more. Tested with promptfoo.";

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
                Date = new DateOnly(2026, 10, 12),
                SortOrder = 10,
            },
            new PortfolioItem
            {
                Slug = "network-dashboard",
                Title = "Network Dashboard",
                Summary = "A self-hosted dashboard for a side monitor that shows my home network at a glance: " +
                          "PC, Raspberry Pi, NAS, Pi-hole, websites, camera, printer, tasks and weather.",
                ImageUrl = "/images/portfolio/network-dashboard.jpg",
                GitHubUrl = "https://github.com/Lundqwist/NetworkDashboard",
                Date = new DateOnly(2026, 11, 11),
                SortOrder = 20,
            },
            new PortfolioItem
            {
                Slug = "lundqwist-se",
                Title = "lundqwist.se",
                Summary = LundqwistSeSummary,
                ImageUrl = "/images/portfolio/lundqwist-se.jpg",
                GitHubUrl = "https://github.com/Lundqwist/Website2.0",
                LinkUrl = "/",
                LinkLabel = "Open the site",
                Date = new DateOnly(2026, 11, 13),
                SortOrder = 30,
            },
            new PortfolioItem
            {
                Slug = "wow-characters",
                Title = "WoW characters",
                Summary = WowCharactersSummary,
                ImageUrl = "/images/portfolio/wow-characters.jpg",
                GitHubUrl = "https://github.com/Lundqwist/WowCharacters",
                LinkUrl = "/wowcharacters/",
                LinkLabel = "Open the pages",
                Date = new DateOnly(2026, 11, 17),
                SortOrder = 52,
            },
            new PortfolioItem
            {
                Slug = "home-lab-tv",
                Title = "Home Lab TV app",
                Summary = HomeLabTvSummary,
                ImageUrl = "/images/portfolio/home-lab-tv.jpg",
                GitHubUrl = "https://github.com/Lundqwist/TvDashboard",
                Date = new DateOnly(2026, 11, 23),
                SortOrder = 60,
            },
            new PortfolioItem
            {
                Slug = "ai-workbench",
                Title = "AI Workbench",
                Summary = AiWorkbenchSummary,
                ImageUrl = "/images/portfolio/ai-workbench.jpg",
                GitHubUrl = "https://github.com/Lundqwist/AiProjects",
                LinkUrl = "/projects/ai-workbench",
                LinkLabel = "About the project",
                Date = new DateOnly(2026, 11, 24),
                SortOrder = 65,
            },
            new PortfolioItem
            {
                Slug = "quest-xp-tracker",
                Title = "Quest XP Tracker",
                Summary = "A World of Warcraft addon in Lua that tracks the XP of every quest in your log, " +
                          "shows how close it gets you to the next level and spots quest items you no longer need.",
                ImageUrl = "/images/portfolio/quest-xp-tracker.png",
                GitHubUrl = "https://github.com/Lundqwist/WoW_Forever_QuestXPTracker",
                CurseForgeUrl = "https://www.curseforge.com/wow/addons/qxp-tracker",
                Date = new DateOnly(2026, 11, 11),
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
                CurseForgeUrl = "https://www.curseforge.com/wow/addons/favoriteitems",
                Date = new DateOnly(2026, 11, 14),
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
                Date = new DateOnly(2026, 11, 17),
                SortOrder = 50,
            },
            new PortfolioItem
            {
                Slug = "storymaker",
                Title = "StoryMaker",
                Summary = StoryMakerSummary,
                ImageUrl = "/images/portfolio/storymaker.png",
                GitHubUrl = "https://github.com/Lundqwist/StoryMaker",
                LinkUrl = "/wowcharacters/forever/chapter.html?c=gilded-gobsong&n=1",
                LinkLabel = "Read a chapter",
                Date = new DateOnly(2026, 11, 17),
                SortOrder = 55,
            });

        await db.SaveChangesAsync();
    }
}

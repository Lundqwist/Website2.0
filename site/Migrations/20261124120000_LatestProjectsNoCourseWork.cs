using Lundqwist.Site.Data;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Lundqwist.Site.Migrations
{
    /// <inheritdoc />
    // A data-only migration: the portfolio shows my own projects, not course work. Removes the three
    // Lexicon course projects (Package Tracking, SQL First, Smart Asset Tracking) and adds the newest
    // projects: this site, the WoW characters pages and the Home Lab TV app (unless they already exist).
    public partial class LatestProjectsNoCourseWork : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                "DELETE FROM PortfolioItems WHERE Slug IN ('package-tracking', 'sql-first', 'smart-asset-tracking');");

            Insert(migrationBuilder, "lundqwist-se", "lundqwist.se", SeedData.LundqwistSeSummary,
                "/images/portfolio/lundqwist-se.jpg", "https://github.com/Lundqwist/Website2.0",
                "/", "Open the site", "2026-11-13", 30);
            Insert(migrationBuilder, "wow-characters", "WoW characters", SeedData.WowCharactersSummary,
                "/images/portfolio/wow-characters.jpg", "https://github.com/Lundqwist/WowCharacters",
                "/wowcharacters/", "Open the pages", "2026-11-17", 52);
            Insert(migrationBuilder, "home-lab-tv", "Home Lab TV app", SeedData.HomeLabTvSummary,
                "/images/portfolio/home-lab-tv.jpg", "https://github.com/Lundqwist/TvDashboard",
                null, null, "2026-11-23", 60);
        }

        static void Insert(MigrationBuilder mb, string slug, string title, string summary, string image,
            string gitHub, string link, string label, string date, int order)
        {
            static string Q(string s) => s is null ? "NULL" : "'" + s.Replace("'", "''") + "'";
            mb.Sql(
                "INSERT INTO PortfolioItems (Slug, Title, Summary, ImageUrl, GitHubUrl, LinkUrl, LinkLabel, Date, SortOrder) " +
                $"SELECT {Q(slug)}, {Q(title)}, {Q(summary)}, {Q(image)}, {Q(gitHub)}, {Q(link)}, {Q(label)}, {Q(date)}, {order} " +
                $"FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM PortfolioItems WHERE Slug = {Q(slug)});");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Removes the new items only; the course projects are not put back.
            migrationBuilder.Sql(
                "DELETE FROM PortfolioItems WHERE Slug IN ('lundqwist-se', 'wow-characters', 'home-lab-tv');");
        }
    }
}

using Lundqwist.Site.Data;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Lundqwist.Site.Migrations
{
    /// <inheritdoc />
    // A data-only migration: adds Lunar Journal (the WoW addon) and StoryMaker (the Windows
    // program) to the portfolio, unless items with those addresses already exist.
    public partial class LunarJournalPortfolioItems : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            Insert(migrationBuilder, "lunar-journal", "Lunar Journal", SeedData.LunarJournalSummary,
                "/images/portfolio/lunar-journal.jpg", "/projects/lunar-journal", "About the project", 50);
            Insert(migrationBuilder, "storymaker", "StoryMaker", SeedData.StoryMakerSummary,
                "/images/portfolio/storymaker.png", "/wowcharacters/forever/chapter.html?c=gilded-gobsong&n=1", "Read a chapter", 55);
        }

        static void Insert(MigrationBuilder mb, string slug, string title, string summary, string image, string link, string label, int order)
        {
            static string Q(string s) => "'" + s.Replace("'", "''") + "'";
            mb.Sql(
                "INSERT INTO PortfolioItems (Slug, Title, Summary, ImageUrl, GitHubUrl, LinkUrl, LinkLabel, SortOrder) " +
                $"SELECT {Q(slug)}, {Q(title)}, {Q(summary)}, {Q(image)}, 'https://github.com/Lundqwist/LunarJournal', " +
                $"{Q(link)}, {Q(label)}, {order} " +
                $"FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM PortfolioItems WHERE Slug = {Q(slug)});");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM PortfolioItems WHERE Slug IN ('lunar-journal', 'storymaker');");
        }
    }
}

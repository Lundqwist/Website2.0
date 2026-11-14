using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Lundqwist.Site.Migrations
{
    /// <inheritdoc />
    // A data-only migration: adds the Jawbreakers guild site to the portfolio,
    // unless an item with that address already exists.
    public partial class JawbreakersPortfolioItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                "INSERT INTO PortfolioItems (Slug, Title, Summary, ImageUrl, GitHubUrl, LinkUrl, LinkLabel, SortOrder) " +
                "SELECT 'jawbreakers', 'Jawbreakers guild site', " +
                "'The website of my World of Warcraft: Forever guild: members by class with Armory links, an event calendar, " +
                "a crafting page with every profession''s recipes, materials and who in the guild can make them, " +
                "and an admin area for editing it all. Built with C#, ASP.NET Core 8 minimal API, Entity Framework Core " +
                "and SQLite, with a plain HTML, CSS and JavaScript front end, and hosted at home on a Synology NAS.', " +
                "'/images/portfolio/jawbreakers.jpg', " +
                "'https://github.com/Lundqwist/Jawbreakers-Guild', '/jawbreakers/', 'Open the guild site', 15 " +
                "FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM PortfolioItems WHERE Slug = 'jawbreakers');");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM PortfolioItems WHERE Slug = 'jawbreakers';");
        }
    }
}

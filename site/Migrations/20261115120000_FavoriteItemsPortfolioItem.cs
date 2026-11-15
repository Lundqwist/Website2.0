using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Lundqwist.Site.Migrations
{
    /// <inheritdoc />
    // A data-only migration: adds the FavoriteItems WoW addon to the portfolio,
    // unless an item with that address already exists.
    public partial class FavoriteItemsPortfolioItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                "INSERT INTO PortfolioItems (Slug, Title, Summary, ImageUrl, GitHubUrl, LinkUrl, LinkLabel, SortOrder) " +
                "SELECT 'favorite-items', 'FavoriteItems', " +
                "'A World of Warcraft: Forever addon in Lua for marking specific items as favorites with a heart. " +
                "If a favorite is sold to a vendor, a warning pops up with a button to buy it back. " +
                "Works with the Baganator bag addon through its plugin API, and with the default bags.', " +
                "'/images/portfolio/favorite-items.png', " +
                "'https://github.com/Lundqwist/FavoriteItems', NULL, NULL, 45 " +
                "FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM PortfolioItems WHERE Slug = 'favorite-items');");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM PortfolioItems WHERE Slug = 'favorite-items';");
        }
    }
}

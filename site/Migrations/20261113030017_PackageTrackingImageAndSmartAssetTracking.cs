using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Lundqwist.Site.Migrations
{
    /// <inheritdoc />
    // A data-only migration: the Package Tracking item gets a screenshot of
    // the page, and Smart Asset Tracking is added to the portfolio. Rows that
    // were changed by hand are left alone.
    public partial class PackageTrackingImageAndSmartAssetTracking : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                "UPDATE PortfolioItems SET ImageUrl = '/images/portfolio/package-tracking.jpg' " +
                "WHERE Slug = 'package-tracking' AND ImageUrl = '/images/portfolio/placeholder.svg';");

            // "INSERT ... SELECT ... WHERE NOT EXISTS" adds the row only if no
            // item with this address exists yet (a fresh database gets it from
            // SeedData instead).
            migrationBuilder.Sql(
                "INSERT INTO PortfolioItems (Slug, Title, Summary, ImageUrl, LinkUrl, LinkLabel, SortOrder) " +
                "SELECT 'smart-asset-tracking', 'Smart Asset Tracking', " +
                "'A menu-driven C# / .NET 10 console application for tracking company assets (laptops, phones, " +
                "office equipment) across offices in several countries and currencies, with logins and roles, " +
                "a dashboard, reports and exports. Built with Entity Framework Core and SQL Server Express.', " +
                "'/images/portfolio/smart-asset-tracking.png', " +
                "'https://github.com/Lundqwist/Smart-Asset-Tracking', 'Source on GitHub', 25 " +
                "FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM PortfolioItems WHERE Slug = 'smart-asset-tracking');");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM PortfolioItems WHERE Slug = 'smart-asset-tracking';");
            migrationBuilder.Sql(
                "UPDATE PortfolioItems SET ImageUrl = '/images/portfolio/placeholder.svg' " +
                "WHERE Slug = 'package-tracking' AND ImageUrl = '/images/portfolio/package-tracking.jpg';");
        }
    }
}

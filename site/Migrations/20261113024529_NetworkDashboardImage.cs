using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Lundqwist.Site.Migrations
{
    /// <inheritdoc />
    // A data-only migration: the Network Dashboard item gets its own picture.
    // SeedData only fills an empty table, so the row that already exists is
    // changed here. It is left alone if its picture was changed by hand.
    public partial class NetworkDashboardImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                "UPDATE PortfolioItems SET ImageUrl = '/images/portfolio/network-dashboard.jpg' " +
                "WHERE Slug = 'network-dashboard' AND ImageUrl = '/images/portfolio/placeholder.svg';");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                "UPDATE PortfolioItems SET ImageUrl = '/images/portfolio/placeholder.svg' " +
                "WHERE Slug = 'network-dashboard' AND ImageUrl = '/images/portfolio/network-dashboard.jpg';");
        }
    }
}

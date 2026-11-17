using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Lundqwist.Site.Migrations
{
    /// <inheritdoc />
    public partial class PortfolioDates : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateOnly>(
                name: "Date",
                table: "PortfolioItems",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            // The day each project's GitHub repository was created
            var dates = new (string Slug, string Date)[]
            {
                ("storymaker", "2026-11-17"),
                ("lunar-journal", "2026-11-17"),
                ("favorite-items", "2026-11-14"),
                ("jawbreakers", "2026-11-14"),
                ("network-dashboard", "2026-11-11"),
                ("quest-xp-tracker", "2026-11-11"),
                ("smart-asset-tracking", "2026-11-11"),
                ("sql-first", "2026-11-06"),
                ("lundqwist-se-v1", "2026-10-12"),
                ("package-tracking", "2026-09-30"),
            };
            foreach (var (slug, date) in dates)
                migrationBuilder.Sql($"UPDATE PortfolioItems SET Date = '{date}' WHERE Slug = '{slug}';");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Date",
                table: "PortfolioItems");
        }
    }
}

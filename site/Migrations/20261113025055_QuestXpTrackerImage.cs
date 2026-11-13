using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Lundqwist.Site.Migrations
{
    /// <inheritdoc />
    // A data-only migration: the Quest XP Tracker item gets the addon's
    // "Quest items" window as its picture. The row is left alone if its
    // picture was changed by hand.
    public partial class QuestXpTrackerImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                "UPDATE PortfolioItems SET ImageUrl = '/images/portfolio/quest-xp-tracker.png' " +
                "WHERE Slug = 'quest-xp-tracker' AND ImageUrl = '/images/portfolio/placeholder.svg';");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                "UPDATE PortfolioItems SET ImageUrl = '/images/portfolio/placeholder.svg' " +
                "WHERE Slug = 'quest-xp-tracker' AND ImageUrl = '/images/portfolio/quest-xp-tracker.png';");
        }
    }
}

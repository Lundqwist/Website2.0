using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Lundqwist.Site.Migrations
{
    /// <inheritdoc />
    // A data-only migration: the Jawbreakers guild site was retired on 2026-11-20 (its container is gone and
    // /jawbreakers is no longer passed on), so its portfolio item goes too.
    public partial class RemoveJawbreakersPortfolioItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM PortfolioItems WHERE Slug = 'jawbreakers';");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Nothing: the site it linked to no longer exists.
        }
    }
}

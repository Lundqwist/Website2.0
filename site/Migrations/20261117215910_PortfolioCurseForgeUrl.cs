using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Lundqwist.Site.Migrations
{
    /// <inheritdoc />
    public partial class PortfolioCurseForgeUrl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CurseForgeUrl",
                table: "PortfolioItems",
                type: "varchar(300)",
                maxLength: 300,
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.Sql("UPDATE PortfolioItems SET CurseForgeUrl = 'https://www.curseforge.com/wow/addons/qxp-tracker' WHERE Slug = 'quest-xp-tracker';");
            migrationBuilder.Sql("UPDATE PortfolioItems SET CurseForgeUrl = 'https://www.curseforge.com/wow/addons/favoriteitems' WHERE Slug = 'favorite-items';");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CurseForgeUrl",
                table: "PortfolioItems");
        }
    }
}

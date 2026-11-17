using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Lundqwist.Site.Migrations
{
    /// <inheritdoc />
    // A data-only migration: StoryMaker moved to its own repository (github.com/Lundqwist/StoryMaker).
    public partial class StoryMakerOwnRepository : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("UPDATE PortfolioItems SET GitHubUrl = 'https://github.com/Lundqwist/StoryMaker' WHERE Slug = 'storymaker';");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("UPDATE PortfolioItems SET GitHubUrl = 'https://github.com/Lundqwist/LunarJournal' WHERE Slug = 'storymaker';");
        }
    }
}

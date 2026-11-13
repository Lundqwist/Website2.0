using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Lundqwist.Site.Migrations
{
    /// <inheritdoc />
    // A data-only migration: fills the GitHubUrl column (added by the
    // PortfolioGitHubUrl migration) from the links that were stored in LinkUrl.
    public partial class MoveGitHubLinks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Move the existing GitHub links into their own column
            migrationBuilder.Sql(
                "UPDATE PortfolioItems SET GitHubUrl = LinkUrl, LinkUrl = NULL, LinkLabel = NULL " +
                "WHERE GitHubUrl IS NULL AND LinkUrl LIKE 'https://github.com/%';");

            // The first version of the site keeps its "Open" link and gets its source too
            migrationBuilder.Sql(
                "UPDATE PortfolioItems SET GitHubUrl = 'https://github.com/Lundqwist/Website2.0/tree/main/v1' " +
                "WHERE Slug = 'lundqwist-se-v1' AND GitHubUrl IS NULL;");

            // Package Tracking is published, so it also links to the page itself
            migrationBuilder.Sql(
                "UPDATE PortfolioItems SET LinkUrl = 'https://lundqwist.github.io/PackageTrackingTeamBlue/', " +
                "LinkLabel = 'Open the page' WHERE Slug = 'package-tracking' AND LinkUrl IS NULL;");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                "UPDATE PortfolioItems SET LinkUrl = GitHubUrl, LinkLabel = 'Source on GitHub', GitHubUrl = NULL " +
                "WHERE GitHubUrl IS NOT NULL AND Slug <> 'lundqwist-se-v1';");
            migrationBuilder.Sql("UPDATE PortfolioItems SET GitHubUrl = NULL WHERE Slug = 'lundqwist-se-v1';");
        }
    }
}

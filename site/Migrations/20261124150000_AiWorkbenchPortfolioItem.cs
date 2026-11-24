using Lundqwist.Site.Data;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Lundqwist.Site.Migrations
{
    /// <inheritdoc />
    // A data-only migration: adds AI Workbench to the portfolio (unless it already exists).
    public partial class AiWorkbenchPortfolioItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            static string Q(string s) => s is null ? "NULL" : "'" + s.Replace("'", "''") + "'";
            migrationBuilder.Sql(
                "INSERT INTO PortfolioItems (Slug, Title, Summary, ImageUrl, GitHubUrl, LinkUrl, LinkLabel, Date, SortOrder) " +
                $"SELECT 'ai-workbench', 'AI Workbench', {Q(SeedData.AiWorkbenchSummary)}, '/images/portfolio/ai-workbench.jpg', " +
                "'https://github.com/Lundqwist/AiProjects', '/projects/ai-workbench', 'About the project', '2026-11-24', 65 " +
                "FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM PortfolioItems WHERE Slug = 'ai-workbench');");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM PortfolioItems WHERE Slug = 'ai-workbench';");
        }
    }
}

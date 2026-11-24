using Lundqwist.Site.Data;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Lundqwist.Site.Migrations
{
    /// <inheritdoc />
    // A data-only migration: a new summary for the AI Workbench portfolio item, after its Create tab got
    // songs with singing and narrated movies. (Its longer text is Content/portfolio/ai-workbench.md.)
    public partial class AiWorkbenchCreateSummary : Migration
    {
        static string Q(string s) => "'" + s.Replace("\\", "\\\\").Replace("'", "''") + "'";

        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql($"UPDATE PortfolioItems SET Summary = {Q(SeedData.AiWorkbenchSummary)} WHERE Slug = 'ai-workbench';");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // the earlier summary isn't kept; nothing to undo
        }
    }
}

using Lundqwist.Site.Data;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Lundqwist.Site.Migrations
{
    /// <inheritdoc />
    // A data-only migration: new summaries for the Lunar Journal and StoryMaker portfolio items, after
    // StoryMaker got Markdown editing, pictures, sounds and its new look. (Their longer texts are files in
    // Content/portfolio.)
    public partial class LunarJournalPortfolioTexts : Migration
    {
        static string Q(string s) => "'" + s.Replace("\\", "\\\\").Replace("'", "''") + "'";

        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql($"UPDATE PortfolioItems SET Summary = {Q(SeedData.LunarJournalSummary)} WHERE Slug = 'lunar-journal';");
            migrationBuilder.Sql($"UPDATE PortfolioItems SET Summary = {Q(SeedData.StoryMakerSummary)} WHERE Slug = 'storymaker';");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // the earlier summaries aren't kept; nothing to undo
        }
    }
}

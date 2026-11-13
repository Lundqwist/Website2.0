using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Lundqwist.Site.Migrations
{
    /// <inheritdoc />
    // A data-only migration: adds SQL First (School Manager) to the portfolio,
    // unless an item with that address already exists.
    public partial class SqlFirstPortfolioItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                "INSERT INTO PortfolioItems (Slug, Title, Summary, ImageUrl, LinkUrl, LinkLabel, SortOrder) " +
                "SELECT 'sql-first', 'SQL First: School Manager', " +
                "'A C# / .NET 10 console application that manages a school''s programs, courses and students " +
                "with hand-written SQL against SQL Server Express: joins, parameterised queries, search, " +
                "add and remove, and a setup script that creates the database with sample data.', " +
                "'/images/portfolio/sql-first.png', " +
                "'https://github.com/Lundqwist/SQL_First', 'Source on GitHub', 27 " +
                "FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM PortfolioItems WHERE Slug = 'sql-first');");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM PortfolioItems WHERE Slug = 'sql-first';");
        }
    }
}

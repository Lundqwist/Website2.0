using Lundqwist.Site.Models;
using Microsoft.EntityFrameworkCore;

namespace Lundqwist.Site.Data;

// The new site's view of the database. It shares the personal_site database
// with v1 but owns only the PortfolioItems table.
public class SiteDbContext : DbContext
{
    public SiteDbContext(DbContextOptions<SiteDbContext> options) : base(options) { }

    public DbSet<PortfolioItem> PortfolioItems => Set<PortfolioItem>();
    public DbSet<PageContent> PageContents => Set<PageContent>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<PortfolioItem>(e =>
        {
            // Two items can't share an address
            e.HasIndex(x => x.Slug).IsUnique();
        });

        // PageContents is created and changed by v1's migrations. Excluding it
        // here means this site's migrations never touch it.
        modelBuilder.Entity<PageContent>(e =>
        {
            e.ToTable("PageContents", t => t.ExcludeFromMigrations());
        });
    }
}

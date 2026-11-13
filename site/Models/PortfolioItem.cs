using System.ComponentModel.DataAnnotations;

namespace Lundqwist.Site.Models;

// One entry on the Portfolio page. Each entry also has its own page at
// /portfolio/{Slug}.
public class PortfolioItem
{
    public int Id { get; set; }

    // The name used in the address: /portfolio/network-dashboard
    [Required, MaxLength(100)]
    public string Slug { get; set; } = string.Empty;

    [Required, MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    // The short description shown in the list
    [Required, MaxLength(1000)]
    public string Summary { get; set; } = string.Empty;

    // Address of the image, for example /images/portfolio/network-dashboard.svg
    // (a file in client/public/images/portfolio)
    [Required, MaxLength(300)]
    public string ImageUrl { get; set; } = string.Empty;

    // The longer text on the item's own page, in Markdown. Empty for now.
    public string? Body { get; set; }

    // Optional: the source code on GitHub. Shown as a button at the top of
    // the item's page.
    [MaxLength(300)]
    public string? GitHubUrl { get; set; }

    // Optional second button: where the thing itself can be seen (a live page)
    [MaxLength(300)]
    public string? LinkUrl { get; set; }

    [MaxLength(100)]
    public string? LinkLabel { get; set; }

    // Lower numbers come first in the list
    public int SortOrder { get; set; }
}

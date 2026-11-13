namespace Lundqwist.Site.Models;

// A row in the PageContents table, which belongs to v1 (see
// ../v1/Models/PageContent.cs). The new site only reads the About text from
// it, so the text is still edited on /v1/Admin/About and both sites show the
// same words. Only the columns needed here are listed.
public class PageContent
{
    public const string AboutKey = "About";

    public int Id { get; set; }
    public string Key { get; set; } = string.Empty;
    public string? Title { get; set; }
    public string? Body { get; set; }   // Markdown
}

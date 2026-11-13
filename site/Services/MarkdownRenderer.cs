using Ganss.Xss;
using Markdig;

namespace Lundqwist.Site.Services;

// Turns Markdown (the About text, portfolio item texts) into HTML that is safe
// to put on a page: Markdig converts, HtmlSanitizer then removes anything that
// could run code (script tags, onclick attributes, javascript: links).
// The Markdown settings are the same as in v1 (../v1/Services/MarkdownRenderer.cs),
// so a text looks the same on both sites.
public class MarkdownRenderer
{
    private readonly MarkdownPipeline _pipeline = new MarkdownPipelineBuilder()
        .UseEmphasisExtras()                 // ~~strikethrough~~ and similar
        .UsePipeTables()                     // simple tables with | columns |
        .UseListExtras()                     // more list styles (a. b. c.)
        .UseAutoLinks()                      // turns https://... into a link automatically
        .UseSoftlineBreakAsHardlineBreak()   // a single line break stays a line break
        .Build();

    private readonly HtmlSanitizer _sanitizer = new();

    public MarkdownRenderer()
    {
        // Links may only go to web pages and email addresses
        _sanitizer.AllowedSchemes.Clear();
        _sanitizer.AllowedSchemes.Add("http");
        _sanitizer.AllowedSchemes.Add("https");
        _sanitizer.AllowedSchemes.Add("mailto");
    }

    public string Render(string? markdown)
    {
        if (string.IsNullOrWhiteSpace(markdown)) return string.Empty;
        return _sanitizer.Sanitize(Markdown.ToHtml(markdown, _pipeline));
    }
}

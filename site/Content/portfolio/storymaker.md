<!-- The text on this item's portfolio page. Based on the project's README (github.com/Lundqwist/LunarJournal); edit it freely. -->

## How it's used

The front page shows a card for every character with a journal. Pick one, tick the play sessions the chapter should cover, choose an AI and press **Write chapter**. StoryMaker reads the story so far, so the new chapter carries on from the last, and the AI writes as the character, old and looking back. Then edit it: a formatting bar, a preview that looks like the website, pictures picked from the game's screenshots folder and sounds. **Post** uploads the pictures and sounds and publishes the next chapter; **Save as Markdown** keeps it on the PC with its pictures in a folder next to it.

## How it's built

- **Reading the game's files**: WoW saves addon data as Lua tables; a small reader of its own turns them into JSON for the AI.
- **Any AI**: Claude through Anthropic's official C# SDK (with server-side fallbacks), OpenAI, Gemini, any OpenAI-compatible server, and Ollama for a free model on your own graphics card. They all get the same instructions, so the stories keep one voice.
- **The website side**: a token-protected API on the [WoW characters pages](/wowcharacters/) in ASP.NET Core. Each post becomes a chapter with its own page, uploaded pictures and sounds are stored under safe names, and a replaced chapter is kept so nothing can be lost.
- **The look**: this site's navy and gold, with the Lundqwist emblem on the front page. .NET 8's WinForms has no dark mode, so the program colours its own controls and asks Windows for a dark title bar and scroll bars.

## Problems solved

- **Stories cut short**: Ollama's OpenAI-compatible address can't set the model's context size, and Ollama quietly drops what doesn't fit, which would have lost most of a long journal. StoryMaker uses Ollama's own API and sizes the context to each chapter.
- **Copied sentences**: a small local model copied example sentences from the instructions word for word. The instructions now describe the tone instead of quoting it, and say what counts as a finished quest.
- **Broken paths**: in Markdown `\_` means `_`, which quietly broke Windows paths like `\_forever_\`. Pictures are written with forward slashes.
- **Keys in the wrong place**: when an API key variable held the website's token, it was sent to the AI and refused. StoryMaker now checks a key before anything leaves the PC.

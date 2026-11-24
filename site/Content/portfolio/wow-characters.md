<!-- The text on this item's portfolio page. Based on the project's README (github.com/Lundqwist/WowCharacters); edit it freely. -->

Pages for my own World of Warcraft characters, with retail and WoW: Forever as separate places: <https://lundqwist.se/wowcharacters/>.

## What it does

- **Character list** per game, one row per character with level, race, class and guild, and a button to the character's story.
- **Character page** with what the Armory knows: picture, item level, stats, gear (with Wowhead tooltips) and professions, read live from **Blizzard's official API** and kept in memory for an hour. An "Update from the Armory" button empties the cache, at most once every ten minutes per game.
- **Crafting page** for WoW: Forever: every character's professions, skill and known recipes, with materials. Recipe names from the API are matched to spell ids through recipe lists made once from Wowhead's database.
- **Stories:** each character's story is told in chapters, one Markdown file each, with pictures, captions and sound players. New chapters come from my Lunar Journal addon through [StoryMaker](/portfolio/storymaker), which posts them through a small token-protected API.

## How it is built

| Part | Technology |
|---|---|
| Server | **C# / ASP.NET Core 8**, runs under `/wowcharacters` behind this site's YARP proxy |
| Pages | Plain **HTML, CSS and JavaScript**, in the same navy and gold look as the rest of lundqwist.se |
| Game data | Blizzard's Battle.net API with **OAuth2 client credentials**, retail and Forever namespaces |
| Content | `characters.json` and Markdown story files in a data folder that deploys never touch, so edits show at once |
| Hosting | **Docker** on my Synology NAS |

The API keys live only in an environment file on the NAS; the pages never see them.

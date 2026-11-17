<!-- The text on this item's portfolio page. Based on the project's README (github.com/Lundqwist/FavoriteItems); edit it freely. -->

> Mark the items you care about with a heart, and get warned if one of them is sold.

A World of Warcraft addon for **WoW Forever** (interface 16001), written in Lua.

**[Download it on CurseForge](https://www.curseforge.com/wow/addons/favoriteitems)**

## Features

- A **Favorites** button on the lower side of the bag and bank windows. Press it, then click items to mark or unmark them; a heart appears in the icon's upper left corner.
- **Specific items, not item types**: each favorite is stored by its item GUID, so marking one copy of an item leaves the other copies alone.
- **Sold warning**: selling a favorite to a vendor shows a warning window with a **Buy back** button, a raid-warning message and a sound. Sales are detected by matching a favorite that leaves the bags with the same item showing up in the vendor's buyback list, so every way of selling is caught.
- A favorite bought back before leaving the vendor gets its heart back, even if the game gives it a new GUID.
- Item tooltips show a "Favorite" line, and `/fav` and `/fav list` work from chat.

## With and without Baganator

With the Baganator bag addon, the heart is registered as one of Baganator's icon corner widgets and the button goes into its bottom button row, both through Baganator's public plugin API:

![FavoriteItems with Baganator](/images/portfolio/favorite-items.png)

Without Baganator, the addon falls back to the default Blizzard bags and bank:

![FavoriteItems with the default bags](/images/portfolio/favorite-items-default.png)

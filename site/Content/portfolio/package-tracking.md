<!-- The text on this item's portfolio page. Based on the project's README (github.com/Lundqwist/PackageTrackingTeamBlue); edit it freely. -->

A small package tracking website built with plain **HTML, CSS and JavaScript** (no frameworks, no build step).
Type in an Order ID and see where the package is on a map, when it will arrive, and how far along its journey it has come.

**Live site:** <https://lundqwist.github.io/PackageTrackingTeamBlue/>

The design is based on the mockups in the [data/](https://github.com/Lundqwist/PackageTrackingTeamBlue/tree/main/data/) folder.

## Pages

| Page | What it does |
|------|--------------|
| [index.html](https://github.com/Lundqwist/PackageTrackingTeamBlue/blob/main/index.html) | Start page. Enter an Order ID and press **Track**. |
| [status.html](https://github.com/Lundqwist/PackageTrackingTeamBlue/blob/main/status.html) | Order status: map, estimated delivery time, current location, recipient/sender and a 4-step progress tracker. Opened as `status.html?id=SL-100234`. |
| [help.html](https://github.com/Lundqwist/PackageTrackingTeamBlue/blob/main/help.html) | Help / FAQ: how to track a package, where to find the Order ID, what to do if it is not found, what each tracking status means and whether the delivery time is guaranteed. Has a **Back to tracking** link to the start page. |

All pages have an **EN / SV** button to switch between English and Swedish, and a footer with links to **Help**, **Terms of Use**, **Contact Us** and **Privacy**.

On the start page, *Terms of Use*, *Contact Us* and *Privacy* open pop-up windows (modals). Terms and Privacy hold placeholder text (lorem ipsum); Contact Us shows the company's (made-up) address, phone and email. Close a pop-up with the **×** button or by clicking the dark area around it. On the status and help pages these three links do not do anything yet.

## How to run it

The pages load package data with `fetch()`. Browsers block `fetch()` for files opened straight from disk (`file://...`), so the site has to be served by a small web server:

- **VS Code:** install the *Live Server* extension, right-click `index.html` → **Open with Live Server**.
- **Node.js:** run `npx serve` in the project folder and open the address it prints.
- **Python:** run `python -m http.server` and open <http://localhost:8000>.

Try one of these Order IDs: `SL-100234`, `SL-100587`, `SL-101342`, `SL-102118`, `SL-102905`, `SL-103466`, `SL-104020`, `SL-104771`.

## Project structure

```
PackageTrackingTeamBlue/
├── index.html              Start page (+ the Terms / Privacy / Contact pop-ups)
├── status.html             Order status page
├── help.html               Help / FAQ page
├── LICENSE                 MIT License for the website
├── css/
│   └── style.css           All styles for all pages
├── scripts/
│   ├── packagehandling.js  Loads and searches the package data
│   ├── maptracking.js      Draws the map and the package route (Leaflet)
│   ├── language.js         English / Swedish translations (all pages)
│   ├── modals.js           Opens and closes the footer pop-ups
│   └── login.js            Login (planned, not written yet)
└── data/
    ├── packages.json             Sample package data
    ├── logo1.png                 Logo in the header and browser tab
    ├── TruckandParcels.png       Truck picture in the middle of the start page journey
    ├── package tracking logo 2.png.png  Alternative logo (not used yet)
    └── snabb *.jpg / *.png       Design mockups
```

## How it works

1. **index.html** – When you press *Track*, the page loads `data/packages.json`, searches for the ID and, if it exists, sends you to `status.html?id=<ID>`.
2. **status.html** – Reads the ID from the URL, finds the package and:
   - fills in the info fields,
   - colors the progress tracker (`done` / `current` CSS classes),
   - calls `showPackageOnMap()` to draw the route.
3. **The map** shows the sender (blue dot), the current location (orange pin) and the recipient (grey dot). A solid line shows the distance already travelled and a dashed line shows what is left.
4. **help.html** – A static page. Only `language.js` is loaded, so all its text is translated through `data-i18n` keys.
5. **The pop-ups** – The three modal windows are written at the bottom of `index.html` and start hidden (`display: none`). `modals.js` listens for clicks on the footer buttons (`termsLink`, `contactLink`, `privacyLink`) and sets the matching modal to `display: flex` to show it, and back to `none` to close it.

**Translations:** every text that should switch language has a `data-i18n="key"` attribute. To add a text, add the key to *both* the `en` and `sv` objects in [scripts/language.js](https://github.com/Lundqwist/PackageTrackingTeamBlue/blob/main/scripts/language.js). The chosen language is remembered in `localStorage`, so it stays when you move between pages.

Every file has comments explaining what the code does and why. They are written as a learning resource, so read through the code.

## The package data

The packages live in [data/packages.json](https://github.com/Lundqwist/PackageTrackingTeamBlue/blob/main/data/packages.json). JSON does not allow comments, so here is what each field means:

```jsonc
{
  "packageId": "SL-100234",                 // the Order ID the user types in
  "recipient": {                            // who receives the package
    "name": "Anna Svensson",
    "address": "Storgatan 12, 252 21 Helsingborg",
    "latitude": 56.0465, "longitude": 12.6945
  },
  "from": {                                 // the company that sent it
    "company": "Nordic Gear AB",
    "address": "Industrivägen 5, 553 02 Jönköping",
    "latitude": 57.7826, "longitude": 14.1618
  },
  "currentLocation": {                      // where the package is right now
    "name": "Ljungby",
    "latitude": 56.8333, "longitude": 13.9408
  },
  "currentStatus": "inTransit",             // warehouse | pickedUp | inTransit | collectionPoint
  "estimatedDelivery": "2026-10-21T14:00"   // ISO date and time
}
```

To add a package, copy one of the objects in the file, give it a new `packageId` and change the values. Remember the comma between objects. The data is made up.

**Tip:** to find coordinates, right-click a place in Google Maps or on openstreetmap.org. The first number is the latitude, the second is the longitude.

## Libraries, services and licenses

| What | Used for | License |
|------|----------|---------|
| [Leaflet 1.9.4](https://leafletjs.com) | Interactive map (loaded from the [unpkg](https://unpkg.com) CDN) | [BSD 2-Clause](https://github.com/Leaflet/Leaflet/blob/main/LICENSE) |
| [OpenStreetMap](https://www.openstreetmap.org) | Map data and tiles | Data: [Open Database License (ODbL) 1.0](https://opendatacommons.org/licenses/odbl/) – © OpenStreetMap contributors. Tile use follows the [OSM Tile Usage Policy](https://operations.osmfoundation.org/policies/tiles/). |
| [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (Google Fonts) | Main font on all pages | [SIL Open Font License 1.1](https://openfontlicense.org) |
| [Caveat](https://fonts.google.com/specimen/Caveat) (Google Fonts) | Handwritten-style text on the start page | [SIL Open Font License 1.1](https://openfontlicense.org) |

**What the licenses ask of us:**

- **Leaflet (BSD 2-Clause):** free to use, also commercially. If we copy Leaflet's files into the project, we must keep its copyright notice and license text.
- **OpenStreetMap (ODbL):** the map must show the credit *"© OpenStreetMap contributors"*. This is done with the `attribution` option in [scripts/maptracking.js](https://github.com/Lundqwist/PackageTrackingTeamBlue/blob/main/scripts/maptracking.js) – do not remove it. The public tile servers are for light use only; a real production site should use its own or a paid tile provider.
- **Fonts (OFL 1.1):** free to use on websites, also commercially. The fonts may not be sold on their own.

## Collaborators

Team Blue:

- Bjarne Lundqwist – [@Lundqwist](https://github.com/Lundqwist)
- John K Young – [@JohnKYoung](https://github.com/JohnKYoung)
- Malarvizhi Raju – [@Malar172](https://github.com/Malar172)
- Xinlei – [@Xinlei1126](https://github.com/Xinlei1126)
- Kimlin71 - [@Kimlin71](https://github.com/Kimlin71)

## License

The website's own code, images and mockups are made by Team Blue and released under the [MIT License](https://github.com/Lundqwist/PackageTrackingTeamBlue/blob/main/LICENSE). You may use, copy, change and share them, also commercially, as long as the copyright notice and license text are kept. The libraries, map data and fonts above keep their own licenses.

## Ideas for next steps

- Write the login in `scripts/login.js` (see the plan in the file's comment) and only show the map to logged-in users.
- Add more statuses, e.g. *Out for Delivery* and *Delivered*.
- Write real text for Terms of Use and Privacy, and make the pop-ups work on the status and help pages too.
- Move the pop-ups' inline `style="..."` into `css/style.css`.
- Translate the Help link on the start page (it is missing `data-i18n="help"`).
- Show a history list of the places the package has passed through.

<!-- The text on this item's portfolio page. Based on the project's README (github.com/Lundqwist/TvDashboard); edit it freely. -->

A Samsung Smart TV app that shows my home lab on the living-room TV: Raspberry Pi and NAS health, Pi-hole statistics, websites and services, network reachability, the hall camera, the weather and the latest news. It is the TV companion to my [Network Dashboard](/portfolio/network-dashboard).

(The camera picture is hidden in the screenshot above.)

## How it works

The app is plain **HTML, CSS and JavaScript**, packaged as a **Tizen** web app (`.wgt`). It holds no passwords or tokens. All data comes from a Network Dashboard server running as a **read-only LAN feed** in **Docker** on the Raspberry Pi: it answers only `GET` requests, and only from the TV and my PC. The TV asks it for the current state every five seconds and shows the camera through the feed's MJPEG proxy.

```
TV app ──GET /api/state──▶ Network Dashboard feed (Pi, Docker) ──▶ agents, Pi-hole, camera, news, …
```

The News panel rotates the lead headline through the top ten every twelve seconds. The feed reads the headlines from CNN's text-only site every ten minutes, since CNN's RSS feeds no longer update.

## Remote control

| Button | Action |
| --- | --- |
| ◀ ▲ ▼ ▶ | Choose a panel |
| OK | Enlarge the panel (camera full screen, more headlines, longer forecast) |
| Back | Close the enlarged panel, or exit the app |
| Red | Refresh now |

The TV's screen saver is turned off while the app is open.

## Writing for an older TV

The TV is a 2020 model (Tizen 5.5) with a browser engine from around Chrome 69, so the code avoids newer JavaScript such as `?.` and `??`. The layout is fixed at 1920×1080, and the weather icons are inline SVG, since TVs often have no colour emoji font.

Installing it meant turning on the TV's Developer Mode, creating a Samsung certificate profile that includes the TV's id, and building, signing and installing the package with the Tizen Studio command line, all wrapped in one PowerShell script.

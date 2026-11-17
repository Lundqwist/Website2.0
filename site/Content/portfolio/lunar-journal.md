<!-- The text on this item's portfolio page. Based on the project's README (github.com/Lundqwist/LunarJournal); edit it freely. -->

## What it records

For every play session, each entry with the real time and the in-game time of day:

- **Quests**: who offered them and where, the quest text, who they were handed in to, the XP and money
- **People**: the NPCs you talk to (quest givers, vendors, trainers, flight masters, innkeepers) and the players you group, trade or duel with
- **Time and distance**: running, riding, swimming, flying, in combat, as a ghost; yards covered; time in each zone
- **Professions**: time fishing, crafting and gathering, and what came of it
- **Moments**: level ups, deaths and what killed you, hearthstone trips, rare and elite kills, rare loot
- **Your own notes** with `/lj note`, which the story uses first

Chat is never recorded, and nothing leaves the game: the journal is a saved-variables file on your PC.

## How it's built

One Lua file listens to the game's events and writes a session per login, picked up again after a `/reload`. Fishing and gathering loot is tied to the cast that caused it, and long runs of the same craft or catch become one entry, so the journal stays readable. Like my other [LunarMods](/projects/lunarmods), it has its own minimap button and options page.

## A problem solved

The first version listened to the combat log, the usual way to count kills. WoW: Forever runs on the modern client, where registering the combat log is a protected action for addons, so the game blocked it. Kills are now counted from what the game does show: the target, focus, mouseover and nameplates, and whether you were on the dying unit's threat list. Values the client hides from addons are skipped instead of causing errors.

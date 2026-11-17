import { Link } from 'react-router-dom'
import { useTitle } from '../useApi.js'

// The LunarMods project page: /projects/lunarmods. One section per mod.
// Add a mod by adding an entry to "mods" (and its screenshots to
// public/images/projects/lunarmods).
const img = (file) => `/images/projects/lunarmods/${file}`

const mods = [
  {
    id: 'lunarmods',
    title: 'LunarMods',
    version: '0.3.0',
    tagline: 'One list for all my mods, one minimap button to run them.',
    gitHubUrl: 'https://github.com/Lundqwist/LunarMods',
    command: '/lm',
    paragraphs: [
      'LunarMods is the core that ties the other mods together. Type /lm or click the round LM ' +
        'button on the minimap and you get a list of every one of my mods you have installed, each ' +
        'with a tick box to switch it on or off, an Open button and an Options button. The choices ' +
        'are the same for all your characters, and the window tells you when a reload is needed.',
      'Every mod also has its own minimap button. On its options page a Link to LunarMods button ' +
        'hides that button and moves the mod into the LM button instead: its right-click menu opens ' +
        'the linked mods, and its tooltip shows what each of them has to say, such as the XP summary ' +
        'from Quest XP Tracker or the number of favorites. Unlink gives the mod its own button back.',
    ],
    points: [
      'Finds my mods by a line in their .toc file, so a new mod shows up in the list without changing LunarMods',
      'Can also load small "parts": load-on-demand addons that are only loaded when switched on, with events, saved settings and slash commands handled for them',
      'An error in one part is reported but does not stop the others',
    ],
    images: [
      { src: img('lunarmods-window.png'), alt: 'The LunarMods window with tick boxes, Open and Options buttons' },
      { src: img('lunarmods-minimap.png'), alt: 'The LM minimap button tooltip with both mods linked' },
    ],
  },
  {
    id: 'favoriteitems',
    title: 'FavoriteItems',
    version: '1.2.0',
    tagline: 'Mark items with a heart, and get them back if you sell one by mistake.',
    gitHubUrl: 'https://github.com/Lundqwist/FavoriteItems',
    portfolioSlug: 'favorite-items',
    command: '/fav',
    paragraphs: [
      'Selling the wrong item to a vendor is easy to do and annoying to fix. FavoriteItems adds a ' +
        'Favorites button to the bag and bank windows: click it, then click the items you want to ' +
        'keep, and each one gets a small heart in its corner and a "Favorite" line in its tooltip.',
      'If you sell a favorite anyway, a warning pops up with a sound and a Buy back button while ' +
        'the merchant is still open. A bought-back favorite is marked again.',
    ],
    points: [
      'Favorites are single items, not item types: each one is saved by its item GUID, so marking one copy leaves the others alone',
      'Works with Baganator (the heart is a Baganator corner widget) and falls back to the default bags and bank without it',
      'Heart minimap button: left-click to mark, hover for the number of favorites, right-click for options',
    ],
    images: [
      { src: '/images/portfolio/favorite-items.png', alt: 'Hearts on favorite items in Baganator, with the Favorites button' },
    ],
  },
  {
    id: 'questxptracker',
    title: 'Quest XP Tracker',
    version: '1.6.0',
    tagline: 'How far do my quests take me, and where are they actually done?',
    gitHubUrl: 'https://github.com/Lundqwist/WoW_Forever_QuestXPTracker',
    portfolioSlug: 'quest-xp-tracker',
    command: '/qxp',
    paragraphs: [
      'Quest XP Tracker shows the XP of every quest in your log and adds it up: an XP bar shows ' +
        'where you are now and, on top of it, where you will be once you turn in every active quest, ' +
        'with the numbers underneath. Either you have enough to level, and it says how much is left ' +
        'over, or it tells you exactly how much is missing.',
      'The quest log files a quest under the zone where you picked it up, not where you do it. ' +
        'Grouped by target area, every quest sits under the zone where most of its unfinished ' +
        'objectives are, worked out from the mobs, objects, drops and places in Questie\'s ' +
        'database. Finished quests move to where you turn them in, and the zone you are in comes first.',
    ],
    points: [
      'Switch off quests you will skip, one at a time or a whole zone at once, and they stop counting',
      'Sort by name, XP or active; fold zones; resize the window; everything is saved per character',
      'Right-click a quest for its Wowhead link, ready to copy',
      'Minimap button and a Titan Panel / LibDataBroker plugin with the XP summary',
    ],
    images: [
      { src: img('quest-xp-tracker-window.png'), alt: 'The Quest XP Tracker window with the XP bar and quests grouped by zone' },
    ],
  },
  {
    id: 'lunarjournal',
    title: 'Lunar Journal',
    version: '0.1.1',
    tagline: 'A journal of your adventures, so they can be told later.',
    gitHubUrl: 'https://github.com/Lundqwist/LunarJournal',
    portfolioSlug: 'lunar-journal',
    // its own project page, with StoryMaker, the program that turns the journal into stories
    pageUrl: '/projects/lunar-journal',
    command: '/lj',
    paragraphs: [
      'Lunar Journal quietly writes down every play session: the quests you take and who gave them, ' +
        'the people you meet, how long you run, ride, fish and craft, where you die and what killed ' +
        'you, all with the in-game time of day. /lj note adds a line of your own.',
      'The journal is the raw material for StoryMaker, a Windows program that lets an AI turn it into ' +
        'the character\'s own memories, chapter by chapter, for the story pages on this site.',
    ],
    points: [
      'Never records chat; other players only appear by name when you group, trade or duel',
      'Kills are counted from the target, focus, mouseover and nameplates, since the modern client keeps the combat log from addons',
      'Its own minimap button and options page, or a place in the LM button once linked',
    ],
    images: [],
  },
]

export default function LunarMods() {
  useTitle('LunarMods')

  return (
    <>
      <p className="breadcrumb">
        <Link to="/projects">← Projects</Link>
      </p>

      <article className="item">
        <div className="mods-head">
          <img className="mods-logo" src={img('lunarmods-logo.png')} alt="" />
          <div>
            <h1 className="page-title">LunarMods</h1>
            <span className="project-status">Ongoing</span>
          </div>
        </div>

        <p className="item-summary">
          My own addons for World of Warcraft: Forever, written in Lua. Each mod is its own addon,
          with its own repository and download, and works on its own. Together with LunarMods they
          share one list and one minimap button. All of them are open source under the MIT license.
        </p>

        <nav className="mods-toc" aria-label="The mods">
          {mods.map((mod) => (
            <a key={mod.id} href={`#${mod.id}`}>
              {mod.title}
            </a>
          ))}
        </nav>

        {mods.map((mod) => (
          <section key={mod.id} id={mod.id} className="mod">
            <div className="project-head">
              <h2 className="project-title">{mod.title}</h2>
              <span className="mod-meta">
                v{mod.version} · <code>{mod.command}</code>
              </span>
            </div>
            <p className="mod-tagline">{mod.tagline}</p>

            <div className="prose">
              {mod.paragraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
              <ul>
                {mod.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>

            {mod.images.map((image) => (
              <div key={image.src} className="item-image">
                <img src={image.src} alt={image.alt} loading="lazy" />
              </div>
            ))}

            <div className="project-links">
              <a className="button" href={mod.gitHubUrl}>
                Source on GitHub
              </a>
              {mod.portfolioSlug && (
                <Link className="button" to={`/portfolio/${mod.portfolioSlug}`}>
                  In the portfolio
                </Link>
              )}
              {mod.pageUrl && (
                <Link className="button" to={mod.pageUrl}>
                  About the project
                </Link>
              )}
            </div>
          </section>
        ))}

        <section className="mod">
          <h2 className="project-title">How they fit together</h2>
          <div className="prose">
            <p>
              Every mod carries a copy of one shared Lua file, <code>LunarLink.lua</code>, kept in
              the LunarMods repository and copied out with a script. It gives each mod its minimap
              button, its options page under the game's Options → AddOns, and the Link to LunarMods
              button. When LunarMods is installed the mod registers itself with it; when it is not,
              the link button is greyed out and the mod simply runs alone. That way a player can
              install just the one mod they want, and adding a new mod to the family takes a few
              lines in its <code>.toc</code> file and one call at login.
            </p>
          </div>
        </section>
      </article>
    </>
  )
}

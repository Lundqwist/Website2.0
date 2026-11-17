import { Link } from 'react-router-dom'
import { useTitle } from '../useApi.js'

// The LunarMods project page: /projects/lunarmods. LunarMods is the name for my
// WoW addons; one section per mod. Add a mod by adding an entry to "mods" (and its
// screenshots to public/images/projects/lunarmods).
const img = (file) => `/images/projects/lunarmods/${file}`

const mods = [
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
      'Book minimap button: left-click opens the journal, right-click the options',
    ],
    images: [],
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
          My own addons for World of Warcraft: Forever, written in Lua. Each mod is a small addon of
          its own, with its own repository, download, minimap button and options page. All of them
          are open source under the MIT license.
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
      </article>
    </>
  )
}

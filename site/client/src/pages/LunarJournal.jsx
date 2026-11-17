import { Link } from 'react-router-dom'
import { useTitle } from '../useApi.js'

// The Lunar Journal project page: /projects/lunar-journal. The WoW addon that keeps a journal,
// and StoryMaker, the Windows program that turns the journal into a character's story.
// Screenshots are in public/images/projects/lunar-journal.
const img = (file) => `/images/projects/lunar-journal/${file}`

export default function LunarJournal() {
  useTitle('Lunar Journal & StoryMaker')

  return (
    <>
      <p className="breadcrumb">
        <Link to="/projects">← Projects</Link>
      </p>

      <article className="item">
        <div className="mods-head">
          <img className="mods-logo" src={img('lunar-journal-icon.png')} alt="" />
          <div>
            <h1 className="page-title">Lunar Journal &amp; StoryMaker</h1>
            <span className="project-status">Ongoing</span>
          </div>
        </div>

        <p className="item-summary">
          A World of Warcraft: Forever addon that keeps a journal of my characters' adventures, and
          a Windows program that lets an AI turn that journal into each character's story, told by
          the character himself, many years later, remembering. Every chapter ends up on this site.
        </p>

        <nav className="mods-toc" aria-label="The parts">
          <a href="#addon">The addon</a>
          <a href="#storymaker">StoryMaker</a>
          <a href="#website">On the website</a>
        </nav>

        <section id="addon" className="mod">
          <div className="project-head">
            <h2 className="project-title">Lunar Journal, the addon</h2>
            <span className="mod-meta">
              Lua · <code>/lj</code>
            </span>
          </div>
          <p className="mod-tagline">Writes down what happens while I play, so it can be told later.</p>
          <div className="prose">
            <p>
              The addon quietly keeps a journal for every play session: which quests I took, who
              gave them to me and what they said, who I handed them in to; the people I talked to
              and the players I grouped with; how long I ran, rode, swam and flew; the time spent
              fishing, crafting and gathering and what came of it; level ups, deaths and what
              killed me. Every entry has the real time and the in-game time of day, so a story can
              say that a quest was handed in after dark.
            </p>
            <ul>
              <li>
                <code>/lj note</code> adds my own line to the journal: the one thing a log can't
                know, and the thing the story uses first
              </li>
              <li>Never records chat; other players only appear by name when we group, trade or duel</li>
              <li>
                The modern WoW client doesn't let addons read the combat log, so kills are counted
                from what the game shows: the target, focus, mouseover and nameplates
              </li>
              <li>
                Part of the <Link to="/projects/lunarmods">LunarMods</Link> family: its own minimap
                button and options page, and it can be linked to the LM button
              </li>
            </ul>
          </div>
        </section>

        <section id="storymaker" className="mod">
          <div className="project-head">
            <h2 className="project-title">StoryMaker</h2>
            <span className="mod-meta">C# · .NET 8 · WinForms</span>
          </div>
          <p className="mod-tagline">Pick a character, pick an AI, read the chapter, post it.</p>
          <div className="prose">
            <p>
              StoryMaker reads the journals the game saves, lists the play sessions that aren't in
              the story yet, and sends them to an AI together with the story so far, so each chapter
              carries on from the last. The AI writes as the character, old and looking back, and is
              told what it may add (feelings, weather, the smell of a place) and what it may not
              (quests, people or deaths that never happened). I read every chapter and can edit it
              before it's posted.
            </p>
            <ul>
              <li>
                Works with the AI of my choosing: Ollama with a model running on my own graphics
                card (free and offline, the default), Claude through Anthropic's official C# SDK,
                OpenAI, Gemini, or any OpenAI-compatible server
              </li>
              <li>
                Reads WoW's saved-variables files (Lua tables) with a small parser of its own
              </li>
              <li>
                Keys are never stored: they are read from Windows environment variables, and a key
                that clearly belongs elsewhere is refused before anything is sent
              </li>
              <li>Its icon, an old leather-bound book with a crescent moon, is drawn by a script</li>
            </ul>
          </div>
          <div className="item-image">
            <img
              src={img('storymaker.png')}
              alt="StoryMaker with a play session from the journal and the chapter written from it"
              loading="lazy"
            />
          </div>
        </section>

        <section id="website" className="mod">
          <div className="project-head">
            <h2 className="project-title">On the website</h2>
          </div>
          <div className="prose">
            <p>
              Posting goes through a small token-protected API on{' '}
              <a href="/wowcharacters/">my WoW characters pages</a>: each post becomes the next
              chapter of the character's story, the character's page lists the chapters, and every
              chapter has its own page with links to the one before and after. A chapter that is
              replaced is kept, so nothing posted can be lost.
            </p>
          </div>
          <div className="item-image">
            <img src={img('chapter-page.jpg')} alt="A chapter of a character's story on this site" loading="lazy" />
          </div>
          <div className="project-links">
            <a className="button" href="/wowcharacters/forever/chapter.html?c=gilded-gobsong&n=1">
              Read the first chapter
            </a>
            <a className="button" href="https://github.com/Lundqwist/LunarJournal">
              Source on GitHub
            </a>
          </div>
        </section>
      </article>
    </>
  )
}

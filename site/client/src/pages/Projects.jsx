import { Link } from 'react-router-dom'
import { useTitle } from '../useApi.js'
import { GitHubButton } from '../BrandButtons.jsx'

// The Projects page: things I am working on right now. Finished work goes
// on the Portfolio page instead. Add a project by adding an entry here.
const projects = [
  {
    title: 'LunarMods',
    status: 'Ongoing',
    summary:
      'My own World of Warcraft: Forever addons, written in Lua, each a small addon of its own: ' +
      'Lunar Journal writes down your adventures, Quest XP Tracker shows how far your quests take ' +
      'you and where they are done, and FavoriteItems guards the items you care about. The project ' +
      'grows as I add mods.',
    // A page of its own on this site (a route in main.jsx). Each mod has its own repository.
    pageUrl: '/projects/lunarmods',
    gitHubUrls: [
      { label: 'Lunar Journal', url: 'https://github.com/Lundqwist/LunarJournal' },
      { label: 'Quest XP Tracker', url: 'https://github.com/Lundqwist/WoW_Forever_QuestXPTracker' },
      { label: 'FavoriteItems', url: 'https://github.com/Lundqwist/FavoriteItems' },
    ],
  },
  {
    title: 'Lunar Journal & StoryMaker',
    status: 'Ongoing',
    summary:
      'A WoW: Forever addon that keeps a journal while I play: the quests and who gave them, the ' +
      'people I met, the hours spent running, fishing and crafting, and the in-game time of day. ' +
      'StoryMaker, a Windows program in C# dressed in this site\'s navy and gold, hands the journal ' +
      'to an AI of my choosing (a free model on my own graphics card, or Claude), which writes a ' +
      'chapter of the character\'s life as his own memories, years later. I edit it as Markdown, add ' +
      'screenshots from the game and sounds, and post it as the next chapter of his story here.',
    pageUrl: '/projects/lunar-journal',
    links: [
      { label: 'Read a chapter', url: '/wowcharacters/forever/chapter.html?c=gilded-gobsong&n=1' },
      { label: 'Download StoryMaker', url: 'https://github.com/Lundqwist/StoryMaker/releases/download/v1.0.0/StoryMaker-1.0.0-Setup.exe' },
    ],
    gitHubUrls: [
      { label: 'Lunar Journal', url: 'https://github.com/Lundqwist/LunarJournal' },
      { label: 'StoryMaker', url: 'https://github.com/Lundqwist/StoryMaker' },
    ],
  },
  {
    title: 'AI Workbench',
    status: 'Ongoing',
    summary:
      'A Windows program in Python (PySide6), dressed in this site\'s navy and gold, that runs AI ' +
      'entirely on my own PC with Ollama: no cloud, no API keys. It answers questions from my own ' +
      'documents with sources, turns invoice PDFs and photos into checked spreadsheet rows, writes ' +
      'cited research reports from the web, and has a voice assistant I wake with "Hey Luna", in ' +
      'English or Swedish. The assistant can run the TV, read my tasks and check my servers, and ' +
      'it asks on screen before anything more. Test suites with promptfoo keep the answers honest.',
    gitHubUrls: [{ label: 'View on GitHub', url: 'https://github.com/Lundqwist/AiProjects' }],
  },
  {
    title: 'My WoW characters',
    status: 'Ongoing',
    summary:
      'The World of Warcraft characters I play, with what the Armory knows about them: gear, ' +
      'stats and professions, read live from Blizzard\'s API. Retail and WoW: Forever are two ' +
      'different worlds, so each has its own page. The characters\' stories are told here too, in ' +
      'chapters with pictures and sounds, written with Lunar Journal and StoryMaker.',
    // Pages served by a separate app (not part of this React app), so a plain link.
    // Its start page lets the visitor choose Retail or Forever.
    links: [{ label: 'View characters', url: '/wowcharacters/' }],
    gitHubUrls: [{ label: 'View on GitHub', url: 'https://github.com/Lundqwist/WowCharacters' }],
  },
]

export default function Projects() {
  useTitle('Projects')

  return (
    <>
      <h1 className="page-title">Projects</h1>

      <ul className="project-list">
        {projects.map((project) => (
          <li key={project.title} className="project-card">
            <div className="project-head">
              <h2 className="project-title">{project.title}</h2>
              <span className="project-status">{project.status}</span>
            </div>
            <p>{project.summary}</p>
            {(project.pageUrl || project.links || project.gitHubUrls) && (
              <div className="project-links">
                {project.pageUrl && (
                  <Link className="button" to={project.pageUrl}>
                    Read more
                  </Link>
                )}
                {project.links?.map((link) => (
                  <a key={link.url} className="button" href={link.url}>
                    {link.label}
                  </a>
                ))}
                {project.gitHubUrls?.map((repo) => (
                  <GitHubButton key={repo.url} href={repo.url}>
                    {repo.label}
                  </GitHubButton>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}

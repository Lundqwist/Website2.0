import { Link } from 'react-router-dom'
import { useTitle } from '../useApi.js'

// The Projects page: things I am working on right now. Finished work goes
// on the Portfolio page instead. Add a project by adding an entry here.
const projects = [
  {
    title: 'LunarMods',
    status: 'Ongoing',
    summary:
      'My own World of Warcraft: Forever addons, written in Lua. Each mod is a small addon of its ' +
      'own that works alone: FavoriteItems guards the items you care about, Quest XP Tracker shows ' +
      'how far your quests take you. LunarMods ties them together with one list to switch them on ' +
      'and off and one minimap button to run them from. The project grows as I add mods.',
    // A page of its own on this site (a route in main.jsx)
    pageUrl: '/projects/lunarmods',
    gitHubUrl: 'https://github.com/Lundqwist/LunarMods',
  },
  {
    title: 'My WoW characters',
    status: 'Ongoing',
    summary:
      'The World of Warcraft characters I play, with what the Armory knows about them: gear, ' +
      'stats and professions, read live from Blizzard\'s API. Retail and WoW: Forever are two ' +
      'different worlds, so each has its own page. Each character will get its story here too.',
    // Pages served by a separate app (not part of this React app), so a plain link.
    // Its start page lets the visitor choose Retail or Forever.
    links: [{ label: 'View characters', url: '/wowcharacters/' }],
    gitHubUrl: 'https://github.com/Lundqwist/WowCharacters',
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
            {(project.pageUrl || project.links || project.gitHubUrl) && (
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
                {project.gitHubUrl && (
                  <a className="button" href={project.gitHubUrl}>
                    Source on GitHub
                  </a>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}

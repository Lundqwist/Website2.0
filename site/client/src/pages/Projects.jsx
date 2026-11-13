import { useTitle } from '../useApi.js'

// The Projects page: things I am working on right now. Finished work goes
// on the Portfolio page instead. Add a project by adding an entry here.
const projects = [
  {
    title: 'MoonFrame',
    status: 'In progress',
    summary:
      'A frame for small mod parts in World of Warcraft: Forever. Instead of one big addon, every ' +
      'feature is its own small part, written and tested on its own. MoonFrame finds the parts that ' +
      'are installed and loads only the ones I have switched on, so a part I do not use costs nothing. ' +
      'Written in Lua.',
    // Shown as a button once the repository is public
    gitHubUrl: null,
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
            {project.gitHubUrl && (
              <a className="button" href={project.gitHubUrl}>
                Source on GitHub
              </a>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}

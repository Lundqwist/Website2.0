import { Link } from 'react-router-dom'
import { useTitle } from '../useApi.js'

const sections = [
  { to: '/portfolio', label: 'Portfolio', image: '/images/portfolio.webp' },
  { to: '/projects', label: 'Projects', image: '/images/projects.webp' },
  { to: '/about', label: 'About', image: '/images/about.webp' },
]

// The front page: three framed pictures, one per section, and the
// Lundqwist artwork under them
export default function Home() {
  useTitle('')

  return (
    <>
      <nav className="tiles" aria-label="Sections">
        {sections.map((section) => (
          <Link key={section.to} to={section.to} className="tile">
            <span className="tile-frame">
              <img src={section.image} alt="" width="494" height="504" />
            </span>
            <span className="tile-label">{section.label}</span>
          </Link>
        ))}
      </nav>

      <img
        className="home-art"
        src="/images/lundqwist-emblem.webp"
        alt="Lundqwist, written in bronze letters among clockwork, a moon and a tree"
        width="1024"
        height="572"
      />
    </>
  )
}

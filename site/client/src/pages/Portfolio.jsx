import { Link } from 'react-router-dom'
import { useApi, useTitle } from '../useApi.js'

// The Portfolio page: a list of items from the database, each with a picture
// and a short description, linking to the item's own page.
export default function Portfolio() {
  useTitle('Portfolio')
  const { data: items, error, loading } = useApi('/api/portfolio')

  return (
    <>
      <h1 className="page-title">Portfolio</h1>

      {loading && <p className="status">Loading…</p>}
      {error && <p className="status">The portfolio could not be loaded. Try again in a moment.</p>}

      {items && (
        <ul className="portfolio-list">
          {items.map((item) => (
            <li key={item.slug}>
              <Link to={`/portfolio/${item.slug}`} className="portfolio-card">
                <span className="portfolio-card-image">
                  <img src={item.imageUrl} alt="" loading="lazy" />
                </span>
                <span className="portfolio-card-text">
                  <span className="portfolio-card-title">{item.title}</span>
                  <span className="portfolio-card-summary">{item.summary}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

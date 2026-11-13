import { Link, useParams } from 'react-router-dom'
import { useApi, useTitle } from '../useApi.js'
import NotFound from './NotFound.jsx'

// One portfolio item's own page: /portfolio/{slug}
export default function PortfolioItem() {
  const { slug } = useParams()
  const { data: item, error, loading } = useApi(`/api/portfolio/${encodeURIComponent(slug)}`)
  useTitle(item?.title ?? 'Portfolio')

  if (error === 'notfound') return <NotFound />

  return (
    <>
      <p className="breadcrumb">
        <Link to="/portfolio">← Portfolio</Link>
      </p>

      {loading && <p className="status">Loading…</p>}
      {error && <p className="status">This page could not be loaded. Try again in a moment.</p>}

      {item && (
        <article className="item">
          <h1 className="page-title">{item.title}</h1>
          <div className="item-image">
            <img src={item.imageUrl} alt="" />
          </div>
          <p className="item-summary">{item.summary}</p>

          {/* The longer text comes from the database as ready-made, cleaned HTML */}
          {item.bodyHtml && <div className="prose" dangerouslySetInnerHTML={{ __html: item.bodyHtml }} />}

          {item.linkUrl && (
            <p>
              {/* A normal link, not a React one: it leaves the React app
                  (to /v1/ or to another website) */}
              <a className="button" href={item.linkUrl}>
                {item.linkLabel || 'Take a look'}
              </a>
            </p>
          )}
        </article>
      )}
    </>
  )
}

import { useApi, useTitle } from '../useApi.js'

// The About page: the text about me and links to the CV in two languages
export default function About() {
  useTitle('About')
  const { data: about, error, loading } = useApi('/api/about')

  return (
    <>
      <h1 className="page-title">About</h1>

      {loading && <p className="status">Loading…</p>}
      {error && <p className="status">This page could not be loaded. Try again in a moment.</p>}

      {about && (
        <article className="about">
          {/* The text is written in Markdown on /v1/Admin/About; the C# app
              turns it into cleaned HTML */}
          <div className="prose" dangerouslySetInnerHTML={{ __html: about.bodyHtml }} />

          <div className="cv-links">
            {about.cvLinks.map((cv) => (
              <a key={cv.url} className="button" href={cv.url}>
                {cv.label}
              </a>
            ))}
          </div>
        </article>
      )}
    </>
  )
}

// Layout.jsx: the frame around every page: header, the page itself, footer.
import { Link, NavLink, Outlet, ScrollRestoration, useLocation } from 'react-router-dom'

// The small tree emblem in the middle of the header
function Emblem() {
  return (
    <svg className="emblem" viewBox="0 0 32 40" aria-hidden="true">
      <path d="M16 38V6" />
      <path d="M16 13c-3-1-4.500-3.500-4.500-7M16 13c3-1 4.500-3.500 4.500-7" />
      <path d="M16 20c-4.500-1-7-4-7-8.500M16 20c4.500-1 7-4 7-8.500" />
      <path d="M16 27c-5.500-1-9-4.500-9-9.500M16 27c5.500-1 9-4.500 9-9.500" />
      <path d="M16 33c-4-.500-7-2.500-8.500-5.500M16 33c4-.500 7-2.500 8.500-5.500" />
    </svg>
  )
}

export default function Layout() {
  // The home page already shows the three sections as pictures, so the
  // menu is only shown on the other pages.
  const isHome = useLocation().pathname === '/'

  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <Link to="/" className="brand">
            Lundqwist<span>.se</span>
          </Link>
          <Emblem />
          {!isHome && (
            <nav className="site-nav" aria-label="Main">
              <NavLink to="/portfolio">Portfolio</NavLink>
              <NavLink to="/projects">Projects</NavLink>
              <NavLink to="/about">About</NavLink>
            </nav>
          )}
        </div>
      </header>

      <main className="site-main">
        {/* Outlet is where the current page from main.jsx is shown */}
        <Outlet />
      </main>

      <footer className="site-footer" />

      {/* Start at the top when moving to another page */}
      <ScrollRestoration />
    </>
  )
}

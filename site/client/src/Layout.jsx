// Layout.jsx: the frame around every page: header, the page itself, footer.
import { Link, NavLink, Outlet, ScrollRestoration, useLocation } from 'react-router-dom'

// The tree-and-moon logo in the middle of the header
function Emblem() {
  return (
    <img
      className="emblem"
      src="/images/lundqwist-logo.webp"
      alt=""
      width="192"
      height="190"
    />
  )
}

// The contact links in the footer on every page.
// Icons: Bootstrap Icons 1.11.3 (https://icons.getbootstrap.com),
// © 2019-2024 The Bootstrap Authors, MIT License.
const footerLinks = [
  {
    label: 'bjarne@lundqwist.se',
    href: 'mailto:bjarne@lundqwist.se',
    icon: ['M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z'],
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/lundqwist',
    external: true,
    icon: ['M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.220-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z'],
  },
  {
    label: 'Discord: Lundqwist.se',
    href: 'https://discord.gg/MPyWVGPzwy',
    external: true,
    icon: ['M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.220.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.020.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.020.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.450.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612'],
  },
  {
    label: 'Buy me a coffee',
    href: 'https://buymeacoffee.com/lundqwist',
    external: true,
    emoji: '☕',
  },
]

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

      <footer className="site-footer">
        <ul className="footer-links">
          {footerLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
              >
                {link.emoji ? (
                  <span className="footer-icon" aria-hidden="true">{link.emoji}</span>
                ) : (
                  <svg className="footer-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                    {link.icon.map((d) => <path key={d} d={d} />)}
                  </svg>
                )}
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </footer>

      {/* Start at the top when moving to another page */}
      <ScrollRestoration />
    </>
  )
}

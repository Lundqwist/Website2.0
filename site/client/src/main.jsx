// main.jsx: where the React app starts. It lists the site's pages (routes)
// and puts the app into the <div id="root"> in index.html.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// The Raleway typeface, bundled with the site (no request to Google)
import '@fontsource/raleway/300.css'
import '@fontsource/raleway/400.css'
import '@fontsource/raleway/500.css'
import './styles.css'

import Layout from './Layout.jsx'
import Home from './pages/Home.jsx'
import Portfolio from './pages/Portfolio.jsx'
import PortfolioItem from './pages/PortfolioItem.jsx'
import Projects from './pages/Projects.jsx'
import About from './pages/About.jsx'
import NotFound from './pages/NotFound.jsx'

// Every page is shown inside Layout (the header and footer)
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/portfolio', element: <Portfolio /> },
      { path: '/portfolio/:slug', element: <PortfolioItem /> },
      { path: '/projects', element: <Projects /> },
      { path: '/about', element: <About /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

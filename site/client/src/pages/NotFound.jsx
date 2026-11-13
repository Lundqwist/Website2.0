import { Link } from 'react-router-dom'
import { useTitle } from '../useApi.js'

export default function NotFound() {
  useTitle('Page not found')
  return (
    <>
      <h1 className="page-title">Page not found</h1>
      <p className="status">
        There is nothing at this address. <Link to="/">Back to the start</Link>
      </p>
    </>
  )
}

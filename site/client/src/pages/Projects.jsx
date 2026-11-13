import { useTitle } from '../useApi.js'

// The Projects page: empty for now
export default function Projects() {
  useTitle('Projects')
  return <h1 className="page-title">Projects</h1>
}

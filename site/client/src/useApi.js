import { useEffect, useState } from 'react'

// Fetches JSON from the C# app, for example useApi('/api/portfolio').
// Returns { data, error, loading }; "error" is 'notfound' for a 404.
export function useApi(url) {
  const [state, setState] = useState({ data: null, error: null, loading: true })

  useEffect(() => {
    // If the page is left before the answer arrives, ignore the answer
    let cancelled = false
    setState({ data: null, error: null, loading: true })

    fetch(url)
      .then((response) => {
        if (response.status === 404) throw new Error('notfound')
        if (!response.ok) throw new Error('failed')
        return response.json()
      })
      .then((data) => !cancelled && setState({ data, error: null, loading: false }))
      .catch((e) => !cancelled && setState({ data: null, error: e.message, loading: false }))

    return () => {
      cancelled = true
    }
  }, [url])

  return state
}

// Sets the browser tab's title while a page is shown
export function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · Lundqwist.se` : 'Lundqwist.se'
  }, [title])
}

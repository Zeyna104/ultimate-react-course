import { useEffect, useState } from 'react'

const KEY = 'f047f37f'
export const useMovies = (query) => {
  const [, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  useEffect(() => {
    const controller = new AbortController()

    async function fetchMovies() {
      try {
        setIsLoading(true)
        setError('')
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        )
        if (!res.ok)
          throw new Error('Something went wrong with fetching movies')

        const data = await res.json()
        if (data.Response === 'False') throw new Error('Movie Not Found')
        setMovies(data.Search)
        setIsLoading(false)
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.log(err)
          setError(err.message)
        }
      } finally {
        setIsLoading(false)
      }
    }

    if (query.length < 3) {
      setMovies([])
      setError('')
      return
    }

    // callback?.()
    fetchMovies()

    return () => controller.abort()
  }, [query])

  return { movies, isLoading, error }
}

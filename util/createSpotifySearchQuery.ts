import { OpenAISongData } from './types'

const createSpotifySearchQuery = (song: OpenAISongData) => {
  const url = new URL('https://api.spotify.com/v1/search?')
  url.searchParams.append('q', `track:${song.title}`)
  url.searchParams.append('type', 'track')
  url.searchParams.append('limit', '1')
  return url.toString()
}

export default createSpotifySearchQuery

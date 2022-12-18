export type OpenAISongData = {
  artist: string
  title: string
}

export type SpotifySong = {
  uri: string
  id: string
  name: string
  artists: {
    name: string
  }[]
  album: {
    name: string
    images: {
      url: string
    }[]
  }
  external_urls: {
    spotify: string
  }
  preview_url: string
}

export type Session = {
  user: {
    accessToken: string
    sub: string
    name: string
    email: string
    picture: string
    expires_at: number
  }
}

export type Playlist = {
  id: string
  name: string
  description: string
  numSongs: number
  initialPlaylistDescription: string
  timeGenerated: number
  timeCreated: number
  songs: SpotifySong[]
}

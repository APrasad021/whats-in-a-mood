import { createContext, useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { createPlaylistName } from '../util/createPlaylistName'
import { Playlist, SpotifySong } from '../util/types'

type InitialPlaylistData = {
  text: string
}

type CreatePlaylistData = {
  playlistData: {
    name: string
    description: string
  }
  songs: string[]
}

type ContextProps = {
  generateInitialPlaylist: (playlistData: InitialPlaylistData) => void
  songs: SpotifySong[]
  createPlaylistOnSpotify: (playlistData: CreatePlaylistData) => void
  initialPlaylistDescription: string
  archiveCurrentPlaylist: () => void
  playlists: Playlist[]
  loading: boolean
  archiving: boolean
}

const SiteContext = createContext({} as ContextProps)

export const SiteContextProvider = ({ children }: any) => {
  const [playlistDescription, setPlaylistDescription] = useState<string>('')
  const [numSongs, setNumSongs] = useState<number>(0)
  const [songs, setSongs] = useState<SpotifySong[]>([])
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [playlistId, setPlaylistId] = useState<string>('')
  const [playlistName, setPlaylistName] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [archiving, setArchiving] = useState<boolean>(false)
  const [initialPlaylistDescription, setInitialPlaylistDescription] =
    useState<string>('')
  const [playListGenerateTimestamp, setPlayListGenerateTimestamp] =
    useState<number>(0)
  const [playListCreationTimestamp, setPlayListCreationTimestamp] =
    useState<number>(0)

  useEffect(() => {
    if (songs.length === 0) 
      setArchiving(false)
  }, [songs])

  const generateInitialPlaylist = async (playlistData: InitialPlaylistData) => {
    if (!loading) {
      setLoading(true)
      setInitialPlaylistDescription(playlistData.text)
      const response = await fetch('/api/playlist/init', {
        method: 'POST',
        body: JSON.stringify(playlistData),
      }).catch((error) => {
        console.log(error)
        setInitialPlaylistDescription('')
        setLoading(false)
      })
      const songs = await response?.json()
      setSongs(songs)
      setNumSongs(songs.length)
      setPlayListGenerateTimestamp(Date.now())
      setLoading(false)
    }
  }

  const createPlaylistOnSpotify = async (
    data: CreatePlaylistData,
  ): Promise<boolean> => {
    const response = await fetch('/api/playlist/upload', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    const responseData = await response.json()
    if (!responseData.id) return false
    setPlaylistId(responseData.id)
    setPlaylistDescription(data.playlistData.description)
    setNumSongs(data.songs.length)
    setPlaylistName(data.playlistData.name)
    setPlayListCreationTimestamp(Date.now())
    return true
  }

  const archiveCurrentPlaylist = () => {
    if (songs === undefined || songs.length === 0) return
    setArchiving(true)
    const playlist = {
      id: playlistId || uuidv4(),
      name:
        playlistName !== ''
          ? playlistName
          : createPlaylistName(initialPlaylistDescription),
      description: playlistDescription,
      numSongs: numSongs,
      initialPlaylistDescription: initialPlaylistDescription,
      timeGenerated: playListGenerateTimestamp,
      timeCreated: playListCreationTimestamp,
      songs,
    }
    setPlaylists([...playlists, playlist])
    setPlaylistId('')
    setPlaylistDescription('')
    setNumSongs(0)
    setPlaylistName('')
    setPlayListCreationTimestamp(0)
    setPlayListGenerateTimestamp(0)
    setSongs([])
    setInitialPlaylistDescription('')
  }

  return (
    <SiteContext.Provider
      value={{
        generateInitialPlaylist,
        songs,
        createPlaylistOnSpotify,
        initialPlaylistDescription,
        archiveCurrentPlaylist,
        playlists,
        loading,
        archiving
      }}
    >
      {children}
    </SiteContext.Provider>
  )
}

export const useSiteContext = () => useContext(SiteContext)

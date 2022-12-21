import { useRouter } from 'next/router'
import AddPlaylistButton from '../../components/AddPlaylistButton'
import GenerateAgainButton from '../../components/GenerateAgainButton'
import { useSiteContext } from '../../context/Context'
import { createPlaylistName } from '../../util/createPlaylistName'
import { Playlist } from '../../util/types'
import styles from '../../styles/Results.module.css'
import Songs from '../../components/Songs'
import Head from 'next/head'

export function Playlist() {
  const router = useRouter()
  const { id } = router.query
  const { playlists } = useSiteContext()
  const playlist = playlists.find((playlist: Playlist) => playlist.id === id)
  if (!playlist) {
    return (
      <div>
        <Head>
          <title>{"What's in a mood?"}</title>
          <meta name="description" content="Playlist not found" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>Playlist not found</h1>
      </div>
    )
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>{"What's in a mood?"}</title>
        <meta name="description" content="Viewing a playlist" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>{createPlaylistName(playlist.initialPlaylistDescription)}</h1>
      <div>
        <p>Preview the songs and add the generated playlist to your account!</p>
        <div className={styles.buttons}>
          <AddPlaylistButton songProps={playlist.songs} />
          <GenerateAgainButton />
        </div>
      </div>

      {playlist.songs && <Songs songs={playlist.songs} />}
    </div>
  )
}

export default Playlist

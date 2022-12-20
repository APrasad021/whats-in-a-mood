import { useRouter } from "next/router"
// import AddPlaylistButton from "../../components/AddPlaylistButton"
import GenerateAgainButton from "../../components/GenerateAgainButton"
import { useSiteContext } from "../../context/Context"
import { createPlaylistName } from "../../util/createPlaylistName"
import { Playlist } from "../../util/types"
import styles from "../../styles/Results.module.css"
import Songs from "../../components/Songs"


export function Playlist() {
    const router = useRouter()
    const { id } = router.query
    const { playlists } = useSiteContext()
    console.log(playlists)
    console.log();
    const playlist = playlists.find((playlist: Playlist) => playlist.id === id)
    if (!playlist) {
        return (
            <div>
                <h1>Playlist not found</h1>
            </div>
        )
    }
    return (
        <div className={styles.container}>
        <h1>{createPlaylistName(playlist.initialPlaylistDescription)}</h1>
        <div>
          <p>Preview the songs and add the generated playlist to your account!</p>
          <div className={styles.buttons}>
            {/* <AddPlaylistButton /> */}
            <GenerateAgainButton />
          </div>
        </div>
  
        {playlist.songs && <Songs songs={playlist.songs} />}
      </div>
    )

}

export default Playlist
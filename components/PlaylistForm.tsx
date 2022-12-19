import { useState } from 'react'
import { useSiteContext } from '../context/Context'
import { useRouter } from 'next/router'
import styles from '../styles/PlaylistForm.module.css'

function PlaylistForm() {
  const { generateInitialPlaylist } = useSiteContext()
  const router = useRouter()

  const [inputText, setInputText] = useState('')
  const [numSongs, setNumSongs] = useState(10)

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputText(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const playlistData = { text: inputText, numSongs: numSongs }
    generateInitialPlaylist(playlistData)
    router.push('/results')
  }

  return (
    <>
      <div>
        <h1>Generate a Playlist</h1>
        <div className={styles["form-container"]}>
          <form onSubmit={handleSubmit}>
            <label>
              Describe the playlist
              <input value={inputText} onChange={handleInputChange} className={styles.input} maxLength={50} />
            </label>
            <input type="submit" value="Submit" className={styles.submit} />
          </form>
        </div>
      </div>
    </>
  )
}

export default PlaylistForm

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
        <div className={styles["form-container"]}>
          <form onSubmit={handleSubmit}>
            <label>
              {"What's the mood? Let us know and we'll generate a playlist for you!"}
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

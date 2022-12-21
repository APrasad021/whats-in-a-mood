import { useState } from 'react'
import { useSiteContext } from '../context/Context'
import { useRouter } from 'next/router'
import styles from '../styles/PlaylistForm.module.css'

function PlaylistForm() {
  const { generateInitialPlaylist } = useSiteContext()
  const router = useRouter()

  const [inputText, setInputText] = useState('')
  const [numSongs, setNumSongs] = useState(10)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (inputText === '') return
    const playlistData = { text: inputText, numSongs: numSongs }
    generateInitialPlaylist(playlistData)
    router.push('/results')
  }

  return (
    <>
      <div>
        <div className={styles['form-container']}>
          <input
            value={inputText}
            onChange={handleInputChange}
            className={styles.input}
            maxLength={50}
            placeholder="What's the mood?"
          />
          <button onClick={handleSubmit} className={styles.submit}>
            Generate Playlist
          </button>
        </div>
      </div>
    </>
  )
}

export default PlaylistForm

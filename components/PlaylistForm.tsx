import { useState } from 'react'
import { text } from 'stream/consumers'
import { cudiSongs } from '../util/dummyData'
import parsePromptResult from '../util/parsePromptResult'
import LoginButton from './LoginButton'
import { useSiteContext } from '../context/Context'
import { useRouter } from 'next/router'

function PlaylistForm() {
  const { generateInitialPlaylist } = useSiteContext()
  const router = useRouter()

  const [textAreaText, setTextAreaText] = useState('')
  const [numSongs, setNumSongs] = useState(10)

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setTextAreaText(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const playlistData = { text: textAreaText, numSongs: numSongs }
    generateInitialPlaylist(playlistData)
    router.push('/results')
  }

  return (
    <>
      <div>
        <h1>Playlist Form</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Describe the playlist
            <textarea value={textAreaText} onChange={handleTextAreaChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
      <LoginButton />
    </>
  )
}

export default PlaylistForm

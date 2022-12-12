import { useEffect, useState } from 'react'
import styles from '../styles/AddPlaylistButton.module.css'
import { useSiteContext } from '../context/Context'
// TODO
const AddPlaylistButton = () => {
  const { createPlaylistOnSpotify, songs, initialPlaylistDescription } =
    useSiteContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [name, setPlaylistName] = useState(
    `"${initialPlaylistDescription}" Playlist`,
  )
  const [description, setDesciption] = useState('\n\nCreated with GPT-3')

  useEffect(() => {
    setPlaylistName(`"${initialPlaylistDescription}" Playlist`)
    setDesciption('\n\nCreated with GPT-3')
  }, [initialPlaylistDescription])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    let songsIds = []
    for (const song of songs) if (song.uri) songsIds.push(song.uri)
    const playlistData = {
      playlistData: {
        name: name,
        description: description.trim().replace(/\n\s*\n/g, ' • '),
      },
      songs: songsIds,
    }
    createPlaylistOnSpotify(playlistData)
  }

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDesciption(event.target.value)
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistName(event.target.value)
  }

  return (
    <>
      {isModalOpen && (
        // generate a modal here that has a form for the user to fill out
        // the form should have a text area for the user to describe the playlist
        <div className={styles.modal}>
          <div className={styles['modal-content']}>
            <div className="modal-header">
              <h2>Create a new playlist</h2>
              <button onClick={() => setIsModalOpen(false)}>X</button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <label>
                  Playlist Name
                  <input type="text" value={name} onChange={handleNameChange} />
                </label>
                <label>
                  Playlist Description
                  <textarea
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                </label>
                <button type="submit">Create Playlist</button>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="new-playlist-button">
        <button onClick={() => setIsModalOpen(true)}>
          Add Playlist to Spotify Account
        </button>
      </div>
    </>
  )
}

export default AddPlaylistButton

import { useEffect, useState } from 'react'
import styles from '../styles/AddPlaylistButton.module.css'
import { useSiteContext } from '../context/Context'
import { createPlaylistName } from '../util/createPlaylistName'
import SpotifyLogo from '../assets/spotify_logo_v1.svg'
import Image from 'next/image'
import Toastify from 'toastify-js'
import { SpotifySong } from '../util/types'

type Props = {
  songProps?: SpotifySong[] 
}
// TODO
const AddPlaylistButton = ({ songProps }: Props) => {
  const { createPlaylistOnSpotify, songs, initialPlaylistDescription } =
    useSiteContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [name, setPlaylistName] = useState(
    createPlaylistName(initialPlaylistDescription),
  )
  const [description, setDesciption] = useState('\n\nCreated on whatsinamood.com')

  useEffect(() => {
    setPlaylistName(createPlaylistName(initialPlaylistDescription))
    setDesciption('\n\nCreated on whatsinamood.com')
  }, [initialPlaylistDescription])

  const currentSongs = songProps || songs

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    let songsIds = []
    for (const song of currentSongs) if (song.uri) songsIds.push(song.uri)
    const playlistData = {
      playlistData: {
        name: name,
        description: description.trim().replace(/\n\s*\n/g, ' • '),
      },
      songs: songsIds,
    }
    const isPlaylistSaved = await createPlaylistOnSpotify(playlistData)
    // @ts-ignore
    if (isPlaylistSaved) {
      Toastify({
        text: `${name} added to your Spotify account!!`,
        duration: 3000
      }).showToast();
      setIsModalOpen(false)
    } else {
      Toastify({
        text: `Something went wrong. Please try again.`,
        duration: 3000
      }).showToast();
    }
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
            <div className={styles["modal-header"]}>
              <h2>Create a new playlist</h2>
              <button className={styles["modal-close"]} onClick={() => setIsModalOpen(false)}>X</button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <label>
                  Playlist Name
                  <input type="text" value={name} onChange={handleNameChange} className={styles.input} />
                </label>
                <label>
                  Playlist Description
                  <textarea
                    value={description}
                    onChange={handleDescriptionChange}
                    className={styles.textarea}
                  />
                </label>
                <button type="submit" className={styles.submit}>Create Playlist</button>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="new-playlist-button">
        <button onClick={() => setIsModalOpen(true)} className={styles['add-spotify-button']}>
          <div className={styles['add-spotify-button-content']}>
            <p>Add Playlist to </p>{' '}
            <Image
              alt={'spotify logo'}
              src={SpotifyLogo}
              height={20}
              width={20}
            />
          </div>
        </button>
      </div>
    </>
  )
}

export default AddPlaylistButton

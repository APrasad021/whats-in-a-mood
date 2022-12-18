import styles from '../styles/Songs.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { SpotifySong } from '../util/types'
import SpotifyLogo from '../assets/spotify_logo_v1.svg'

function Song({ song }: { song: SpotifySong }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const router = useRouter()
  var audio = useRef(new Audio(song.preview_url))

  useEffect(() => {
    if (isPlaying) {
      audio.current.play()
    } else {
      audio.current.pause()
    }
  }, [isPlaying, audio])

  const onPreviewListenClick = () => {
    setIsPlaying(!isPlaying)
  }
  const onListenClick = () => {
    router.push(song.external_urls.spotify)
  }

  return (
    <div className={styles.card}>
      <Image
        src={song.album.images[0].url}
        alt={song.album.name}
        width={300}
        height={300}
        className={styles['card__image']}
      />
      <div className={styles['card__overlay']}>
        <div className={styles['card__header']}>
          <div className={styles['card__header-text']}>
            <h3 className={styles['card__title']}>{song.name}</h3>
            <span className={styles['card__status']}>
              {song.artists[0].name}
            </span>
          </div>
        </div>
        <div className={styles['card__description']}>
          <button
            className={
              isPlaying
                ? styles['preview-button-paused']
                : styles['preview-button']
            }
            onClick={onPreviewListenClick}
          />
          <button
            className={styles['listen-spotify-button']}
            onClick={onListenClick}
          >
            <div className={styles['listen-spotify-button-content']}>
              <p>Listen on </p>{' '}
              <Image
                alt={'spotify logo'}
                src={SpotifyLogo}
                height={20}
                width={20}
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Song

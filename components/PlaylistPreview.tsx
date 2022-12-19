import Image from 'next/image'
import { timeDifference } from '../util/timeDifference'
import type { Playlist } from '../util/types'
import styles from '../styles/Playlist.module.css'

type Props = {
  playlist: Playlist
}

function PlayListPreview({ playlist }: Props) {
  const images = new Set<string>()
  playlist.songs.forEach((song) => {
    images.add(song.album.images[0].url)
  })
  // convert image set to four images in an array
  const imagePreviews = Array.from(images).slice(0, 4)
  return (
    <div className={styles['playlist-preview']}>
      <div className={styles['images']}>
        {imagePreviews.map((image: string, index: number) => (
          <Image
            key={index}
            src={image}
            alt={'Album cover'}
            width={64}
            height={64}
            className={styles['image']}
          />
        ))}
      </div>
      <div className="playlist-preview__info">
        <h2 className="playlist-preview__info__name">{playlist.name}</h2>
        <p className="playlist-preview__info__description">
          Generated{' '}
          {timeDifference(new Date(), new Date(playlist.timeGenerated))}
        </p>
      </div>
    </div>
  )
}

export default PlayListPreview

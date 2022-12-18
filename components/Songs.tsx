import { useRouter } from 'next/router'
import Image from 'next/image'
import type { SpotifySong } from '../util/types'
import styles from '../styles/Songs.module.css'
import Song from './Song'

type Props = {
  songs: SpotifySong[]
}

function Songs({ songs }: Props) {
  return (
    <div className={styles.cards}>
      {songs.map((song: SpotifySong) => {
        return <Song key={song.id} song={song} />
      })}
    </div>
  )
}

export default Songs

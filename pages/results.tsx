import Image from 'next/image'
import AddPlaylistButton from '../components/AddPlaylistButton'
import GenerateAgainButton from '../components/GenerateAgainButton'
import { useSiteContext } from '../context/Context'
import { SpotifySong } from '../util/types'

export default function Results() {
  const { songs } = useSiteContext()
  return (
    <div>
      <h1>Results</h1>
      <AddPlaylistButton />
      <GenerateAgainButton />
      {songs &&
        songs.map((song: SpotifySong) => {
          return (
            <div key={song.id}>
              <h2>{song.name}</h2>
              <h3>{song.artists[0].name}</h3>
              <Image
                src={song.album.images[0].url}
                alt={song.album.name}
                width={300}
                height={300}
              />
            </div>
          )
        })}
    </div>
  )
}

import Image from 'next/image'
import AddPlaylistButton from '../components/AddPlaylistButton'
import GenerateAgainButton from '../components/GenerateAgainButton'
import Songs from '../components/Songs'
import { useSiteContext } from '../context/Context'
import { SpotifySong } from '../util/types'

export default function Results() {
  const { songs } = useSiteContext()
  return (
    <div>
      <h1>Results</h1>
      <AddPlaylistButton />
      <GenerateAgainButton />
      {songs && <Songs songs={songs} />}
    </div>
  )
}

import { useRouter } from 'next/router'
import { useSiteContext } from '../context/Context'

export default function GenerateAgainButton() {
  const { archiveCurrentPlaylist } = useSiteContext()
  const router = useRouter()

  const handleClick = () => {
    archiveCurrentPlaylist()
    router.push('/')
  }

  return (
    <div>
      <button onClick={handleClick}>Generate New Playlist</button>
    </div>
  )
}

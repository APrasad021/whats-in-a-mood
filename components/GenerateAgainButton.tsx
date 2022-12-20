import { useRouter } from 'next/router'
import { useSiteContext } from '../context/Context'
import styles from '../styles/GenerateAgainButton.module.css'

export default function GenerateAgainButton() {
  const { archiveCurrentPlaylist } = useSiteContext()
  const router = useRouter()

  const handleClick = () => {
    router.push('/')
    archiveCurrentPlaylist()
  }

  return (
    <div>
      <button className={styles['generate-button']} onClick={handleClick}>Generate Again</button>
    </div>
  )
}

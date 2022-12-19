import { getSession } from 'next-auth/react'
import { GetServerSideProps } from 'next/types'
import AddPlaylistButton from '../components/AddPlaylistButton'
import GenerateAgainButton from '../components/GenerateAgainButton'
import Songs from '../components/Songs'
import { useSiteContext } from '../context/Context'
import styles from '../styles/Results.module.css'
import { isAuthenticated } from '../util/isAuthenticated'

export default function Results({}) {
  const { songs } = useSiteContext()
  return (
    <div className={styles.container}>
      <h1>Results</h1>
      <div>
        <p>Click on a song to add it to your Spotify playlist</p>
        <div className={styles.buttons}>
          <AddPlaylistButton />
          <GenerateAgainButton />
        </div>
      </div>
      
      {songs && <Songs songs={songs} />}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)

  if (!(await isAuthenticated(session))) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  return { props: {} }
}

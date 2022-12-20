import { getSession } from 'next-auth/react'
import { GetServerSideProps } from 'next/types'
import AddPlaylistButton from '../components/AddPlaylistButton'
import GenerateAgainButton from '../components/GenerateAgainButton'
import Songs from '../components/Songs'
import { useSiteContext } from '../context/Context'
import styles from '../styles/Results.module.css'
import { isAuthenticated } from '../util/isAuthenticated'
import { Rings } from 'react-loader-spinner';
import { createPlaylistName } from '../util/createPlaylistName'

export default function Results({ }) {
  const { loading, songs, initialPlaylistDescription } = useSiteContext()

  if (loading) return <div className={styles['loading-container']}><Rings
    height="120"
    width="120"
    color="#4fa94d"
    radius="6"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    ariaLabel="rings-loading"
  /></div>

  if (songs.length === 0) return (
    <div className={styles.container}>
      <p className={styles["no-songs-text"]}>{"Sorry, we couldn't find any songs that matched your mood."}</p>
      <div>
        <div className={styles.buttons}>
          <GenerateAgainButton />
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <h1>{createPlaylistName(initialPlaylistDescription)}</h1>
      <div>
        <p>Preview the songs and add the generated playlist to your account!</p>
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
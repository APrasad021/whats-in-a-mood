import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import PlaylistForm from '../components/PlaylistForm'
import styles from '../styles/Home.module.css'
import { isAuthenticated } from '../util/isAuthenticated'
import { useSiteContext } from '../context/Context'
import PlayListPreview from '../components/PlaylistPreview'

export default function Home({}) {
  const { playlists } = useSiteContext()

  return (
    <div className={styles.container}>
      <Head>
        <title>{"What's in a mood"}</title>
        <meta name="description" content="Generate a Spotify Playlist" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PlaylistForm />
      {playlists.length > 0 && (
        <div className={styles['playlist-container']}>
            <h2 className={styles['playlist-container__title']}>
              Previously generated playlists
            </h2>
          {playlists
            .map((playlist, index) => (
              <PlayListPreview key={index} playlist={playlist} />
            ))
            .reverse()}
        </div>
      )}
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

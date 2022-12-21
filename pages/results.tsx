import { getSession } from 'next-auth/react'
import { GetServerSideProps } from 'next/types'
import AddPlaylistButton from '../components/AddPlaylistButton'
import GenerateAgainButton from '../components/GenerateAgainButton'
import Songs from '../components/Songs'
import { useSiteContext } from '../context/Context'
import styles from '../styles/Results.module.css'
import { isAuthenticated } from '../util/isAuthenticated'
import { Rings } from 'react-loader-spinner'
import { createPlaylistName } from '../util/createPlaylistName'
import Head from 'next/head'

export default function Results({ }) {
  const { loading, songs, initialPlaylistDescription, archiving } = useSiteContext()

  if (loading)
    return (
      <div className={styles['loading-container']}>
        <Rings
          height="120"
          width="120"
          color="#8E4A67"
          radius="6"
          visible={true}
          wrapperClass={styles['spinner']}
          ariaLabel="rings-loading"
        />
        {initialPlaylistDescription && (
          <div>
            <p>{`Fetching songs matching the mood`}</p>
            <p>{`'${initialPlaylistDescription}'`}</p>
          </div>
        )}
      </div>
    )

  if (songs.length === 0 && !archiving)
    return (
      <div className={styles.container}>
        <Head>
          <title>{"What's in a mood?"}</title>
          <meta name="description" content="No results found" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <p className={styles['no-songs-text']}>
          {"Sorry, we couldn't find any songs that matched your mood."}
        </p>
        <div>
          <div className={styles.buttons}>
            <GenerateAgainButton />
          </div>
        </div>
      </div>
    )

  return (
    <div className={styles.container}>
      <Head>
        <title>{"What's in a mood?"}</title>
        <meta name="description" content="View a generated playlist" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2>{createPlaylistName(initialPlaylistDescription)}</h2>
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

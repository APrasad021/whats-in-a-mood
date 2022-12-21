import Head from 'next/head'
import LoginButton from '../components/LoginButton'
import styles from '../styles/Login.module.css'

export default function Login() {
  return (
    <div className={styles['login-content']}>
      <Head>
        <title>{"What's in a mood"}</title>
        <meta name="description" content="Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2 className={styles['login-title']}>Login</h2>
      <p className={styles['login-subtitle']}>
        In order to generate playlists, you must sign in to a Spotify account
      </p>
      <div>
        <LoginButton />
      </div>
    </div>
  )
}

import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import SpotifyLogo from "../assets/spotify_logo_v1.svg"
import styles from "../styles/Header.module.css"
import { isAuthenticated } from "../util/isAuthenticated"

function Header() {
  const session = useSession()
  if (isAuthenticated(session.data)) {
    return (
      <div className={styles["header"]}>
        <h1 className={styles["header-text"]}>{"What's in a mood?"}</h1>
        <div className={styles["sign-in-content"]}>
          <p>{session.data?.user?.name}</p>
          {/* @ts-ignore */}
          {session.data?.user?.picture && <Image src={session.data?.user?.picture} alt="logo" width={25} height={25} className={styles["spotify-pfp"]} />}
          <button className={styles['sign-out-spotify-button']} onClick={() => signOut()}>Sign out</button>
        </div>
      </div>
    )
  }
  return (
    <div className={styles["header"]}>
      <h1 className={styles["header-text"]}>{"What's in a mood?"}</h1>
      <button onClick={() => signIn('spotify', { callbackUrl: '/' })} className={styles['sign-in-spotify-button']}>
        <div className={styles['sign-in-spotify-button-content']}>
          <p>Sign in with</p>{' '}
          <Image
            alt={'spotify logo'}
            src={SpotifyLogo}
            height={20}
            width={20}
          />
        </div>
      </button>
    </div>
  )
}

export default Header

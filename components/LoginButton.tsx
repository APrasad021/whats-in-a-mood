import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import { isAuthenticated } from '../util/isAuthenticated'
import SpotifyLogo from '../assets/spotify_logo_v1.svg'
import styles from '../styles/LoginButton.module.css'

interface Props {
  center?: boolean
}

export default function LoginButton({ center = false }: Props) {
  const { data: session } = useSession()
  if (isAuthenticated(session)) {
    return (
      <button
        className={styles['sign-out-spotify-button']}
        onClick={() => signOut()}
      >
        Sign out
      </button>
    )
  }
  return (
    <button
      onClick={() => signIn('spotify', { callbackUrl: '/' })}
      className={styles['sign-in-spotify-button']}
    >
      <div className={styles['sign-in-spotify-button-content']}>
        <p>Sign in with</p>{' '}
        <Image alt={'spotify logo'} src={SpotifyLogo} height={20} width={20} />
      </div>
    </button>
  )
}

import LoginButton from '../components/LoginButton'
import styles from '../styles/Login.module.css'

export default function Login() {
  return (
    <div className={styles["login-content"]}>
      <h1>Login</h1>
      <p>In order to generate playlists, you must sign in to a Spotify account</p>
      <div><LoginButton /></div>
    </div>
    
    
  )
}

import { signIn } from 'next-auth/react'

export default function Login() {
  return (
    <div>
      <button onClick={() => signIn('spotify', { callbackUrl: '/' })}>
        Login
      </button>
    </div>
  )
}

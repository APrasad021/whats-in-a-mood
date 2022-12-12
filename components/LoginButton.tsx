import { useSession, signIn, signOut } from 'next-auth/react'

export default function LoginButton() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        {session.user && (
          <>
            <p>`Signed in as {session.user.email}`</p> <br />
          </>
        )}
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn('spotify', { callbackUrl: '/' })}>
        Sign in
      </button>
    </>
  )
}

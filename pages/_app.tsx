import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { SiteContextProvider } from '../context/Context'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <SiteContextProvider>
        <Component {...pageProps} />
      </SiteContextProvider>
    </SessionProvider>
  )
}

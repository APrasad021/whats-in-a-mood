import '../styles/globals.css'
import "toastify-js/src/toastify.css"
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { SiteContextProvider } from '../context/Context'
import Header from '../components/Header'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <SiteContextProvider>
        <Header />
        <Component {...pageProps} />
      </SiteContextProvider>
    </SessionProvider>
  )
}

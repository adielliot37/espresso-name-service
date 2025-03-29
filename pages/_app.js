import '@/styles/globals.css'
import { Orbitron } from 'next/font/google'
import ContextProvider from '@/context'
const orbitron = Orbitron({ subsets: ['latin'], weight: ['700'] })

export default function App({ Component, pageProps }) {
  return (
    <main className={orbitron.className}>
          <ContextProvider>
      <Component {...pageProps} />
      </ContextProvider>
    </main>
  )
}



import '../styles/globals.css'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Add any global initialization here
  }, [])

  return <Component {...pageProps} />
}

export default MyApp

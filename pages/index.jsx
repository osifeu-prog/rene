import Dashboard from '../components/Dashboard'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>מערכת לימוד משחקית</title>
        <meta name="description" content="לימוד מתכנת דרך משחק ואתגרים" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <main>
        <Dashboard />
      </main>
    </>
  )
}

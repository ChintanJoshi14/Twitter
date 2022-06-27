import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'
import { Tweet } from '../typings'
import { getTweets } from '../utils/getTweets'

interface Props {
  tweets: [Tweet]
}

const Home = ({ tweets }: Props) => {
  return (
    //CHANGE in overflow property
    <div className="lg:max-w-6xl mx-auto max-h-screen overflow-hidden">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Toaster />

     <main className='grid grid-cols-9'> 
     {/* //CHANGE in grid above*/}

      {/* Sidebar */}
      <Sidebar />

      {/* Feed */}
      <Feed tweets={tweets}/>

      {/* Widget */}
      <Widgets />


     </main>
    </div>
  )
}

export default Home

export const getServerSideProps:GetServerSideProps  = async (context) => {

  const tweets = await getTweets();

  return {
    props: {
      tweets,
    }
  }

}

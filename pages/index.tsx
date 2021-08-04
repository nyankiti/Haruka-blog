import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { createClient } from 'contentful'

type Props = {
  posts: any
}

export const Home = ({ posts }: Props) => {
  console.log(posts)

  return (
    <div>
      <Head>
        <title>Haruka blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-red-500">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </main>
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })

  const res = await client.getEntries({ content_type: 'post' })

  return {
    props: {
      posts: res.items,
    },
  }
}
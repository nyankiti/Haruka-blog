import { createClient } from 'contentful'
/* types */
import { Post } from '../Type'

const getAllPosts = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })

  const res = await client.getEntries({ content_type: 'post' })

  return res.items
}

export default getAllPosts
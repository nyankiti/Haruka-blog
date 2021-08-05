import { createClient } from 'contentful'
import {Tags, Count} from '../Type'


const getAllTags = async() => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })

  const res = await client.getEntries({ content_type: 'post' })

  let tags: Tags = []

  res.items.forEach((item: any) => {
    tags = tags.concat(item.fields.tags)
  })

  let count: Count = {}
  tags = Array.from(new Set(tags))

  tags.forEach((tag) => {
    count[tag] = (count[tag] || 0) + 1
  })
  return [tags, count]
}

export default getAllTags
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
    // 大文字に変換してまとめる
    let tempTags = item.fields.tags.map(tag => tag.toUpperCase())
    tags = tags.concat(tempTags)
  })

  let count: Count = {}

  tags.forEach((tag) => {
    count[tag] = (count[tag] || 0) + 1
  })

  tags = Array.from(new Set(tags))
  return {tags, count}
}

export default getAllTags
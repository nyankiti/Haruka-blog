import React from 'react'
import { createClient } from 'contentful'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
/* components */
import Skeleton from '../../components/Skeleton'
/* types */
import { Post } from '../../Type'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

const PostDetail = ({ post }) => {
  // ISRによるリビルド中に表示するページ
  if (!post) return <Skeleton />

  const { featuredImage, title, tags, contents } = post.fields

  return (
    <div>
      <div className="banner">
        <Image
          src={'https:' + featuredImage.fields.file.url}
          width={featuredImage.fields.file.details.image.width}
          height={featuredImage.fields.file.details.image.height}
        />
        <h2>{title}</h2>
      </div>

      <div className="info">
        {tags.map((ing) => (
          <span key={ing}>{ing}</span>
        ))}
      </div>

      <div className="method">
        <h3>Contents:</h3>
        <div>{documentToReactComponents(contents)}</div>
      </div>
    </div>
  )
}

export default PostDetail

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: 'post',
  })

  const paths = res.items.map((item: any) => {
    return {
      params: { slug: item.fields.slug },
    }
  })

  return {
    paths: paths,
    fallback: true,
  }
}

// export const getStaticProps: GetStaticProps = async (context) => {
//   const params = context.params

//   const res = await client.getEntries({
//     content_type: 'post',
//     'fields.slug': params.slug,
//   })

//   const items = res.items

//   return {
//     props: {
//       post: items[0],
//     },
//   }
// }
// 上のコードは以下のように省略できる
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // slugが一致するitemのみ取得する
  const { items } = await client.getEntries({
    content_type: 'post',
    'fields.slug': params.slug,
  })

  // console.log(items)

  // itemが存在しないページにアクセスされたときはredirectする
  if (!items.length) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      post: items[0],
    },
    revalidate: 10,
  }
}

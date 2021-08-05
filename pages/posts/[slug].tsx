import React from 'react'
import { createClient } from 'contentful'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import formatDate from '../../lib/utils/formatDate'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
/* components */
import Skeleton from '../../components/Skeleton'
import Tag from '../../components/Tag'
/* types */
import { Post } from '../../Type'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

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

type Props = {
  post: Post
}

const PostDetail: React.FC<Props> = ({ post }) => {
  // ISRによるリビルド中に表示するページ
  if (!post) return <Skeleton />

  const { mediaImage, title, tags, contents } = post.fields
  const date = Date.parse(post.sys.updatedAt)

  return (
    <article>
      <header>
        <div className="pb-10 space-y-1 text-center border-b border-gray-200 dark:border-gray-700">
          <dl>
            <dt className="sr-only">Published on</dt>
            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time dateTime={post.sys.updatedAt}>{formatDate(date)}</time>
            </dd>
          </dl>
          <div>
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
              {title}
            </h1>
          </div>
        </div>
      </header>
      <div className="pb-8 divide-y divide-gray-200 xl:divide-y-0 dark:divide-gray-700 ">
        <div className="banner">
          <Image
            src={'https:' + mediaImage.fields.file.url}
            width={mediaImage.fields.file.details.image.width}
            height={mediaImage.fields.file.details.image.height}
          />
          <h2>{title}</h2>
        </div>

        <div className="info">
          {tags.map((tag) => (
            <Tag key={tag} text={tag} />
          ))}
        </div>

        <div className="method">
          <div>{documentToReactComponents(contents)}</div>
        </div>
      </div>
    </article>
  )
}

export default PostDetail

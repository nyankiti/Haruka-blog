import { GetStaticPaths, GetStaticProps } from 'next'
import kebabCase from '../../lib/utils/kebabCase'
import getAllTags from '../../lib/getAllTags'
import getAllPosts from '../../lib/getAllPosts'
/* components */
import Card from '../../components/Card'
import SubTitle from '../../components/SubTitle'
/* types */
import { Post } from '../../Type'

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await getAllTags()

  const paths = res.tags.map((tag: any) => {
    return {
      params: { tag: tag },
    }
  })

  return {
    paths: paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // itemが存在しないページにアクセスされたときはredirectする
  if (!params.tag) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  const allPosts = await getAllPosts()
  const filteredPosts = allPosts.filter((post: any) => {
    return post.fields.tags.map((t) => kebabCase(t)).includes(params.tag)
  })

  const toUpperCase = (x: string | string[]) => {
    if (typeof x === 'string') {
      return x.toUpperCase()
    } else {
      return x
    }
  }

  return {
    props: {
      posts: filteredPosts,
      tag: toUpperCase(params.tag),
    },
    revalidate: 10,
  }
}

type Props = {
  posts: Post[]
  tag: string
}

const Tag = ({ posts, tag }: Props) => {
  // Capitalize first letter and convert space to dash

  return (
    <>
      <div className="divide-y">
        <SubTitle text={tag} />
        <ul>
          {typeof posts !== 'undefined' && posts.length ? (
            posts.map((post) => {
              return <Card key={post.sys.id} post={post} />
            })
          ) : (
            <h3>no such tag</h3>
          )}
        </ul>
      </div>
    </>
  )
}

export default Tag

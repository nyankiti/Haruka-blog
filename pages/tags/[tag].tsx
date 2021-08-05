import { GetStaticPaths, GetStaticProps } from 'next'
import ListLayout from '../../components/layout/ListLayout'
import kebabCase from '../../lib/utils/kebabCase'
import getAllTags from '../../lib/getAllTags'
import getAllPosts from '../../lib/getAllPosts'
/* types */
import { Post } from '../../Type'

export const getStaticPaths: GetStaticPaths = async () => {
  const [tags] = await getAllTags()

  const paths = tags.map((tag: any) => {
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
  const allPosts = await getAllPosts()
  const filteredPosts = allPosts.filter((post) => {
    // console.log(post.fields.tags.map((t) => kebabCase(t)).includes(params.tag))
    return post.fields.tags.map((t) => kebabCase(t)).includes(params.tag)
  })

  console.log(typeof allPosts)

  return {
    props: {
      posts: allPosts,
      // posts: filteredPosts,
      tag: params.tag.toUpperCase(),
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
      <ListLayout posts={posts} title={tag} pagination />
    </>
  )
}

export default Tag

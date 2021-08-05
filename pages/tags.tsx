import { siteMetadata } from '../data/siteMetadata'
import kebabCase from '../lib/utils/kebabCase'
import { createClient } from 'contentful'
import getAllTags from '../lib/getAllTags'
/* components */
import Tag from '../components/Tag'
import Link from '../components/Link'

export async function getStaticProps() {
  const res = await getAllTags()

  return {
    // countでtagsの数を集計したのでpropsで渡すtagsは重複をなくしておく
    props: {
      tags: res.tags,
      count: res.count,
    },
    revalidate: 10,
  }
}

export default function Tags({ tags, count }) {
  return (
    <>
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:justify-center md:items-center md:divide-y-0 md:flex-row md:space-x-6 md:mt-24">
        <div className="pt-6 pb-8 space-x-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 md:border-r-2 md:px-6">
            Tags
          </h1>
        </div>
        <div className="flex flex-wrap max-w-lg">
          {Object.keys(tags).length === 0 && 'No tags found.'}
          {tags.map((t) => {
            return (
              <div key={t} className="mt-2 mb-2 mr-5">
                <Tag text={t} />
                <Link
                  href={`/tags/${kebabCase(t)}`}
                  className="-ml-2 text-sm font-semibold text-gray-600 uppercase dark:text-gray-300"
                >
                  {` (${count[t]})`}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

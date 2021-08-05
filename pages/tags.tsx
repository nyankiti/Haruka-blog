import kebabCase from '../lib/utils/kebabCase'
import getAllTags from '../lib/getAllTags'
/* components */
import Tag from '../components/Tag'
import Link from '../components/Link'
import SubTitle from '../components/SubTitle'

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
        <SubTitle text="Tags" />
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

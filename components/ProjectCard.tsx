import Image from 'next/image'
import Link from './Link'
/* types */
import { Post } from '../Type'

type Props = {
  post: Post
}

const ProjectCard: React.FC<Props> = ({ post }) => {
  const { title, tiltle, slug, thumbnail, description } = post.fields

  return (
    <div className="p-4 md:w-1/2 md" style={{ maxWidth: '544px' }}>
      <div className="h-full overflow-hidden border-2 border-gray-200 rounded-md border-opacity-60 dark:border-gray-700">
        <Link href={'/posts/' + slug} aria-label={`Link to ${title}`}>
          <Image
            alt={thumbnail.fields.title}
            src={'https:' + thumbnail.fields.file.url}
            className="object-cover object-center lg:h-48 md:h-36"
            width={544}
            height={306}
          />
        </Link>
        <div className="p-6">
          <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
            <Link href={'/posts/' + slug} aria-label={`Link to ${title}`}>
              {tiltle}
            </Link>
          </h2>
          <p className="mb-3 prose text-gray-500 max-w-none dark:text-gray-400">
            {description}
          </p>
          <Link
            href={'/posts/' + slug}
            className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label={`Link to ${title}`}
          >
            Learn more &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard

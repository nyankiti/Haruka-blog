import Link from 'next/link'
import Image from 'next/image'

/* types */
import { Post } from '../Type'

type Props = {
  recipe: Post
}

export default function RecipeCard({ recipe }: Props) {
  const { title, slug, thumbnail } = recipe.fields

  return (
    <div className="card">
      <div className="featured">
        <Image
          src={'https:' + thumbnail.fields.file.url}
          width={thumbnail.fields.file.details.image.width}
          height={thumbnail.fields.file.details.image.height}
        />
      </div>
      <div className="content">
        <div className="info">
          <h4>{title}</h4>
        </div>
        <div className="actions">
          <Link href={'/posts/' + slug}>
            <a>Cook this</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

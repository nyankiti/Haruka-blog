import React from 'react'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const NotFount = () => {
  const router = useRouter()

  // 4秒後にトップページに返す
  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 4000)
  }, [])
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Oops! That page cannot be found :(</h2>
      <p>
        Redirecting to{' '}
        <Link href="/">
          <a>Homepage</a>
        </Link>{' '}
        for more marmite goodness...
      </p>
    </div>
  )
}

export default NotFount

import React from 'react'

type Props = {
  text: string
}

const SubTitle: React.FC<Props> = ({ text }) => {
  return (
    <div className="pt-6 pb-8 space-y-2 md:space-y-5">
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
        {text}
      </h1>
    </div>
  )
}

export default SubTitle

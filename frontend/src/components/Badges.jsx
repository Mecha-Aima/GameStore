import React from 'react'

const InfoBadge = ({genre}) => {
  return (
    <div className='flex flex-wrap items-center gap-4'>
      <span className='inline-block rounded-md py-1 px-2.5 text-xs text-teal-200 opacity-70 border border-teal-400'>
        {genre}
      </span>
    </div>
  )
}

export default InfoBadge

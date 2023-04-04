import React from 'react'

export default function Error({errMsg}) {
  return (
    <div className='text-danger err_class'>{errMsg}</div>
  )
}

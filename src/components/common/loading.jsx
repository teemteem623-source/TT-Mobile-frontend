import React from 'react'

export default function Loading() {
  return (
    <div>
        <img src={`${process.env.NEXT_PUBLIC_IMG_STATIC_URL}Loading_icon.gif`}/>
    </div>
  )
}

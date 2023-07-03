'use client'

import Image from 'next/image'
import { ChangeEvent, ReactNode, useState } from 'react'

export function MediaPicker({
  name,
  children,
}: {
  children: ReactNode
  name: string
}) {
  const [preview, setPreview] = useState<string | null>(null)

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files || !files.length) {
      return
    }

    const previewUrl = URL.createObjectURL(files[0])

    setPreview(previewUrl)
  }

  return (
    <>
      {preview ? (
        <Image
          width={500}
          height={500}
          src={preview}
          alt=""
          className="aspect-video h-full w-full object-cover"
        />
      ) : (
        children
      )}

      <input
        onChange={onFileSelected}
        name={name}
        id={name}
        type="file"
        accept="image/*"
        className="invisible h-0 w-0"
      />
    </>
  )
}

'use client'

import Image from 'next/image'
import { ChangeEvent, ReactNode, useState } from 'react'

interface MediaPickerProps {
  htmlFor: string
  children: ReactNode
  multiple?: boolean
}

export function MediaPicker({
  htmlFor,
  children,
  multiple = false,
}: MediaPickerProps) {
  const [preview, setPreview] = useState<string | null>(null)

  function handleSelectedFile(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files || !files.length) return

    const previewUrl = URL.createObjectURL(files[0])

    setPreview(previewUrl)
  }

  return (
    <label
      htmlFor={htmlFor}
      className="flex h-[180px] cursor-pointer items-center justify-center rounded border border-dashed text-lg transition-colors hover:border-black-500 hover:text-black-500"
    >
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
        onChange={handleSelectedFile}
        name={htmlFor}
        id={htmlFor}
        type="file"
        accept="image/*"
        className="invisible h-0 w-0"
        multiple={multiple}
      />
    </label>
  )
}

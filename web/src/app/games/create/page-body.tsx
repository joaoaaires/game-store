'use client'

import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'

import { api } from '@/lib/api'
import OperationalSystems from '@/components/game/core/operational-systems'
import ObjectResponse from '@/components/shared/core/object-response'
import Category from '@/components/game/core/category'
import { Camera } from 'lucide-react'
import { MediaPicker } from '@/components/shared/MediaPicker'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function GameBody() {
  const router = useRouter()

  async function handleCreateGame(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const uploadFormData = new FormData()
    appendFormDataUpload('header', formData.get('headerUrl'), uploadFormData)
    appendFormDataUpload('avatar', formData.get('avatarUrl'), uploadFormData)
    screens &&
      Array.from(screens).forEach((screen) => {
        appendFormDataUpload('screen', screen, uploadFormData)
      })

    const uploadResult = await api.post('/games/upload', uploadFormData)

    const response: ObjectResponse<{ type: string; url: string }[]> =
      uploadResult.data

    const { data } = response

    let body = {
      title: formData.get('title'),
      shortDescription: formData.get('shortDescription'),
      description: formData.get('description'),
      actor: formData.get('actor'),
      uurest: formData.get('uurest'),
      categories: formData.getAll('categories').map((value) => {
        return { id: parseInt(`${value}`) }
      }),
      systems: formData.getAll('systems').map((value) => {
        return { id: parseInt(`${value}`) }
      }),
      builds: [
        {
          buildNumber: 100,
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
      ],
      prices: [
        {
          price: 1.5,
        },
      ],
    }

    if (data) {
      const header = data.filter((value) => value.type === 'header')
      if (header.length) {
        body = {
          ...body,
          ...{ avatarUrl: header[0].url },
        }
      }
      const avatar = data.filter((value) => value.type === 'avatar')
      if (avatar.length) {
        body = {
          ...body,
          ...{ headerUrl: avatar[0].url },
        }
      }
      const screen = data.filter((value) => value.type === 'screen')
      if (screen.length) {
        body = {
          ...body,
          ...{
            screens: screen.map((value) => {
              return { screenUrl: value.url }
            }),
          },
        }
      }
    }

    const result = await api.post('/games', body)
    console.log(result)

    router.push('/')
  }

  function appendFormDataUpload(
    name: string,
    fileToUpload: any | null,
    uploadFormData: FormData,
  ) {
    if (fileToUpload && fileToUpload instanceof File && fileToUpload.size) {
      uploadFormData.append(name, fileToUpload)
    }
  }

  function onFileScreenSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files || !files.length) {
      return
    }

    setScreens(files)
  }

  function handleUpdateUurest(event: ChangeEvent<HTMLInputElement>) {
    let newValue = event.target.value
    newValue = newValue.replaceAll(' ', '-').toLowerCase()
    setUurest(newValue)
  }

  const [uurest, setUurest] = useState<string>('')
  const [categories, setCategories] = useState<Category[] | null | undefined>(
    [],
  )
  const [systems, setSystems] = useState<
    OperationalSystems[] | null | undefined
  >([])
  const [screens, setScreens] = useState<FileList | null | undefined>(null)

  const fetchCategories = useCallback(async () => {
    const result = await api.get('/categories')
    const response: ObjectResponse<Category[]> = result.data
    setCategories(response.data)
  }, [])

  const fetchSystems = useCallback(async () => {
    const result = await api.get('/systems')
    const response: ObjectResponse<OperationalSystems[]> = result.data
    setSystems(response.data)
  }, [])

  useEffect(() => {
    fetchCategories()
    fetchSystems()
  }, [fetchCategories, fetchSystems])

  return (
    <div className="px-52 py-4">
      <form onSubmit={handleCreateGame}>
        <div className="border-1 rounded bg-white shadow-md">
          <div className="border-b-2 px-6 py-4 font-bold">
            Create a new game
          </div>
          <div className="flex flex-row gap-x-3 px-6 py-4">
            {/* Right */}
            <div className="flex flex-1 flex-col gap-y-4 text-sm">
              <label
                htmlFor="headerUrl"
                className="flex h-[180px] cursor-pointer items-center justify-center border border-dashed border-gray-300 bg-white text-lg hover:border-gray-500"
              >
                <MediaPicker name="headerUrl">
                  <Camera className="mr-3 h-5 w-5" />
                  Upload Header Image
                </MediaPicker>
              </label>
              <div className="flex flex-col gap-y-1">
                <label className="font-semibold">Title</label>
                <input
                  name="title"
                  id="title"
                  type="text"
                  onChange={handleUpdateUurest}
                  className="rounded border-purple-500 leading-relaxed focus:ring-0"
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <label className="font-semibold">Project URL</label>
                <input
                  name="uurest"
                  id="uurest"
                  type="text"
                  defaultValue={uurest}
                  placeholder="game-to-game"
                  className="rounded border-purple-500 leading-relaxed focus:ring-0"
                  readOnly
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <label className="font-semibold">
                  Short description or tagline
                </label>
                <p>
                  Shown when link to your projetc. Avoid duplication your projet
                  s title
                </p>
                <input
                  name="shortDescription"
                  id="shortDescription"
                  type="text"
                  className="rounded border-purple-500 leading-relaxed focus:ring-0"
                />
              </div>
              <p className="py-4 text-base font-bold">Pricing</p>
              <div className="flex flex-col gap-y-1">Preço</div>
              <p className="py-4 text-base font-bold">Uploads</p>
              <div className="flex flex-col gap-y-1">
                <label
                  htmlFor="builds"
                  className="cursor-pointer self-start rounded bg-purple-500 px-2 py-2 text-base text-white transition-colors hover:bg-purple-600"
                >
                  Upload files
                  <input
                    onChange={onFileScreenSelected}
                    name="builds"
                    id="builds"
                    type="file"
                    className="invisible h-0 w-0"
                  />
                </label>
                <p className="text-xs">File size limit: 1GB.</p>
              </div>
              <p className="py-4 text-base font-bold">Details</p>
              <div className="flex flex-col gap-y-1">
                <label className="font-semibold">Description</label>
                <p>This will up the content of your game page.</p>
                <textarea
                  name="description"
                  id="description"
                  className="form-multiselect resize-none rounded border-purple-500 leading-relaxed focus:ring-0"
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <label className="font-semibold">Actor</label>
                <input
                  name="actor"
                  id="actor"
                  type="text"
                  className="rounded border-purple-500 leading-relaxed focus:ring-0"
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <label className="font-semibold">Genre</label>
                <p>
                  Select the category that best describes your game. You can
                  pick additional genres with tags below
                </p>
                <select
                  multiple
                  data-te-select-init
                  name="categories"
                  id="categories"
                  className="form-multiselect rounded border-purple-500 leading-relaxed focus:ring-0"
                >
                  {categories &&
                    categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.description}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex flex-col gap-y-1">
                <label className="font-semibold">Operational Systems</label>
                <p>
                  Select the operational systems compatible your game. You can
                  pick additional genres with tags below
                </p>
                <select
                  multiple
                  data-te-select-init
                  name="systems"
                  id="systems"
                  className="form-multiselect mb-2 rounded border-purple-500 leading-relaxed focus:ring-0"
                >
                  {systems &&
                    systems.map((system) => (
                      <option key={system.id} value={system.id}>
                        {system.description}
                      </option>
                    ))}
                </select>
              </div>
              <button
                type="submit"
                className="mr-2 inline-block self-end rounded bg-purple-500 px-5 py-3  font-medium leading-none  text-white transition-colors hover:bg-purple-600"
              >
                Log in
              </button>
            </div>

            {/* Left */}
            <div className="flex basis-1/3 flex-col gap-3 text-xs">
              <label
                htmlFor="avatarUrl"
                className="flex h-[180px] cursor-pointer items-center justify-center border border-dashed border-gray-300 bg-white text-lg hover:border-gray-500"
              >
                <MediaPicker name="avatarUrl">
                  <Camera className="mr-3 h-5 w-5" />
                  Upload Cover Image
                </MediaPicker>
              </label>
              <p className="text-justify">
                The cover image is used whenever itch.io wants to link to your
                projetc from another part of the site. Required Minimum:
                315x250, Recommended: 630x500
              </p>
              <div>
                <p className="font-bold">Screenshots</p>
                <p className="text-justify">
                  Screenshots will appear on your game s page. Optional but
                  highly recommended. Upload 3 to 5 for best results.
                </p>
              </div>
              <label
                htmlFor="screens"
                className="cursor-pointer self-start rounded bg-purple-500 px-2 py-2 text-base text-white transition-colors hover:bg-purple-600"
              >
                Add screenshots
                <input
                  onChange={onFileScreenSelected}
                  name="screens"
                  id="screens"
                  type="file"
                  accept="image/*"
                  className="invisible h-0 w-0"
                  multiple
                />
              </label>
              {screens &&
                Array.from(screens).map((screen, index) => (
                  <div key={index}>
                    <Image
                      width={500}
                      height={500}
                      src={URL.createObjectURL(screen)}
                      alt=""
                      className="aspect-video h-full w-full object-cover"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

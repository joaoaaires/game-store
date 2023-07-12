'use client'

import User from '@/util/user'
import {
  useCallback,
  useEffect,
  useState,
  ChangeEvent,
  Fragment,
  FormEvent,
} from 'react'
import Cookie from 'js-cookie'
import Game from './game/core/game'
import { api } from '@/lib/api'
import ObjectResponse from './shared/core/object-response'
import Alert from './Alert'
import { Camera, Plus } from 'lucide-react'
import { Listbox, Transition } from '@headlessui/react'
import { MediaPicker } from './MediaPicker'
import Image from 'next/image'
import Category from './game/core/category'
import OperationalSystems from './game/core/operational-systems'
import { CurrencyInput } from 'react-currency-mask'
import { AxiosError } from 'axios'
import { formatterMessageErro } from '@/util/formatter'
import { useRouter } from 'next/navigation'

interface GameUpdateProps {
  id: number
  user: User
}

export function GameUpdate({ id, user }: GameUpdateProps) {
  const router = useRouter()

  const [uurest, setUurest] = useState<string>('')
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const [systems, setSystems] = useState<OperationalSystems[]>([])
  const [selectedSystems, setSelectedSystems] = useState<OperationalSystems[]>(
    [],
  )
  const [builds, setBuilds] = useState<FileList | null>()
  const [screens, setScreens] = useState<FileList | null>()
  const [msgError, setMsgError] = useState<string | null>(null)
  const [game, setGame] = useState<Game | null | undefined>(null)
  const [error, setError] = useState<string | null | undefined>(null)

  const fetchGame = useCallback(async () => {
    try {
      const token = Cookie.get('token')
      const headers = token
        ? {
            Authorization: `${token}`,
          }
        : {}

      const result = await api.get(`/games/${id}`, { headers })
      const response: ObjectResponse<Game> = result.data
      const game = response.data
      if (game) {
        setUurest(game.uurest)
        setSelectedCategories(game.categories)
        setSelectedSystems(game.systems)
      }
      setGame(game)
    } catch (e) {
      console.log(e)
      setError('Jogo não encontrado')
    }
  }, [id])

  const fetchCategories = useCallback(async () => {
    const result = await api.get('/categories')
    const response: ObjectResponse<Category[]> = result.data
    if (response.data) setCategories(response.data)
  }, [])

  const fetchSystems = useCallback(async () => {
    const result = await api.get('/systems')
    const response: ObjectResponse<OperationalSystems[]> = result.data
    if (response.data) setSystems(response.data)
  }, [])

  useEffect(() => {
    fetchGame()
    fetchCategories()
    fetchSystems()
  }, [fetchGame, fetchCategories, fetchSystems])

  function handleUpdateUurest(event: ChangeEvent<HTMLInputElement>) {
    let newValue = event.target.value
    newValue = newValue.replaceAll(' ', '-').toLowerCase()
    setUurest(newValue)
  }

  function handleIsSelectedCategory(category: Category) {
    return selectedCategories.find((c) => c.id === category.id)
  }

  function handleSelectedCategories(categories: Category[]) {
    const duplicates = findDuplicates(categories)
    if (duplicates.length) {
      setSelectedCategories(categories.filter((c) => c.id !== duplicates[0].id))
    } else {
      setSelectedCategories(categories)
    }
  }

  function findDuplicates<Type>(arr: Type[]): Type[] {
    const duplicates: Type[] = []
    const countMap: { [key: string]: number } = {}

    for (const item of arr) {
      const stringifiedItem = JSON.stringify(item)
      countMap[stringifiedItem] = (countMap[stringifiedItem] || 0) + 1
      if (countMap[stringifiedItem] === 2) {
        duplicates.push(JSON.parse(stringifiedItem))
      }
    }

    return duplicates
  }

  function handleIsSelectedSystem(system: OperationalSystems) {
    return selectedSystems.find((s) => s.id === system.id)
  }

  function handleSelectedSystems(systems: OperationalSystems[]) {
    const duplicates = findDuplicates(systems)
    if (duplicates.length) {
      setSelectedSystems(systems.filter((c) => c.id !== duplicates[0].id))
    } else {
      setSelectedSystems(systems)
    }
  }

  function handleSelectedBuilds(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files || !files.length) {
      return
    }

    setBuilds(files)
  }

  function handleSelectedScreens(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files || !files.length) {
      return
    }

    setScreens(files)
  }

  async function handleUpdateGame(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const token = Cookie.get('token')
    const formData = new FormData(event.currentTarget)

    // formData to jsonBody
    let body = {
      title: formData.get('title'),
      uurest: formData.get('uurest'),
      shortDescription: formData.get('shortDescription'),
      description: formData.get('description'),
      actor: formData.get('actor'),
    }

    // selectedCategories to categoriesJsonBody
    body = {
      ...body,
      ...{
        categories: selectedCategories.map((value) => {
          return { id: value.id }
        }),
      },
    }

    // selectedSystems to systemsJsonBody
    body = {
      ...body,
      ...{
        systems: selectedSystems.map((value) => {
          return { id: value.id }
        }),
      },
    }

    // headerUrl to jsonBody
    const headerUrl = formData.get('headerUrl') as File | null
    body = {
      ...body,
      ...{
        headerUrl:
          headerUrl && headerUrl.name ? headerUrl.name : game?.headerUrl,
      },
    }

    // avatarUrl to jsonBody
    const avatarUrl = formData.get('avatarUrl') as File | null
    body = {
      ...body,
      ...{
        avatarUrl:
          avatarUrl && avatarUrl.name ? avatarUrl.name : game?.avatarUrl,
      },
    }

    // build to buildsJsonBody
    const buildNumber = Number(formData.get('buildNumber'))
    const buildDescription = formData.get('buildDescription')
    const buildFiles = builds
      ? Array.from(builds).map((build) => {
          return {
            buildNumber,
            description: buildDescription,
            buildUrl: build.name,
          }
        })
      : game?.builds.map((build) => {
          return {
            buildNumber,
            description: buildDescription,
            buildUrl: build.buildUrl,
          }
        })
    if (buildNumber && buildDescription && buildFiles) {
      body = {
        ...body,
        ...{
          builds: buildFiles,
        },
      }
    }

    // screens to screensJsonBody
    const screensFiles = screens
      ? Array.from(screens).map((value) => {
          return { screenUrl: value.name }
        })
      : game?.screens.map((value) => {
          return { screenUrl: value.screenUrl }
        })
    if (screensFiles) {
      body = {
        ...body,
        ...{
          screens: screensFiles,
        },
      }
    }

    // prices to pricesJsonBody
    body = {
      ...body,
      ...{
        prices: [
          {
            price: Number(
              `${formData.get('price')}`
                .replaceAll('R$', '')
                .trim()
                .replaceAll('.', '')
                .replaceAll(',', '.'),
            ),
          },
        ],
      },
    }

    // validation infos before send create router
    try {
      const validationResult = await api.post('/games/validation', body, {
        headers: {
          Authorization: `${token}`,
        },
      })
      console.log(`OK: ${validationResult !== null}`)
      setMsgError(null)
    } catch (e) {
      const { response } = e as AxiosError<ObjectResponse<null>>
      return setMsgError(formatterMessageErro(response?.data?.message))
    }

    const uploadFormData = new FormData()
    appendFormDataUpload('header', formData.get('headerUrl'), uploadFormData)
    appendFormDataUpload('avatar', formData.get('avatarUrl'), uploadFormData)
    if (screens) {
      Array.from(screens).forEach((screen) => {
        appendFormDataUpload('screen', screen, uploadFormData)
      })
    }
    if (builds) {
      Array.from(builds).forEach((build) => {
        appendFormDataUpload('build', build, uploadFormData)
      })
    }

    // update files
    try {
      const uploadResult = await api.post('/games/upload', uploadFormData, {
        headers: {
          Authorization: `${token}`,
        },
      })
      const response: ObjectResponse<{ type: string; url: string }[]> =
        uploadResult.data

      const { data } = response

      setMsgError(null)

      if (data && data.length) {
        const header = data.filter((value) => value.type === 'header')
        if (header.length) {
          body = {
            ...body,
            ...{ headerUrl: header[0].url },
          }
        }
        const avatar = data.filter((value) => value.type === 'avatar')
        if (avatar.length) {
          body = {
            ...body,
            ...{ avatarUrl: avatar[0].url },
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
        const build = data.filter((value) => value.type === 'build')
        if (build.length) {
          body = {
            ...body,
            ...{
              builds: build.map((value) => {
                return {
                  buildNumber,
                  description: buildDescription,
                  buildUrl: value.url,
                }
              }),
            },
          }
        }
      }
    } catch (e) {
      const { response } = e as AxiosError<ObjectResponse<null>>
      return setMsgError(formatterMessageErro(response?.data?.message))
    }

    // createa game
    try {
      const result = await api.put(`/games/${game?.id}`, body, {
        headers: {
          Authorization: `${token}`,
        },
      })
      console.log(`OK: ${result !== null}`)
      router.push(`/games/${formData.get('uurest')}`)
    } catch (e) {
      console.log(e)
      const { response } = e as AxiosError<ObjectResponse<null>>
      return setMsgError(formatterMessageErro(response?.data?.message))
    }
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

  if (!game) {
    return (
      <div className="flex h-full bg-black-500 lg:px-[12rem] xl:px-[22rem] 2xl:px-[28rem]">
        <div className="flex w-full items-center justify-center bg-black-800 p-4 text-white">
          Carregando...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-full bg-black-500 lg:px-[12rem] xl:px-[22rem] 2xl:px-[28rem]">
        <div className="flex w-full items-center justify-center bg-black-800 p-4 text-white">
          {error ? `${error}` : `Jogo não encontrado`}
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-auto bg-black-500 lg:px-[12rem] xl:px-[22rem] 2xl:px-[28rem]">
      <div className="flex w-full flex-col bg-black-800 p-4 text-white">
        <form className="w-full" onSubmit={handleUpdateGame}>
          {msgError && <Alert text={msgError} />}
          <div className="mb-4 text-2xl font-bold text-teal-600">
            Editar jogo
          </div>
          <div className="flex gap-x-4">
            <div className="flex basis-4/6 flex-col gap-y-3">
              <div>
                <MediaPicker htmlFor="headerUrl" url={game.headerUrl}>
                  <Camera className="mr-3 h-5 w-5" />
                  Upload imagem de capa
                </MediaPicker>
                <div className="mb-1 text-justify text-xs">
                  O campo de upload de imagem para capa do perfil permite que
                  você personalize a tela de detalhes do jogo, escolhendo fotos
                  ou ilustrações para melhor entendimento do jogo.
                </div>
              </div>
              <div>
                <div>Título</div>
                <input
                  name="title"
                  id="title"
                  type="text"
                  defaultValue={game.title}
                  onChange={handleUpdateUurest}
                  className="w-full rounded border-2 border-teal-600 text-black-800 ring-0 ring-offset-0 hover:ring-0 focus:ring-0 focus:ring-offset-0"
                />
              </div>
              <div>
                <div>URL unica do jogo</div>
                <input
                  name="uurest"
                  id="uurest"
                  type="text"
                  defaultValue={uurest}
                  placeholder="game-to-game"
                  className="w-full rounded border-2 border-teal-600 text-black-800 placeholder-black-600 ring-0 ring-offset-0 hover:ring-0 focus:ring-0 focus:ring-offset-0"
                  readOnly
                />
              </div>
              <div>
                <div>Breve descrição do jogo</div>
                <div className="mb-1 text-xs">
                  Faça uma breve descrição relacionada ao jogo, evitando repetir
                  o título.
                </div>
                <input
                  name="shortDescription"
                  id="shortDescription"
                  type="text"
                  defaultValue={game.shortDescription}
                  className="w-full rounded border-2 border-teal-600 text-black-800 placeholder-black-600 ring-0 ring-offset-0 hover:ring-0 focus:ring-0 focus:ring-offset-0"
                />
              </div>
              <div>
                <div>Descrição</div>
                <div className="mb-1 text-xs">
                  Descreva a experiência completa que o usuário pode vivenciar
                  ao jogar o jogo.
                </div>
                <textarea
                  name="description"
                  id="description"
                  defaultValue={game.description}
                  className="form-multiselect w-full rounded border-2 border-teal-600 text-black-800 placeholder-black-600 ring-0 ring-offset-0 hover:ring-0 focus:ring-0 focus:ring-offset-0"
                />
              </div>
              <div>
                <div>Ator</div>
                <input
                  name="actor"
                  id="actor"
                  type="text"
                  defaultValue={game.actor}
                  className="w-full rounded border-2 border-teal-600 text-black-800 placeholder-black-600 ring-0 ring-offset-0 hover:ring-0 focus:ring-0 focus:ring-offset-0"
                />
              </div>
              <div className="relative">
                <div>Categoria</div>
                <div className="mb-1 text-xs">
                  Selecione as categorias compatíveis com o seu jogo.
                </div>
                <Listbox
                  value={selectedCategories}
                  onChange={handleSelectedCategories}
                  multiple
                >
                  <Listbox.Button className="flex w-full flex-wrap gap-x-2 gap-y-2 rounded border-2 border-teal-600 bg-white px-3 py-2 text-start text-black-800 placeholder-black-600 ring-0 ring-offset-0 hover:ring-0 focus:ring-0 focus:ring-offset-0">
                    {selectedCategories.length
                      ? selectedCategories.map((category, index) => (
                          <div
                            key={index}
                            className="rounded bg-teal-600 px-2 py-1 text-xs font-semibold text-white"
                          >
                            {category.description}
                          </div>
                        ))
                      : 'Selecione algumas categorias'}
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded bg-white shadow-lg ring-0 ring-offset-0 hover:ring-0 focus:outline-none focus:ring-0 focus:ring-offset-0">
                      {categories.map((category) => (
                        <Listbox.Option
                          key={category.id}
                          className={({ active }) =>
                            `flex cursor-pointer px-3 py-3 ${
                              active || handleIsSelectedCategory(category)
                                ? 'bg-teal-100 font-semibold text-teal-600'
                                : 'text-black-800'
                            }`
                          }
                          value={category}
                        >
                          {category.description}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </Listbox>
              </div>
              <div className="relative">
                <div>Sistemas operacionais</div>
                <div className="mb-1 text-xs">
                  Selecione os sistemas operacionais compatíveis com o seu jogo.
                </div>
                <Listbox
                  value={selectedSystems}
                  onChange={handleSelectedSystems}
                  multiple
                >
                  <Listbox.Button className="flex w-full flex-wrap gap-x-2 gap-y-2 rounded border-2 border-teal-600 bg-white px-3 py-2 text-start text-black-800 placeholder-black-600 ring-0 ring-offset-0 hover:ring-0 focus:ring-0 focus:ring-offset-0">
                    {selectedSystems.length
                      ? selectedSystems.map((system, index) => (
                          <div
                            key={index}
                            className="rounded bg-teal-600 px-2 py-1 text-xs font-semibold text-white"
                          >
                            {system.description}
                          </div>
                        ))
                      : 'Selecione alguns sistemas operacionais'}
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded bg-white shadow-lg ring-0 ring-offset-0 hover:ring-0 focus:outline-none focus:ring-0 focus:ring-offset-0">
                      {systems.map((system) => (
                        <Listbox.Option
                          key={system.id}
                          className={({ active }) =>
                            `flex cursor-pointer px-3 py-3 ${
                              active || handleIsSelectedSystem(system)
                                ? 'bg-teal-100 font-semibold text-teal-600'
                                : 'text-black-800'
                            }`
                          }
                          value={system}
                        >
                          {system.description}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </Listbox>
              </div>
              <div>
                <div className="mb-4 font-bold">Arquivos para downloads</div>
                <div className="mb-2 flex gap-x-2 gap-y-2">
                  <div className="basis-1/4">
                    <div className="line-clamp-1">Número da versão</div>
                    <input
                      name="buildNumber"
                      id="buildNumber"
                      type="number"
                      defaultValue={game.builds[0].buildNumber}
                      className="w-full rounded border-2 border-teal-600 text-black-800 placeholder-black-600 ring-0 ring-offset-0 hover:ring-0 focus:ring-0 focus:ring-offset-0"
                      placeholder="100"
                    />
                  </div>
                  <div className="basis-3/4">
                    <div>Descrição da versão</div>
                    <input
                      name="buildDescription"
                      id="buildDescription"
                      type="text"
                      defaultValue={game.builds[0].description}
                      className="w-full rounded border-2 border-teal-600 text-black-800 placeholder-black-600 ring-0 ring-offset-0 hover:ring-0 focus:ring-0 focus:ring-offset-0"
                    />
                  </div>
                </div>
                <div className="mb-2">
                  {builds
                    ? Array.from(builds).map((build, index) => {
                        return <div key={index}>{build.name}</div>
                      })
                    : game.builds &&
                      game.builds.map((build, index) => {
                        return <div key={index}>{build.buildUrl}</div>
                      })}
                </div>
                <label
                  htmlFor="builds"
                  className="mr-2 inline-block self-end rounded bg-teal-600 px-5 py-3  font-medium leading-none  text-white transition-colors hover:bg-teal-800"
                >
                  Uploud de Arquivos
                  <input
                    onChange={handleSelectedBuilds}
                    name="builds"
                    id="builds"
                    type="file"
                    className="invisible h-0 w-0"
                    multiple
                  />
                </label>
              </div>
              <div>
                <div className="mb-4 font-bold">Preço</div>
                <CurrencyInput
                  onChangeValue={(event, originalValue, maskedValue) => {}}
                  InputElement={
                    <input
                      name="price"
                      id="price"
                      type="text"
                      className="w-full rounded border-2 border-teal-600 text-black-800 placeholder-black-600 ring-0 ring-offset-0 hover:ring-0 focus:ring-0 focus:ring-offset-0"
                      placeholder="R$ 0,00"
                    />
                  }
                />
              </div>
              <div className="h-[250px]">
                <button
                  type="submit"
                  className="mr-2 inline-block self-end rounded bg-teal-600 px-5 py-3  font-medium leading-none  text-white transition-colors hover:bg-teal-800"
                >
                  Salvar
                </button>
              </div>
            </div>
            <div className="flex basis-2/6 flex-col gap-y-3">
              <div>
                <MediaPicker htmlFor="avatarUrl" url={game.avatarUrl}>
                  <div className="flex flex-col items-center justify-center px-3 text-center">
                    <Camera className="mr-3 h-5 w-5" />
                    Upload imagem de perfil
                  </div>
                </MediaPicker>
                <div className="mb-1 text-justify text-xs">
                  O campo de upload de imagem para o perfil permite que você
                  personalize a tela de listagem dos jogos, escolhendo fotos ou
                  ilustrações para melhor entendimento do jogo.
                </div>
              </div>
              <div className="flex flex-col gap-y-3">
                <div className="flex items-center justify-between">
                  Screenshots
                  <label
                    htmlFor="screens"
                    className="flex cursor-pointer rounded bg-teal-600 px-2 py-2 text-base text-white transition-colors hover:bg-teal-800"
                  >
                    <Plus />
                    <input
                      onChange={handleSelectedScreens}
                      name="screens"
                      id="screens"
                      type="file"
                      accept="image/*"
                      className="invisible h-0 w-0"
                      multiple
                    />
                  </label>
                </div>
                {screens
                  ? Array.from(screens).map((screen, index) => (
                      <div key={index}>
                        <Image
                          width={500}
                          height={500}
                          src={URL.createObjectURL(screen)}
                          alt=""
                          className="aspect-video h-full w-full object-cover"
                        />
                      </div>
                    ))
                  : game.screens &&
                    game.screens.map((screen, index) => (
                      <div key={index}>
                        <Image
                          width={500}
                          height={500}
                          src={screen.screenUrl}
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
    </div>
  )
}

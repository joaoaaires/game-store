'use client'

import { Transition, Dialog } from '@headlessui/react'
import { DownloadCloud } from 'lucide-react'
import { Fragment, useState, useRef } from 'react'
import Game from './game/core/game'
import Image from 'next/image'
import { api } from '@/lib/api'
import Cookie from 'js-cookie'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface GameBuyProps {
  game: Game
}

export function GameBuy({ game }: GameBuyProps) {
  const [show, setShow] = useState<boolean>(false)
  const cancelButtonRef = useRef(null)
  const prices = game.prices
  const router = useRouter()

  async function handleBuyGame() {
    try {
      const token = Cookie.get('token')
      const url = `/games/${game.uurest}/buy`
      const result = await api.put(
        url,
        {},
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      )
      console.log(`OK: ${result !== null}`)
      router.push('/games/library')
    } catch (e) {
      console.log(e)
    }
  }

  if (!prices.length) {
    return (
      <div className="relative flex flex-col rounded bg-black-600 px-3 pb-6 pt-3 text-xl">
        <div>Comprar {game.title}</div>
        <div className="text-xs font-semibold uppercase">
          {game.systems.map((system) => system.description).join(', ')}
        </div>
      </div>
    )
  }

  return (
    <>
      {game.prices &&
        game.prices.map((price, index) => {
          return (
            <div
              key={index}
              className="relative flex flex-col rounded bg-black-600 px-3 pb-6 pt-3 text-xl"
            >
              <div>Comprar {game.title}</div>
              <div className="text-xs font-semibold uppercase">
                {game.systems.map((system) => system.description).join(', ')}
              </div>
              <div className="absolute right-3 top-3/4 flex gap-x-2 rounded bg-black-900 p-2">
                <div className="rounded bg-black-800 px-2 py-1 font-bold text-teal-600">
                  R$ {price.price.toFixed(2)}
                </div>
                <button
                  type="button"
                  onClick={() => setShow(true)}
                  className="cursor-pointer rounded bg-teal-600 px-3 py-1 font-semibold uppercase hover:bg-teal-700"
                >
                  {!price.paidGame ? 'COMPRAR' : 'DOWNLOAD'}
                </button>
              </div>

              {/* Modal */}
              <Transition.Root show={show} as={Fragment}>
                <Dialog
                  as="div"
                  className="relative z-10"
                  initialFocus={cancelButtonRef}
                  onClose={setShow}
                >
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-black-500 bg-opacity-75 transition-opacity" />
                  </Transition.Child>
                  <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                      <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-black-600 text-left text-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="flex flex-col gap-y-3 bg-black-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                          <div className="flex gap-x-1">
                            <div className="basis-1/3">
                              <Image
                                src={game.avatarUrl}
                                width={200}
                                height={200}
                                alt=""
                                className="object-nonen h-auto w-auto rounded"
                              />
                            </div>
                            <div className="basis-1/2">{game.title}</div>
                            <div className="basis-1/3 text-right">
                              R${' '}
                              {game.prices &&
                                game.prices.map((price, index) => {
                                  return (
                                    <span key={index}>
                                      {price.price.toFixed(2)}
                                    </span>
                                  )
                                })}{' '}
                            </div>
                          </div>
                          <div className="">
                            <p className="my-2">Files</p>
                            {game.builds &&
                              game.builds.map((build, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="flex items-center gap-x-2"
                                  >
                                    <DownloadCloud className="h-4 w-4" />
                                    {`${build.description} (Build ${build.buildNumber})`}
                                    {price.paidGame ? (
                                      <Link
                                        href={`${build.buildUrl}`}
                                        className="inline-flex w-full justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-700 sm:ml-3 sm:w-auto"
                                      >
                                        DOWNLOAD
                                      </Link>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                )
                              })}
                          </div>
                        </div>
                        <div className="bg-black-700 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                          {!price.paidGame ? (
                            <button
                              type="button"
                              className="inline-flex w-full justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-700 sm:ml-3 sm:w-auto"
                              onClick={handleBuyGame}
                            >
                              Comprar
                            </button>
                          ) : (
                            <></>
                          )}

                          <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-black-400 sm:mt-0 sm:w-auto"
                            onClick={() => setShow(false)}
                            ref={cancelButtonRef}
                          >
                            Cancelar
                          </button>
                        </div>
                      </Dialog.Panel>
                    </div>
                  </div>
                </Dialog>
              </Transition.Root>
            </div>
          )
        })}
    </>
  )
}

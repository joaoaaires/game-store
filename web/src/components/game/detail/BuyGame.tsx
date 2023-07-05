'use client'

import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Game from '../core/game'
import { DownloadCloud } from 'lucide-react'

interface BuyGameProps {
  setShowModelBuy: (option: boolean) => void
  showModelBuy: boolean
  game: Game
}

export default function BuyGame({
  game,
  showModelBuy,
  setShowModelBuy,
}: BuyGameProps) {
  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={showModelBuy} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setShowModelBuy}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="flex flex-col gap-y-3 bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <Dialog.Title
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    Buy {`'${game.title}'`}
                  </Dialog.Title>
                  <div className="rounded border p-3">
                    R${' '}
                    {game.prices &&
                      game.prices.map((price, index) => {
                        return <span key={index}>{price.price}</span>
                      })}{' '}
                    BR
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
                          </div>
                        )
                      })}
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-purple-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => setShowModelBuy(false)}
                  >
                    Buy
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setShowModelBuy(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

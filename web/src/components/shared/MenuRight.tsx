'use client'

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDown, Library, Gamepad2, LogOut } from 'lucide-react'

interface MenuRightProps {
  isDev: boolean
}

export function MenuRight({ isDev }: MenuRightProps) {
  return (
    <Menu as="div" className="relative">
      <div>
        <Menu.Button className="rounded p-2 transition-colors hover:bg-gray-200">
          <ChevronDown />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-6 w-60 rounded bg-white text-sm shadow-md ring-1 ring-black ring-opacity-5">
          <div className="flex flex-col gap-y-2 p-4">
            <Menu.Item>
              <a
                href="#"
                className="group flex flex-row items-center rounded px-2 py-2 hover:bg-gray-100"
              >
                <div className="mr-4 flex h-11 w-11 items-center justify-center rounded bg-gray-100 group-hover:bg-white">
                  <Library className="group-hover:text-purple-500" />
                </div>
                <div className="flex flex-col gap-y-1">
                  <p>My Library</p>
                  <p className="text-xs">Your games here!</p>
                </div>
              </a>
            </Menu.Item>
            {isDev && (
              <Menu.Item>
                <a
                  href="/games/create"
                  className="group flex flex-row items-center rounded px-2 py-2 hover:bg-gray-100"
                >
                  <div className="mr-4 flex h-11 w-11 items-center justify-center rounded bg-gray-100 group-hover:bg-white">
                    <Gamepad2 className="group-hover:text-purple-500" />
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <p>Create new game</p>
                    <p className="text-xs">Form game</p>
                  </div>
                </a>
              </Menu.Item>
            )}
            <Menu.Item>
              <a
                href="/api/logout"
                className="group flex flex-row items-center rounded px-2 py-2 hover:bg-gray-100"
              >
                <div className="mr-4 flex h-11 w-11 items-center justify-center rounded bg-gray-100 group-hover:bg-white">
                  <LogOut className="group-hover:text-purple-500" />
                </div>
                <div className="flex flex-col gap-y-1">
                  <p>Logout</p>
                  <p className="text-xs">Exit</p>
                </div>
              </a>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

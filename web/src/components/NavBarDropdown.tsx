import { Menu, Transition } from '@headlessui/react'
import { LucideIcon } from 'lucide-react'
import { Fragment, ReactNode } from 'react'

interface NavBarDropdownProps {
  className: string
  children: ReactNode
  items: ({
    path: string
    title: string
    subTitle: string
    icon: LucideIcon
  } | null)[]
}

export function NavBarDropdown({
  className,
  children,
  items,
}: NavBarDropdownProps) {
  return (
    <Menu as="div" className="relative">
      <div>
        <Menu.Button className={className}>{children}</Menu.Button>
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
        <Menu.Items className="absolute right-0 z-10 mt-3 w-60 rounded bg-black-600 text-sm shadow-md ring-0">
          <div className="flex flex-col gap-y-2 p-4">
            {items.map((item, index) => {
              if (!item) return <></>
              return (
                <Menu.Item key={index}>
                  <a
                    href={item.path}
                    className="group flex flex-row items-center rounded px-2 py-2 hover:bg-black-700"
                  >
                    <div className="mr-4 flex h-11 w-11 items-center justify-center rounded bg-black-800 group-hover:bg-black-800">
                      <item.icon className="group-hover:text-teal-600" />
                    </div>
                    <div className="flex flex-col gap-y-1">
                      <p>{item.title}</p>
                      <p className="text-xs">{item.subTitle}</p>
                    </div>
                  </a>
                </Menu.Item>
              )
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

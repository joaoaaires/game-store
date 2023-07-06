'use client'

import { api } from '@/lib/api'
import { Disclosure } from '@headlessui/react'
import {
  ChevronDown,
  ChevronUp,
  DollarSign,
  Star,
  ShoppingCart,
  Calendar,
  LucideIcon,
  Timer,
  GalleryVerticalEnd,
  Swords,
} from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import ObjectResponse from './shared/core/object-response'
import { useFilterGames } from '@/hooks/useFilterGames'

interface GamesFilterItem {
  icon: LucideIcon
  title: string
  setFilter: (action: string) => void
  isActive: (action: string) => boolean
  subItems:
    | {
        title: string
        action: string
        icon: LucideIcon
      }[]
    | undefined
    | null
}

export function GamesFilter() {
  const [items, setItems] = useState<GamesFilterItem[]>([])
  const { filter, setFilter } = useFilterGames()

  const fetchItems = useCallback(async () => {
    const result = await api.get('/categories')
    const response: ObjectResponse<
      {
        id: number
        description: string | null
      }[]
    > = result.data

    const categories = response.data

    const itemss: GamesFilterItem[] = [
      {
        icon: DollarSign,
        title: 'Preços',
        setFilter: (value) => {
          if (filter.price === value) {
            filter.price = undefined
          } else {
            filter.price = value
          }
          setFilter({ ...filter })
        },
        isActive: (value) => filter.price === value,
        subItems: [
          { title: 'Free', action: '0', icon: Star },
          { title: 'Até 5 reais', action: '5', icon: ShoppingCart },
          { title: 'Até 15 reais', action: '15', icon: ShoppingCart },
          { title: 'Até 20 reais', action: '20', icon: ShoppingCart },
        ],
      },
      {
        icon: Calendar,
        title: 'Data',
        setFilter: (value) => {
          if (filter.days === value) {
            filter.days = undefined
          } else {
            filter.days = value
          }
          setFilter({ ...filter })
        },
        isActive: (value) => filter.days === value,
        subItems: [
          { title: 'Hoje', action: '0', icon: Timer },
          { title: 'Última semana', action: '7', icon: Timer },
          { title: 'Últimos 30 dias', action: '30', icon: Timer },
        ],
      },
      {
        icon: GalleryVerticalEnd,
        title: 'Categoria',
        setFilter: (value) => {
          if (filter.category === value) {
            filter.category = undefined
          } else {
            filter.category = value
          }
          setFilter({ ...filter })
        },
        isActive: (value) => filter.category === value,
        subItems:
          categories &&
          categories.map((category) => {
            return {
              title: `${category.description}`,
              action: `${category.id}`,
              icon: Swords,
            }
          }),
      },
    ]
    setItems(itemss)
  }, [filter, setFilter])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  return (
    <div className="flex w-full  flex-col gap-y-4 px-4 py-4 ">
      <div className="px-3 font-semibold uppercase">Filtrar resultados</div>
      {items.map((item, index) => {
        return (
          <Disclosure key={index}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between rounded px-3 py-2 hover:bg-black-600 hover:text-white">
                  <div className="flex gap-2">
                    <item.icon />
                    <div className="font-bold">{item.title}</div>
                  </div>
                  {open ? <ChevronDown /> : <ChevronUp />}
                </Disclosure.Button>
                <Disclosure.Panel className="flex flex-col gap-y-4 px-5">
                  {item.subItems &&
                    item.subItems.map((subItem, index) => {
                      return (
                        <button
                          onClick={() => item.setFilter(subItem.action)}
                          key={index}
                          className={`flex gap-2 ${
                            item.isActive(subItem.action) ? 'text-teal-600' : ''
                          }`}
                        >
                          <subItem.icon /> {subItem.title}
                        </button>
                      )
                    })}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        )
      })}
    </div>
  )
}

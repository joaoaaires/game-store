'use client'

import { ReactNode, createContext, useState } from 'react'

interface FilterGamesContextProviderProps {
  children: ReactNode
}

export interface FilterGames {
  price?: string
  days?: string
  category?: string
}

export const FilterGamesContext = createContext<{
  filter: FilterGames
  setFilter: (value: FilterGames) => void
}>({
  filter: {},
  setFilter: (value: FilterGames) => {},
})

export function FilterGamesContextProvider({
  children,
}: FilterGamesContextProviderProps) {
  const [filter, setFilter] = useState({})

  return (
    <FilterGamesContext.Provider
      value={{
        filter,
        setFilter,
      }}
    >
      {children}
    </FilterGamesContext.Provider>
  )
}

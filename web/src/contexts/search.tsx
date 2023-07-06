'use client'

import { ReactNode, createContext, useState } from 'react'

interface SearchContextProviderProps {
  children: ReactNode
}

export const SearchContext = createContext({
  search: '',
  setSearch: (value: string) => {},
})

export function SearchContextProvider({
  children,
}: SearchContextProviderProps) {
  const [search, setSearch] = useState('')

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

import { NavBar } from '@/components/NavBar'
import './globals.css'

import { ReactNode } from 'react'
import { SearchContextProvider } from '@/contexts/search'

interface RootLayoutProps {
  children: ReactNode
}

export const metadata = {
  title: 'Game Store',
  description: 'Sale your game here!',
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <body className="flex h-screen flex-col">
        <SearchContextProvider>
          <NavBar />
          <main className="h-full">{children}</main>
        </SearchContextProvider>
      </body>
    </html>
  )
}

import { GamesFilter } from '@/components/GamesFilter'
import { GamesList } from '@/components/GamesList'
import { FilterGamesContextProvider } from '@/contexts/filterGames'

export default function Home() {
  return (
    <div className="relative h-full bg-blue-500">
      <FilterGamesContextProvider>
        <div className="absolute left-0 top-0 h-full w-2/12 bg-black-400 text-black-900">
          <GamesFilter />
        </div>
        <div className="absolute right-0 top-0 h-full w-10/12 overflow-y-scroll bg-white">
          <GamesList />
        </div>
      </FilterGamesContextProvider>
    </div>
    // <div className="flex h-screen flex-col md:flex-row ">
    //   <FilterGamesContextProvider>
    //     <div className="basis-1/2 bg-black-400 text-black-900 sm:basis-1/4 lg:basis-1/6">
    //
    //     </div>
    //     <div className="flex-1 bg-white">
    //       <GamesList />
    //     </div>
    //   </FilterGamesContextProvider>
    // </div>
  )
}

import { FilterSideBar } from '@/components/home/FilterSideBar'
import { ListGame } from '@/components/home/ListGame'
import { Header } from '@/components/shared/Header'

export default function Home() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <FilterSideBar />
        <div className="flex-auto bg-white">
          <ListGame />
        </div>
      </div>
    </div>
  )
}

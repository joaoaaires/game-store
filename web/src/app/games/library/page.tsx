import { Header } from '@/components/shared/Header'
import LibraryBody from './page-body'

export default function Library() {
  return (
    <div className="flex h-screen flex-col">
      <Header activeBrowseGames={false} activeSearch={true} />
      <LibraryBody />
    </div>
  )
}

import { useSearch } from '@/hooks/useSearch'

export function NavBarSearchInput() {
  const { search, setSearch } = useSearch()

  return (
    <input
      type="text"
      name="search"
      className="my-auto rounded border-0 bg-black-700 leading-relaxed shadow-sm placeholder:text-white focus:ring-0"
      placeholder="Pesquisar jogos"
      value={search}
      onChange={(event) => setSearch(event.target.value)}
    />
  )
}

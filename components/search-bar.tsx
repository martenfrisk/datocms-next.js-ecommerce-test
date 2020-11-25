import { useState } from 'react'
import Link from 'next/link'
import Search from '@carbon/icons-react/lib/search/32'
import { list } from '@/lib/searchlist'

export default function SearchBar() {
  const [searchResults, setSearchResults] = useState([])
  const [showSearch, setShowSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <>
      <Search className="cursor-pointer justify-self-start " onClick={() => setShowSearch((prev) => !prev)} />
      {showSearch
        && (
        <div className="flex flex-col">
          <input
            className="w-full px-2 mb-2 text-blue-700 bg-transparent border-b border-blue-600 sm:mb-0 sm:w-auto sm:ml-2 sm:mr-3 focus:outline-none"
            type="text"
            value={searchTerm}
            onChange={async (e) => {
              const { value } = e.currentTarget
              const FuzzySearch = (await import('fuzzy-search')).default
              const searcher = new FuzzySearch(list, [
                'productName',
                'description',
                'descriptionShort',
              ], {
                sort: true,
              })
              setSearchTerm(() => value)
              if (value !== '') {
                setSearchResults(searcher.search(value))
              } else {
                setSearchResults([])
              }
            }}
          />
          {searchResults.length > 0 && (
            <div className="absolute z-20 flex flex-col px-4 py-4 mt-10 space-y-4 bg-white shadow-md bg-opacity-95">
              {searchResults !== [] && searchResults.slice(0, 5).map((hit) => (
                <div className="underline" key={hit.slug}>
                  <Link href={`/products/${hit.slug}`}>
                    <>
                      {hit.productName}
                      {hit.subname && `: ${hit.subname}`}
                    </>
                  </Link>
                </div>
              ))}
              {searchTerm !== '' && (
                <div className="text-sm italic">
                  <Link href={`/search${searchTerm !== '' && `?${searchTerm}`}`}>
                    More results
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
        )}
    </>
  )
}

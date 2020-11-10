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
      <Search className="justify-self-start cursor-pointer " onClick={() => setShowSearch((prev) => !prev)} />
      {showSearch
        && (
        <div className="flex flex-col">
          <input
            className="border-b mb-2 sm:mb-0 w-full sm:w-auto sm:ml-2 sm:mr-3 px-2 focus:outline-none border-blue-600 text-blue-700"
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
            <div className="bg-white z-20 bg-opacity-95 shadow-md px-4 py-4 absolute flex mt-10 flex-col space-y-4">
              {searchResults !== [] && searchResults.slice(0, 5).map((hit) => (
                <div className="underline">
                  <Link href={`/products/${hit.slug}`}>
                    {hit.productName}
                  </Link>
                </div>
              ))}
              {searchTerm !== '' && (
                <div className="italic text-sm">
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

'use client'

import { InstantSearch, Hits, SearchBox as InstantSearchBox, Highlight } from "react-instantsearch";
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { Hit as AlgoliaHit } from 'instantsearch.js';
import Link from "next/link";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY as string,
);

export function SearchBox() {
  return (
    <InstantSearch indexName="hymns_index" searchClient={searchClient}>
      <div className="relative">
        <InstantSearchBox
          classNames={{
            root: 'w-full bg-white border-b border-b-gray-200',
            input: 'bg-gray-50 p-2 px-4 w-full focus:outline-none',
            loadingIndicator: 'absolute right-10 top-1/2 transform -translate-y-1/2',
            reset: 'p-[14px] bg-gray-50 absolute right-0 top-1/2 transform -translate-y-1/2',
            submitIcon: 'hidden',
          }}
          placeholder="Tìm kiếm theo tên hoặc nội dung bài hát"
        />
        <Hits
          classNames={{
            root: 'absolute bg-white max-h-[calc(100dvh-40px)] overflow-y-auto shadow border-b-gray-300'
          }}
          hitComponent={Hit}
          transformItems={(items, { results }) => {
            if (!results?.query || results.query.trim() === '') {
              return [];
            }
            return items
          }}
          escapeHTML
        />
      </div>
    </InstantSearch>
  )
}

type HitProps = {
  hit: AlgoliaHit<{
    name: string
    category: string
    content: string
    slug: string
    collection: string
  }>
}

function Hit({ hit }: HitProps) {
  return (
    <Link
      href={`/${hit.collection}/${hit.slug}`}
      className="block px-4 py-2 border-b border-b-gray-200 hover:bg-gray-100"
      onClick={() => {
        const searchForm = document.querySelector('.ais-SearchBox-form') as HTMLFormElement
        searchForm.reset()
      }}
    >
      <div>
        <div className="mb-0.5 text-sm text-gray-600 space-x-4">
          <span>{hit.collection === 'hymns' ? 'Thánh Ca' : 'Tôn Vinh Chúa Hằng Hữu'}</span>
          {hit.category && <span>Phân loại: {hit.category}</span>}
        </div>
        <Highlight
          classNames={{
            root: 'font-semibold text-gray-800 text-lg',
            highlighted: 'bg-emerald-400'
          }}
          hit={hit}
          attribute="name"
        />
        <div>
          <Highlight
            classNames={{
              root: 'text-md',
              highlighted: 'bg-emerald-400'
            }}
            hit={hit}
            attribute="content"
          />
        </div>
      </div>
    </Link>
  )
}

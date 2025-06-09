'use client'

import { InstantSearch, Hits, SearchBox as InstantSearchBox, Highlight } from "react-instantsearch";
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { Hit as AlgoliaHit } from 'instantsearch.js';
import Link from "next/link";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY as string,
);

type HitProps = {
  hit: AlgoliaHit<{
    name: string
    category: string
    content: string
    slug: string
    collection: string
  }>
}

export function SearchBox() {
  return (
    <div className="relative">
      <InstantSearch indexName="hymns_index" searchClient={searchClient}>
        <InstantSearchBox
          classNames={{
            root: 'w-full bg-white border-b border-b-gray-200',
            input: 'p-2 px-4 w-full focus:outline-none',
            loadingIcon: 'hidden',
            resetIcon: 'hidden',
            submitIcon: 'hidden'
          }}
          placeholder="Tìm kiếm theo tên hoặc nội dung bài hát"
        />
        <Hits
          classNames={{
            root: 'absolute bg-white h-[calc(100dvh-40px)] overflow-y-auto shadow border-b-gray-300'
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
      </InstantSearch>
    </div>
  )
}

function Hit({ hit }: HitProps) {
  return (
    <Link
      href={`/${hit.collection}/${hit.slug}`}
      className="block px-4 py-2 border-b border-b-gray-200 hover:bg-gray-100"
      onClick={() => {
        // close search box
        const searchBox = document.querySelector('.ais-SearchBox-input') as HTMLInputElement
        searchBox.blur()
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
          highlightedTagName="em"
        />
        <div>
          <Highlight
            classNames={{
              root: 'text-md',
              highlighted: 'bg-emerald-400'
            }}
            hit={hit}
            attribute="content"
            highlightedTagName="em"
          />
        </div>
      </div>
    </Link>
  )
}

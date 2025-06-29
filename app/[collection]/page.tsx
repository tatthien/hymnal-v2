import Link from "next/link"
import { getSongs } from "../hymns"
import { COLLECTION_MAP } from "@/constants"
import { notFound } from "next/navigation"
import { Collection } from "@/types"

type Params = Promise<{ collection: Collection }>

export default async function HymnsPage({ params }: { params: Params }) {
  const { collection } = await params

  try {
    const hymns = await getSongs(collection)
    return (
      <div>
        {hymns.map((hymn) => (
          <Link
            key={hymn.slug}
            href={`/${collection}/${hymn.slug}`}
            prefetch={true}
            className="hover:underline"
          >
            <article >
              <h2 className="tabular-nums">{hymn.name}</h2>
            </article>
          </Link>
        ))}
      </div>
    )
  } catch (err) {
    console.error(err)
    return notFound()
  }
}

export async function generateStaticParams() {
  return Object.keys(COLLECTION_MAP).map((collection) => ({ collection }))
}

export async function generateMetadata({ params }: { params: Params }) {
  const { collection } = await params

  return {
    title: `${COLLECTION_MAP[collection].title}`,
  }
}

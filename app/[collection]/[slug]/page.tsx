import { getSongs } from "@/app/hymns"
import { COLLECTION_MAP } from "@/constants"
import { Collection } from "@/types"
import { readFile } from "fs/promises"
import matter from 'gray-matter'
import Link from "next/link"
import { notFound } from "next/navigation"

type Params = Promise<{ collection: Collection, slug: string }>

export default async function HymnPage({ params }: { params: Params }) {
  const { collection, slug } = await params
  const filename = `./assets/songs/${collection}/${slug}.md`

  try {
    const fileContent = await readFile(filename, { encoding: 'utf-8' })
    const { content, data } = matter(fileContent)
    return (
      <article className="hymn-details">
        <div className="text-xl font-medium">{COLLECTION_MAP[collection].title}</div>
        <h1 className='text-2xl font-bold'>{data.name}</h1>
        <div className="mb-6">
          <Link href='#' className="text-sm">
            {data.category}
          </Link>
        </div>
        <div className="text-lg" dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    )
  } catch (err) {
    console.error(err)
    return notFound()
  }

}

export async function generateStaticParams() {
  const collections = Object.keys(COLLECTION_MAP)
  const params: { collection: string, slug: string }[] = []

  for (const collection of collections) {
    const songs = await getSongs(collection)
    for (const { slug } of songs) {
      params.push({ collection, slug })
    }
  }

  return params
}

export async function generateMetadata({ params }: { params: Params }) {
  const { collection, slug } = await params
  const filename = `./assets/songs/${collection}/${slug}.md`
  const fileContent = await readFile(filename, { encoding: 'utf-8' })
  const { data } = matter(fileContent)

  return {
    title: `${COLLECTION_MAP[collection].title}: ${data.name}`,
  }
}


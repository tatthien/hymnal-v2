import { getSongs } from "@/app/hymns"
import { readFile } from "fs/promises"
import matter from 'gray-matter'
import Link from "next/link"

type Params = Promise<{ slug: string }>

export default async function HymnPage({ params }: { params: Params }) {
  const { slug } = await params
  const filename = `./public/tvchh/${slug}.md`
  const fileContent = await readFile(filename, { encoding: 'utf-8' })
  const { content, data } = matter(fileContent)

  return (
    <article className="hymn-details">
      <div className="text-xl font-bold text-gray-400">Tôn Vinh Chúa Hằng Hữu</div>
      <h1 className='text-2xl font-bold'>{data.name}</h1>
      <div className="mb-6">
        <Link href='#' className="text-sm">
          {data.category}
        </Link>
      </div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  )
}

export async function generateStaticParams() {
  const hymns = await getSongs('tvchh')

  return hymns.map((hymn) => ({ slug: hymn.slug }))
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params
  const filename = `./public/tvchh/${slug}.md`
  const fileContent = await readFile(filename, { encoding: 'utf-8' })
  const { data } = matter(fileContent)

  return {
    title: `Tôn Vinh Chúa Hằng Hữu ${data.name}`,
  }
}


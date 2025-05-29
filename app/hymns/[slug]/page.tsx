import { getHymns } from "@/app/hymns"
import { readFile } from "fs/promises"
import matter from 'gray-matter'


export default async function HymnPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const filename = `./public/hymns/${slug}.md`
  const fileContent = await readFile(filename, { encoding: 'utf-8' })
  const { content, data } = matter(fileContent)

  return (
    <article className="hymn-details">
      <h1 className='text-2xl font-bold mb-6'>{data.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  )
}

export async function generateStaticParams() {
  const hymns = await getHymns()

  return hymns.map((hymn) => ({ slug: hymn.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params
  const filename = `./public/hymns/${slug}.md`
  const fileContent = await readFile(filename, { encoding: 'utf-8' })
  const { data } = matter(fileContent)

  return {
    title: `Thánh Ca ${data.title}`,
  }
}


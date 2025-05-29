import { readdir, readFile } from 'fs/promises'
import matter from 'gray-matter'

type Hymn = {
  slug: string
  title: string
  weight: number
  content?: string
}

export async function getHymns() {
  const entries = await readdir('./public/hymns', { withFileTypes: true })
  const dirs = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => entry.name)

  const fileContents = await Promise.all(dirs.map((dir) => readFile(`./public/hymns/${dir}`, { encoding: 'utf-8' })))

  const hymns = dirs.map((fileName, index) => {
    const fileContent = fileContents[index]
    const { data } = matter(fileContent)
    return {
      slug: fileName.replace('.md', ''),
      ...data,
    }
  }) as Hymn[]

  hymns.sort((a, b) => a.weight - b.weight)

  return hymns
}

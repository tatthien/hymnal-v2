import { readdir, readFile } from 'fs/promises'
import matter from 'gray-matter'

type Song = {
  slug: string
  name: string
  weight: number
  content?: string
}

export async function getSongs(collection = 'hymns') {
  const entries = await readdir('./public/' + collection, { withFileTypes: true })
  const dirs = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => entry.name)

  const fileContents = await Promise.all(dirs.map((dir) => readFile(`./public/${collection}/${dir}`, { encoding: 'utf-8' })))

  const songs = dirs.map((fileName, index) => {
    const fileContent = fileContents[index]
    const { data } = matter(fileContent)
    return {
      slug: fileName.replace('.md', ''),
      ...data,
    }
  }) as Song[]

  songs.sort((a, b) => a.weight - b.weight)

  return songs
}

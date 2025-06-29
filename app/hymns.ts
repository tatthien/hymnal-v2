import { Collection } from '@/types'
import { readdir, readFile } from 'fs/promises'
import matter from 'gray-matter'

type Song = {
  slug: string
  name: string
  weight: number
  collection: Collection
  content?: string
}

export async function getSongs(collection = 'hymns') {
  const entries = await readdir('./assets/songs/' + collection, { withFileTypes: true })
  const dirs = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => entry.name)

  const fileContents = await Promise.all(dirs.map((dir) => readFile(`./assets/songs/${collection}/${dir}`, { encoding: 'utf-8' })))

  const songs = dirs.map((fileName, index) => {
    const fileContent = fileContents[index]
    const { data, content } = matter(fileContent)
    return {
      slug: fileName.replace('.md', ''),
      content,
      collection,
      ...data,
    }
  }) as Song[]

  songs.sort((a, b) => a.weight - b.weight)

  return songs
}

import * as https from 'node:https'
import { URL } from 'node:url'
import slugify from 'slugify'
import { writeFile } from 'fs/promises'

export async function crawl(url: string, dir: string) {
  console.log('crawling:', url)
  const parsedUrl = new URL(url)
  https.get({
    hostname: parsedUrl.hostname,
    path: parsedUrl.pathname + parsedUrl.search,
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
      'accept': 'application/json',
    }
  }, (res) => {
    let body = ''
    res.on('data', (chunk) => {
      body += chunk
    })
    res.on('end', () => {
      const data = JSON.parse(body)
      data.name = data.name.replace(/<[^>]*>/g, '-')
      const slug = slugify(data.id + '-' + data.name, {
        replacement: '-',
        remove: /[*+~.()'"!:@]/g,
        lower: true,
        strict: true,
        locale: 'vi',
      })
      const filename = `./public/${dir}/${slug}.md`
      const content = `---
id: ${data.id}
name: ${data.id}. ${toTitleCase(data.name)}
weight: ${data.id}
category: ${data.cat_sub}
---
${data.lyric}
`
      writeFile(filename, content)
    })
  })
}

function toTitleCase(str: string) {
  const segmenter = new Intl.Segmenter('vi', { granularity: 'word' })
  const words = Array.from(segmenter.segment(str))
  return words
    .map((word) => word.segment.charAt(0).toUpperCase() + word.segment.substring(1).toLowerCase())
    .join('')
}

for (let i = 1; i <= 387; i++) {
  crawl(`https://wiki.httlvn.org/doc-sach/BTC/tvchh/${i}?format=json`, 'tvchh')
}

for (let i = 1; i <= 903; i++) {
  crawl(`https://wiki.httlvn.org/doc-sach/TC/thanh-ca/${i}?format=json`, 'hymns')
}

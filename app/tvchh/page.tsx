import Link from "next/link"
import { getSongs } from "../hymns"

const COLLECTION = 'tvchh'
const COLLECTION_TITLE = 'Tôn Vinh Chúa Hằng Hữu'

export default async function HymnsPage() {
  const hymns = await getSongs(COLLECTION)

  return (
    <div>
      {hymns.map((hymn) => (
        <Link
          key={hymn.slug}
          href={`/${COLLECTION}/${hymn.slug}`}
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
}

export const metadata = {
  title: COLLECTION_TITLE,
}

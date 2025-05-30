import Link from "next/link"
import { getSongs } from "../hymns"

export default async function HymnsPage() {
  const hymns = await getSongs('hymns')

  return (
    <div>
      {hymns.map((hymn) => (
        <Link
          key={hymn.slug}
          href={`/hymns/${hymn.slug}`}
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

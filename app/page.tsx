import Link from "next/link"
import { getHymns } from "./hymns"

export default async function Home() {
  const hymns = await getHymns()

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
            <h2 className="tabular-nums">{hymn.title}</h2>
          </article>
        </Link>
      ))}
    </div>
  )
}

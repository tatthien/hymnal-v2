import Link from "next/link"
import { getSongs } from "../hymns"

export default async function HymnsPage() {
  const hymns = await getSongs('tvchh')

  return (
    <div>
      {hymns.map((hymn) => (
        <Link
          key={hymn.slug}
          href={`/tvchh/${hymn.slug}`}
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
  title: 'Tôn Vinh Chúa Hằng Hữu',
}

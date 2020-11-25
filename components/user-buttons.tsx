import Link from 'next/link'
import User from '@carbon/icons-react/lib/user/32'
import Favorite from '@carbon/icons-react/lib/favorite/32'

export default function UserButtons() {
  return (
    <section className="flex items-center justify-between space-x-4">
      <Link href="/user/profile">
        <a>
          <User className="transition-colors duration-200 cursor-pointer hover:text-blue-700" />
        </a>
      </Link>
      <Link href="/user/profile">
        <a>
          <Favorite className="transition-colors duration-200 cursor-pointer hover:text-blue-700" />
        </a>
      </Link>
    </section>
  )
}

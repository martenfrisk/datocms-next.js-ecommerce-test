import Link from 'next/link'
import User from '@carbon/icons-react/lib/user/32'
import Favorite from '@carbon/icons-react/lib/favorite/32'

export default function UserButtons() {
  return (
    <section className="flex items-center justify-between  space-x-4">
      <Link href="/user/profile">
        <User className="cursor-pointer hover:text-blue-700 duration-200 transition-colors" />
      </Link>
      <Link href="/user/favorites">
        <Favorite className="cursor-pointer hover:text-blue-700 duration-200 transition-colors" />
      </Link>
    </section>
  )
}

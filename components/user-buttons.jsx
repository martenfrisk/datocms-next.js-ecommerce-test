import Link from 'next/link'
import User from '@carbon/icons-react/lib/user/32'
import Favorite from '@carbon/icons-react/lib/favorite/32'
import { signIn, useSession } from 'next-auth/client'

export default function UserButtons() {
  const [session, loading] = useSession()
  return (
    <section className="flex items-center justify-between  space-x-4">
      {loading && <p>Loading...</p>}
      {!session && (
        <>
          <button onClick={signIn} type="button">
            <User className="cursor-pointer hover:text-blue-700 duration-200 transition-colors" />
          </button>
          <button onClick={signIn} type="button">
            <Favorite className="cursor-pointer hover:text-blue-700 duration-200 transition-colors" />
          </button>
        </>
      )}
      {session && (
        <>
          <p>
            signed in as
            {' '}
            {JSON.stringify(session)}
          </p>
          <Link href="/user/profile">
            <User className="cursor-pointer hover:text-blue-700 duration-200 transition-colors" />
          </Link>
          <Link href="/user/favorites">
            <Favorite className="cursor-pointer hover:text-blue-700 duration-200 transition-colors" />
          </Link>
        </>
      )}
    </section>
  )
}

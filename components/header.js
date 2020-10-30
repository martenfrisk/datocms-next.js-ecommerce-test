import Link from 'next/link'
import UserButtons from './user-buttons'

export default function Header() {
  return (
    <div className="flex flex-col md:flex-row  justify-between items-center mt-8 md:mt-20 mb-10">

    <h2 className="text-4xl mb-4 md:mb-0 md:text-5xl font-bold tracking-tight md:tracking-tighter leading-tight">
      <Link href="/">
        <a className="hover:underline">Games</a>
      </Link>
      .
    </h2>
    <UserButtons />
    </div>
  )
}

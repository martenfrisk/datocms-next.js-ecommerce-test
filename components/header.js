import Link from 'next/link'
import UserButtons from './user-buttons'
import Nav from './nav'

export default function Header({ frontPage = false }) {
  return (
    <div className="flex flex-col md:flex-row  justify-between items-start mt-8 md:mt-20 mb-10">

    <h2 className={`
    ${frontPage ? 'text-5xl md:text-7xl' : 'text-4xl md:text-6xl'}
    mb-4 md:mb-0 font-bold tracking-tight md:tracking-tighter -mt-4 leading-tight
    `}
    >
      <Link href="/">
        <a className="hover:underline">Games</a>
      </Link>
      .
    </h2>
    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row w-full md:w-auto items-start mt-2 md:mt-0">
      <Nav />
      <UserButtons />

    </div>
    </div>
  )
}


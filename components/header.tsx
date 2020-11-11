import SearchBar from '@/components/search-bar';
import Link from 'next/link';
import UserButtons from './user-buttons';
import Nav from './nav';

export default function Header({ frontPage = false }: { frontPage?: boolean }) {
  return (
    <div className="sticky top-0 z-20 flex flex-col items-start justify-between pt-5 pb-2 mb-4 bg-white sm:pt-10 sm:pb-4 bg-opacity-95 md:flex-row ">
      <h2
        className={`
          ${frontPage ? 'text-4xl md:text-7xl' : 'text-4xl md:text-6xl'}
          mb-0 text-center w-full sm:w-auto font-bold tracking-tight md:tracking-tighter -mt-4 leading-tight
          `}
      >
        <Link href="/">
          <a className="hover:underline">Games</a>
        </Link>
        .
      </h2>
      <div className="flex flex-col items-center w-full space-y-4 md:space-y-0 md:flex-row md:w-auto">
        <Nav />
        <div className="flex flex-wrap items-center justify-center w-full space-x-4">
          <SearchBar />
          <UserButtons />
        </div>
      </div>
    </div>
  );
}

Header.defaultProps = {
  frontPage: false,
}

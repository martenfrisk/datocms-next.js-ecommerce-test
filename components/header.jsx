import SearchBar from '@/components/search-bar';
import Link from 'next/link';
import UserButtons from './user-buttons';
import Nav from './nav';

export default function Header({ frontPage = false }) {
  return (
    <div className="sticky top-0 flex z-20 bg-white pt-5 sm:pt-10 pb-2 sm:pb-4 bg-opacity-95 flex-col md:flex-row  justify-between items-start mb-4">
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
      <div className="flex items-center flex-col space-y-4 md:space-y-0 md:flex-row w-full md:w-auto">
        <Nav />
        <div className="flex space-x-4 w-full items-center justify-center flex-wrap">
          <SearchBar />
          <UserButtons />
        </div>
      </div>
    </div>
  );
}

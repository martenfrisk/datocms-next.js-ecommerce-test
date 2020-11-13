import SearchBar from '@/components/search-bar';
import Link from 'next/link';
import UserButtons from './user-buttons';
import Nav from './nav';

export default function Header({ frontPage = false }: { frontPage?: boolean }) {
  return (
    <div className="sticky top-0 z-20 flex flex-col items-center justify-between pb-2 mb-0 sm:pt-10 sm:pb-4 sm:flex-row ">
      <h2
        className={`
          ${frontPage ? 'text-4xl sm:text-7xl' : 'text-4xl sm:text-6xl'}
          mb-0 text-center w-full bg-white sm:bg-opacity-95 text-blueish-800 pl-12 pr-8 sm:rounded-tr-md sm:rounded-br-md sm:w-auto font-bold shadow-md tracking-tight sm:tracking-tighter leading-tight
          `}
      >
        <Link href="/">
          <a className="hover:underline">Games</a>
        </Link>
        .
      </h2>
      <div className="flex items-center w-full py-2 pl-4 pr-4 -mt-2 space-y-2 bg-white shadow-md sm:mt-0 sm:pr-8 sm:py-4 sm:rounded-tl-md sm:bg-opacity-95 sm:rounded-bl-md text-blueish-800 sm:space-y-0 sm:flex-row sm:w-auto">
        <Nav />
        <div className="flex items-center justify-center w-full space-x-4">
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

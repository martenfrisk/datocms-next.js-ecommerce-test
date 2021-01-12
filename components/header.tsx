import SearchBar from '@/components/search-bar';
import Link from 'next/link';
import UserButtons from './user-buttons';
import Nav from './nav';

export default function Header() {
	return (
		<div className="sticky top-0 z-20 flex flex-col items-center justify-between pb-2 mb-0 sm:pt-10 sm:pb-4 sm:flex-row ">
			<h2
				className="w-full py-2 pl-12 pr-8 text-4xl font-bold leading-tight text-center bg-white shadow-md sm:text-6xl text-blueish-800 sm:rounded-tr-md sm:rounded-br-md sm:w-auto"
			>
				<Link href="/">
					Games.
				</Link>
			</h2>
			<div className="flex items-center w-full py-2 pl-4 pr-4 -mt-2 space-y-2 bg-white shadow-md sm:mt-0 sm:pr-8 sm:py-4 sm:rounded-tl-md sm:rounded-bl-md text-blueish-800 sm:space-y-0 sm:flex-row sm:w-auto">
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

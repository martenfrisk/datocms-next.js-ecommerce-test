import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import FuzzySearch from 'fuzzy-search'
import Header from '@/components/header';
import Layout from '@/components/layout';
import { getAllProducts } from '@/lib/airapi'
import { ProductType } from '@/lib/types'
import ProductPreview from '@/components/product/product-preview'

export default function Search({ products }: { products: ProductType }) {
	const { query } = useRouter()
	const [searchResults, setSearchResults] = useState([])
	const [searchTerm, setSearchTerm] = useState('')
	const searcher = new FuzzySearch(
		products,
		['productName', 'description', 'descriptionShort'],
		{
			sort: true,
		},
	)
	useEffect(() => {
		if (query.s) {
			setSearchTerm(() => query.s.toString())
			setSearchResults(searcher.search(query.s.toString()))
		}
	}, [])
	const handleSearch = ({ target }) => {
		const { value } = target
		setSearchTerm(() => value)
		if (value !== '') {
			setSearchResults(searcher.search(value))
		} else {
			setSearchResults([])
		}
	}

	return (
		<Layout showCartButton="true">
			<Head>
				<title>Search</title>
			</Head>
			<Header />
			<div
				className="absolute top-0 z-10 object-cover w-full bg-gradient-to-r from-blue-700 to-blue-800"
				style={{
					height: '30vh',
					maxHeight: '420px',
				}}
			/>
			<section className="relative z-20 flex flex-col items-center ">
				<h1 className="mb-4 text-3xl text-white">Search</h1>
				<input
					className="w-full max-w-xl px-4 py-2 mx-auto mb-2 text-xl text-blue-700 bg-white border border-blue-600 rounded-md shadow-lg"
					type="text"
					value={searchTerm}
					onChange={handleSearch}
				/>
				{searchResults.length > 0 && (
					<div className="flex flex-wrap max-w-5xl p-2 mx-auto mt-2 bg-white rounded-t-lg shadow-lg sm:mt-10 sm:p-8">
						{searchResults.slice(0, 12).map((hit) => (
							<ProductPreview
								key={hit.slug}
								productName={hit.productName}
								artnr={hit.artnr}
								subname={hit.subname}
								slug={hit.slug}
								description={hit.description}
								descriptionShort={hit.descriptionShort}
								retailPrice={hit.retailPrice}
								cover={hit.cover}
							/>
						))}
					</div>
				)}
			</section>
		</Layout>
	)
}

export async function getStaticProps() {
	const products = await getAllProducts(100)

	return {
		props: {
			products,
		},
	};
}

import { useState } from 'react';
import Head from 'next/head';
// import Link from 'next/link';
import dynamic from 'next/dynamic'
import ChevronDown from '@carbon/icons-react/lib/chevron--down/16';
import ChevronUp from '@carbon/icons-react/lib/chevron--up/16';
import List from '@carbon/icons-react/lib/list/24';
import Grid from '@carbon/icons-react/lib/grid/24';

import Header from '@/components/header';
import Layout from '@/components/layout';
import { ProductType } from '@/lib/types';
import useSortableData from '@/lib/sorter';
// import Image from 'next/image';
import { getAllProducts } from '@/lib/airapi';
// import ImageOpt from '@/components/image';

const ProductPreview = dynamic(import('@/product/product-preview'));
const ProductListView = dynamic(import('@/components/product/product-list-view'));

export default function AllGames({ allProducts }: { allProducts: ProductType[] }) {
	const [productView, setProductView] = useState('grid');
	const [filter, setFilter] = useState('')
	const [searchProduct, setSearchProduct] = useState('')
	const { items, requestSort, sortConfig } = useSortableData(allProducts);
	const handleFilter = (type: string) => {
		if (filter === type) {
			setFilter('')
		} else {
			setFilter(type)
		}
	}

	return (
		<>
			<Layout showCartButton="true">
				<Head>
					<title>Next.js Shop Test</title>
				</Head>
				<Header />
				<div
					className="absolute top-0 z-0 flex justify-center w-full mt-20 overflow-hidden border-b-4 border-blue-700 shadow-sm sm:mt-0 bg-gradient-to-r from-blue-700 to-blue-800"
					style={{
						height: '50vh',
						minHeight: '380px',
						maxHeight: '425px',
					}}
				/>
				<section className="relative z-10 bg-white">
					<div className="z-10 flex flex-col items-center justify-between w-full mb-2 sm:mt-8 sm:flex-row">
						<div className="flex flex-wrap items-center w-full pt-6 text-lg sm:w-3/4 justify-evenly sm:px-20 sm:space-x-5">
							<p className="w-full mr-4 text-xl text-center sm:w-auto">Sort by</p>
							<button
								type="button"
								className="focus:outline-none"
								onClick={() => requestSort('retailPrice')}
							>
								<div className="flex items-center focus:outline-none">
									Price
									{' '}
									<div className="w-4">
										{sortConfig
                        && sortConfig.key === 'retailPrice'
                        && sortConfig.direction === 'ascending' && (<ChevronDown className="ml-1" />)}
										{sortConfig
                        && sortConfig.key === 'retailPrice'
                        && sortConfig.direction === 'descending' && (<ChevronUp className="ml-1" />)}
									</div>
								</div>
							</button>
							<button
								type="button"
								className="focus:outline-none"
								onClick={() => requestSort('productName')}
							>
								<div className="flex items-center focus:outline-none">
									Name
									{' '}
									<div className="w-4">
										{sortConfig
                        && sortConfig.key === 'productName'
                        && sortConfig.direction === 'ascending' && (<ChevronDown className="ml-1" />)}
										{sortConfig
                        && sortConfig.key === 'productName'
                        && sortConfig.direction === 'descending' && (<ChevronUp className="ml-1" />)}
									</div>
								</div>
							</button>
							<button
								type="button"
								className="focus:outline-none"
								onClick={() => requestSort('platform')}
							>
								<div className="flex items-center focus:outline-none">
									Platform
									{' '}
									<div className="w-4">
										{sortConfig
                        && sortConfig.key === 'platform'
                        && sortConfig.direction === 'ascending' && (<ChevronDown className="ml-1" />)}
										{sortConfig
                        && sortConfig.key === 'platform'
                        && sortConfig.direction === 'descending' && (<ChevronUp className="ml-1" />)}
									</div>
								</div>
							</button>
							<div className="flex items-center">
								<button type="button" className={`${filter === '9' && 'underline'} text-sm  focus:outline-none ml-2`} onClick={() => handleFilter('9')}>
									Playstation
								</button>
								<button type="button" className={`${filter === '8' && 'underline'} text-sm focus:outline-none ml-2`} onClick={() => handleFilter('8')}>
									Nintendo 64
								</button>
								<button type="button" className={`${filter === '10' && 'underline'} text-sm focus:outline-none ml-2`} onClick={() => handleFilter('10')}>
									Game Boy
								</button>
								<button type="button" className={`${filter === '' && 'underline'} text-sm focus:outline-none ml-2`} onClick={() => setFilter('')}>
									All
								</button>
							</div>
						</div>
						<div className="flex justify-center w-1/4 mt-2 sm:mt-0">
							<List className="mr-4 cursor-pointer" onClick={() => setProductView('list')} />
							<Grid className="cursor-pointer" onClick={() => setProductView('grid')} />
						</div>
					</div>
					<div className="flex justify-center my-5 full">
						<input
							type="text"
							value={searchProduct}
							onChange={(e) => setSearchProduct(e.target.value)}
							className="px-4 py-2 bg-blue-200 bg-opacity-25 rounded-md focus:outline-none"
							placeholder="Search product..."
						/>
					</div>
					{productView === 'grid' && (
						<div
							className="flex flex-wrap max-w-5xl mx-auto mb-0 justify-evenly sm:mb-20"
						>
							{items
								.filter((el) => (filter !== '' ? el.platform.includes(filter) : el))
								.filter((el) => (searchProduct !== '' ? el.productName.match(new RegExp(searchProduct, 'i')) || el.descriptionShort.match(new RegExp(searchProduct, 'i')) : el))
								.map((product: ProductType) => (
									<ProductPreview
										artnr={product.artnr}
										key={product.slug}
										productName={product.productName}
										subname={product.subname}
										slug={product.slug}
										description={product.description}
										descriptionShort={product.descriptionShort}
										retailPrice={product.retailPrice}
										cover={product.cover}
									/>
								))}
						</div>
					)}
					{productView === 'list' && (
						<div className="flex flex-col max-w-4xl mx-auto mb-0 sm:mb-20">
							{items
								.filter((el) => (filter !== '' ? el.platform.includes(filter) : el))
								.filter((el) => (searchProduct !== '' ? el.productName.match(new RegExp(searchProduct, 'i')) || el.descriptionShort.match(new RegExp(searchProduct, 'i')) : el))
								.map((product: ProductType, i: number) => (
									<ProductListView i={i} product={product} />
								))}
						</div>
					)}
				</section>
			</Layout>
		</>
	);
}

export async function getStaticProps() {
	const allProducts = await getAllProducts(100)

	return {
		props: {
			allProducts,
		},
	};
}

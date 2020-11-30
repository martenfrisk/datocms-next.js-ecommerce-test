import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ChevronDown from '@carbon/icons-react/lib/chevron--down/16';
import ChevronUp from '@carbon/icons-react/lib/chevron--up/16';
import List from '@carbon/icons-react/lib/list/24';
import Grid from '@carbon/icons-react/lib/grid/24';

import CoverImage from '@/components/cover-image'
import ProductPreview from '@/product/product-preview';
import Header from '@/components/header';
import Layout from '@/components/layout';
import { ProductType } from '@/lib/types';
import { getAllProductsForHome } from '@/lib/api';
import useSortableData from '@/lib/sorter';

export default function AllGames({ allProducts }: { allProducts: any[] }) {
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
        <section>
          <div className="flex flex-col items-center justify-between w-full mb-2 sm:mt-8 sm:flex-row">
            <div className="flex flex-wrap items-center w-full text-lg sm:w-3/4 justify-evenly sm:px-20 sm:space-x-5">
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
                        && sortConfig.direction === 'ascending' && (
                          <ChevronDown className="ml-1" />
                    )}
                    {sortConfig
                        && sortConfig.key === 'retailPrice'
                        && sortConfig.direction === 'descending' && (
                          <ChevronUp className="ml-1" />
                    )}
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
                        && sortConfig.direction === 'ascending' && (
                          <ChevronDown className="ml-1" />
                    )}
                    {sortConfig
                        && sortConfig.key === 'productName'
                        && sortConfig.direction === 'descending' && (
                          <ChevronUp className="ml-1" />
                    )}
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
                        && sortConfig.direction === 'ascending' && (
                          <ChevronDown className="ml-1" />
                    )}
                    {sortConfig
                        && sortConfig.key === 'platform'
                        && sortConfig.direction === 'descending' && (
                          <ChevronUp className="ml-1" />
                    )}
                  </div>
                </div>
              </button>
              <div className="flex items-center">
                <button type="button" className={`${filter === 'Playstation' && 'underline'} text-sm  focus:outline-none ml-2`} onClick={() => handleFilter('Playstation')}>
                  Playstation
                </button>
                <button type="button" className={`${filter === 'Nintendo 64' && 'underline'} text-sm focus:outline-none ml-2`} onClick={() => handleFilter('Nintendo 64')}>
                  Nintendo 64
                </button>
                <button type="button" className={`${filter === 'Game Boy' && 'underline'} text-sm focus:outline-none ml-2`} onClick={() => handleFilter('Game Boy')}>
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
            className="flex flex-wrap mx-2 mb-0 justify-evenly sm:mx-16 sm:mb-20"
          >
            {items
              .filter((el) => (filter !== '' ? el.platform === filter : el))
              .filter((el) => (searchProduct !== '' ? el.productName.match(new RegExp(searchProduct, 'i')) || el.description.match(new RegExp(searchProduct, 'i')) : el))
              .map((product: ProductType) => (
                <ProductPreview
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
          <div className="flex flex-col mb-0 sm:mx-16 sm:mb-20">
            {items
              .filter((el) => (filter !== '' ? el.platform === filter : el))
              .filter((el) => (searchProduct !== '' ? el.productName.match(new RegExp(searchProduct, 'i')) || el.description.match(new RegExp(searchProduct, 'i')) : el))
              .map((product: ProductType, i: number) => (
                <Link href={`/products/${product.slug}`} key={product.slug}>
                  <div className={`${i % 2 === 0 ? 'bg-blue-100' : 'bg-white'} hover:shadow-md flex my-2 px-2 py-2 items-center cursor-pointer`}>
                    <div className="w-8 h-8 sm:w-12 sm:h-12">
                      <CoverImage
                        slug={product.slug}
                        productName={product.productName}
                        responsiveImage={product.cover.responsiveImage}
                      />
                    </div>
                    <div className="flex flex-wrap justify-between w-full px-4">
                      <p className="w-full sm:w-auto">
                        {product.productName}
                        {product.subname && `: ${product.subname}`}
                      </p>
                      <p className="w-full sm:w-auto">
                        <span className="mr-2 text-sm">
                          {product.platform}
                        </span>
                        {product.retailPrice}
                        &nbsp;:-
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
          )}
        </section>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const data = await getAllProductsForHome();
  return {
    props: {
      allProducts: data?.allProducts,
    },
  };
}

// import { useState } from 'react'
import Head from 'next/head';
import ChevronDown from '@carbon/icons-react/lib/chevron--down/16';
import ChevronUp from '@carbon/icons-react/lib/chevron--up/16';

import Container from '@/components/container';
import ProductPreview from '@/product/product-preview';
import Header from '@/components/header';
import Layout from '@/components/layout';
import { ProductType } from '@/lib/types';
import { getAllProductsForHome } from '@/lib/api';
import useSortableData from '@/lib/sorter';

export default function AllGames({ allProducts }: { allProducts: any[] }) {
  // const [products, setProducts] = useState(allProducts)
  // const [currentSort, setCurrentSort] = useState('')
  const { items, requestSort, sortConfig } = useSortableData(allProducts);
  // const sortBy = (sortingType: string) => {
  //   switch (sortingType) {
  //     case 'price':
  //       if (currentSort === 'price_ASC') {
  //         setProducts(() => [...products].sort((a, b) => b.retailPrice - a.retailPrice))
  //         setCurrentSort('price_DESC')
  //       } else {
  //         setProducts(() => [...products].sort((a, b) => a.retailPrice - b.retailPrice))
  //         setCurrentSort('price_ASC')
  //       }
  //       break
  //     default:
  //       break;
  //   }
  // }
  return (
    <>
      <Layout showCartButton="true">
        <Head>
          <title>Next.js Shop Test</title>
        </Head>
        <Container>
          <Header />
          <section>
            <div className="w-full my-8 flex-col sm:flex-row flex items-center">

              <h2 className="text-4xl w-full sm:w-1/3 md:text-5xl font-bold tracking-tighter mb-4 sm:mb-0 text-center leading-tight">
                Buy Games
              </h2>
              <div className="flex w-full sm:w-2/3 justify-center space-x-5 text-lg">
                <button
                  type="button"
                  className="focus:outline-none"
                  onClick={() => requestSort('retailPrice')}
                >
                  <div className="flex focus:outline-none items-center">
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
                  <div className="flex focus:outline-none items-center">
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
              </div>
            </div>
            <div
              className="
              flex flex-wrap
              justify-evenly
              mx-2
              md:mx-16
            mb-0
            sm:mb-20"
            >
              {/* {items.map((product: ProductType) => <p>{product.retailPrice}</p>)} */}
              {items.map((product: ProductType) => (
                <ProductPreview
                  key={product.slug}
                  productName={product.productName}
                  slug={product.slug}
                  description={product.description}
                  descriptionShort={product.descriptionShort}
                  retailPrice={product.retailPrice}
                  cover={product.cover}
                />
              ))}
            </div>
          </section>
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const allProducts = await getAllProductsForHome();
  return {
    props: { allProducts },
  };
}

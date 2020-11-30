import Head from 'next/head'
import dynamic from 'next/dynamic'
import Header from '@/components/header'
import Layout from '@/components/layout'
import { ProductType } from '@/lib/types'
import { getAllProductsForHome } from '@/lib/api'
import { CMS_NAME } from '@/lib/constants'

const HeroProduct = dynamic(import('@/components/product/hero-product'))
const MoreProducts = dynamic(import('@/components/product/more-products'))

export default function Index(
  { product, allProducts }: { product: ProductType, allProducts: ProductType[]},
) {
  const heroProduct = product
  const moreProducts = allProducts
  return (
    <>
      <Layout showCartButton="true">
        <Head>
          <title>
            Next.js E-commerce Example with
            {CMS_NAME}
          </title>
        </Head>
        <Header frontPage />
        {heroProduct && (
        <HeroProduct
          productName={heroProduct.productName}
          subname={heroProduct.subname}
          slug={heroProduct.slug}
          description={heroProduct.description}
          descriptionShort={heroProduct.descriptionShort}
          retailPrice={heroProduct.retailPrice}
          cover={heroProduct.cover}
          platform={heroProduct.platform}
          heroimg={heroProduct.heroimg}
        />
        )}
        {moreProducts && (
        <div className="sm:mt-10">
          <MoreProducts products={moreProducts} platform="Nintendo 64" header="N64" animateFirst />
          <MoreProducts products={moreProducts} platform="Game Boy" header="Game Boy" />
          <MoreProducts products={moreProducts} platform="Playstation" header="PlayStation" />
        </div>
        )}
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const data = await getAllProductsForHome()
  return {
    props: {
      product: data?.product,
      allProducts: data?.allProducts,
    },
  };
}

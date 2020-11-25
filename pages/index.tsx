import Head from 'next/head'
import Container from '@/components/container'
import MoreProducts from '@/components/product/more-products'
import HeroProduct from '@/components/product/hero-product'
import Header from '@/components/header'
import Layout from '@/components/layout'
import { ProductType } from '@/lib/types'
import { getAllProductsForHome } from '@/lib/api'
import { CMS_NAME } from '@/lib/constants'

export default function Index({ allProducts }: { allProducts: ProductType[]}) {
  const heroProduct = allProducts.find((element) => element.heroimg)
  const moreProducts = allProducts.filter((element) => element.slug !== heroProduct.slug)
  return (
    <>
      <Layout showCartButton="true">
        <Head>
          <title>
            Next.js E-commerce Example with
            {CMS_NAME}
          </title>
        </Head>
        <Container>
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
          {moreProducts.length > 0 && (
            <div className="mt-16 sm:mt-20">
              <MoreProducts products={moreProducts} platform="Nintendo 64" header="N64" />
              <MoreProducts products={moreProducts} platform="Game Boy" header="Game Boy" />
              <MoreProducts products={moreProducts} platform="Playstation" header="PlayStation" />
            </div>
          )}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview }) {
  const allProducts = await getAllProductsForHome(preview)
  return {
    props: { allProducts },
  }
}

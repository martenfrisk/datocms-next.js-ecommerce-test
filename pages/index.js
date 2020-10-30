import Container from '../components/container'
import MoreProducts from '../components/product/more-products'
import HeroProduct from '../components/product/hero-product'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllProductsForHome } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'

export default function Index({ allProducts }) {
  const heroProduct = allProducts[0]
  const moreProducts = allProducts.slice(1)
  return (
    <>
      <Layout>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <Intro />
          {heroProduct && (
            <HeroProduct
              productName={heroProduct.productName}
              slug={heroProduct.slug}
              description={heroProduct.description}
              descriptionShort={heroProduct.descriptionShort}
              retailPrice={heroProduct.retailPrice}
              cover={heroProduct.cover}
            />
          )}
          {moreProducts.length > 0 && <MoreProducts products={moreProducts} />}
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

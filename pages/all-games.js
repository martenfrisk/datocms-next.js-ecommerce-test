import Container from '../components/container'
import MoreProducts from '../components/product/more-products'
import HeroProduct from '../components/product/hero-product'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllProductsForHome } from '../lib/api'
import Head from 'next/head'

export default function AllGames({ allProducts }) {
  const moreProducts = allProducts.slice(1, 20)
  return (
    <>
      <Layout showCartButton={'true'}>
        <Head>
          <title>Next.js Shop Test</title>
        </Head>
        <Container>
          <Intro />
          {moreProducts.length > 0 && <MoreProducts products={moreProducts} header="All Games" />}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allProducts = await getAllProductsForHome()
  return {
    props: { allProducts },
  }
}

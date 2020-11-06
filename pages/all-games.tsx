import Head from 'next/head'
import Container from '@/components/container'
import MoreProducts from '@/components/product/more-products'
import Header from '@/components/header'
import Layout from '@/components/layout'
import { getAllProductsForHome } from '../lib/api'

export default function AllGames({ allProducts }: { allProducts: any[]}) {
  const moreProducts = allProducts.slice(1, 20)
  return (
    <>
      <Layout showCartButton="true">
        <Head>
          <title>Next.js Shop Test</title>
        </Head>
        <Container>
          <Header />
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

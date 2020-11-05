import Container from '../components/container'
import MoreProducts from '../components/product/more-products'
import HeroProduct from '../components/product/hero-product'
import Header from '../components/header'
import Layout from '../components/layout'
import { getAllProductsForHome } from '../lib/api'
import Head from 'next/head'

export default function Index({ allProducts }) {
  const heroProduct = allProducts[0]
  const moreProducts = allProducts.slice(1, 20)
  return (
    <>
      <Layout showCartButton={'true'}>
        <Head>
          <title>Next.js Shop Test</title>
        </Head>
        <Container>
          <Header frontPage={true} />
          {heroProduct && (
            <HeroProduct
              productId={heroProduct.Artnr}
              productName={heroProduct.Beskr_SV}
              slug={heroProduct.Friendly_SV}
              description={heroProduct.Text_Long}
              descriptionShort={heroProduct.Text_Short}
              retailPrice={heroProduct.Pris}
              // cover={heroProduct.cover}
            />
          )}
          {moreProducts.length > 0 && <MoreProducts products={moreProducts} />}
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

import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import ProductBody from '../../components/product/product-body'
import MoreProducts from '../../components/product/more-products'
import Header from '../../components/header'
import ProductHeader from '../../components/product/product-header'
import SectionSeparator from '../../components/section-separator'
import Layout from '../../components/layout'
import { getAllProductsWithSlug, getProductAndMoreProducts } from '../../lib/api'
import ProductTitle from '../../components/product/product-title'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'

export default function Product({ product, moreProducts, preview }) {
  const router = useRouter()
  if (!router.isFallback && !product?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <ProductTitle>Loading…</ProductTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {product.productName} | Next.js Blog Example with {CMS_NAME}
                </title>
                <meta property="og:image" content={product.ogImage.url} />
              </Head>
              <ProductHeader
                productName={product.productName}
                cover={product.cover}
              />
              {product.retailPrice}:-
              <ProductBody content={product.description} />
            </article>
            <SectionSeparator />
            {moreProducts.length > 0 && <MoreProducts products={moreProducts} />}
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getProductAndMoreProducts(params.slug, preview)
  const description = await markdownToHtml(data?.product?.description || '')

  return {
    props: {
      preview,
      product: {
        ...data?.product,
        description,
      },
      moreProducts: data?.moreProducts,
    },
  }
}

export async function getStaticPaths() {
  const allProducts = await getAllProductsWithSlug()
  return {
    paths: allProducts?.map(product => `/products/${product.slug}`) || [],
    fallback: false,
  }
}

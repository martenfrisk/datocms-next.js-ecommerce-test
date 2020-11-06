import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import Container from '@/components/container';
import ProductBody from '@/product/product-body';
import MoreProducts from '@/product/more-products';
import Header from '@/components/header';
import SectionSeparator from '@/components/section-separator';
import Layout from '@/components/layout';
import CoverImage from '@/components/cover-image';
import { useDispatchCart, useCart } from '@/cart/cart-context'
import {
  getAllProductsWithSlug,
  getProductAndMoreProducts,
} from '@/lib/api';
import { ProductType } from '@/lib/types'
import ProductTitle from '@/product/product-title';
import { CMS_NAME } from '../../lib/constants';
import markdownToHtml from '../../lib/markdownToHtml';

export default function Product({
  product, moreProducts, preview,
}: { product: ProductType, moreProducts: any[], preview: boolean }) {
  const router = useRouter();
  const dispatch: any = useDispatchCart()
  const { state, showCart } = useCart()
  const [visible, setVisible] = showCart

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        item: product.productName,
        price: product.retailPrice,
        quantity: 1,
        slug: product.slug,
      },
    })
    setVisible(true)
    console.log(state)
  }
  if (!router.isFallback && !product?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout preview={preview} showCartButton="true">
      <Container>
        <Header />
        {router.isFallback ? (
          <ProductTitle>Loading…</ProductTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {product.productName}
                  {' '}
                  | Next.js Ecommerce Example with
                  {' '}
                  {CMS_NAME}
                </title>
                <meta property="og:image" content={product.ogImage.responsiveImage} />
              </Head>
              <ProductTitle>{product.productName}</ProductTitle>
              <div className="flex flex-col md:flex-row items-center md:items-start">
                <div className="w-2/3 md:w-1/3 h-auto">
                  <CoverImage
                    productName={product.productName}
                    responsiveImage={product.cover.responsiveImage}
                  />
                </div>
                <div className="w-full md:w-2/3 md:pl-8">
                  <div className="w-full mt-4 md:mt-0 px-10 md:px-0 md:w-2/3 flex justify-between">
                    <p className="text-3xl font-bold">
                      {product.retailPrice}
                      :-
                    </p>
                    <button className="bg-black text-white rounded-md text-lg px-6 py-1 cursor-pointer hover:bg-white hover:text-black border-2 border-black transition-200" onClick={handleAddToCart}>Buy</button>
                  </div>
                  <div className="w-full px-4 md:px-0 md:w-2/3">
                    <ProductBody content={product.description} />
                  </div>
                </div>
              </div>
            </article>
            <SectionSeparator />
            {moreProducts.length > 0 && (
              <MoreProducts products={moreProducts} />
            )}
          </>
        )}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getProductAndMoreProducts(params.slug, preview);
  const description = await markdownToHtml(data?.product?.description || '');

  return {
    props: {
      preview,
      product: {
        ...data?.product,
        description,
      },
      moreProducts: data?.moreProducts,
    },
  };
}

export async function getStaticPaths() {
  const allProducts = await getAllProductsWithSlug();
  return {
    paths: allProducts?.map((product) => `/products/${product.slug}`) || [],
    fallback: false,
  };
}

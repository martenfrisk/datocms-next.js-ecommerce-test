import { useRouter } from 'next/router';
import dynamic from 'next/dynamic'
import ErrorPage from 'next/error';
import Head from 'next/head';
import ProductBody from '@/product/product-body';
import Header from '@/components/header';
import Layout from '@/components/layout';
import CoverImage from '@/components/cover-image';
import Rating from '@/components/rating'
import {
  getAllProductsWithSlug,
  getProductAndMoreProducts,
} from '@/lib/api';
import { useDispatchCart, useCart } from '@/cart/cart-context'
import { ProductType } from '@/lib/types'
import OutsideCloseCart from '@/lib/click-outside'
import ProductTitle from '@/product/product-title';
import markdownToHtml from '@/lib/markdownToHtml';

const MoreProducts = dynamic(import('@/product/more-products'))

export default function Product({
  product, moreProducts,
}: { product: ProductType, moreProducts: any[] }) {
  const router = useRouter();
  const dispatch: any = useDispatchCart()
  const { showCart } = useCart()
  const [, setVisible] = showCart
  const samePlatform = moreProducts.filter((item) => item.platform === product.platform)
  const otherPlatforms = moreProducts.filter((item) => item.platform !== product.platform)
  const plat1 = []; const plat2 = []
  otherPlatforms.map((prod: ProductType, index: number) => {
    if (index === 0) {
      plat1.push(prod)
    } else if (plat1[0].platform === prod.platform) {
      plat1.push(prod)
    } else {
      plat2.push(prod)
    }
    return null
  })
  otherPlatforms.sort((a: any, b: any) => {
    if (a.platform < b.platform) {
      return -1
    }
    if (a.platform > b.platform) {
      return 1
    }
    return 0
  })
  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        item: product.productName,
        price: product.retailPrice,
        quantity: 1,
        slug: product.slug,
        responsiveImage: product.cover.responsiveImage,
      },
    })
    setVisible(true)
  }
  if (!router.isFallback && !product?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout showCartButton="true">
      <Header />
      <article className="px-8 pt-32 pb-6 mb-6 -mt-32 text-white bg-gradient-to-r from-blue-800 to-blue-600">
        <Head>
          <title>
            {product.productName}
            {' '}
            | Next.js Ecommerce Example with
          </title>
        </Head>
        <ProductTitle>
          {product.subname ? (
            <>
              {product.productName}
              <span className="block text-2xl font-light tracking-tight sm:inline sm:text-3xl lg:text-4xl">
                {' '}
                -
                {' '}
                {product.subname}
              </span>
            </>
          ) : (
            product.productName
          )}
        </ProductTitle>
        <div className="flex flex-col items-center md:flex-row ">
          <div className="flex items-center w-2/3 h-full sm:w-1/4">
            <CoverImage
              productName={product.productName}
              responsiveImage={product.cover.responsiveImage}
            />
          </div>
          <div className="flex flex-col flex-wrap w-full sm:flex-row md:w-2/3 md:pl-8">
            <div className="flex flex-wrap justify-center w-full px-4 mt-4 sm:px-10 sm:justify-start md:mt-0 md:px-0 md:w-2/3">
              {product.descriptionShort && (
                <p className="mb-2 text-base italic font-light leading-snug text-center sm:mb-4 sm:text-xl">{product.descriptionShort}</p>
              )}
              <p className="mr-4 text-2xl font-light">
                {product.retailPrice}
                :-
              </p>
              <OutsideCloseCart>
                <button
                  type="button"
                  className="px-6 py-1 text-lg text-white uppercase transition-all duration-300 bg-blue-500 rounded-md cursor-pointer bg-opacity-95 hover:bg-blue-600"
                  onClick={handleAddToCart}
                >
                  Buy
                </button>
              </OutsideCloseCart>
            </div>
            <Rating rating={product.rating} />
            <div className="w-full px-4 pt-6 md:px-0 md:w-2/3">
              <ProductBody content={product.description} />
            </div>
          </div>
        </div>
      </article>
      {moreProducts.length > 0 && (
        <div>
          {samePlatform.length > 0 && (
            <div>
              <MoreProducts products={samePlatform} platform={product.platform} header={`More ${product.platform} Games`} />
            </div>
          )}
          <div>
            <MoreProducts products={plat1} header="Other games" />
            {plat2 && <MoreProducts products={plat2} />}
          </div>
        </div>
      )}
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
    paths: allProducts?.map((product: any) => `/products/${product.slug}`) || [],
    fallback: false,
  };
}

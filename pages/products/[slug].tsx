import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import ProductBody from '@/product/product-body';
import MoreProducts from '@/product/more-products';
import Header from '@/components/header';
import Layout from '@/components/layout';
import CoverImage from '@/components/cover-image';
import Rating from '@/components/rating'
import { useDispatchCart, useCart } from '@/cart/cart-context'
import {
  getAllProductsWithSlug,
  getProductAndMoreProducts,
} from '@/lib/api';
import { ProductType } from '@/lib/types'
import OutsideCloseCart from '@/lib/click-outside'
import ProductTitle from '@/product/product-title';
import { CMS_NAME } from '@/lib/constants';
import markdownToHtml from '@/lib/markdownToHtml';

export default function Product({
  product, moreProducts,
}: { product: ProductType, moreProducts: any[] }) {
  const router = useRouter();
  const dispatch: any = useDispatchCart()
  const { state, showCart } = useCart()
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
  // const ref = useRef(null)
  // useOutsideClick(ref)
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
    // eslint-disable-next-line no-console
    console.log(state)
  }
  if (!router.isFallback && !product?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout showCartButton="true">
      <Header />
      {router.isFallback ? (
        <ProductTitle>Loading…</ProductTitle>
      ) : (
        <>
          <article className="px-8 pt-32 pb-6 mb-6 -mt-32 text-white bg-navy-600">
            <Head>
              <title>
                {product.productName}
                {' '}
                | Next.js Ecommerce Example with
                {' '}
                {CMS_NAME}
              </title>
            </Head>
            <ProductTitle>
              {product.subname ? (
                <>
                  {product.productName}
                  :
                  <span className="text-3xl tracking-tight md:text-5xl lg:text-6xl">
                    {' '}
                    {product.subname}
                  </span>
                </>
              ) : (
                product.productName
              )}
            </ProductTitle>
            <div className="flex flex-col items-center md:flex-row md:items-start">
              <div className="w-2/3 h-auto md:w-1/3">
                <CoverImage
                  productName={product.productName}
                  responsiveImage={product.cover.responsiveImage}
                />
              </div>
              <div className="flex flex-col flex-wrap w-full sm:flex-row md:w-2/3 md:pl-8">
                <div className="flex justify-between w-full px-10 mt-4 md:mt-0 md:px-0 md:w-2/3">
                  <p className="text-3xl font-bold">
                    {product.retailPrice}
                    :-
                  </p>
                  <OutsideCloseCart>
                    <button
                      type="button"
                      className="px-6 py-1 text-lg text-white bg-black border-2 border-black rounded-md cursor-pointer hover:bg-white hover:text-black transition-200"
                      onClick={handleAddToCart}
                    >
                      Buy
                    </button>
                  </OutsideCloseCart>
                </div>
                <Rating rating={product.rating} />
                <div className="w-full px-4 pt-6 md:px-0 md:w-2/3">
                  <ProductBody content={
                      product.description ? product.description : product.descriptionShort
                      }
                  />
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
        </>
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
    paths: allProducts?.map((product) => `/products/${product.slug}`) || [],
    fallback: false,
  };
}

import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import ProductBody from "../../components/product/product-body";
import MoreProducts from "../../components/product/more-products";
import Header from "../../components/header";
import SectionSeparator from "../../components/section-separator";
import Layout from "../../components/layout";
import {
  getAllProductsWithSlug,
  getProductAndMoreProducts,
  getArticleText,
} from "../../lib/api";
import ProductTitle from "../../components/product/product-title";
import Head from "next/head";
// import { CMS_NAME } from "../../lib/constants";
// import markdownToHtml from "../../lib/markdownToHtml";
import CoverImage from "../../components/cover-image";
import { useDispatchCart, useCart } from "../../components/cart/cart-context";

export default function Product({ product, moreProducts, dummyText }) {
  // console.log(product)
  const router = useRouter();
  const dispatch = useDispatchCart();
  const { state, showCart } = useCart();
  const [visible, setVisible] = showCart;
  moreProducts = moreProducts.slice(0, 10)
  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        item: product.Beskr_SV,
        price: product.Pris,
        quantity: 1,
        slug: product.Friendly_SV,
      },
    });
    setVisible(true);
    // console.log(state)
  };
  if (!router.isFallback && !product?.Friendly_SV) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout showCartButton={"true"}>
      <Container>
        <Header />
        {router.isFallback ? (
          <ProductTitle>Loading…</ProductTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>{product.Beskr_SV} | Next.js Ecommerce Example</title>
                {/* <meta property="og:image" content={product.ogImage.responsiveImage} /> */}
              </Head>
              <ProductTitle>{product.Beskr_SV}</ProductTitle>
              <div className="flex flex-col md:flex-row items-center md:items-start">
                <div className="w-2/3 md:w-1/3 h-auto">
                  <CoverImage
                    productName={product.Artnr}
                    responsiveImage={product.Artnr}
                    size="h-64"
                  />
                </div>
                <div className="w-full md:w-2/3 md:pl-8">
                  <div className="w-full items-center mt-4 md:mt-0 px-10 md:px-0 md:w-4/5 flex justify-between">
                    <div className="flex-col flex">
                      <p className="text-3xl font-bold">{product.Pris}:-</p>
                      <p className="text-xs">({product.Artnr})</p>
                    </div>
                    <button
                      className="bg-black text-white rounded-md text-lg px-6 h-10 py-1 cursor-pointer hover:bg-white hover:text-black border-2 border-black transition-200"
                      onClick={handleAddToCart}
                    >
                      Buy
                    </button>
                  </div>
                  <div className="w-full px-4 pt-10 md:px-0 md:w-4/5">
                    {product.Text_Long ? (
                      <ProductBody
                        content={product.Text_Long}
                      />
                    ) : (
                      <p className="text-sm leading-relaxed text-justify">
                        {dummyText}
                      </p>
                    )}
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

export async function getStaticProps({ params }) {
  const data = await getProductAndMoreProducts(params.slug);
  // const artNrParam = data?.product?.Artnr;
  const dummyText = await fetch("https://loripsum.net/api/1/short/plaintext").then(response => response.text()).then(res => res)
  // const description = await getArticleText(artNrParam);
  return {
    props: {
      product: {
        ...data?.product,
      },
      moreProducts: data?.moreProducts,
      dummyText
    },
  };
}

export async function getStaticPaths() {
  const allProducts = await getAllProductsWithSlug();
  return {
    paths:
      allProducts?.map((product) => `/products/${product.Friendly_SV}`) || [],
    fallback: false,
  };
}

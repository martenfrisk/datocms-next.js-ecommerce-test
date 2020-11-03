import 'isomorphic-unfetch'

const API_URL = 'https://graphql.datocms.com'
const API_TOKEN = process.env.NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN

// See: https://www.datocms.com/blog/offer-responsive-progressive-lqip-images-in-2020
const responsiveImageFragment = `
  fragment responsiveImageFragment on ResponsiveImage {
  srcSet
    webpSrcSet
    sizes
    src
    width
    height
    aspectRatio
    alt
    title
    bgColor
    base64
  }
`

async function fetchAPI(query, { variables, preview } = {}) {
  const res = await fetch(API_URL + (preview ? '/preview' : ''), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

export async function getPreviewProductBySlug(slug) {
  const data = await fetchAPI(
    `
    query ProductBySlug($slug: String) {
      product(filter: {slug: {eq: $slug}, cover: {neq: null}}) {
        slug
      }
    }`,
    {
      preview: true,
      variables: {
        slug,
      },
    }
  )
  return data?.product
}
// export async function getAllPostsWithSlug() {
//   const data = await fetchAPI(`
//     {
//       allPosts {
//         slug
//       }
//     }
//   `)
//   return data?.allPosts
// }
export async function getAllProductsWithSlug() {
  const data = await fetchAPI(`
    {
      allProducts(filter: {cover: {neq: null}}) {
        slug
      }
    }
  `)
  return data?.allProducts
}


export async function getAllProductsForHome(preview) {
  const data = await fetchAPI(
    `
    {
      allProducts(orderBy: _createdAt_DESC, first: "20", filter: {cover: {neq: null}}) {
        productName
        slug
        description
        descriptionShort
        retailPrice
        cover {
          responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 500, h: 500 }) {
            ...responsiveImageFragment
          }
        }
      }
    }
    ${responsiveImageFragment}

  `,
    { preview }
  )
  return data?.allProducts
}

export async function getProductAndMoreProducts(slug, preview) {
  const data = await fetchAPI(
    `
  query ProductBySlug($slug: String) {
    product(filter: {slug: {eq: $slug}, cover: {neq: null}}) {
      productName
      slug
      description
      descriptionShort
      retailPrice
      ogImage: cover{
        url(imgixParams: {fm: jpg, fit: crop, w: 500, h: 500 })
      }
      cover {
        responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 500, h: 500 }) {
          ...responsiveImageFragment
        }
      }
    }

    moreProducts: allProducts(orderBy: createdAt_DESC, first: 2, filter: {slug: {neq: $slug}, cover: {neq: null}}) {
      productName
      slug
      description
      descriptionShort
      retailPrice
      cover {
        responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 500, h: 500 }) {
          ...responsiveImageFragment
        }
      }
    }
  }

  ${responsiveImageFragment}
  `,
    {
      preview,
      variables: {
        slug,
      },
    }
  )
  return data
}

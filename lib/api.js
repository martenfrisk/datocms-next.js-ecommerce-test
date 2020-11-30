import 'isomorphic-unfetch'

const API_URL = 'https://graphql.datocms.com'
const API_TOKEN = process.env.NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN

// See: https://www.datocms.com/blog/offer-responsive-progressive-lqip-images-in-2020
const responsiveImageFragment = `
  fragment responsiveImageFragment on ResponsiveImage {
    srcSet
    sizes
    src
    width
    height
    aspectRatio
    alt
    title
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
    // eslint-disable-next-line no-console
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

export async function getProductRating(slug) {
  const data = await fetchAPI(
    `
    query ProductBySlug($slug: String) {
      product(filter: {slug: {eq: $slug}, cover: {neq: null}}) {
        rating
      }
    }`,
    {
      preview: true,
      variables: {
        slug,
      },
    },
  )
  return data?.product
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
    },
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

export async function getAllProductsForHome() {
  const data = await fetchAPI(
    `
      query HeroAndOthers {
        product(filter: {heroimg: {neq: null}, cover: {neq: null}}) {
          productName
          subname
          slug
          rating
          description
          descriptionShort
          retailPrice
          platform
          cover {
            responsiveImage(imgixParams: {auto: format, fit: clip, w: 220, h: 220 }) {
              ...responsiveImageFragment
            }
          }
          heroimg {
            responsiveImage(imgixParams: {auto: format, fit: fillmax, w: 1000, h: 1000 }) {
              ...responsiveImageFragment
            }
          }
        }
        allProducts(orderBy: _updatedAt_DESC, first: 20, filter: {cover: {neq: null}}) {
          productName
          subname
          slug
          rating
          description
          descriptionShort
          retailPrice
          platform
          cover {
            responsiveImage(imgixParams: {auto: format, fit: clip, w: 220, h: 220 }) {
              ...responsiveImageFragment
            }
          }
        }
      }
    ${responsiveImageFragment}
  `,
  )
  return data
}

export function getAllProductsForSearch(preview) {
  const data = fetchAPI(
    `
    {
      allProducts(orderBy: _updatedAt_DESC, filter: {cover: {neq: null}}) {
        productName
        subname
        slug
        description
        descriptionShort
        platform
      }
    }
  `,
    { preview },
  )
  return data
}

export async function getProductAndMoreProducts(slug, preview) {
  const data = await fetchAPI(
    `
  query ProductBySlug($slug: String) {
    product(filter: {slug: {eq: $slug}, cover: {neq: null}}) {
      productName
      subname
      slug
      rating
      description
      descriptionShort
      retailPrice
      platform
      cover {
        responsiveImage(imgixParams: {auto: format, fit: clip, w: 220, h: 220 }) {
          ...responsiveImageFragment
        }
      }
    }

    moreProducts: allProducts(orderBy: updatedAt_DESC, first: 8, filter: {slug: {neq: $slug}, cover: {neq: null}}) {
      productName
      subname
      slug
      rating
      description
      descriptionShort
      retailPrice
      platform
      cover {
        responsiveImage(imgixParams: {auto: format, fit: clip, w: 220, h: 220 }) {
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
    },
  )
  return data
}

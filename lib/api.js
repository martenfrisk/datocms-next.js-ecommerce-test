import 'isomorphic-unfetch'

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

async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(process.env.API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
      product(id: $slug) {
        Friendly_SV
      }
    }`,
    {
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
      allProducts {
        Friendly_SV
      }
    }
  `)
  return data?.allProducts
}


export async function getAllProductsForHome() {
  const data = await fetchAPI(
    `
    {
      allProducts {
        Artnr
        Friendly_SV
        Pris
        Beskr_SV
        Text_Short
        Text_Long
      }
    }
  `,
  )
  return data?.allProducts
}

export async function getProductAndMoreProducts(slug) {
  const data = await fetchAPI(
    `
  query ProductBySlug($slug: String) {
    product(id: $slug) {
      Artnr
      Vaum
      Makulerad
      Saldo
      Beskr_SV
      Friendly_SV
      Pris
      Pris_Extra
      Text_Short
      Text_Long
    }

    moreProducts: allProducts {
      Artnr
      Vaum
      Makulerad
      Saldo
      Beskr_SV
      Friendly_SV
      Pris
      Pris_Extra
      Text_Short
      Text_Long
    }
  }

  `,
    {
      variables: {
        slug,
      },
    }
  )
  return data
}

export async function getArticleText(Artnr) {
  const data = await fetchAPI(
    `
  query getArticleText($Artnr: String) {
    searchText(id: $Artnr) {
      Artnr
      ID
      Typ
      Sprak
      Varde
    }
  }
  `,
    {
      variables: {
        Artnr,
      },
    }
  )
  return data
}

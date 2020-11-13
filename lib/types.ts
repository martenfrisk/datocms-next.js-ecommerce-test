export type ProductType = {
    productName: string,
    slug: string,
    subname?: string,
    rating?: number,
    description: string,
    descriptionShort: string,
    retailPrice: string,
    platform: string,
    cover: { responsiveImage: any },
    heroimg?: { responsiveImage: any }
  }

export const ItemTypes = {
  PRODUCT: 'product',
}

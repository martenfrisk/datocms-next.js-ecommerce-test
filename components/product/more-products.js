import ProductPreview from './product-preview'

export default function MoreProducts({ products }) {
  return (
    <section>
      <h2 className="my-8 text-4xl md:text-5xl font-bold tracking-tighter leading-tight">
        More Products
      </h2>
      <div className="
      grid 
      grid-cols-2 
      col-gap-20
      md:grid-cols-3 
      md:col-gap-40 
      row-gap-10 
      mx-4
      md:mx-16
      md:row-gap-20 
      mb-32">
        {products.map(product => (
          <ProductPreview
            key={product.slug}
            productName={product.productName}
            slug={product.slug}
            description={product.description}
            descriptionShort={product.descriptionShort}
            retailPrice={product.retailPrice}
            cover={product.cover}
          />
        ))}
      </div>
    </section>
  )
}

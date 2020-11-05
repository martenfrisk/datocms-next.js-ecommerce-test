import ProductPreview from './product-preview'

export default function MoreProducts({ products, header = "More Products" }) {
  return (
    <section className="flex flex-col items-center">
      <h2 className="my-8 text-4xl md:text-5xl font-bold tracking-tighter leading-tight">
        {header}
      </h2>
      <div className="
      flex flex-wrap
      justify-around
      md:mx-32
      mb-20">
        {products.map(product => (
          <ProductPreview
            key={product.Artnr}
            productId={product.Artnr}
            productName={product.Beskr_SV}
            slug={product.Friendly_SV}
            // description={product.description}
            // descriptionShort={product.descriptionShort}
            retailPrice={product.Pris}
            // cover={product.cover}
          />
        ))}
      </div>
    </section>
  )
}

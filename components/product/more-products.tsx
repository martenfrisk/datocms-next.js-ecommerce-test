import ProductPreview from '@/product/product-preview';

type MoreProductsProps = {
  products: any[]
}

export default function MoreProducts(
  { products, header = 'More Products' }: { products: MoreProductsProps['products'], header?: string},
): React.ReactElement<MoreProductsProps> {
  return (
    <section>
      <h2 className="my-8 text-4xl md:text-5xl font-bold tracking-tighter leading-tight">
        {header}
      </h2>
      <div className="
      flex flex-wrap
      justify-evenly
      mx-2
      md:mx-16
      mb-0
      sm:mb-20"
      >
        {products.map((product) => (
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
  );
}

MoreProducts.defaultProps = {
  header: 'More Products',
}

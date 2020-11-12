import ProductPreview from '@/product/product-preview';
import { ProductType } from '@/lib/types'

type MoreProductsProps = {
  products: ProductType[]
}

export default function MoreProducts(
  { products, header = 'More Products' }: { products: MoreProductsProps['products'], header?: string},
): React.ReactElement<MoreProductsProps> {
  return (
    <section>
      <h2 className="my-8 text-4xl font-bold leading-tight tracking-tighter md:text-5xl">
        {header}
      </h2>
      <div className="flex flex-wrap mx-2 mb-0 justify-evenly md:mx-16 sm:mb-20">
        {products.map((product, index) => (
          <ProductPreview
            key={product.slug}
            productName={product.productName}
            slug={product.slug}
            description={product.description}
            descriptionShort={product.descriptionShort}
            retailPrice={product.retailPrice}
            cover={product.cover}
            animate={index === 0}
          />
        ))}
      </div>
    </section>
  );
}

MoreProducts.defaultProps = {
  header: 'More Products',
}

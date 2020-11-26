import ProductPreview from '@/product/product-preview';
import { ProductType } from '@/lib/types'

type MoreProductsProps = {
  products: ProductType[]
}

export default function MoreProducts(
  { products, header = '', platform = '' }: { products: MoreProductsProps['products'], header?: string, platform?: string},
): React.ReactElement<MoreProductsProps> {
  return (
    <section className="z-10 bg-white text-blueish-800">
      {header !== '' && (
        <h2
          className="py-1 pl-6 pr-16 mb-2 text-4xl tracking-tighter text-white bg-blue-600 md:text-5xl"
          style={{ clipPath: 'polygon(0 0, 100% 0%, 90% 100%, 0% 100%)', width: 'fit-content' }}
        >
          {header}
        </h2>
      )}
      <div className="flex flex-wrap justify-start mb-0 md:mx-20">
        {platform === '' && (
          products.map((product, index) => (
            <ProductPreview
              key={product.slug}
              productName={product.productName}
              subname={product.subname}
              slug={product.slug}
              description={product.description}
              descriptionShort={product.descriptionShort}
              retailPrice={product.retailPrice}
              platform={product.platform}
              cover={product.cover}
              animate={index === 0}
            />
          ))
        )}
        {platform !== '' && (
          <>
            {products.filter((product) => product.platform === platform).map((product, index) => (
              <ProductPreview
                key={product.slug}
                productName={product.productName}
                subname={product.subname}
                slug={product.slug}
                description={product.description}
                descriptionShort={product.descriptionShort}
                retailPrice={product.retailPrice}
                platform={product.platform}
                cover={product.cover}
                animate={index === 0}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}

MoreProducts.defaultProps = {
  header: '',
  platform: '',
}

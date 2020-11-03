// import { Image } from 'react-datocms'
// import cn from 'classnames'
import Link from "next/link";
import Image from "next/image";

export default function CoverImage({
  productName,
  responsiveImage,
  slug,
  rotate = false,
}) {
  let willRotate;
  rotate === true
    ? (willRotate = {transform: 'rotateY(-20deg) rotateX(-10deg)', filter: 'drop-shadow(-10px 10px 0px skyblue)' })
    : (willRotate = { transform: "rotateY(0deg) rotateX(0deg)" });
  const cover = responsiveImage.replace('"', "");
  return (
    <div className="-mx-5 sm:mx-0 rotate" style={willRotate}
    
      className={`hover:shadow-4xl shadow-3xl transition-shadow duration-200`}
    >
      {slug ? (
        <Link as={`/products/${slug}`} href="/products/[slug]"
        
        >
          <a aria-label={productName}
          
          >
            <Image
              src={cover}
              alt={`Cover Image for ${productName}`}
              width={500}
              height={500}
              layout="responsive"
            />
          </a>
        </Link>
      ) : (
        <Image
          src={cover}
          className={`hover:shadow-4xl shadow-3xl transition-shadow duration-200`}
          alt={`Cover Image for ${productName}`}
          width={500}
          height={500}
          style={willRotate}
          layout="responsive"
        />
      )}
    </div>
  );
}

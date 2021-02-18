/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
// import Image from 'next/image'

const ImageOpt = ({
	src,
	className,
	width = 300,
	height = 300,
	notLazy = false,
	style = {},
}: {
	src: string
	className: string
	width?: number
	height?: number
	notLazy?: boolean
	style?: any
}) => (
	<picture>
		<source srcSet={`${process.env.NODE_ENV === 'development' ? '' : ''}/images/${src}.avif`} type="image/avif" />
		<source srcSet={`${process.env.NODE_ENV === 'development' ? '' : ''}/images/${src}.webp`} type="image/webp" />
		<img
			src={`${process.env.NODE_ENV === 'development' ? '' : ''}/images/${src}.jpg`}
			srcSet={`${process.env.NODE_ENV === 'development' ? '' : ''}/images/liten/${src}_S.jpg 550w, ${process.env.NODE_ENV === 'development' ? '' : ''}/images/${src}.jpg 700w, ${process.env.NODE_ENV === 'development' ? '' : ''}/images/zoom/${src}_1.jpg`}
			sizes="
				(min-width:1400px) 320px,
				(min-width:990px) calc(100vw/4),
				(min-width:768px) calc(100vw/3),
				50vw
			"
			className={className}
			width={width}
			height={height}
			style={style}
			loading={notLazy ? 'eager' : 'lazy'}
			alt=""
		/>
	</picture>
)

export default ImageOpt

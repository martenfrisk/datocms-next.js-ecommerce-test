export default function ProductTitle({ children }: { children: any}) {
  return (
    <h1
      className="mb-4 text-4xl font-semibold text-center md:text-5xl lg:text-6xl md:leading-none md:mb-12 md:text-left"
    >
      {children}
    </h1>
  );
}

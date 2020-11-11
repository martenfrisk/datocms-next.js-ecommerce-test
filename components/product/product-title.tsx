export default function ProductTitle({ children }: { children: any}) {
  return (
    <h1 className="
  text-4xl
 md:text-6xl
 lg:text-7xl
 font-bold
 tracking-tighter
 leading-tight
 md:leading-none
 mb-4
 md:mb-12
 text-center
 md:text-left"
    >
      {children}
    </h1>
  );
}

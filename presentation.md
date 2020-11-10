Vad är Next.js?

  1. React framework

Varför Next.js?

  1. Stöd för både static generation och server-side rendering
  2. Automatisk code-splitting
  3. Client-side routing med prefetching
  4. Inbyggt stöd för TypeScript
  5. <Image>-komponent som optimerar bilder och automatiskt generar t.ex. WebP
    när det stöds av webbläsaren
    5a. Optimerar när den kallas av användaren, inte vid build time.
    5b. Automatisk lazy load och skapar ingen layout shift.
    5c. Skapat av Google
  6. Inbyggt stöd för CSS-moduler
  7. Fast refresh - bra DX

  Kontentan: väldigt snabba hemsidor optimerade för SEO

Testbutiken

  - Använder DatoCMS som back-end men går att stoppa in Askås
      _ Kräver dock node, som inte är installerat på lippman
      _ Hämtar data med graphQL med getStaticProps
      _ Behöver bara en fil för produktsidor men individuella sidor skapas vid build time (ingen negativ inverkan på SEO)

  - Varukorgen utnyttjar Reacts Context API (tänk redux) för global state
      Sparar varukorgen i localstorage

  - Just nu deployad på netlify med 100/100 på alla fyra lighthouse scores
      testbutik.netlify.app
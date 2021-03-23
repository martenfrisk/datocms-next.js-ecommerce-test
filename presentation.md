Jag har byggt två testbutiker. Den ena använder ramverket Next.js som bygger på React och den andra med Sveltes ramverk Sapper. 

## Next.js

  1. Stöd för både static generation och server-side rendering
  2. Automatisk code-splitting
  3. Client-side routing med prefetching
  4. Inbyggt stöd för TypeScript
  5. \<Image>-komponent som optimerar bilder och automatiskt generar t.ex. WebP
    när det stöds av webbläsaren
		- Optimerar när den kallas av användaren, inte vid build time.
		- Automatisk lazy load och utan layout shift.
		- Skapat av Google
  6. Inbyggt stöd för CSS-moduler
  7. Fast refresh - bra DX

  Kontentan: väldigt snabba hemsidor optimerade för SEO

## Testbutik 1 (Next.js/React)

- Använder Askås API som backend

- Hämtar data via getStaticProps

- Byggs med "next export" vilket skapar html-filer för alla sidor (går att köra på server utan Node.js) 

- Behöver bara en komponent för produktsidor men individuella sidor skapas vid build time (ingen negativ inverkan på SEO)

- Varukorgen utnyttjar Reacts Context API (tänk redux) för global state
	- Sparar varukorgen i localstorage och skickar till Askås API

- Skriven i TypeScript vilket minskar risken för buggar, framför allt när man hämtar data från api. 
    Varnar när något inte stämmer. 

- Styling = Tailwind CSS

## Testbutik 2 (Sapper/Svelte)

- Använder Sveltes motsvarighet till Next.js: Sapper.

### Svelte

- En "compiler" snarare än "framework" (som React, Vue etc)
- Spottar ut vanlig JavaScript och skapar därmed betyligt mindre bundles än traditionella frameworks
- Enkelt att blanda JavaScript med HTML. 
# Haven Storefront

Act as a Senior UI/UX Designer and Frontend Engineer. Build a high-end, responsive e-commerce storefront for a luxury home decor brand. The aesthetic should be modern, minimalist, and warm (think Japandi or high-end Scandinavian design). 

Technical Constraints:

- Use React and Tailwind CSS.

- Ensure the layout is fully mobile-responsive.

- Keep the component structure highly modular so the UI elements can easily be mapped to Shopify sections and blocks later.

Styling & Typography:

- Colors: Use a warm, neutral color palette (Off-whites like #FAFAFA, warm beige, soft taupe, and deep charcoal or matte black for text/accents).

- Typography: Use an elegant serif font (like Playfair Display or Merriweather) for headings, and a clean sans-serif (like Inter or Roboto) for body text and UI elements.

- Spacing: Use generous whitespace (large Tailwind padding/margin classes like py-16 or py-24 between sections) to create an editorial, premium feel.

Component Architecture:

1. Announcement Bar: Thin, dark background at the very top with sliding text (e.g., "Free shipping on orders over $150").

2. Navigation Header: Sticky header with a transparent background that turns solid white on scroll. Include a minimalist logo in the center, navigation links on the left, and Search, Account, and Cart icons on the right.

3. Hero Section: A full-height (min-h-screen) hero section with a high-quality, moody background image of a well-designed living room. Include a large, elegant headline ("Elevate Your Space"), a subtle subheadline, and a solid, contrasting CTA button ("Shop the Collection").

4. Featured Categories: A grid of 3-4 cards (e.g., Ceramics, Textiles, Lighting). Each card should have a high-quality image, overlay text, and a subtle zoom effect on hover (hover:scale-105 transition-transform duration-500).

5. Bestsellers Carousel/Grid: A 4-column grid showcasing individual products. Product cards must include: an image, product title, price, and a subtle "Add to Cart" button that appears on hover.

6. Story/About Section: A 50/50 split layout with an image on one side and a short brand story on the other, emphasizing craftsmanship and sustainable materials.

7. Footer: Clean, multi-column footer with newsletter signup, quick links, and social icons.

Interactivity:

- Add smooth fade-in animations as elements scroll into view.

- Ensure buttons have distinct hover states (e.g., background color darkening, text color changing).

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/82bea0d9-2441-479b-96b0-853bd9a56c3e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

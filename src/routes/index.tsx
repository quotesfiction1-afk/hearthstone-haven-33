import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";

import artisanStory from "@/assets/artisan-story.jpg";
import categoriesImage from "@/assets/category-collection.jpg";
import heroImage from "@/assets/japandi-hero.jpg";
import productsImage from "@/assets/product-collection.jpg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Audo House | Modern Home Objects" },
      { name: "description", content: "Shop timeless ceramics, textiles, lighting and furniture crafted for considered living." },
      { property: "og:title", content: "Audo House | Modern Home Objects" },
      { property: "og:description", content: "Timeless objects, thoughtfully made for a quieter home." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Storefront,
});

const navLinks = ["New Arrivals", "Shop", "Collections", "Our Story"];
const categories = ["Ceramics", "Textiles", "Lighting", "Furniture"];
const categoryPositions = ["left-0", "-left-full", "-left-[200%]", "-left-[300%]"];
const products = [
  { name: "Esker Sculptural Vase", price: "$148", position: "left-top" },
  { name: "Mora Bouclé Cushion", price: "$96", position: "right-top" },
  { name: "Oris Table Lamp", price: "$320", position: "left-bottom" },
  { name: "Sumi Serving Bowl", price: "$118", position: "right-bottom" },
];

function AnnouncementBar() {
  return (
    <div className="relative z-50 h-8 overflow-hidden bg-primary text-primary-foreground">
      <div className="announcement-marquee flex w-max items-center py-2 text-[0.62rem] font-medium uppercase tracking-[0.18em]">
        {[0, 1].map((group) => (
          <div key={group} className="flex shrink-0 items-center">
            <span className="mx-12">Free shipping on orders over $150</span><span>•</span>
            <span className="mx-12">Made slowly, designed to last</span><span>•</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Header({ cartCount }: { cartCount: number }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn("fixed inset-x-0 top-8 z-40 border-b border-transparent transition-all duration-500", scrolled || menuOpen ? "border-border bg-background text-foreground" : "text-hero-foreground")}>
      <div className="mx-auto grid h-18 max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-5 lg:px-10">
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => <a key={link} href={link === "Our Story" ? "#story" : "#shop"} className="text-[0.68rem] font-medium uppercase tracking-[0.14em] transition-opacity hover:opacity-55">{link}</a>)}
        </nav>
        <Button variant="ghost" size="icon" className="justify-self-start lg:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <X /> : <Menu />}</Button>
        <a href="#top" className="font-serif text-2xl font-semibold uppercase tracking-[0.13em]">Audo</a>
        <div className="flex items-center justify-self-end">
          <Button variant="ghost" size="icon" aria-label="Search"><Search className="h-[18px] w-[18px]" /></Button>
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="Account"><UserRound className="h-[18px] w-[18px]" /></Button>
          <Button variant="ghost" size="icon" className="relative" aria-label={`Cart with ${cartCount} items`}><ShoppingBag className="h-[18px] w-[18px]" />{cartCount > 0 && <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[0.55rem] text-accent-foreground">{cartCount}</span>}</Button>
        </div>
      </div>
      {menuOpen && <nav className="border-t border-border bg-background px-6 py-8 text-foreground lg:hidden">{navLinks.map((link) => <a key={link} href={link === "Our Story" ? "#story" : "#shop"} onClick={() => setMenuOpen(false)} className="block border-b border-border py-4 font-serif text-2xl">{link}</a>)}</nav>}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-primary text-hero-foreground">
      <img src={heroImage} alt="Warm, minimalist living room furnished with sculptural objects" width={1920} height={1280} className="absolute inset-0 h-full w-full object-cover object-center" />
      <div className="absolute inset-0 bg-overlay" />
      <div className="relative mx-auto flex min-h-screen max-w-[1600px] items-end px-5 pb-16 pt-32 sm:items-center sm:pb-0 lg:px-10">
        <div className="max-w-2xl">
          <p className="mb-5 text-[0.68rem] font-semibold uppercase tracking-[0.22em]">Objects for considered living</p>
          <h1 className="font-serif text-6xl leading-[0.98] sm:text-7xl lg:text-8xl">Elevate Your Space</h1>
          <p className="mt-6 max-w-md text-sm leading-7 text-hero-foreground/85 sm:text-base">Timeless forms, honest materials, and quiet details designed to bring meaning to the everyday.</p>
          <Button asChild variant="light" className="mt-9"><a href="#shop">Shop the collection</a></Button>
        </div>
      </div>
    </section>
  );
}

function FeaturedCategories() {
  return (
    <section id="shop" className="px-5 py-20 sm:py-28 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1600px]">
        <div className="reveal-on-scroll mb-10 flex items-end justify-between sm:mb-14">
          <div><p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Shop by category</p><h2 className="font-serif text-4xl sm:text-5xl">A home, thoughtfully composed.</h2></div>
          <a href="#bestsellers" className="hidden border-b border-foreground pb-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] sm:block">View all</a>
        </div>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4">
          {categories.map((category, index) => (
            <a href="#bestsellers" key={category} className="group reveal-on-scroll relative aspect-[3/4] overflow-hidden bg-muted">
              <img src={categoriesImage} alt={`${category} collection`} width={1920} height={1024} loading="lazy" className={cn("absolute h-full w-[400%] max-w-none object-cover transition-transform duration-500 group-hover:scale-105", categoryPositions[index])} />
              <div className="absolute inset-0 bg-gradient-to-t from-overlay to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-hero-foreground sm:p-6"><h3 className="font-serif text-2xl sm:text-3xl">{category}</h3><span className="mt-2 inline-block text-[0.62rem] font-semibold uppercase tracking-[0.16em]">Explore collection</span></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductImage({ position, name }: { position: string; name: string }) {
  const positions: Record<string, string> = { "left-top": "left-0 top-0", "right-top": "-left-full top-0", "left-bottom": "left-0 -top-full", "right-bottom": "-left-full -top-full" };
  return <div className="relative aspect-[4/5] overflow-hidden bg-muted"><img src={productsImage} alt={name} width={1920} height={1024} loading="lazy" className={cn("absolute h-[200%] w-[200%] max-w-none object-cover transition-transform duration-500 group-hover:scale-[1.03]", positions[position])} /></div>;
}

function Bestsellers({ onAdd }: { onAdd: (name: string) => void }) {
  return (
    <section id="bestsellers" className="bg-card px-5 py-20 sm:py-28 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1600px]">
        <div className="reveal-on-scroll mb-12 text-center"><p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">The edit</p><h2 className="font-serif text-4xl sm:text-5xl">Most loved</h2></div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 lg:grid-cols-4 lg:gap-5">
          {products.map((product) => (
            <article key={product.name} className="group reveal-on-scroll">
              <ProductImage position={product.position} name={product.name} />
              <div className="grid min-h-24 grid-cols-[minmax(0,1fr)_auto] items-start gap-3 pt-4"><div className="min-w-0"><h3 className="font-serif text-base sm:text-lg">{product.name}</h3><p className="mt-1 text-xs text-muted-foreground">{product.price}</p></div><Button size="icon" variant="outline" aria-label={`Add ${product.name} to cart`} onClick={() => onAdd(product.name)} className="sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"><ShoppingBag className="h-4 w-4" /></Button></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="grid lg:grid-cols-2">
      <div className="min-h-[60vh] overflow-hidden"><img src={artisanStory} alt="Artisan shaping a clay vessel by hand" width={1200} height={1408} loading="lazy" className="h-full w-full object-cover" /></div>
      <div className="reveal-on-scroll flex items-center bg-secondary px-7 py-20 sm:px-16 lg:px-[12%]">
        <div className="max-w-xl"><p className="mb-5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Our philosophy</p><h2 className="font-serif text-4xl leading-tight sm:text-6xl">Made by hand.<br /><span className="italic">Meant to endure.</span></h2><p className="mt-8 text-sm leading-7 text-muted-foreground sm:text-base">We work with independent makers who share our belief that beauty lives in restraint. Each piece is shaped from natural, responsibly sourced materials and made in small batches to last for generations.</p><Button asChild variant="outline" className="mt-8"><a href="#top">Discover our story</a></Button></div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-primary px-5 py-16 text-primary-foreground lg:px-10 lg:py-20">
      <div className="mx-auto grid max-w-[1600px] gap-14 border-b border-primary-foreground/20 pb-16 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div><div className="font-serif text-3xl uppercase tracking-[0.13em]">Audo</div><p className="mt-5 max-w-sm text-sm leading-6 text-primary-foreground/65">A considered collection of enduring objects for home and life.</p></div>
        {[["Shop", "New Arrivals", "Bestsellers", "All Collections"], ["About", "Our Story", "Journal", "Stockists"], ["Help", "Shipping & Returns", "Care Guide", "Contact"]].map(([title, ...links]) => <div key={title}><h3 className="mb-5 text-[0.65rem] font-semibold uppercase tracking-[0.18em]">{title}</h3>{links.map((link) => <a href="#top" key={link} className="mb-3 block text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground">{link}</a>)}</div>)}
      </div>
      <div className="mx-auto grid max-w-[1600px] gap-8 py-12 lg:grid-cols-[1fr_auto] lg:items-end"><div><h3 className="font-serif text-2xl">Notes on considered living.</h3><form className="mt-5 flex max-w-md border-b border-primary-foreground/45" onSubmit={(event) => event.preventDefault()}><label htmlFor="email" className="sr-only">Email address</label><input id="email" type="email" required placeholder="Your email address" className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-primary-foreground/45" /><Button variant="ghost" size="sm" type="submit" className="text-primary-foreground">Subscribe</Button></form></div><div className="flex items-center gap-4"><a href="#top" aria-label="Instagram"><Instagram className="h-5 w-5" /></a><span className="text-xs text-primary-foreground/50">© 2026 Audo House</span></div></div>
    </footer>
  );
}

function Storefront() {
  const [cartCount, setCartCount] = useState(0);
  return <main><AnnouncementBar /><Header cartCount={cartCount} /><Hero /><FeaturedCategories /><Bestsellers onAdd={() => setCartCount((count) => count + 1)} /><Story /><Footer /></main>;
}
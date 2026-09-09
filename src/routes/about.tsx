import { Link, createFileRoute } from "@tanstack/react-router";

import artisanStory from "@/assets/artisan-story.jpg";
import { SiteFooter } from "@/components/storefront/SiteFooter";
import { SiteHeader } from "@/components/storefront/SiteHeader";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story | Audo House" },
      { name: "description", content: "Audo House works with independent makers to create enduring objects from natural, responsibly sourced materials." },
      { property: "og:title", content: "Our Story | Audo House" },
      { property: "og:description", content: "Craftsmanship, restraint and responsibly sourced materials." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main>
      <SiteHeader />
      <section className="grid lg:grid-cols-2">
        <div className="min-h-[60vh] overflow-hidden">
          <img src={artisanStory} alt="Artisan shaping a clay vessel by hand" className="h-full w-full object-cover" />
        </div>
        <div className="flex items-center bg-secondary px-7 py-20 sm:px-16 lg:px-[12%]">
          <div className="max-w-xl">
            <p className="mb-5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Our philosophy</p>
            <h1 className="font-serif text-4xl leading-tight sm:text-6xl">
              Made by hand.<br />
              <span className="italic">Meant to endure.</span>
            </h1>
            <p className="mt-8 text-sm leading-7 text-muted-foreground sm:text-base">
              We work with independent makers who share our belief that beauty lives in restraint. Each piece is shaped from
              natural, responsibly sourced materials and made in small batches to last for generations.
            </p>
            <Button asChild variant="outline" className="mt-8">
              <Link to="/shop">Shop the collection</Link>
            </Button>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

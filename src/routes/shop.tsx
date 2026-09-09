import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { ProductGrid } from "@/components/storefront/ProductCard";
import { SiteFooter } from "@/components/storefront/SiteFooter";
import { SiteHeader } from "@/components/storefront/SiteHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchProducts } from "@/lib/shopify";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All | Audo House" },
      { name: "description", content: "Browse every ceramic, textile, light and object in the Audo House collection." },
      { property: "og:title", content: "Shop All | Audo House" },
      { property: "og:description", content: "Browse every piece in the Audo House collection." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products", "all"],
    queryFn: () => fetchProducts(48),
  });

  return (
    <main>
      <SiteHeader />
      <section className="px-5 py-16 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1600px]">
          <header className="mb-12 max-w-2xl">
            <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">The collection</p>
            <h1 className="font-serif text-5xl sm:text-6xl">Shop all</h1>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              Objects made in small batches from natural, responsibly sourced materials.
            </p>
          </header>

          {isLoading ? (
            <div className="grid grid-cols-2 gap-x-3 gap-y-10 lg:grid-cols-4 lg:gap-5">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index}>
                  <Skeleton className="aspect-[4/5] w-full" />
                  <Skeleton className="mt-4 h-4 w-2/3" />
                  <Skeleton className="mt-2 h-3 w-1/4" />
                </div>
              ))}
            </div>
          ) : (
            <ProductGrid products={products ?? []} />
          )}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

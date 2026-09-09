import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";

import { ProductGrid } from "@/components/storefront/ProductCard";
import { SiteFooter } from "@/components/storefront/SiteFooter";
import { SiteHeader } from "@/components/storefront/SiteHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchCollectionByHandle } from "@/lib/shopify";

export const Route = createFileRoute("/collections/$handle")({
  head: ({ params }) => {
    const title = `${params.handle.replace(/-/g, " ")} | Audo House`;
    return {
      meta: [
        { title },
        { name: "description", content: "Shop this Audo House collection of considered objects for the home." },
        { property: "og:title", content: title },
        { property: "og:description", content: "Shop this Audo House collection of considered objects." },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CollectionPage,
});

function CollectionPage() {
  const { handle } = Route.useParams();
  const { data: collection, isLoading } = useQuery({
    queryKey: ["collection", handle],
    queryFn: () => fetchCollectionByHandle(handle, 48),
  });

  return (
    <main>
      <SiteHeader />
      <section className="px-5 py-16 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1600px]">
          <nav className="mb-8 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            <Link to="/collections" className="hover:text-foreground">Collections</Link>
          </nav>

          {isLoading ? (
            <>
              <Skeleton className="h-12 w-72" />
              <div className="mt-12 grid grid-cols-2 gap-x-3 gap-y-10 lg:grid-cols-4 lg:gap-5">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="aspect-[4/5] w-full" />
                ))}
              </div>
            </>
          ) : !collection ? (
            <div className="border border-dashed border-border py-24 text-center">
              <p className="font-serif text-2xl">Collection not found</p>
              <Link to="/shop" className="mt-4 inline-block border-b border-foreground pb-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em]">
                Shop all
              </Link>
            </div>
          ) : (
            <>
              <header className="mb-12 max-w-2xl">
                <h1 className="font-serif text-5xl sm:text-6xl">{collection.title}</h1>
                {collection.description && (
                  <p className="mt-5 text-sm leading-7 text-muted-foreground">{collection.description}</p>
                )}
              </header>
              <ProductGrid products={collection.products} />
            </>
          )}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

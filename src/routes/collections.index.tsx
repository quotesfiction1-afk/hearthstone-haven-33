import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";

import { SiteFooter } from "@/components/storefront/SiteFooter";
import { SiteHeader } from "@/components/storefront/SiteHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchCollections } from "@/lib/shopify";

export const Route = createFileRoute("/collections/")({
  head: () => ({
    meta: [
      { title: "Collections | Audo House" },
      { name: "description", content: "Explore Audo House collections — ceramics, textiles, lighting and furniture." },
      { property: "og:title", content: "Collections | Audo House" },
      { property: "og:description", content: "Explore curated collections of considered home objects." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CollectionsPage,
});

function CollectionsPage() {
  const { data: collections, isLoading } = useQuery({
    queryKey: ["collections"],
    queryFn: () => fetchCollections(24),
  });

  return (
    <main>
      <SiteHeader />
      <section className="px-5 py-16 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1600px]">
          <header className="mb-12 max-w-2xl">
            <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Browse</p>
            <h1 className="font-serif text-5xl sm:text-6xl">Collections</h1>
          </header>

          {isLoading ? (
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="aspect-[3/4] w-full" />
              ))}
            </div>
          ) : (collections ?? []).length === 0 ? (
            <div className="border border-dashed border-border py-24 text-center">
              <p className="font-serif text-2xl">No collections yet</p>
              <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
                Once products are grouped into collections, they'll appear here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4">
              {(collections ?? []).map((collection) => (
                <Link
                  key={collection.id}
                  to="/collections/$handle"
                  params={{ handle: collection.handle }}
                  className="group relative aspect-[3/4] overflow-hidden bg-muted"
                >
                  {collection.image && (
                    <img
                      src={collection.image.url}
                      alt={collection.image.altText ?? collection.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-overlay to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-hero-foreground sm:p-6">
                    <h2 className="font-serif text-2xl sm:text-3xl">{collection.title}</h2>
                    <span className="mt-2 inline-block text-[0.62rem] font-semibold uppercase tracking-[0.16em]">
                      Explore collection
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

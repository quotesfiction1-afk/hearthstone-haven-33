import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { SiteFooter } from "@/components/storefront/SiteFooter";
import { SiteHeader } from "@/components/storefront/SiteHeader";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchProductByHandle, formatMoney } from "@/lib/shopify";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";

export const Route = createFileRoute("/product/$handle")({
  head: ({ params }) => {
    const title = `${params.handle.replace(/-/g, " ")} | Audo House`;
    return {
      meta: [
        { title },
        { name: "description", content: "A considered object, made in small batches from natural materials." },
        { property: "og:title", content: title },
        { property: "og:description", content: "A considered object, made in small batches from natural materials." },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { handle } = Route.useParams();
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", handle],
    queryFn: () => fetchProductByHandle(handle),
  });

  const addItem = useCartStore((s) => s.addItem);
  const cartLoading = useCartStore((s) => s.isLoading);
  const getCheckoutUrl = useCartStore((s) => s.getCheckoutUrl);

  const variants = product?.node.variants.edges.map((edge) => edge.node) ?? [];
  const [variantId, setVariantId] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (variants.length > 0 && !variants.some((v) => v.id === variantId)) {
      setVariantId((variants.find((v) => v.availableForSale) ?? variants[0]).id);
    }
  }, [variants, variantId]);

  const selectedVariant = variants.find((v) => v.id === variantId) ?? variants[0];
  const images = product?.node.images.edges.map((edge) => edge.node) ?? [];

  const handleAdd = async () => {
    if (!product || !selectedVariant) return;
    await addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions ?? [],
    });
    toast.success("Added to your bag", { position: "top-center" });
  };

  const handleBuyNow = async () => {
    await handleAdd();
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) window.open(checkoutUrl, "_blank");
  };

  return (
    <main>
      <SiteHeader />
      <section className="px-5 py-12 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[1600px]">
          <nav className="mb-8 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            <Link to="/shop" className="hover:text-foreground">Shop</Link>
          </nav>

          {isLoading ? (
            <div className="grid gap-10 lg:grid-cols-2">
              <Skeleton className="aspect-[4/5] w-full" />
              <div className="space-y-4">
                <Skeleton className="h-10 w-2/3" />
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-32 w-full" />
              </div>
            </div>
          ) : !product ? (
            <div className="border border-dashed border-border py-24 text-center">
              <p className="font-serif text-2xl">Product not found</p>
              <Link to="/shop" className="mt-4 inline-block border-b border-foreground pb-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em]">
                Shop all
              </Link>
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <div className="aspect-[4/5] overflow-hidden bg-muted">
                  {images[activeImage] ? (
                    <img
                      src={images[activeImage].url}
                      alt={images[activeImage].altText ?? product.node.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="grid h-full place-items-center text-xs text-muted-foreground">No image</div>
                  )}
                </div>
                {images.length > 1 && (
                  <div className="mt-3 flex gap-3">
                    {images.map((image, index) => (
                      <button
                        key={image.url}
                        onClick={() => setActiveImage(index)}
                        aria-label={`View image ${index + 1}`}
                        className={cn("h-20 w-16 overflow-hidden bg-muted", index === activeImage ? "ring-1 ring-foreground" : "opacity-70")}
                      >
                        <img src={image.url} alt="" className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="lg:pt-6">
                <h1 className="font-serif text-4xl sm:text-5xl">{product.node.title}</h1>
                <p className="mt-4 text-lg">
                  {selectedVariant
                    ? formatMoney(selectedVariant.price.amount, selectedVariant.price.currencyCode)
                    : formatMoney(product.node.priceRange.minVariantPrice.amount, product.node.priceRange.minVariantPrice.currencyCode)}
                </p>

                {product.node.description && (
                  <p className="mt-7 max-w-lg text-sm leading-7 text-muted-foreground">{product.node.description}</p>
                )}

                {variants.length > 1 && (
                  <div className="mt-9">
                    <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Options</p>
                    <div className="flex flex-wrap gap-2">
                      {variants.map((variant) => (
                        <button
                          key={variant.id}
                          onClick={() => setVariantId(variant.id)}
                          disabled={!variant.availableForSale}
                          className={cn(
                            "border px-4 py-2 text-xs transition-colors",
                            variant.id === selectedVariant?.id ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground",
                            !variant.availableForSale && "cursor-not-allowed opacity-40",
                          )}
                        >
                          {variant.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-10 flex flex-col gap-3 sm:max-w-sm">
                  <Button onClick={handleAdd} disabled={!selectedVariant?.availableForSale || cartLoading}>
                    {cartLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : selectedVariant?.availableForSale ? "Add to bag" : "Sold out"}
                  </Button>
                  <Button variant="outline" onClick={handleBuyNow} disabled={!selectedVariant?.availableForSale || cartLoading}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Buy now
                  </Button>
                </div>

                <p className="mt-6 text-xs text-muted-foreground">Free shipping on orders over $150.</p>
              </div>
            </div>
          )}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

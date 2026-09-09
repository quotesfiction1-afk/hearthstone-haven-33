import { Link } from "@tanstack/react-router";
import { Loader2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { formatMoney, type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const node = product.node;
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  const image = node.images?.edges?.[0]?.node;
  const variant = node.variants?.edges?.find((edge) => edge.node.availableForSale)?.node ?? node.variants?.edges?.[0]?.node;
  const price = variant?.price ?? node.priceRange.minVariantPrice;

  const handleAdd = async () => {
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions ?? [],
    });
    toast.success(`${node.title} added to your bag`, { position: "top-center" });
  };

  return (
    <article className="group">
      <Link to="/product/$handle" params={{ handle: node.handle }} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          {image ? (
            <img
              src={image.url}
              alt={image.altText ?? node.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="grid h-full w-full place-items-center text-xs text-muted-foreground">No image</div>
          )}
        </div>
      </Link>
      <div className="grid min-h-24 grid-cols-[minmax(0,1fr)_auto] items-start gap-3 pt-4">
        <div className="min-w-0">
          <h3 className="font-serif text-base sm:text-lg">
            <Link to="/product/$handle" params={{ handle: node.handle }}>
              {node.title}
            </Link>
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">{formatMoney(price.amount, price.currencyCode)}</p>
        </div>
        <Button
          size="icon"
          variant="outline"
          aria-label={`Add ${node.title} to bag`}
          disabled={!variant || !variant.availableForSale || isLoading}
          onClick={handleAdd}
          className="sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingBag className="h-4 w-4" />}
        </Button>
      </div>
    </article>
  );
}

export function ProductGrid({ products }: { products: ShopifyProduct[] }) {
  if (products.length === 0) {
    return (
      <div className="border border-dashed border-border py-24 text-center">
        <p className="font-serif text-2xl">No products found</p>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          This store doesn't have any products yet. Tell us what you'd like to sell and the price, and we'll add it.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-10 lg:grid-cols-4 lg:gap-5">
      {products.map((product) => (
        <ProductCard key={product.node.id} product={product} />
      ))}
    </div>
  );
}

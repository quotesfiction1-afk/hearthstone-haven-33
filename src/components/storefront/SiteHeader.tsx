import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";

import { CartDrawer } from "@/components/storefront/CartDrawer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";

const navLinks = [
  { label: "Shop", to: "/shop" as const },
  { label: "Collections", to: "/collections" as const },
  { label: "Our Story", to: "/about" as const },
  { label: "Contact", to: "/contact" as const },
];

export function SiteHeader({ transparent = false }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const cartCount = useCartStore((s) => s.items.reduce((sum, item) => sum + item.quantity, 0));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = !transparent || scrolled || menuOpen;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-transparent transition-all duration-500",
        solid ? "border-border bg-background text-foreground" : "text-hero-foreground",
      )}
    >
      <div className="mx-auto grid h-18 max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-5 lg:px-10">
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-[0.68rem] font-medium uppercase tracking-[0.14em] transition-opacity hover:opacity-55"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Button
          variant="ghost"
          size="icon"
          className="justify-self-start lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X /> : <Menu />}
        </Button>
        <Link to="/" className="font-serif text-2xl font-semibold uppercase tracking-[0.13em]">
          Audo
        </Link>
        <div className="flex items-center justify-self-end">
          <Button asChild variant="ghost" size="icon" aria-label="Search">
            <Link to="/shop">
              <Search className="h-[18px] w-[18px]" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="Account">
            <UserRound className="h-[18px] w-[18px]" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label={`Cart with ${cartCount} items`}
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
            {cartCount > 0 && (
              <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[0.55rem] text-accent-foreground">
                {cartCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-border bg-background px-6 py-8 text-foreground lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="block border-b border-border py-4 font-serif text-2xl"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </header>
  );
}

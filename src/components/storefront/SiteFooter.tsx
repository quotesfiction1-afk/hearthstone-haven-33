import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";

import { Button } from "@/components/ui/button";

export function SiteFooter() {
  return (
    <footer className="bg-primary px-5 py-16 text-primary-foreground lg:px-10 lg:py-20">
      <div className="mx-auto grid max-w-[1600px] gap-14 border-b border-primary-foreground/20 pb-16 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <div className="font-serif text-3xl uppercase tracking-[0.13em]">Audo</div>
          <p className="mt-5 max-w-sm text-sm leading-6 text-primary-foreground/65">
            A considered collection of enduring objects for home and life.
          </p>
        </div>
        <div>
          <h3 className="mb-5 text-[0.65rem] font-semibold uppercase tracking-[0.18em]">Shop</h3>
          <Link to="/shop" className="mb-3 block text-sm text-primary-foreground/60 hover:text-primary-foreground">All products</Link>
          <Link to="/collections" className="mb-3 block text-sm text-primary-foreground/60 hover:text-primary-foreground">Collections</Link>
        </div>
        <div>
          <h3 className="mb-5 text-[0.65rem] font-semibold uppercase tracking-[0.18em]">About</h3>
          <Link to="/about" className="mb-3 block text-sm text-primary-foreground/60 hover:text-primary-foreground">Our story</Link>
          <Link to="/contact" className="mb-3 block text-sm text-primary-foreground/60 hover:text-primary-foreground">Contact</Link>
        </div>
        <div>
          <h3 className="mb-5 text-[0.65rem] font-semibold uppercase tracking-[0.18em]">Help</h3>
          <Link to="/contact" className="mb-3 block text-sm text-primary-foreground/60 hover:text-primary-foreground">Shipping &amp; returns</Link>
          <Link to="/contact" className="mb-3 block text-sm text-primary-foreground/60 hover:text-primary-foreground">Care guide</Link>
        </div>
      </div>
      <div className="mx-auto grid max-w-[1600px] gap-8 py-12 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <h3 className="font-serif text-2xl">Notes on considered living.</h3>
          <form className="mt-5 flex max-w-md border-b border-primary-foreground/45" onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="footer-email" className="sr-only">Email address</label>
            <input
              id="footer-email"
              type="email"
              required
              placeholder="Your email address"
              className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-primary-foreground/45"
            />
            <Button variant="ghost" size="sm" type="submit" className="text-primary-foreground">Subscribe</Button>
          </form>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
          <span className="text-xs text-primary-foreground/50">© 2026 Audo House</span>
        </div>
      </div>
    </footer>
  );
}

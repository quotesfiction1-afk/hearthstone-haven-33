import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { SiteFooter } from "@/components/storefront/SiteFooter";
import { SiteHeader } from "@/components/storefront/SiteHeader";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Audo House" },
      { name: "description", content: "Questions about an order, shipping or care? Get in touch with the Audo House team." },
      { property: "og:title", content: "Contact | Audo House" },
      { property: "og:description", content: "Get in touch with the Audo House team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main>
      <SiteHeader />
      <section className="px-5 py-16 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1100px] gap-14 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Say hello</p>
            <h1 className="font-serif text-5xl sm:text-6xl">Contact</h1>
            <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
              Questions about an order, shipping, or caring for a piece? Send us a note and we'll reply within two business days.
            </p>
          </div>
          <form
            className="space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              event.currentTarget.reset();
              toast.success("Thanks — we'll be in touch soon.", { position: "top-center" });
            }}
          >
            <div>
              <label htmlFor="name" className="mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Name</label>
              <input id="name" required className="w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-foreground" />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Email</label>
              <input id="contact-email" type="email" required className="w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-foreground" />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Message</label>
              <textarea id="message" required rows={5} className="w-full resize-none border-b border-border bg-transparent py-3 text-sm outline-none focus:border-foreground" />
            </div>
            <Button type="submit">Send message</Button>
          </form>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

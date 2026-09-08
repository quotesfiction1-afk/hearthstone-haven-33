import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 border px-6 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "border-primary bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground",
        light: "border-primary-foreground bg-primary-foreground text-primary hover:bg-transparent hover:text-primary-foreground",
        outline: "border-foreground/30 bg-transparent text-foreground hover:bg-primary hover:text-primary-foreground",
        ghost: "border-transparent bg-transparent px-2 text-foreground hover:text-accent",
      },
      size: {
        default: "h-12",
        sm: "h-10 px-4",
        icon: "h-10 w-10 min-h-10 p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { Button, buttonVariants };
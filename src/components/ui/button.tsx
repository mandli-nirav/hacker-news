import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "hn-:group/button hn-:inline-flex hn-:shrink-0 hn-:items-center hn-:justify-center hn-:rounded-2xl hn-:border hn-:border-transparent hn-:bg-clip-padding hn-:text-sm hn-:font-medium hn-:whitespace-nowrap hn-:transition-all hn-:outline-none hn-:select-none hn-:focus-visible:border-ring hn-:focus-visible:ring-3 hn-:focus-visible:ring-ring/30 hn-:active:not-aria-[haspopup]:translate-y-px hn-:disabled:pointer-events-none hn-:disabled:opacity-50 hn-:aria-invalid:border-destructive hn-:aria-invalid:ring-3 hn-:aria-invalid:ring-destructive/20 hn-:dark:aria-invalid:border-destructive/50 hn-:dark:aria-invalid:ring-destructive/40 hn-:[&_svg]:pointer-events-none hn-:[&_svg]:shrink-0 hn-:[&_svg:not([class*=size-])]:size-4",
  {
    variants: {
      variant: {
        default: "hn-:bg-primary hn-:text-primary-foreground hn-:hover:bg-primary/80",
        outline:
          "hn-:border-border hn-:bg-background hn-:hover:bg-muted hn-:hover:text-foreground hn-:aria-expanded:bg-muted hn-:aria-expanded:text-foreground hn-:dark:bg-transparent hn-:dark:hover:bg-input/30",
        secondary:
          "hn-:bg-secondary hn-:text-secondary-foreground hn-:hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] hn-:aria-expanded:bg-secondary hn-:aria-expanded:text-secondary-foreground",
        ghost:
          "hn-:hover:bg-muted hn-:hover:text-foreground hn-:aria-expanded:bg-muted hn-:aria-expanded:text-foreground hn-:dark:hover:bg-muted/50",
        destructive:
          "hn-:bg-destructive/10 hn-:text-destructive hn-:hover:bg-destructive/20 hn-:focus-visible:border-destructive/40 hn-:focus-visible:ring-destructive/20 hn-:dark:bg-destructive/20 hn-:dark:hover:bg-destructive/30 hn-:dark:focus-visible:ring-destructive/40",
        link: "hn-:text-primary hn-:underline-offset-4 hn-:hover:underline",
      },
      size: {
        default:
          "hn-:h-8 hn-:gap-1.5 hn-:px-3 hn-:has-data-[icon=inline-end]:pr-2.5 hn-:has-data-[icon=inline-start]:pl-2.5",
        xs: "hn-:h-6 hn-:gap-1 hn-:px-2.5 hn-:text-xs hn-:has-data-[icon=inline-end]:pr-2 hn-:has-data-[icon=inline-start]:pl-2 hn-:[&_svg:not([class*=size-])]:size-3",
        sm: "hn-:h-7 hn-:gap-1 hn-:px-3 hn-:has-data-[icon=inline-end]:pr-2 hn-:has-data-[icon=inline-start]:pl-2",
        lg: "hn-:h-9 hn-:gap-1.5 hn-:px-4 hn-:has-data-[icon=inline-end]:pr-3 hn-:has-data-[icon=inline-start]:pl-3",
        icon: "hn-:size-8",
        "icon-xs": "hn-:size-6 hn-:[&_svg:not([class*=size-])]:size-3",
        "icon-sm": "hn-:size-7",
        "icon-lg": "hn-:size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

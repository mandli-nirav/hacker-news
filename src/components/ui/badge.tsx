import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "hn-:group/badge hn-:inline-flex hn-:h-5 hn-:w-fit hn-:shrink-0 hn-:items-center hn-:justify-center hn-:gap-1 hn-:overflow-hidden hn-:rounded-2xl hn-:border hn-:border-transparent hn-:px-2 hn-:py-0.5 hn-:text-xs hn-:font-medium hn-:whitespace-nowrap hn-:transition-all hn-:focus-visible:border-ring hn-:focus-visible:ring-[3px] hn-:focus-visible:ring-ring/50 hn-:has-data-[icon=inline-end]:pr-1.5 hn-:has-data-[icon=inline-start]:pl-1.5 hn-:aria-invalid:border-destructive hn-:aria-invalid:ring-destructive/20 hn-:dark:aria-invalid:ring-destructive/40 hn-:[&>svg]:pointer-events-none hn-:[&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "hn-:bg-primary hn-:text-primary-foreground hn-:[a]:hover:bg-primary/80",
        secondary:
          "hn-:bg-secondary hn-:text-secondary-foreground hn-:[a]:hover:bg-secondary/80",
        destructive:
          "hn-:bg-destructive/10 hn-:text-destructive hn-:focus-visible:ring-destructive/20 hn-:dark:bg-destructive/20 hn-:dark:focus-visible:ring-destructive/40 hn-:[a]:hover:bg-destructive/20",
        outline:
          "hn-:border-border hn-:text-foreground hn-:[a]:hover:bg-muted hn-:[a]:hover:text-muted-foreground",
        ghost:
          "hn-:hover:bg-muted hn-:hover:text-muted-foreground hn-:dark:hover:bg-muted/50",
        link: "hn-:text-primary hn-:underline-offset-4 hn-:hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }

"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Toggle as TogglePrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "hn-:group/toggle hn-:inline-flex hn-:items-center hn-:justify-center hn-:gap-1 hn-:rounded-2xl hn-:text-sm hn-:font-medium hn-:whitespace-nowrap hn-:transition-colors hn-:outline-none hn-:hover:bg-muted hn-:hover:text-foreground hn-:focus-visible:border-ring hn-:focus-visible:ring-[3px] hn-:focus-visible:ring-ring/30 hn-:disabled:pointer-events-none hn-:disabled:opacity-50 hn-:aria-invalid:border-destructive hn-:aria-invalid:ring-destructive/20 hn-:aria-pressed:bg-muted hn-:dark:aria-invalid:ring-destructive/40 hn-:[&_svg]:pointer-events-none hn-:[&_svg]:shrink-0 hn-:[&_svg:not([class*=size-])]:size-4",
  {
    variants: {
      variant: {
        default: "hn-:bg-transparent",
        outline: "hn-:border hn-:border-input hn-:bg-transparent hn-:hover:bg-muted",
      },
      size: {
        default:
          "hn-:h-8 hn-:min-w-8 hn-:px-2.5 hn-:has-data-[icon=inline-end]:pr-2 hn-:has-data-[icon=inline-start]:pl-2",
        sm: "hn-:h-7 hn-:min-w-7 hn-:px-2.5 hn-:has-data-[icon=inline-end]:pr-1.5 hn-:has-data-[icon=inline-start]:pl-1.5",
        lg: "hn-:h-9 hn-:min-w-9 hn-:px-2.5 hn-:has-data-[icon=inline-end]:pr-2 hn-:has-data-[icon=inline-start]:pl-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }

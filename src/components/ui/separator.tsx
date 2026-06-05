"use client"

import * as React from "react"
import { Separator as SeparatorPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "hn-:shrink-0 hn-:bg-border hn-:data-horizontal:h-px hn-:data-horizontal:w-full hn-:data-vertical:w-px hn-:data-vertical:self-stretch",
        className
      )}
      {...props}
    />
  )
}

export { Separator }

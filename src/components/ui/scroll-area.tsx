"use client"

import * as React from "react"
import { ScrollArea as ScrollAreaPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("hn-:relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="hn-:size-full hn-:rounded-[inherit] hn-:transition-[color,box-shadow] hn-:outline-none hn-:focus-visible:ring-[3px] hn-:focus-visible:ring-ring/50 hn-:focus-visible:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        "hn-:flex hn-:touch-none hn-:p-px hn-:transition-colors hn-:select-none hn-:data-horizontal:h-2.5 hn-:data-horizontal:flex-col hn-:data-horizontal:border-t hn-:data-horizontal:border-t-transparent hn-:data-vertical:h-full hn-:data-vertical:w-2.5 hn-:data-vertical:border-l hn-:data-vertical:border-l-transparent",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="hn-:relative hn-:flex-1 hn-:rounded-full hn-:bg-border"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }

"use client"

import * as React from "react"
import { Label as LabelPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "hn-:flex hn-:items-center hn-:gap-2 hn-:text-sm hn-:leading-none hn-:font-medium hn-:select-none hn-:group-data-[disabled=true]:pointer-events-none hn-:group-data-[disabled=true]:opacity-50 hn-:peer-disabled:cursor-not-allowed hn-:peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }

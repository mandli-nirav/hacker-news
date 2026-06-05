"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "hn-:peer hn-:group/switch hn-:relative hn-:inline-flex hn-:shrink-0 hn-:items-center hn-:rounded-2xl hn-:border-2 hn-:transition-all hn-:outline-none hn-:after:absolute hn-:after:-inset-x-3 hn-:after:-inset-y-2 hn-:focus-visible:border-ring hn-:focus-visible:ring-3 hn-:focus-visible:ring-ring/30 hn-:aria-invalid:border-destructive hn-:aria-invalid:ring-3 hn-:aria-invalid:ring-destructive/20 hn-:data-[size=default]:h-5 hn-:data-[size=default]:w-8 hn-:data-[size=sm]:h-4 hn-:data-[size=sm]:w-6 hn-:dark:aria-invalid:border-destructive/50 hn-:dark:aria-invalid:ring-destructive/40 hn-:data-checked:border-primary hn-:data-checked:bg-primary hn-:data-unchecked:border-transparent hn-:data-unchecked:bg-input/90 hn-:data-disabled:cursor-not-allowed hn-:data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="hn-:pointer-events-none hn-:block hn-:rounded-2xl hn-:bg-background hn-:shadow-sm hn-:ring-0 hn-:transition-transform hn-:not-dark:bg-clip-padding hn-:group-data-[size=default]/switch:size-4 hn-:group-data-[size=sm]/switch:size-3 hn-:data-checked:translate-x-[calc(100%-4px)] hn-:dark:data-checked:bg-primary-foreground hn-:data-unchecked:translate-x-0 hn-:dark:data-unchecked:bg-foreground"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }

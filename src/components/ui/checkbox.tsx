"use client"

import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "hn-:peer hn-:relative hn-:flex hn-:size-4 hn-:shrink-0 hn-:items-center hn-:justify-center hn-:rounded-[5px] hn-:border hn-:border-transparent hn-:bg-input/90 hn-:transition-shadow hn-:outline-none hn-:group-has-disabled/field:opacity-50 hn-:after:absolute hn-:after:-inset-x-3 hn-:after:-inset-y-2 hn-:focus-visible:border-ring hn-:focus-visible:ring-3 hn-:focus-visible:ring-ring/30 hn-:disabled:cursor-not-allowed hn-:disabled:opacity-50 hn-:aria-invalid:border-destructive hn-:aria-invalid:ring-3 hn-:aria-invalid:ring-destructive/20 hn-:aria-invalid:aria-checked:border-primary hn-:dark:aria-invalid:border-destructive/50 hn-:dark:aria-invalid:ring-destructive/40 hn-:data-checked:border-primary hn-:data-checked:bg-primary hn-:data-checked:text-primary-foreground hn-:dark:data-checked:bg-primary",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="hn-:grid hn-:place-content-center hn-:text-current hn-:transition-none hn-:[&>svg]:size-3.5"
      >
        <CheckIcon
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }

"use client"

import * as React from "react"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("hn-:grid hn-:w-full hn-:gap-3", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "hn-:group/radio-group-item hn-:peer hn-:relative hn-:flex hn-:aspect-square hn-:size-4 hn-:shrink-0 hn-:rounded-2xl hn-:border hn-:border-transparent hn-:bg-input/90 hn-:outline-none hn-:after:absolute hn-:after:-inset-x-3 hn-:after:-inset-y-2 hn-:focus-visible:border-ring hn-:focus-visible:ring-3 hn-:focus-visible:ring-ring/30 hn-:disabled:cursor-not-allowed hn-:disabled:opacity-50 hn-:aria-invalid:border-destructive hn-:aria-invalid:ring-3 hn-:aria-invalid:ring-destructive/20 hn-:dark:aria-invalid:border-destructive/50 hn-:dark:aria-invalid:ring-destructive/40 hn-:data-checked:bg-primary hn-:data-checked:text-primary-foreground hn-:dark:data-checked:bg-primary",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="hn-:flex hn-:size-4 hn-:items-center hn-:justify-center"
      >
        <span className="hn-:absolute hn-:top-1/2 hn-:left-1/2 hn-:size-2 hn-:-translate-x-1/2 hn-:-translate-y-1/2 hn-:rounded-full hn-:bg-primary-foreground hn-:dark:size-2.5" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }

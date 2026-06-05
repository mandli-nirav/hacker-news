"use client"

import * as React from "react"
import { Accordion as AccordionPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn(
        "hn-:flex hn-:w-full hn-:flex-col hn-:overflow-hidden hn-:rounded-2xl hn-:border",
        className
      )}
      {...props}
    />
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("hn-:not-last:border-b hn-:data-open:bg-muted/50", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="hn-:flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "hn-:group/accordion-trigger hn-:relative hn-:flex hn-:flex-1 hn-:items-start hn-:justify-between hn-:gap-6 hn-:border hn-:border-transparent hn-:p-4 hn-:text-left hn-:text-sm hn-:font-medium hn-:transition-all hn-:outline-none hn-:hover:underline hn-:disabled:pointer-events-none hn-:disabled:opacity-50 hn-:**:data-[slot=accordion-trigger-icon]:ml-auto hn-:**:data-[slot=accordion-trigger-icon]:size-4 hn-:**:data-[slot=accordion-trigger-icon]:text-muted-foreground",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon data-slot="accordion-trigger-icon" className="hn-:pointer-events-none hn-:shrink-0 hn-:group-aria-expanded/accordion-trigger:hidden" />
        <ChevronUpIcon data-slot="accordion-trigger-icon" className="hn-:pointer-events-none hn-:hidden hn-:shrink-0 hn-:group-aria-expanded/accordion-trigger:inline" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="hn-:overflow-hidden hn-:px-4 hn-:text-sm hn-:data-open:animate-accordion-down hn-:data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          "hn-:h-(--radix-accordion-content-height) hn-:pt-0 hn-:pb-4 hn-:[&_a]:underline hn-:[&_a]:underline-offset-3 hn-:[&_a]:hover:text-foreground hn-:[&_p:not(:last-child)]:mb-4",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Tabs as TabsPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "hn-:group/tabs hn-:flex hn-:gap-2 hn-:data-horizontal:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "hn-:group/tabs-list hn-:inline-flex hn-:w-fit hn-:items-center hn-:justify-center hn-:rounded-2xl hn-:p-[3px] hn-:text-muted-foreground hn-:group-data-horizontal/tabs:h-8 hn-:group-data-vertical/tabs:h-fit hn-:group-data-vertical/tabs:flex-col hn-:group-data-vertical/tabs:p-1 hn-:data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "hn-:bg-muted",
        line: "hn-:gap-1 hn-:bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "hn-:relative hn-:inline-flex hn-:h-[calc(100%-1px)] hn-:flex-1 hn-:items-center hn-:justify-center hn-:gap-1.5 hn-:rounded-2xl hn-:border hn-:border-transparent! hn-:px-1.5 hn-:py-0.5 hn-:text-sm hn-:font-medium hn-:whitespace-nowrap hn-:text-foreground/60 hn-:transition-all hn-:group-data-vertical/tabs:w-full hn-:group-data-vertical/tabs:justify-start hn-:group-data-vertical/tabs:px-3 hn-:group-data-vertical/tabs:py-0.5 hn-:hover:text-foreground hn-:focus-visible:border-ring hn-:focus-visible:ring-[3px] hn-:focus-visible:ring-ring/50 hn-:focus-visible:outline-1 hn-:focus-visible:outline-ring hn-:disabled:pointer-events-none hn-:disabled:opacity-50 hn-:dark:text-muted-foreground hn-:dark:hover:text-foreground hn-:[&_svg]:pointer-events-none hn-:[&_svg]:shrink-0 hn-:[&_svg:not([class*=size-])]:size-4",
        "hn-:group-data-[variant=line]/tabs-list:bg-transparent hn-:group-data-[variant=line]/tabs-list:data-active:bg-transparent hn-:dark:group-data-[variant=line]/tabs-list:data-active:border-transparent hn-:dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent",
        "hn-:data-active:bg-background hn-:data-active:text-foreground hn-:dark:data-active:border-input hn-:dark:data-active:bg-input/30 hn-:dark:data-active:text-foreground",
        "hn-:after:absolute hn-:after:bg-foreground hn-:after:opacity-0 hn-:after:transition-opacity hn-:group-data-horizontal/tabs:after:inset-x-0 hn-:group-data-horizontal/tabs:after:bottom-[-5px] hn-:group-data-horizontal/tabs:after:h-0.5 hn-:group-data-vertical/tabs:after:inset-y-0 hn-:group-data-vertical/tabs:after:-right-1 hn-:group-data-vertical/tabs:after:w-0.5 hn-:group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("hn-:flex-1 hn-:text-sm hn-:outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }

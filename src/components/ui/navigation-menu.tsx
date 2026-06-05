import * as React from "react"
import { cva } from "class-variance-authority"
import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { ChevronDownIcon } from "lucide-react"

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        "hn-:group/navigation-menu hn-:relative hn-:flex hn-:max-w-max hn-:flex-1 hn-:items-center hn-:justify-center",
        className
      )}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  )
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        "hn-:group hn-:flex hn-:flex-1 hn-:list-none hn-:items-center hn-:justify-center hn-:gap-0",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("hn-:relative", className)}
      {...props}
    />
  )
}

const navigationMenuTriggerStyle = cva(
  "hn-:group/navigation-menu-trigger hn-:inline-flex hn-:h-9 hn-:w-max hn-:items-center hn-:justify-center hn-:rounded-2xl hn-:px-2.5 hn-:py-1.5 hn-:text-sm hn-:font-medium hn-:transition-all hn-:outline-none hn-:hover:bg-muted hn-:focus:bg-muted hn-:focus-visible:ring-3 hn-:focus-visible:ring-ring/30 hn-:focus-visible:outline-1 hn-:disabled:pointer-events-none hn-:disabled:opacity-50 hn-:data-popup-open:bg-muted/50 hn-:data-popup-open:hover:bg-muted hn-:data-open:bg-muted/50 hn-:data-open:hover:bg-muted hn-:data-open:focus:bg-muted"
)

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "hn-:group", className)}
      {...props}
    >
      {children}{" "}
      <ChevronDownIcon className="hn-:relative hn-:top-px hn-:ml-1 hn-:size-3 hn-:transition hn-:duration-300 hn-:group-data-popup-open/navigation-menu-trigger:rotate-180 hn-:group-data-open/navigation-menu-trigger:rotate-180" aria-hidden="true" />
    </NavigationMenuPrimitive.Trigger>
  )
}

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "hn-:top-0 hn-:left-0 hn-:w-full hn-:p-1.5 hn-:ease-[cubic-bezier(0.22,1,0.36,1)] hn-:group-data-[viewport=false]/navigation-menu:top-full hn-:group-data-[viewport=false]/navigation-menu:mt-1.5 hn-:group-data-[viewport=false]/navigation-menu:overflow-hidden hn-:group-data-[viewport=false]/navigation-menu:rounded-2xl hn-:group-data-[viewport=false]/navigation-menu:bg-popover hn-:group-data-[viewport=false]/navigation-menu:text-popover-foreground hn-:group-data-[viewport=false]/navigation-menu:shadow-lg hn-:group-data-[viewport=false]/navigation-menu:ring-1 hn-:group-data-[viewport=false]/navigation-menu:ring-foreground/5 hn-:group-data-[viewport=false]/navigation-menu:duration-300 hn-:data-[motion=from-end]:slide-in-from-right-52 hn-:data-[motion=from-start]:slide-in-from-left-52 hn-:data-[motion=to-end]:slide-out-to-right-52 hn-:data-[motion=to-start]:slide-out-to-left-52 hn-:data-[motion^=from-]:animate-in hn-:data-[motion^=from-]:fade-in hn-:data-[motion^=to-]:animate-out hn-:data-[motion^=to-]:fade-out hn-:**:data-[slot=navigation-menu-link]:focus:ring-0 hn-:**:data-[slot=navigation-menu-link]:focus:outline-none hn-:md:absolute hn-:md:w-auto hn-:group-data-[viewport=false]/navigation-menu:dark:ring-foreground/10 hn-:group-data-[viewport=false]/navigation-menu:data-open:animate-in hn-:group-data-[viewport=false]/navigation-menu:data-open:fade-in-0 hn-:group-data-[viewport=false]/navigation-menu:data-open:zoom-in-95 hn-:group-data-[viewport=false]/navigation-menu:data-closed:animate-out hn-:group-data-[viewport=false]/navigation-menu:data-closed:fade-out-0 hn-:group-data-[viewport=false]/navigation-menu:data-closed:zoom-out-95",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div
      className={cn(
        "hn-:absolute hn-:top-full hn-:left-0 hn-:isolate hn-:z-50 hn-:flex hn-:justify-center"
      )}
    >
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "hn-:origin-top-center hn-:relative hn-:mt-1.5 hn-:h-(--radix-navigation-menu-viewport-height) hn-:w-full hn-:overflow-hidden hn-:rounded-2xl hn-:bg-popover hn-:text-popover-foreground hn-:shadow-lg hn-:ring-1 hn-:ring-foreground/5 hn-:duration-100 hn-:md:w-(--radix-navigation-menu-viewport-width) hn-:dark:ring-foreground/10 hn-:data-open:animate-in hn-:data-open:zoom-in-90 hn-:data-closed:animate-out hn-:data-closed:zoom-out-90",
          className
        )}
        {...props}
      />
    </div>
  )
}

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "hn-:flex hn-:items-center hn-:gap-2 hn-:rounded-2xl hn-:px-2.5 hn-:py-1.5 hn-:text-sm hn-:font-medium hn-:transition-all hn-:outline-none hn-:hover:bg-muted hn-:focus:bg-muted hn-:focus-visible:ring-3 hn-:focus-visible:ring-ring/30 hn-:focus-visible:outline-1 hn-:in-data-[slot=navigation-menu-content]:w-full hn-:in-data-[slot=navigation-menu-content]:rounded-xl hn-:in-data-[slot=navigation-menu-content]:p-2 hn-:in-data-[slot=navigation-menu-content]:font-normal hn-:data-[active=true]:bg-muted/50 hn-:data-[active=true]:hover:bg-muted hn-:data-[active=true]:focus:bg-muted hn-:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        "hn-:top-full hn-:z-1 hn-:flex hn-:h-1.5 hn-:items-end hn-:justify-center hn-:overflow-hidden hn-:data-[state=hidden]:animate-out hn-:data-[state=hidden]:fade-out hn-:data-[state=visible]:animate-in hn-:data-[state=visible]:fade-in",
        className
      )}
      {...props}
    >
      <div className="hn-:relative hn-:top-[60%] hn-:h-2 hn-:w-2 hn-:rotate-45 hn-:rounded-tl-sm hn-:bg-border hn-:shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  )
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
}

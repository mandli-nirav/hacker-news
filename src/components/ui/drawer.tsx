"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

function Drawer({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />
}

function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "hn-:fixed hn-:inset-0 hn-:z-50 hn-:bg-black/30 hn-:supports-backdrop-filter:backdrop-blur-sm hn-:data-open:animate-in hn-:data-open:fade-in-0 hn-:data-closed:animate-out hn-:data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          "hn-:group/drawer-content hn-:fixed hn-:z-50 hn-:flex hn-:h-auto hn-:flex-col hn-:bg-transparent hn-:p-4 hn-:text-sm hn-:before:absolute hn-:before:inset-2 hn-:before:-z-10 hn-:before:rounded-[min(var(--radius-4xl),24px)] hn-:before:border hn-:before:border-border hn-:before:bg-popover hn-:before:shadow-xl hn-:data-[vaul-drawer-direction=bottom]:inset-x-0 hn-:data-[vaul-drawer-direction=bottom]:bottom-0 hn-:data-[vaul-drawer-direction=bottom]:mt-24 hn-:data-[vaul-drawer-direction=bottom]:max-h-[80vh] hn-:data-[vaul-drawer-direction=left]:inset-y-0 hn-:data-[vaul-drawer-direction=left]:left-0 hn-:data-[vaul-drawer-direction=left]:w-3/4 hn-:data-[vaul-drawer-direction=right]:inset-y-0 hn-:data-[vaul-drawer-direction=right]:right-0 hn-:data-[vaul-drawer-direction=right]:w-3/4 hn-:data-[vaul-drawer-direction=top]:inset-x-0 hn-:data-[vaul-drawer-direction=top]:top-0 hn-:data-[vaul-drawer-direction=top]:mb-24 hn-:data-[vaul-drawer-direction=top]:max-h-[80vh] hn-:data-[vaul-drawer-direction=left]:sm:max-w-sm hn-:data-[vaul-drawer-direction=right]:sm:max-w-sm",
          className
        )}
        {...props}
      >
        <div className="hn-:mx-auto hn-:mt-4 hn-:hidden hn-:h-1.5 hn-:w-[100px] hn-:shrink-0 hn-:rounded-full hn-:bg-muted hn-:group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "hn-:flex hn-:flex-col hn-:gap-0.5 hn-:p-4 hn-:group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center hn-:group-data-[vaul-drawer-direction=top]/drawer-content:text-center hn-:md:gap-1.5 hn-:md:text-left",
        className
      )}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("hn-:mt-auto hn-:flex hn-:flex-col hn-:gap-2 hn-:p-4", className)}
      {...props}
    />
  )
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn(
        "hn-:font-heading hn-:text-base hn-:font-medium hn-:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("hn-:text-sm hn-:text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}

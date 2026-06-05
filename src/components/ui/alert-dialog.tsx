"use client"

import * as React from "react"
import { AlertDialog as AlertDialogPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  )
}

function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  )
}

function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        "hn-:fixed hn-:inset-0 hn-:z-50 hn-:bg-black/30 hn-:duration-100 hn-:supports-backdrop-filter:backdrop-blur-sm hn-:data-open:animate-in hn-:data-open:fade-in-0 hn-:data-closed:animate-out hn-:data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogContent({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content> & {
  size?: "default" | "sm"
}) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        data-size={size}
        className={cn(
          "hn-:group/alert-dialog-content hn-:fixed hn-:top-1/2 hn-:left-1/2 hn-:z-50 hn-:grid hn-:w-full hn-:-translate-x-1/2 hn-:-translate-y-1/2 hn-:gap-6 hn-:rounded-[min(var(--radius-4xl),24px)] hn-:bg-popover hn-:p-6 hn-:text-popover-foreground hn-:shadow-xl hn-:ring-1 hn-:ring-foreground/5 hn-:duration-100 hn-:outline-none hn-:data-[size=default]:max-w-xs hn-:data-[size=sm]:max-w-xs hn-:data-[size=default]:sm:max-w-md hn-:dark:ring-foreground/10 hn-:data-open:animate-in hn-:data-open:fade-in-0 hn-:data-open:zoom-in-95 hn-:data-closed:animate-out hn-:data-closed:fade-out-0 hn-:data-closed:zoom-out-95",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(
        "hn-:grid hn-:grid-rows-[auto_1fr] hn-:place-items-center hn-:gap-1.5 hn-:text-center hn-:has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] hn-:has-data-[slot=alert-dialog-media]:gap-x-6 hn-:sm:group-data-[size=default]/alert-dialog-content:place-items-start hn-:sm:group-data-[size=default]/alert-dialog-content:text-left hn-:sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "hn-:flex hn-:flex-col-reverse hn-:gap-2 hn-:group-data-[size=sm]/alert-dialog-content:grid hn-:group-data-[size=sm]/alert-dialog-content:grid-cols-2 hn-:sm:flex-row hn-:sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogMedia({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-media"
      className={cn(
        "hn-:mb-2 hn-:inline-flex hn-:size-16 hn-:items-center hn-:justify-center hn-:rounded-full hn-:bg-muted hn-:sm:group-data-[size=default]/alert-dialog-content:row-span-2 hn-:*:[svg:not([class*=size-])]:size-8",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn(
        "hn-:font-heading hn-:text-lg hn-:font-medium hn-:sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn(
        "hn-:text-sm hn-:text-balance hn-:text-muted-foreground hn-:md:text-pretty hn-:*:[a]:underline hn-:*:[a]:underline-offset-3 hn-:*:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogAction({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action> &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <Button variant={variant} size={size} asChild>
      <AlertDialogPrimitive.Action
        data-slot="alert-dialog-action"
        className={cn(className)}
        {...props}
      />
    </Button>
  )
}

function AlertDialogCancel({
  className,
  variant = "outline",
  size = "default",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel> &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <Button variant={variant} size={size} asChild>
      <AlertDialogPrimitive.Cancel
        data-slot="alert-dialog-cancel"
        className={cn(className)}
        {...props}
      />
    </Button>
  )
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
}

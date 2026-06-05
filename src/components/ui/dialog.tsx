"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "hn-:fixed hn-:inset-0 hn-:isolate hn-:z-50 hn-:bg-black/30 hn-:duration-100 hn-:supports-backdrop-filter:backdrop-blur-sm hn-:data-open:animate-in hn-:data-open:fade-in-0 hn-:data-closed:animate-out hn-:data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "hn-:fixed hn-:top-1/2 hn-:left-1/2 hn-:z-50 hn-:grid hn-:w-full hn-:max-w-[calc(100%-2rem)] hn-:-translate-x-1/2 hn-:-translate-y-1/2 hn-:gap-6 hn-:rounded-[min(var(--radius-4xl),24px)] hn-:bg-popover hn-:p-6 hn-:text-sm hn-:text-popover-foreground hn-:shadow-xl hn-:ring-1 hn-:ring-foreground/5 hn-:duration-100 hn-:outline-none hn-:sm:max-w-md hn-:dark:ring-foreground/10 hn-:data-open:animate-in hn-:data-open:fade-in-0 hn-:data-open:zoom-in-95 hn-:data-closed:animate-out hn-:data-closed:fade-out-0 hn-:data-closed:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close data-slot="dialog-close" asChild>
            <Button
              variant="ghost"
              className="hn-:absolute hn-:top-4 hn-:right-4 hn-:bg-secondary"
              size="icon-sm"
            >
              <XIcon
              />
              <span className="hn-:sr-only">Close</span>
            </Button>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("hn-:flex hn-:flex-col hn-:gap-1.5", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "hn-:flex hn-:flex-col-reverse hn-:gap-2 hn-:sm:flex-row hn-:sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <Button variant="outline">Close</Button>
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "hn-:font-heading hn-:text-base hn-:leading-none hn-:font-medium",
        className
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "hn-:text-sm hn-:text-muted-foreground hn-:*:[a]:underline hn-:*:[a]:underline-offset-3 hn-:*:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}

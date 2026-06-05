"use client"

import * as React from "react"
import { ContextMenu as ContextMenuPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { ChevronRightIcon, CheckIcon } from "lucide-react"

function ContextMenu({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Root>) {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />
}

function ContextMenuTrigger({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>) {
  return (
    <ContextMenuPrimitive.Trigger
      data-slot="context-menu-trigger"
      className={cn("hn-:select-none", className)}
      {...props}
    />
  )
}

function ContextMenuGroup({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Group>) {
  return (
    <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
  )
}

function ContextMenuPortal({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Portal>) {
  return (
    <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
  )
}

function ContextMenuSub({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Sub>) {
  return <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />
}

function ContextMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>) {
  return (
    <ContextMenuPrimitive.RadioGroup
      data-slot="context-menu-radio-group"
      {...props}
    />
  )
}

function ContextMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
}) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        data-slot="context-menu-content"
        className={cn(
                                  "hn-:dark hn-: hn-:z-50 hn-:max-h-(--radix-context-menu-content-available-height) hn-:min-w-36 hn-:origin-(--radix-context-menu-content-transform-origin) hn-:overflow-x-hidden hn-:overflow-y-auto hn-:rounded-2xl hn-:bg-popover hn-:p-1 hn-:text-popover-foreground hn-:shadow-lg hn-:ring-1 hn-:ring-foreground/5 hn-:duration-100 hn-:data-[side=bottom]:slide-in-from-top-2 hn-:data-[side=left]:slide-in-from-right-2 hn-:data-[side=right]:slide-in-from-left-2 hn-:data-[side=top]:slide-in-from-bottom-2 hn-:dark:ring-foreground/10 hn-:data-open:animate-in hn-:data-open:fade-in-0 hn-:data-open:zoom-in-95 hn-:data-closed:animate-out hn-:data-closed:fade-out-0 hn-:data-closed:zoom-out-95 animate-none! relative bg-popover/70 before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150 **:data-[slot$=-item]:focus:bg-foreground/10 **:data-[slot$=-item]:data-highlighted:bg-foreground/10 **:data-[slot$=-separator]:bg-foreground/5 **:data-[slot$=-trigger]:focus:bg-foreground/10 **:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! **:data-[variant=destructive]:focus:bg-foreground/10! **:data-[variant=destructive]:text-accent-foreground! **:data-[variant=destructive]:**:text-accent-foreground!",
                                  className
                                )}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  )
}

function ContextMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "hn-:group/context-menu-item hn-:relative hn-:flex hn-:min-h-7 hn-:cursor-default hn-:items-center hn-:gap-2 hn-:rounded-xl hn-:px-2 hn-:py-1.5 hn-:text-sm hn-:outline-hidden hn-:select-none hn-:focus:bg-accent hn-:focus:text-accent-foreground hn-:data-inset:pl-7 hn-:data-[variant=destructive]:text-destructive hn-:data-[variant=destructive]:focus:bg-destructive/10 hn-:data-[variant=destructive]:focus:text-destructive hn-:dark:data-[variant=destructive]:focus:bg-destructive/20 hn-:data-disabled:pointer-events-none hn-:data-disabled:opacity-50 hn-:[&_svg]:pointer-events-none hn-:[&_svg]:shrink-0 hn-:[&_svg:not([class*=size-])]:size-4 hn-:focus:*:[svg]:text-accent-foreground hn-:data-[variant=destructive]:*:[svg]:text-destructive",
        className
      )}
      {...props}
    />
  )
}

function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.SubTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "hn-:flex hn-:min-h-7 hn-:cursor-default hn-:items-center hn-:rounded-xl hn-:px-2 hn-:py-1.5 hn-:text-sm hn-:outline-hidden hn-:select-none hn-:focus:bg-accent hn-:focus:text-accent-foreground hn-:data-inset:pl-7 hn-:data-open:bg-accent hn-:data-open:text-accent-foreground hn-:[&_svg]:pointer-events-none hn-:[&_svg]:shrink-0 hn-:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="hn-:ml-auto" />
    </ContextMenuPrimitive.SubTrigger>
  )
}

function ContextMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>) {
  return (
    <ContextMenuPrimitive.SubContent
      data-slot="context-menu-sub-content"
      className={cn(
                        "hn-:dark hn-: hn-:z-50 hn-:min-w-32 hn-:origin-(--radix-context-menu-content-transform-origin) hn-:overflow-hidden hn-:rounded-2xl hn-:bg-popover hn-:p-1 hn-:text-popover-foreground hn-:shadow-lg hn-:ring-1 hn-:ring-foreground/5 hn-:duration-100 hn-:data-[side=bottom]:slide-in-from-top-2 hn-:data-[side=left]:slide-in-from-right-2 hn-:data-[side=right]:slide-in-from-left-2 hn-:data-[side=top]:slide-in-from-bottom-2 hn-:dark:ring-foreground/10 hn-:data-open:animate-in hn-:data-open:fade-in-0 hn-:data-open:zoom-in-95 hn-:data-closed:animate-out hn-:data-closed:fade-out-0 hn-:data-closed:zoom-out-95 animate-none! relative bg-popover/70 before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150 **:data-[slot$=-item]:focus:bg-foreground/10 **:data-[slot$=-item]:data-highlighted:bg-foreground/10 **:data-[slot$=-separator]:bg-foreground/5 **:data-[slot$=-trigger]:focus:bg-foreground/10 **:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! **:data-[variant=destructive]:focus:bg-foreground/10! **:data-[variant=destructive]:text-accent-foreground! **:data-[variant=destructive]:**:text-accent-foreground!",
                        className
                      )}
      {...props}
    />
  )
}

function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem> & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "hn-:relative hn-:flex hn-:min-h-7 hn-:cursor-default hn-:items-center hn-:gap-2 hn-:rounded-xl hn-:py-1.5 hn-:pr-8 hn-:pl-2 hn-:text-sm hn-:outline-hidden hn-:select-none hn-:focus:bg-accent hn-:focus:text-accent-foreground hn-:data-inset:pl-7 hn-:data-disabled:pointer-events-none hn-:data-disabled:opacity-50 hn-:[&_svg]:pointer-events-none hn-:[&_svg]:shrink-0 hn-:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="hn-:pointer-events-none hn-:absolute hn-:right-2">
        <ContextMenuPrimitive.ItemIndicator>
          <CheckIcon
          />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  )
}

function ContextMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem> & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      data-inset={inset}
      className={cn(
        "hn-:relative hn-:flex hn-:min-h-7 hn-:cursor-default hn-:items-center hn-:gap-2 hn-:rounded-xl hn-:py-1.5 hn-:pr-8 hn-:pl-2 hn-:text-sm hn-:outline-hidden hn-:select-none hn-:focus:bg-accent hn-:focus:text-accent-foreground hn-:data-inset:pl-7 hn-:data-disabled:pointer-events-none hn-:data-disabled:opacity-50 hn-:[&_svg]:pointer-events-none hn-:[&_svg]:shrink-0 hn-:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      {...props}
    >
      <span className="hn-:pointer-events-none hn-:absolute hn-:right-2">
        <ContextMenuPrimitive.ItemIndicator>
          <CheckIcon
          />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  )
}

function ContextMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.Label
      data-slot="context-menu-label"
      data-inset={inset}
      className={cn(
        "hn-:px-2 hn-:py-1 hn-:text-xs hn-:text-muted-foreground hn-:data-inset:pl-7",
        className
      )}
      {...props}
    />
  )
}

function ContextMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={cn("hn-:-mx-1 hn-:my-1 hn-:h-px hn-:bg-border/50", className)}
      {...props}
    />
  )
}

function ContextMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(
        "hn-:ml-auto hn-:text-xs hn-:tracking-widest hn-:text-muted-foreground hn-:group-focus/context-menu-item:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}

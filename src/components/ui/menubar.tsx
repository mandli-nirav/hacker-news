"use client"

import * as React from "react"
import { Menubar as MenubarPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { CheckIcon, ChevronRightIcon } from "lucide-react"

function Menubar({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Root>) {
  return (
    <MenubarPrimitive.Root
      data-slot="menubar"
      className={cn(
        "hn-:flex hn-:h-8 hn-:items-center hn-:rounded-2xl hn-:border hn-:p-[3px]",
        className
      )}
      {...props}
    />
  )
}

function MenubarMenu({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />
}

function MenubarGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />
}

function MenubarPortal({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />
}

function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return (
    <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
  )
}

function MenubarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Trigger>) {
  return (
    <MenubarPrimitive.Trigger
      data-slot="menubar-trigger"
      className={cn(
        "hn-:flex hn-:items-center hn-:rounded-2xl hn-:px-1.5 hn-:py-[2px] hn-:text-sm hn-:font-medium hn-:outline-hidden hn-:select-none hn-:hover:bg-muted hn-:aria-expanded:bg-muted",
        className
      )}
      {...props}
    />
  )
}

function MenubarContent({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Content>) {
  return (
    <MenubarPortal>
      <MenubarPrimitive.Content
        data-slot="menubar-content"
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
                                  "hn-:dark hn-: hn-:z-50 hn-:min-w-36 hn-:origin-(--radix-menubar-content-transform-origin) hn-:overflow-hidden hn-:rounded-2xl hn-:bg-popover hn-:p-1 hn-:text-popover-foreground hn-:shadow-lg hn-:ring-1 hn-:ring-foreground/5 hn-:duration-100 hn-:data-[side=bottom]:slide-in-from-top-2 hn-:data-[side=left]:slide-in-from-right-2 hn-:data-[side=right]:slide-in-from-left-2 hn-:data-[side=top]:slide-in-from-bottom-2 hn-:dark:ring-foreground/10 hn-:data-open:animate-in hn-:data-open:fade-in-0 hn-:data-open:zoom-in-95 animate-none! relative bg-popover/70 before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150 **:data-[slot$=-item]:focus:bg-foreground/10 **:data-[slot$=-item]:data-highlighted:bg-foreground/10 **:data-[slot$=-separator]:bg-foreground/5 **:data-[slot$=-trigger]:focus:bg-foreground/10 **:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! **:data-[variant=destructive]:focus:bg-foreground/10! **:data-[variant=destructive]:text-accent-foreground! **:data-[variant=destructive]:**:text-accent-foreground!",
                                  className
                                )}
        {...props}
      />
    </MenubarPortal>
  )
}

function MenubarItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <MenubarPrimitive.Item
      data-slot="menubar-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "hn-:group/menubar-item hn-:relative hn-:flex hn-:min-h-7 hn-:cursor-default hn-:items-center hn-:gap-2 hn-:rounded-xl hn-:px-2 hn-:py-1.5 hn-:text-sm hn-:outline-hidden hn-:select-none hn-:focus:bg-accent hn-:focus:text-accent-foreground hn-:not-data-[variant=destructive]:focus:**:text-accent-foreground hn-:data-inset:pl-7 hn-:data-[variant=destructive]:text-destructive hn-:data-[variant=destructive]:focus:bg-destructive/10 hn-:data-[variant=destructive]:focus:text-destructive hn-:dark:data-[variant=destructive]:focus:bg-destructive/20 hn-:data-disabled:pointer-events-none hn-:data-disabled:opacity-50 hn-:[&_svg]:pointer-events-none hn-:[&_svg]:shrink-0 hn-:[&_svg:not([class*=size-])]:size-4 hn-:data-[variant=destructive]:*:[svg]:text-destructive!",
        className
      )}
      {...props}
    />
  )
}

function MenubarCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem> & {
  inset?: boolean
}) {
  return (
    <MenubarPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
      data-inset={inset}
      className={cn(
        "hn-:relative hn-:flex hn-:min-h-7 hn-:cursor-default hn-:items-center hn-:gap-2 hn-:rounded-xl hn-:py-1.5 hn-:pr-1.5 hn-:pl-7 hn-:text-sm hn-:outline-hidden hn-:select-none hn-:focus:bg-accent hn-:focus:text-accent-foreground hn-:focus:**:text-accent-foreground hn-:data-inset:pl-7 hn-:data-disabled:pointer-events-none hn-:[&_svg]:pointer-events-none hn-:[&_svg]:shrink-0",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="hn-:pointer-events-none hn-:absolute hn-:left-1.5 hn-:flex hn-:size-4 hn-:items-center hn-:justify-center hn-:[&_svg:not([class*=size-])]:size-4">
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon
          />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  )
}

function MenubarRadioItem({
  className,
  children,
  inset,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioItem> & {
  inset?: boolean
}) {
  return (
    <MenubarPrimitive.RadioItem
      data-slot="menubar-radio-item"
      data-inset={inset}
      className={cn(
        "hn-:relative hn-:flex hn-:min-h-7 hn-:cursor-default hn-:items-center hn-:gap-2 hn-:rounded-xl hn-:py-1.5 hn-:pr-1.5 hn-:pl-7 hn-:text-sm hn-:outline-hidden hn-:select-none hn-:focus:bg-accent hn-:focus:text-accent-foreground hn-:focus:**:text-accent-foreground hn-:data-inset:pl-7 hn-:data-disabled:pointer-events-none hn-:data-disabled:opacity-50 hn-:[&_svg]:pointer-events-none hn-:[&_svg]:shrink-0 hn-:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      {...props}
    >
      <span className="hn-:pointer-events-none hn-:absolute hn-:left-1.5 hn-:flex hn-:size-4 hn-:items-center hn-:justify-center hn-:[&_svg:not([class*=size-])]:size-4">
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon
          />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  )
}

function MenubarLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <MenubarPrimitive.Label
      data-slot="menubar-label"
      data-inset={inset}
      className={cn(
        "hn-:px-2 hn-:py-1 hn-:text-sm hn-:text-muted-foreground hn-:data-inset:pl-7",
        className
      )}
      {...props}
    />
  )
}

function MenubarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Separator>) {
  return (
    <MenubarPrimitive.Separator
      data-slot="menubar-separator"
      className={cn("hn-:-mx-1 hn-:my-1 hn-:h-px hn-:bg-border/50", className)}
      {...props}
    />
  )
}

function MenubarShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="menubar-shortcut"
      className={cn(
        "hn-:ml-auto hn-:text-xs hn-:tracking-widest hn-:text-muted-foreground hn-:group-focus/menubar-item:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

function MenubarSub({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}

function MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <MenubarPrimitive.SubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      className={cn(
        "hn-:flex hn-:min-h-7 hn-:cursor-default hn-:items-center hn-:gap-2 hn-:rounded-xl hn-:px-2 hn-:py-1.5 hn-:text-sm hn-:outline-none hn-:select-none hn-:focus:bg-accent hn-:focus:text-accent-foreground hn-:data-inset:pl-7 hn-:data-open:bg-accent hn-:data-open:text-accent-foreground hn-:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="hn-:ml-auto hn-:size-4" />
    </MenubarPrimitive.SubTrigger>
  )
}

function MenubarSubContent({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubContent>) {
  return (
    <MenubarPrimitive.SubContent
      data-slot="menubar-sub-content"
      className={cn(
                        "hn-:dark hn-: hn-:z-50 hn-:min-w-32 hn-:origin-(--radix-menubar-content-transform-origin) hn-:overflow-hidden hn-:rounded-2xl hn-:bg-popover hn-:p-1 hn-:text-popover-foreground hn-:shadow-lg hn-:ring-1 hn-:ring-foreground/5 hn-:duration-100 hn-:data-[side=bottom]:slide-in-from-top-2 hn-:data-[side=left]:slide-in-from-right-2 hn-:data-[side=right]:slide-in-from-left-2 hn-:data-[side=top]:slide-in-from-bottom-2 hn-:dark:ring-foreground/10 hn-:data-open:animate-in hn-:data-open:fade-in-0 hn-:data-open:zoom-in-95 hn-:data-closed:animate-out hn-:data-closed:fade-out-0 hn-:data-closed:zoom-out-95 animate-none! relative bg-popover/70 before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150 **:data-[slot$=-item]:focus:bg-foreground/10 **:data-[slot$=-item]:data-highlighted:bg-foreground/10 **:data-[slot$=-separator]:bg-foreground/5 **:data-[slot$=-trigger]:focus:bg-foreground/10 **:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! **:data-[variant=destructive]:focus:bg-foreground/10! **:data-[variant=destructive]:text-accent-foreground! **:data-[variant=destructive]:**:text-accent-foreground!",
                        className
                      )}
      {...props}
    />
  )
}

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
}

"use client"

import * as React from "react"
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { CheckIcon, ChevronRightIcon } from "lucide-react"

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  )
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  )
}

function DropdownMenuContent({
  className,
  align = "start",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        align={align}
        className={cn(
                                  "hn-:dark hn-: hn-:z-50 hn-:max-h-(--radix-dropdown-menu-content-available-height) hn-:w-(--radix-dropdown-menu-trigger-width) hn-:min-w-32 hn-:origin-(--radix-dropdown-menu-content-transform-origin) hn-:overflow-x-hidden hn-:overflow-y-auto hn-:rounded-2xl hn-:bg-popover hn-:p-1 hn-:text-popover-foreground hn-:shadow-lg hn-:ring-1 hn-:ring-foreground/5 hn-:duration-100 hn-:data-[side=bottom]:slide-in-from-top-2 hn-:data-[side=left]:slide-in-from-right-2 hn-:data-[side=right]:slide-in-from-left-2 hn-:data-[side=top]:slide-in-from-bottom-2 hn-:data-[state=closed]:overflow-hidden hn-:dark:ring-foreground/10 hn-:data-open:animate-in hn-:data-open:fade-in-0 hn-:data-open:zoom-in-95 hn-:data-closed:animate-out hn-:data-closed:fade-out-0 hn-:data-closed:zoom-out-95 animate-none! relative bg-popover/70 before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150 **:data-[slot$=-item]:focus:bg-foreground/10 **:data-[slot$=-item]:data-highlighted:bg-foreground/10 **:data-[slot$=-separator]:bg-foreground/5 **:data-[slot$=-trigger]:focus:bg-foreground/10 **:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! **:data-[variant=destructive]:focus:bg-foreground/10! **:data-[variant=destructive]:text-accent-foreground! **:data-[variant=destructive]:**:text-accent-foreground!",
                                  className
                                )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "hn-:group/dropdown-menu-item hn-:relative hn-:flex hn-:min-h-7 hn-:cursor-default hn-:items-center hn-:gap-2 hn-:rounded-xl hn-:px-2 hn-:py-1.5 hn-:text-sm hn-:outline-hidden hn-:select-none hn-:focus:bg-accent hn-:focus:text-accent-foreground hn-:not-data-[variant=destructive]:focus:**:text-accent-foreground hn-:data-inset:pl-7 hn-:data-[variant=destructive]:text-destructive hn-:data-[variant=destructive]:focus:bg-destructive/10 hn-:data-[variant=destructive]:focus:text-destructive hn-:dark:data-[variant=destructive]:focus:bg-destructive/20 hn-:data-disabled:pointer-events-none hn-:data-disabled:opacity-50 hn-:[&_svg]:pointer-events-none hn-:[&_svg]:shrink-0 hn-:[&_svg:not([class*=size-])]:size-4 hn-:data-[variant=destructive]:*:[svg]:text-destructive",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "hn-:relative hn-:flex hn-:min-h-7 hn-:cursor-default hn-:items-center hn-:gap-2 hn-:rounded-xl hn-:py-1.5 hn-:pr-8 hn-:pl-2 hn-:text-sm hn-:outline-hidden hn-:select-none hn-:focus:bg-accent hn-:focus:text-accent-foreground hn-:focus:**:text-accent-foreground hn-:data-inset:pl-7 hn-:data-disabled:pointer-events-none hn-:data-disabled:opacity-50 hn-:[&_svg]:pointer-events-none hn-:[&_svg]:shrink-0 hn-:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span
        className="hn-:pointer-events-none hn-:absolute hn-:right-2 hn-:flex hn-:items-center hn-:justify-center"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon
          />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn(
        "hn-:relative hn-:flex hn-:min-h-7 hn-:cursor-default hn-:items-center hn-:gap-2 hn-:rounded-xl hn-:py-1.5 hn-:pr-8 hn-:pl-2 hn-:text-sm hn-:outline-hidden hn-:select-none hn-:focus:bg-accent hn-:focus:text-accent-foreground hn-:focus:**:text-accent-foreground hn-:data-inset:pl-7 hn-:data-disabled:pointer-events-none hn-:data-disabled:opacity-50 hn-:[&_svg]:pointer-events-none hn-:[&_svg]:shrink-0 hn-:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      {...props}
    >
      <span
        className="hn-:pointer-events-none hn-:absolute hn-:right-2 hn-:flex hn-:items-center hn-:justify-center"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon
          />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "hn-:px-2 hn-:py-1 hn-:text-xs hn-:text-muted-foreground hn-:data-inset:pl-7",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("hn-:-mx-1 hn-:my-1 hn-:h-px hn-:bg-border/50", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "hn-:ml-auto hn-:text-xs hn-:tracking-widest hn-:text-muted-foreground hn-:group-focus/dropdown-menu-item:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "hn-:flex hn-:min-h-7 hn-:cursor-default hn-:items-center hn-:gap-2 hn-:rounded-xl hn-:px-2 hn-:py-1.5 hn-:text-sm hn-:outline-hidden hn-:select-none hn-:focus:bg-accent hn-:focus:text-accent-foreground hn-:not-data-[variant=destructive]:focus:**:text-accent-foreground hn-:data-inset:pl-7 hn-:data-open:bg-accent hn-:data-open:text-accent-foreground hn-:[&_svg]:pointer-events-none hn-:[&_svg]:shrink-0 hn-:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="hn-:ml-auto" />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
                        "hn-:dark hn-: hn-:z-50 hn-:min-w-[96px] hn-:origin-(--radix-dropdown-menu-content-transform-origin) hn-:overflow-hidden hn-:rounded-2xl hn-:bg-popover hn-:p-1 hn-:text-popover-foreground hn-:shadow-lg hn-:ring-1 hn-:ring-foreground/5 hn-:duration-100 hn-:data-[side=bottom]:slide-in-from-top-2 hn-:data-[side=left]:slide-in-from-right-2 hn-:data-[side=right]:slide-in-from-left-2 hn-:data-[side=top]:slide-in-from-bottom-2 hn-:dark:ring-foreground/10 hn-:data-open:animate-in hn-:data-open:fade-in-0 hn-:data-open:zoom-in-95 hn-:data-closed:animate-out hn-:data-closed:fade-out-0 hn-:data-closed:zoom-out-95 animate-none! relative bg-popover/70 before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150 **:data-[slot$=-item]:focus:bg-foreground/10 **:data-[slot$=-item]:data-highlighted:bg-foreground/10 **:data-[slot$=-separator]:bg-foreground/5 **:data-[slot$=-trigger]:focus:bg-foreground/10 **:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! **:data-[variant=destructive]:focus:bg-foreground/10! **:data-[variant=destructive]:text-accent-foreground! **:data-[variant=destructive]:**:text-accent-foreground!",
                        className
                      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}

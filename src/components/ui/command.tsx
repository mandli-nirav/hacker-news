"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  InputGroup,
  InputGroupAddon,
} from "@/components/ui/input-group"
import { SearchIcon, CheckIcon } from "lucide-react"

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "hn-:flex hn-:size-full hn-:flex-col hn-:overflow-hidden hn-:rounded-3xl hn-:bg-popover hn-:p-1 hn-:text-popover-foreground",
        className
      )}
      {...props}
    />
  )
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = false,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="hn-:sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn(
          "hn-:top-1/3 hn-:translate-y-0 hn-:overflow-hidden hn-:rounded-3xl! hn-:p-0",
          className
        )}
        showCloseButton={showCloseButton}
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div data-slot="command-input-wrapper" className="hn-:p-1 hn-:pb-0">
      <InputGroup className="hn-:h-8! hn-:bg-input/50">
        <CommandPrimitive.Input
          data-slot="command-input"
          className={cn(
            "hn-:w-full hn-:text-sm hn-:outline-hidden hn-:disabled:cursor-not-allowed hn-:disabled:opacity-50",
            className
          )}
          {...props}
        />
        <InputGroupAddon>
          <SearchIcon className="hn-:size-4 hn-:shrink-0 hn-:opacity-50" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "hn-:no-scrollbar hn-:max-h-72 hn-:scroll-py-1 hn-:overflow-x-hidden hn-:overflow-y-auto hn-:outline-none",
        className
      )}
      {...props}
    />
  )
}

function CommandEmpty({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn("hn-:py-6 hn-:text-center hn-:text-sm", className)}
      {...props}
    />
  )
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "hn-:overflow-hidden hn-:p-1 hn-:text-foreground hn-:**:[[cmdk-group-heading]]:px-2 hn-:**:[[cmdk-group-heading]]:py-1.5 hn-:**:[[cmdk-group-heading]]:text-xs hn-:**:[[cmdk-group-heading]]:font-medium hn-:**:[[cmdk-group-heading]]:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("hn-:my-1 hn-:h-px hn-:bg-border/50", className)}
      {...props}
    />
  )
}

function CommandItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "hn-:group/command-item hn-:relative hn-:flex hn-:min-h-7 hn-:cursor-default hn-:items-center hn-:gap-2 hn-:rounded-xl hn-:px-2 hn-:py-1.5 hn-:text-sm hn-:outline-hidden hn-:select-none hn-:in-data-[slot=dialog-content]:rounded-2xl hn-:data-[disabled=true]:pointer-events-none hn-:data-[disabled=true]:opacity-50 hn-:data-selected:bg-muted hn-:data-selected:text-foreground hn-:[&_svg]:pointer-events-none hn-:[&_svg]:shrink-0 hn-:[&_svg:not([class*=size-])]:size-4 hn-:data-selected:*:[svg]:text-foreground",
        className
      )}
      {...props}
    >
      {children}
      <CheckIcon className="hn-:ml-auto hn-:opacity-0 hn-:group-has-data-[slot=command-shortcut]/command-item:hidden hn-:group-data-[checked=true]/command-item:opacity-100" />
    </CommandPrimitive.Item>
  )
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "hn-:ml-auto hn-:text-xs hn-:tracking-widest hn-:text-muted-foreground hn-:group-data-selected/command-item:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}

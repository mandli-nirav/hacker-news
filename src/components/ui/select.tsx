"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { ChevronDownIcon, CheckIcon, ChevronUpIcon } from "lucide-react"

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("hn-:scroll-my-1.5 hn-:p-1", className)}
      {...props}
    />
  )
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "hn-:flex hn-:w-fit hn-:items-center hn-:justify-between hn-:gap-1.5 hn-:rounded-2xl hn-:border hn-:border-transparent hn-:bg-input/50 hn-:px-3 hn-:py-2 hn-:text-sm hn-:whitespace-nowrap hn-:transition-[color,box-shadow] hn-:duration-200 hn-:outline-none hn-:focus-visible:border-ring hn-:focus-visible:ring-3 hn-:focus-visible:ring-ring/30 hn-:disabled:cursor-not-allowed hn-:disabled:opacity-50 hn-:aria-invalid:border-destructive hn-:aria-invalid:ring-3 hn-:aria-invalid:ring-destructive/20 hn-:data-placeholder:text-muted-foreground hn-:data-[size=default]:h-8 hn-:data-[size=sm]:h-7 hn-:*:data-[slot=select-value]:line-clamp-1 hn-:*:data-[slot=select-value]:flex hn-:*:data-[slot=select-value]:items-center hn-:*:data-[slot=select-value]:gap-1.5 hn-:dark:aria-invalid:border-destructive/50 hn-:dark:aria-invalid:ring-destructive/40 hn-:[&_svg]:pointer-events-none hn-:[&_svg]:shrink-0 hn-:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="hn-:pointer-events-none hn-:size-4 hn-:text-muted-foreground" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "item-aligned",
  align = "center",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        data-align-trigger={position === "item-aligned"}
        className={cn(
                                  "hn-:dark hn-: hn-:relative hn-:z-50 hn-:max-h-(--radix-select-content-available-height) hn-:min-w-36 hn-:origin-(--radix-select-content-transform-origin) hn-:overflow-x-hidden hn-:overflow-y-auto hn-:rounded-2xl hn-:bg-popover hn-:text-popover-foreground hn-:shadow-lg hn-:ring-1 hn-:ring-foreground/5 hn-:duration-100 hn-:data-[align-trigger=true]:animate-none hn-:data-[side=bottom]:slide-in-from-top-2 hn-:data-[side=left]:slide-in-from-right-2 hn-:data-[side=right]:slide-in-from-left-2 hn-:data-[side=top]:slide-in-from-bottom-2 hn-:dark:ring-foreground/10 hn-:data-open:animate-in hn-:data-open:fade-in-0 hn-:data-open:zoom-in-95 hn-:data-closed:animate-out hn-:data-closed:fade-out-0 hn-:data-closed:zoom-out-95 animate-none! relative bg-popover/70 before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150 **:data-[slot$=-item]:focus:bg-foreground/10 **:data-[slot$=-item]:data-highlighted:bg-foreground/10 **:data-[slot$=-separator]:bg-foreground/5 **:data-[slot$=-trigger]:focus:bg-foreground/10 **:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! **:data-[variant=destructive]:focus:bg-foreground/10! **:data-[variant=destructive]:text-accent-foreground! **:data-[variant=destructive]:**:text-accent-foreground!",
                                  position === "popper" &&
                                    "hn-:data-[side=bottom]:translate-y-1 hn-:data-[side=left]:-translate-x-1 hn-:data-[side=right]:translate-x-1 hn-:data-[side=top]:-translate-y-1",
                                  className
                                )}
        position={position}
        align={align}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          data-position={position}
          className={cn(
            "hn-:data-[position=popper]:h-(--radix-select-trigger-height) hn-:data-[position=popper]:w-full hn-:data-[position=popper]:min-w-(--radix-select-trigger-width)",
            position === "popper" && "hn-:"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("hn-:px-2 hn-:py-1 hn-:text-xs hn-:text-muted-foreground", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "hn-:relative hn-:flex hn-:min-h-7 hn-:w-full hn-:cursor-default hn-:items-center hn-:gap-2 hn-:rounded-xl hn-:py-1.5 hn-:pr-8 hn-:pl-2 hn-:text-sm hn-:outline-hidden hn-:select-none hn-:focus:bg-accent hn-:focus:text-accent-foreground hn-:not-data-[variant=destructive]:focus:**:text-accent-foreground hn-:data-disabled:pointer-events-none hn-:data-disabled:opacity-50 hn-:[&_svg]:pointer-events-none hn-:[&_svg]:shrink-0 hn-:[&_svg:not([class*=size-])]:size-4 hn-:*:[span]:last:flex hn-:*:[span]:last:items-center hn-:*:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span className="hn-:pointer-events-none hn-:absolute hn-:right-2 hn-:flex hn-:size-4 hn-:items-center hn-:justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="hn-:pointer-events-none" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("hn-:pointer-events-none hn-:-mx-1 hn-:my-1 hn-:h-px hn-:bg-border", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "hn-:z-10 hn-:flex hn-:cursor-default hn-:items-center hn-:justify-center hn-:bg-popover hn-:py-1 hn-:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronUpIcon
      />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "hn-:z-10 hn-:flex hn-:cursor-default hn-:items-center hn-:justify-center hn-:bg-popover hn-:py-1 hn-:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronDownIcon
      />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}

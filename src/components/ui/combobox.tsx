"use client"

import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { ChevronDownIcon, XIcon, CheckIcon } from "lucide-react"

const Combobox = ComboboxPrimitive.Root

function ComboboxValue({ ...props }: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />
}

function ComboboxTrigger({
  className,
  children,
  ...props
}: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={cn("hn-:[&_svg:not([class*=size-])]:size-4", className)}
      {...props}
    >
      {children}
      <ChevronDownIcon className="hn-:pointer-events-none hn-:size-4 hn-:text-muted-foreground" />
    </ComboboxPrimitive.Trigger>
  )
}

function ComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      render={<InputGroupButton variant="ghost" size="icon-xs" />}
      className={cn(className)}
      {...props}
    >
      <XIcon className="hn-:pointer-events-none" />
    </ComboboxPrimitive.Clear>
  )
}

function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean
  showClear?: boolean
}) {
  return (
    <InputGroup className={cn("hn-:w-auto", className)}>
      <ComboboxPrimitive.Input
        render={<InputGroupInput disabled={disabled} />}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        {showTrigger && (
          <InputGroupButton
            size="icon-xs"
            variant="ghost"
            asChild
            data-slot="input-group-button"
            className="hn-:group-has-data-[slot=combobox-clear]/input-group:hidden hn-:data-pressed:bg-transparent"
            disabled={disabled}
          >
            <ComboboxTrigger />
          </InputGroupButton>
        )}
        {showClear && <ComboboxClear disabled={disabled} />}
      </InputGroupAddon>
      {children}
    </InputGroup>
  )
}

function ComboboxContent({
  className,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  anchor,
  ...props
}: ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset" | "anchor"
  >) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="hn-:isolate hn-:z-50"
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          data-chips={!!anchor}
          className={cn(
                                            "hn-:dark hn-: hn-:group/combobox-content hn-:relative hn-:max-h-(--available-height) hn-:w-(--anchor-width) hn-:max-w-(--available-width) hn-:min-w-[calc(var(--anchor-width)+--spacing(7))] hn-:origin-(--transform-origin) hn-:overflow-hidden hn-:rounded-2xl hn-:bg-popover hn-:text-popover-foreground hn-:shadow-lg hn-:ring-1 hn-:ring-foreground/5 hn-:duration-100 hn-:data-[chips=true]:min-w-(--anchor-width) hn-:data-[side=bottom]:slide-in-from-top-2 hn-:data-[side=inline-end]:slide-in-from-left-2 hn-:data-[side=inline-start]:slide-in-from-right-2 hn-:data-[side=left]:slide-in-from-right-2 hn-:data-[side=right]:slide-in-from-left-2 hn-:data-[side=top]:slide-in-from-bottom-2 hn-:*:data-[slot=input-group]:m-1 hn-:*:data-[slot=input-group]:mb-0 hn-:*:data-[slot=input-group]:h-8 hn-:*:data-[slot=input-group]:border-input/30 hn-:*:data-[slot=input-group]:bg-input/50 hn-:*:data-[slot=input-group]:shadow-none hn-:dark:ring-foreground/10 hn-:data-open:animate-in hn-:data-open:fade-in-0 hn-:data-open:zoom-in-95 hn-:data-closed:animate-out hn-:data-closed:fade-out-0 hn-:data-closed:zoom-out-95 animate-none! relative bg-popover/70 before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150 **:data-[slot$=-item]:focus:bg-foreground/10 **:data-[slot$=-item]:data-highlighted:bg-foreground/10 **:data-[slot$=-separator]:bg-foreground/5 **:data-[slot$=-trigger]:focus:bg-foreground/10 **:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! **:data-[variant=destructive]:focus:bg-foreground/10! **:data-[variant=destructive]:text-accent-foreground! **:data-[variant=destructive]:**:text-accent-foreground!",
                                            className
                                          )}
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  )
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn(
        "hn-:no-scrollbar hn-:max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] hn-:scroll-py-1 hn-:overflow-y-auto hn-:overscroll-contain hn-:p-1 hn-:data-empty:p-0",
        className
      )}
      {...props}
    />
  )
}

function ComboboxItem({
  className,
  children,
  ...props
}: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(
        "hn-:relative hn-:flex hn-:min-h-7 hn-:w-full hn-:cursor-default hn-:items-center hn-:gap-2 hn-:rounded-xl hn-:py-1.5 hn-:pr-8 hn-:pl-2 hn-:text-sm hn-:outline-hidden hn-:select-none hn-:data-highlighted:bg-accent hn-:data-highlighted:text-accent-foreground hn-:not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground hn-:data-disabled:pointer-events-none hn-:data-disabled:opacity-50 hn-:[&_svg]:pointer-events-none hn-:[&_svg]:shrink-0 hn-:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ComboboxPrimitive.ItemIndicator
        render={
          <span className="hn-:pointer-events-none hn-:absolute hn-:right-2 hn-:flex hn-:size-4 hn-:items-center hn-:justify-center" />
        }
      >
        <CheckIcon className="hn-:pointer-events-none" />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  )
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return (
    <ComboboxPrimitive.Group
      data-slot="combobox-group"
      className={cn(className)}
      {...props}
    />
  )
}

function ComboboxLabel({
  className,
  ...props
}: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={cn("hn-:px-2 hn-:py-1.5 hn-:text-xs hn-:text-muted-foreground", className)}
      {...props}
    />
  )
}

function ComboboxCollection({ ...props }: ComboboxPrimitive.Collection.Props) {
  return (
    <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
  )
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn(
        "hn-:hidden hn-:w-full hn-:justify-center hn-:py-2 hn-:text-center hn-:text-sm hn-:text-muted-foreground hn-:group-data-empty/combobox-content:flex",
        className
      )}
      {...props}
    />
  )
}

function ComboboxSeparator({
  className,
  ...props
}: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cn("hn-:-mx-1 hn-:my-1 hn-:h-px hn-:bg-border", className)}
      {...props}
    />
  )
}

function ComboboxChips({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> &
  ComboboxPrimitive.Chips.Props) {
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      className={cn(
        "hn-:flex hn-:min-h-8 hn-:flex-wrap hn-:items-center hn-:gap-1 hn-:rounded-2xl hn-:border hn-:border-transparent hn-:bg-input/50 hn-:bg-clip-padding hn-:px-2.5 hn-:py-1 hn-:text-sm hn-:transition-[color,box-shadow] hn-:duration-200 hn-:focus-within:border-ring hn-:focus-within:ring-3 hn-:focus-within:ring-ring/30 hn-:has-aria-invalid:border-destructive hn-:has-aria-invalid:ring-3 hn-:has-aria-invalid:ring-destructive/20 hn-:has-data-[slot=combobox-chip]:px-1 hn-:dark:has-aria-invalid:border-destructive/50 hn-:dark:has-aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

function ComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean
}) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={cn(
        "hn-:flex hn-:h-[calc(--spacing(5.25))] hn-:w-fit hn-:items-center hn-:justify-center hn-:gap-1 hn-:rounded-2xl hn-:bg-input hn-:px-1.5 hn-:text-xs hn-:font-medium hn-:whitespace-nowrap hn-:text-foreground hn-:has-disabled:pointer-events-none hn-:has-disabled:cursor-not-allowed hn-:has-disabled:opacity-50 hn-:has-data-[slot=combobox-chip-remove]:pr-0.5 hn-:dark:bg-input/60",
        className
      )}
      {...props}
    >
      {children}
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          render={<Button variant="ghost" size="icon-xs" />}
          className="hn-:-ml-0.5 hn-:size-4.5 hn-:opacity-50 hn-:hover:opacity-100 hn-:aria-disabled:pointer-events-none"
          data-slot="combobox-chip-remove"
        >
          <XIcon className="hn-:pointer-events-none" />
        </ComboboxPrimitive.ChipRemove>
      )}
    </ComboboxPrimitive.Chip>
  )
}

function ComboboxChipsInput({
  className,
  ...props
}: ComboboxPrimitive.Input.Props) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      className={cn("hn-:min-w-16 hn-:flex-1 hn-:outline-none", className)}
      {...props}
    />
  )
}

function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null)
}

export {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
}

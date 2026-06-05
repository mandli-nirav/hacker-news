"use client"

import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & {
    spacing?: number
    orientation?: "horizontal" | "vertical"
  }
>({
  size: "default",
  variant: "default",
  spacing: 2,
  orientation: "horizontal",
})

function ToggleGroup({
  className,
  variant,
  size,
  spacing = 2,
  orientation = "horizontal",
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants> & {
    spacing?: number
    orientation?: "horizontal" | "vertical"
  }) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      data-orientation={orientation}
      style={{ "--gap": spacing } as React.CSSProperties}
      className={cn(
        "hn-:group/toggle-group hn-:flex hn-:w-fit hn-:flex-row hn-:items-center hn-:gap-[--spacing(var(--gap))] hn-:data-[spacing=0]:data-[variant=outline]:rounded-2xl hn-:data-vertical:flex-col hn-:data-vertical:items-stretch",
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider
        value={{ variant, size, spacing, orientation }}
      >
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
}

function ToggleGroupItem({
  className,
  children,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      data-spacing={context.spacing}
      className={cn(
        "hn-:shrink-0 hn-:group-data-[spacing=0]/toggle-group:rounded-none hn-:group-data-[spacing=0]/toggle-group:px-2 hn-:group-data-[spacing=0]/toggle-group:shadow-none hn-:focus:z-10 hn-:focus-visible:z-10 hn-:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-1.5 hn-:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-1.5 hn-:group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-2xl hn-:group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-2xl hn-:group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-2xl hn-:group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-2xl hn-:data-[state=on]:bg-muted hn-:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 hn-:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 hn-:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l hn-:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleGroupItem }

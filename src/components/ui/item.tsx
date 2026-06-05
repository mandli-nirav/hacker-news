import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={cn(
        "hn-:group/item-group hn-:flex hn-:w-full hn-:flex-col hn-:gap-4 hn-:has-data-[size=sm]:gap-2.5 hn-:has-data-[size=xs]:gap-2",
        className
      )}
      {...props}
    />
  )
}

function ItemSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn("hn-:my-2", className)}
      {...props}
    />
  )
}

const itemVariants = cva(
  "hn-:group/item hn-:flex hn-:w-full hn-:flex-wrap hn-:items-center hn-:rounded-2xl hn-:border hn-:text-sm hn-:transition-colors hn-:duration-100 hn-:outline-none hn-:focus-visible:border-ring hn-:focus-visible:ring-[3px] hn-:focus-visible:ring-ring/50 hn-:[a]:transition-colors hn-:[a]:hover:bg-muted",
  {
    variants: {
      variant: {
        default: "hn-:border-transparent",
        outline: "hn-:border-border",
        muted: "hn-:border-transparent hn-:bg-muted/50",
      },
      size: {
        default: "hn-:gap-3.5 hn-:px-4 hn-:py-3.5",
        sm: "hn-:gap-3.5 hn-:px-3.5 hn-:py-3",
        xs: "hn-:gap-2 hn-:px-2.5 hn-:py-2 hn-:in-data-[slot=dropdown-menu-content]:p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Item({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof itemVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "div"
  return (
    <Comp
      data-slot="item"
      data-variant={variant}
      data-size={size}
      className={cn(itemVariants({ variant, size, className }))}
      {...props}
    />
  )
}

const itemMediaVariants = cva(
  "hn-:flex hn-:shrink-0 hn-:items-center hn-:justify-center hn-:gap-2 hn-:group-has-data-[slot=item-description]/item:translate-y-0.5 hn-:group-has-data-[slot=item-description]/item:self-start hn-:[&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "hn-:bg-transparent",
        icon: "hn-:[&_svg:not([class*=size-])]:size-4",
        image:
          "hn-:size-10 hn-:overflow-hidden hn-:rounded-xl hn-:group-data-[size=sm]/item:size-8 hn-:group-data-[size=xs]/item:size-6 hn-:group-data-[size=xs]/item:rounded-lg hn-:[&_img]:size-full hn-:[&_img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function ItemMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-content"
      className={cn(
        "hn-:flex hn-:flex-1 hn-:flex-col hn-:gap-1 hn-:group-data-[size=xs]/item:gap-0.5 hn-:[&+[data-slot=item-content]]:flex-none",
        className
      )}
      {...props}
    />
  )
}

function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-title"
      className={cn(
        "hn-:line-clamp-1 hn-:flex hn-:w-fit hn-:items-center hn-:gap-2 hn-:text-sm hn-:leading-snug hn-:font-medium hn-:underline-offset-4",
        className
      )}
      {...props}
    />
  )
}

function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="item-description"
      className={cn(
        "hn-:line-clamp-2 hn-:text-left hn-:text-sm hn-:font-normal hn-:text-muted-foreground hn-:[&>a]:underline hn-:[&>a]:underline-offset-4 hn-:[&>a:hover]:text-primary",
        className
      )}
      {...props}
    />
  )
}

function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-actions"
      className={cn("hn-:flex hn-:items-center hn-:gap-2", className)}
      {...props}
    />
  )
}

function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-header"
      className={cn(
        "hn-:flex hn-:basis-full hn-:items-center hn-:justify-between hn-:gap-2",
        className
      )}
      {...props}
    />
  )
}

function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-footer"
      className={cn(
        "hn-:flex hn-:basis-full hn-:items-center hn-:justify-between hn-:gap-2",
        className
      )}
      {...props}
    />
  )
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
}

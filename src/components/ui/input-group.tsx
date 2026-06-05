"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "hn-:group/input-group hn-:relative hn-:flex hn-:h-8 hn-:w-full hn-:min-w-0 hn-:items-center hn-:rounded-2xl hn-:border hn-:border-transparent hn-:bg-input/50 hn-:transition-[color,box-shadow] hn-:duration-200 hn-:outline-none hn-:in-data-[slot=combobox-content]:focus-within:border-inherit hn-:in-data-[slot=combobox-content]:focus-within:ring-0 hn-:has-[[data-slot=input-group-control]:focus-visible]:border-ring hn-:has-[[data-slot=input-group-control]:focus-visible]:ring-3 hn-:has-[[data-slot=input-group-control]:focus-visible]:ring-ring/30 hn-:has-[[data-slot][aria-invalid=true]]:border-destructive hn-:has-[[data-slot][aria-invalid=true]]:ring-3 hn-:has-[[data-slot][aria-invalid=true]]:ring-destructive/20 hn-:has-[>[data-align=block-end]]:h-auto hn-:has-[>[data-align=block-end]]:flex-col hn-:has-[>[data-align=block-start]]:h-auto hn-:has-[>[data-align=block-start]]:flex-col hn-:has-[>textarea]:h-auto hn-:dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 hn-:has-[>[data-align=block-end]]:[&>input]:pt-3 hn-:has-[>[data-align=block-start]]:[&>input]:pb-3 hn-:has-[>[data-align=inline-end]]:[&>input]:pr-1.5 hn-:has-[>[data-align=inline-start]]:[&>input]:pl-1.5",
        className
      )}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  "hn-:flex hn-:h-auto hn-:cursor-text hn-:items-center hn-:justify-center hn-:gap-2 hn-:py-1.5 hn-:text-sm hn-:font-medium hn-:text-muted-foreground hn-:select-none hn-:group-data-[disabled=true]/input-group:opacity-50 hn-:**:data-[slot=kbd]:rounded-2xl hn-:**:data-[slot=kbd]:bg-muted-foreground/10 hn-:**:data-[slot=kbd]:px-1.5 hn-:[&>svg:not([class*=size-])]:size-4",
  {
    variants: {
      align: {
        "inline-start":
          "hn-:order-first hn-:pl-2 hn-:has-[>button]:ml-[-0.3rem] hn-:has-[>kbd]:ml-[-0.15rem]",
        "inline-end":
          "hn-:order-last hn-:pr-2 hn-:has-[>button]:mr-[-0.3rem] hn-:has-[>kbd]:mr-[-0.15rem]",
        "block-start":
          "hn-:order-first hn-:w-full hn-:justify-start hn-:px-2.5 hn-:pt-2 hn-:group-has-[>input]/input-group:pt-2 hn-:[.border-b]:pb-2",
        "block-end":
          "hn-:order-last hn-:w-full hn-:justify-start hn-:px-2.5 hn-:pb-2 hn-:group-has-[>input]/input-group:pb-2 hn-:[.border-t]:pt-2",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus()
      }}
      {...props}
    />
  )
}

const inputGroupButtonVariants = cva(
  "hn-:flex hn-:items-center hn-:gap-2 hn-:rounded-2xl hn-:text-sm hn-:shadow-none",
  {
    variants: {
      size: {
        xs: "hn-:h-6 hn-:gap-1 hn-:rounded-xl hn-:px-1.5 hn-:[&>svg:not([class*=size-])]:size-3.5",
        sm: "hn-:",
        "icon-xs": "hn-:size-6 hn-:rounded-xl hn-:p-0 hn-:has-[>svg]:p-0",
        "icon-sm": "hn-:size-8 hn-:p-0 hn-:has-[>svg]:p-0",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  }
)

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size"> &
  VariantProps<typeof inputGroupButtonVariants>) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "hn-:flex hn-:items-center hn-:gap-2 hn-:text-sm hn-:text-muted-foreground hn-:[&_svg]:pointer-events-none hn-:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "hn-:flex-1 hn-:rounded-none hn-:border-0 hn-:bg-transparent hn-:shadow-none hn-:ring-0 hn-:focus-visible:ring-0 hn-:aria-invalid:ring-0 hn-:dark:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "hn-:flex-1 hn-:resize-none hn-:rounded-none hn-:border-0 hn-:bg-transparent hn-:py-2 hn-:shadow-none hn-:ring-0 hn-:focus-visible:ring-0 hn-:aria-invalid:ring-0 hn-:dark:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}

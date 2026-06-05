import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "hn-:group/alert hn-:relative hn-:grid hn-:w-full hn-:gap-0.5 hn-:rounded-2xl hn-:border hn-:px-4 hn-:py-3 hn-:text-left hn-:text-sm hn-:has-data-[slot=alert-action]:relative hn-:has-data-[slot=alert-action]:pr-18 hn-:has-[>svg]:grid-cols-[auto_1fr] hn-:has-[>svg]:gap-x-2.5 hn-:*:[svg]:row-span-2 hn-:*:[svg]:translate-y-0.5 hn-:*:[svg]:text-current hn-:*:[svg:not([class*=size-])]:size-4",
  {
    variants: {
      variant: {
        default: "hn-:bg-card hn-:text-card-foreground",
        destructive:
          "hn-:bg-card hn-:text-destructive hn-:*:data-[slot=alert-description]:text-destructive/90 hn-:*:[svg]:text-current",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "hn-:font-medium hn-:group-has-[>svg]/alert:col-start-2 hn-:[&_a]:underline hn-:[&_a]:underline-offset-3 hn-:[&_a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "hn-:text-sm hn-:text-balance hn-:text-muted-foreground hn-:md:text-pretty hn-:[&_a]:underline hn-:[&_a]:underline-offset-3 hn-:[&_a]:hover:text-foreground hn-:[&_p:not(:last-child)]:mb-4",
        className
      )}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("hn-:absolute hn-:top-2.5 hn-:right-3", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction }

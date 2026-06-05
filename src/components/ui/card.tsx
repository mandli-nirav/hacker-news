import * as React from "react"

import { cn } from "@/lib/utils"

function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "hn-:group/card hn-:flex hn-:flex-col hn-:gap-5 hn-:overflow-hidden hn-:rounded-[min(var(--radius-4xl),24px)] hn-:bg-card hn-:py-5 hn-:text-sm hn-:text-card-foreground hn-:shadow-sm hn-:ring-1 hn-:ring-foreground/5 hn-:has-[>img:first-child]:pt-0 hn-:data-[size=sm]:gap-4 hn-:data-[size=sm]:py-4 hn-:dark:ring-foreground/10 hn-:*:[img:first-child]:rounded-t-[min(var(--radius-4xl),24px)] hn-:*:[img:last-child]:rounded-b-[min(var(--radius-4xl),24px)]",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "hn-:group/card-header hn-:@container/card-header hn-:grid hn-:auto-rows-min hn-:items-start hn-:gap-1.5 hn-:rounded-t-[min(var(--radius-4xl),24px)] hn-:px-5 hn-:group-data-[size=sm]/card:px-4 hn-:has-data-[slot=card-action]:grid-cols-[1fr_auto] hn-:has-data-[slot=card-description]:grid-rows-[auto_auto] hn-:[.border-b]:pb-5 hn-:group-data-[size=sm]/card:[.border-b]:pb-4",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("hn-:font-heading hn-:text-base hn-:font-medium", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("hn-:text-sm hn-:text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "hn-:col-start-2 hn-:row-span-2 hn-:row-start-1 hn-:self-start hn-:justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("hn-:px-5 hn-:group-data-[size=sm]/card:px-4", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "hn-:flex hn-:items-center hn-:rounded-b-[min(var(--radius-4xl),24px)] hn-:px-5 hn-:group-data-[size=sm]/card:px-4 hn-:[.border-t]:pt-5 hn-:group-data-[size=sm]/card:[.border-t]:pt-4",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}

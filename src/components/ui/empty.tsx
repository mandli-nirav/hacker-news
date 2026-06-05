import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function Empty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty"
      className={cn(
        "hn-:flex hn-:w-full hn-:min-w-0 hn-:flex-1 hn-:flex-col hn-:items-center hn-:justify-center hn-:gap-4 hn-:rounded-3xl hn-:border-dashed hn-:p-12 hn-:text-center hn-:text-balance",
        className
      )}
      {...props}
    />
  )
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-header"
      className={cn("hn-:flex hn-:max-w-sm hn-:flex-col hn-:items-center hn-:gap-2", className)}
      {...props}
    />
  )
}

const emptyMediaVariants = cva(
  "hn-:mb-2 hn-:flex hn-:shrink-0 hn-:items-center hn-:justify-center hn-:[&_svg]:pointer-events-none hn-:[&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hn-:bg-transparent",
        icon: "hn-:flex hn-:size-10 hn-:shrink-0 hn-:items-center hn-:justify-center hn-:rounded-xl hn-:bg-muted hn-:text-foreground hn-:[&_svg:not([class*=size-])]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function EmptyMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-title"
      className={cn(
        "hn-:font-heading hn-:text-lg hn-:font-medium hn-:tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        "hn-:text-sm/relaxed hn-:text-muted-foreground hn-:[&>a]:underline hn-:[&>a]:underline-offset-4 hn-:[&>a:hover]:text-primary",
        className
      )}
      {...props}
    />
  )
}

function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        "hn-:flex hn-:w-full hn-:max-w-sm hn-:min-w-0 hn-:flex-col hn-:items-center hn-:gap-4 hn-:text-sm hn-:text-balance",
        className
      )}
      {...props}
    />
  )
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
}

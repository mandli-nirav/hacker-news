import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

const buttonGroupVariants = cva(
  "hn-:group/button-group hn-:flex hn-:w-fit hn-:items-stretch hn-:*:focus-visible:relative hn-:*:focus-visible:z-10 hn-:has-[>[data-slot=button-group]]:gap-2 hn-:has-[>[data-variant=outline]]:*:data-[slot=input-group]:border-border hn-:has-[>[data-variant=outline]]:*:data-[slot=select-trigger]:border-border hn-:has-[>[data-variant=outline]]:[&>[data-slot=input-group]:has(:focus-visible)]:border-ring hn-:has-[>[data-variant=outline]]:[&>[data-slot=select-trigger]:focus-visible]:border-ring hn-:has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-2xl hn-:[&>[data-slot=select-trigger]:not([class*=w-])]:w-fit hn-:[&>input]:flex-1 hn-:has-[>[data-variant=outline]]:[&>input]:border-border hn-:has-[>[data-variant=outline]]:[&>input:focus-visible]:border-ring",
  {
    variants: {
      orientation: {
        horizontal:
          "hn-:[&>*:not(:first-child)]:rounded-l-none hn-:[&>*:not(:first-child)]:border-l-0 hn-:[&>*:not(:last-child)]:rounded-r-none hn-:[&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-2xl!",
        vertical:
          "hn-:flex-col hn-:[&>*:not(:first-child)]:rounded-t-none hn-:[&>*:not(:first-child)]:border-t-0 hn-:[&>*:not(:last-child)]:rounded-b-none hn-:[&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-2xl!",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
)

function ButtonGroup({
  className,
  orientation,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  )
}

function ButtonGroupText({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot.Root : "div"

  return (
    <Comp
      className={cn(
        "hn-:flex hn-:items-center hn-:gap-2 hn-:rounded-2xl hn-:border hn-:bg-muted hn-:px-2.5 hn-:text-sm hn-:font-medium hn-:[&_svg]:pointer-events-none hn-:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        "hn-:relative hn-:self-stretch hn-:bg-input hn-:data-horizontal:mx-px hn-:data-horizontal:w-auto hn-:data-vertical:my-px hn-:data-vertical:h-auto",
        className
      )}
      {...props}
    />
  )
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
}

"use client"

import { useMemo } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        "hn-:flex hn-:flex-col hn-:gap-6 hn-:has-[>[data-slot=checkbox-group]]:gap-3 hn-:has-[>[data-slot=radio-group]]:gap-3",
        className
      )}
      {...props}
    />
  )
}

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "hn-:mb-3 hn-:font-medium hn-:data-[variant=label]:text-sm hn-:data-[variant=legend]:text-base",
        className
      )}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        "hn-:group/field-group hn-:@container/field-group hn-:flex hn-:w-full hn-:flex-col hn-:gap-6 hn-:data-[slot=checkbox-group]:gap-3 hn-:*:data-[slot=field-group]:gap-4",
        className
      )}
      {...props}
    />
  )
}

const fieldVariants = cva(
  "hn-:group/field hn-:flex hn-:w-full hn-:gap-3 hn-:data-[invalid=true]:text-destructive",
  {
    variants: {
      orientation: {
        vertical: "hn-:flex-col hn-:*:w-full hn-:[&>.sr-only]:w-auto",
        horizontal:
          "hn-:flex-row hn-:items-center hn-:has-[>[data-slot=field-content]]:items-start hn-:*:data-[slot=field-label]:flex-auto hn-:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
        responsive:
          "hn-:flex-col hn-:*:w-full hn-:@md/field-group:flex-row hn-:@md/field-group:items-center hn-:@md/field-group:*:w-auto hn-:@md/field-group:has-[>[data-slot=field-content]]:items-start hn-:@md/field-group:*:data-[slot=field-label]:flex-auto hn-:[&>.sr-only]:w-auto hn-:@md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  }
)

function Field({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn(
        "hn-:group/field-content hn-:flex hn-:flex-1 hn-:flex-col hn-:gap-1 hn-:leading-snug",
        className
      )}
      {...props}
    />
  )
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        "hn-:group/field-label hn-:peer/field-label hn-:flex hn-:w-fit hn-:gap-2 hn-:leading-snug hn-:group-data-[disabled=true]/field:opacity-50 hn-:has-data-checked:bg-input/30 hn-:has-[>[data-slot=field]]:rounded-2xl hn-:has-[>[data-slot=field]]:border hn-:*:data-[slot=field]:p-4",
        "hn-:has-[>[data-slot=field]]:w-full hn-:has-[>[data-slot=field]]:flex-col",
        className
      )}
      {...props}
    />
  )
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-label"
      className={cn(
        "hn-:flex hn-:w-fit hn-:items-center hn-:gap-2 hn-:text-sm hn-:font-medium hn-:group-data-[disabled=true]/field:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        "hn-:text-left hn-:text-sm hn-:leading-normal hn-:font-normal hn-:text-muted-foreground hn-:group-has-data-horizontal/field:text-balance hn-:[[data-variant=legend]+&]:-mt-1.5",
        "hn-:last:mt-0 hn-:nth-last-2:-mt-1",
        "hn-:[&>a]:underline hn-:[&>a]:underline-offset-4 hn-:[&>a:hover]:text-primary",
        className
      )}
      {...props}
    />
  )
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  children?: React.ReactNode
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn(
        "hn-:relative hn-:-my-2 hn-:h-5 hn-:text-sm hn-:group-data-[variant=outline]/field-group:-mb-2",
        className
      )}
      {...props}
    >
      <Separator className="hn-:absolute hn-:inset-0 hn-:top-1/2" />
      {children && (
        <span
          className="hn-:relative hn-:mx-auto hn-:block hn-:w-fit hn-:bg-background hn-:px-2 hn-:text-muted-foreground"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  )
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>
}) {
  const content = useMemo(() => {
    if (children) {
      return children
    }

    if (!errors?.length) {
      return null
    }

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ]

    if (uniqueErrors?.length == 1) {
      return uniqueErrors[0]?.message
    }

    return (
      <ul className="hn-:ml-4 hn-:flex hn-:list-disc hn-:flex-col hn-:gap-1">
        {uniqueErrors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>
        )}
      </ul>
    )
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn("hn-:text-sm hn-:font-normal hn-:text-destructive", className)}
      {...props}
    >
      {content}
    </div>
  )
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
}

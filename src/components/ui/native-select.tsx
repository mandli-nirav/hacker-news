import * as React from "react"

import { cn } from "@/lib/utils"
import { ChevronDownIcon } from "lucide-react"

type NativeSelectProps = Omit<React.ComponentProps<"select">, "size"> & {
  size?: "sm" | "default"
}

function NativeSelect({
  className,
  size = "default",
  ...props
}: NativeSelectProps) {
  return (
    <div
      className={cn(
        "hn-:group/native-select hn-:relative hn-:w-fit hn-:has-[select:disabled]:opacity-50",
        className
      )}
      data-slot="native-select-wrapper"
      data-size={size}
    >
      <select
        data-slot="native-select"
        data-size={size}
        className="hn-:h-8 hn-:w-full hn-:min-w-0 hn-:appearance-none hn-:rounded-2xl hn-:border hn-:border-transparent hn-:bg-input/50 hn-:py-1 hn-:pr-8 hn-:pl-2.5 hn-:text-sm hn-:transition-[color,box-shadow] hn-:duration-200 hn-:outline-none hn-:select-none hn-:selection:bg-primary hn-:selection:text-primary-foreground hn-:placeholder:text-muted-foreground hn-:focus-visible:border-ring hn-:focus-visible:ring-3 hn-:focus-visible:ring-ring/30 hn-:disabled:pointer-events-none hn-:disabled:cursor-not-allowed hn-:aria-invalid:border-destructive hn-:aria-invalid:ring-3 hn-:aria-invalid:ring-destructive/20 hn-:data-[size=sm]:h-7 hn-:dark:aria-invalid:border-destructive/50 hn-:dark:aria-invalid:ring-destructive/40"
        {...props}
      />
      <ChevronDownIcon className="hn-:pointer-events-none hn-:absolute hn-:top-1/2 hn-:right-2.5 hn-:size-4 hn-:-translate-y-1/2 hn-:text-muted-foreground hn-:select-none" aria-hidden="true" data-slot="native-select-icon" />
    </div>
  )
}

function NativeSelectOption({
  className,
  ...props
}: React.ComponentProps<"option">) {
  return (
    <option
      data-slot="native-select-option"
      className={cn("hn-:bg-[Canvas] hn-:text-[CanvasText]", className)}
      {...props}
    />
  )
}

function NativeSelectOptGroup({
  className,
  ...props
}: React.ComponentProps<"optgroup">) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn("hn-:bg-[Canvas] hn-:text-[CanvasText]", className)}
      {...props}
    />
  )
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }

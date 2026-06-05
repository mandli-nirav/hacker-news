import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "hn-:flex hn-:field-sizing-content hn-:min-h-16 hn-:w-full hn-:resize-none hn-:rounded-2xl hn-:border hn-:border-transparent hn-:bg-input/50 hn-:px-2.5 hn-:py-2 hn-:text-base hn-:transition-[color,box-shadow] hn-:duration-200 hn-:outline-none hn-:placeholder:text-muted-foreground hn-:focus-visible:border-ring hn-:focus-visible:ring-3 hn-:focus-visible:ring-ring/30 hn-:disabled:cursor-not-allowed hn-:disabled:opacity-50 hn-:aria-invalid:border-destructive hn-:aria-invalid:ring-3 hn-:aria-invalid:ring-destructive/20 hn-:md:text-sm hn-:dark:aria-invalid:border-destructive/50 hn-:dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }

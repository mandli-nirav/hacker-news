import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "hn-:h-8 hn-:w-full hn-:min-w-0 hn-:rounded-2xl hn-:border hn-:border-transparent hn-:bg-input/50 hn-:px-2.5 hn-:py-1 hn-:text-base hn-:transition-[color,box-shadow] hn-:duration-200 hn-:outline-none hn-:file:inline-flex hn-:file:h-6 hn-:file:border-0 hn-:file:bg-transparent hn-:file:text-sm hn-:file:font-medium hn-:file:text-foreground hn-:placeholder:text-muted-foreground hn-:focus-visible:border-ring hn-:focus-visible:ring-3 hn-:focus-visible:ring-ring/30 hn-:disabled:pointer-events-none hn-:disabled:cursor-not-allowed hn-:disabled:opacity-50 hn-:aria-invalid:border-destructive hn-:aria-invalid:ring-3 hn-:aria-invalid:ring-destructive/20 hn-:md:text-sm hn-:dark:aria-invalid:border-destructive/50 hn-:dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }

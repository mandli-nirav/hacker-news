import { cn } from "@/lib/utils"

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "hn-:pointer-events-none hn-:inline-flex hn-:h-5 hn-:w-fit hn-:min-w-5 hn-:items-center hn-:justify-center hn-:gap-1 hn-:rounded-lg hn-:bg-muted hn-:px-1 hn-:font-sans hn-:text-xs hn-:font-medium hn-:text-muted-foreground hn-:select-none hn-:in-data-[slot=input-group]:bg-input hn-:in-data-[slot=tooltip-content]:bg-background/20 hn-:in-data-[slot=tooltip-content]:text-background hn-:dark:in-data-[slot=tooltip-content]:bg-background/10 hn-:[&_svg:not([class*=size-])]:size-3",
        className
      )}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn("hn-:inline-flex hn-:items-center hn-:gap-1", className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }

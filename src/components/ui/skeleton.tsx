import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("hn-:animate-pulse hn-:rounded-2xl hn-:bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }

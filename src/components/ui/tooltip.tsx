"use client"

import * as React from "react"
import { Tooltip as TooltipPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "hn-:z-50 hn-:inline-flex hn-:w-fit hn-:max-w-xs hn-:origin-(--radix-tooltip-content-transform-origin) hn-:items-center hn-:gap-1.5 hn-:rounded-xl hn-:bg-foreground hn-:px-3 hn-:py-1.5 hn-:text-xs hn-:text-background hn-:has-data-[slot=kbd]:pr-1.5 hn-:data-[side=bottom]:slide-in-from-top-2 hn-:data-[side=left]:slide-in-from-right-2 hn-:data-[side=right]:slide-in-from-left-2 hn-:data-[side=top]:slide-in-from-bottom-2 hn-:**:data-[slot=kbd]:relative hn-:**:data-[slot=kbd]:isolate hn-:**:data-[slot=kbd]:z-50 hn-:**:data-[slot=kbd]:rounded-lg hn-:data-[state=delayed-open]:animate-in hn-:data-[state=delayed-open]:fade-in-0 hn-:data-[state=delayed-open]:zoom-in-95 hn-:data-open:animate-in hn-:data-open:fade-in-0 hn-:data-open:zoom-in-95 hn-:data-closed:animate-out hn-:data-closed:fade-out-0 hn-:data-closed:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="hn-:z-50 hn-:size-2.5 hn-:translate-y-[calc(-50%_-_2px)] hn-:rotate-45 hn-:rounded-[2px] hn-:bg-foreground hn-:fill-foreground hn-:data-[side=left]:translate-x-[-1.5px] hn-:data-[side=right]:translate-x-[1.5px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }

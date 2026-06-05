"use client"

import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"

function ResizablePanelGroup({
  className,
  ...props
}: ResizablePrimitive.GroupProps) {
  return (
    <ResizablePrimitive.Group
      data-slot="resizable-panel-group"
      className={cn(
        "hn-:flex hn-:h-full hn-:w-full hn-:aria-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    />
  )
}

function ResizablePanel({ ...props }: ResizablePrimitive.PanelProps) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: ResizablePrimitive.SeparatorProps & {
  withHandle?: boolean
}) {
  return (
    <ResizablePrimitive.Separator
      data-slot="resizable-handle"
      className={cn(
        "hn-:relative hn-:flex hn-:w-px hn-:items-center hn-:justify-center hn-:bg-border hn-:ring-offset-background hn-:after:absolute hn-:after:inset-y-0 hn-:after:left-1/2 hn-:after:w-1 hn-:after:-translate-x-1/2 hn-:focus-visible:ring-1 hn-:focus-visible:ring-ring hn-:focus-visible:outline-hidden hn-:aria-[orientation=horizontal]:h-px hn-:aria-[orientation=horizontal]:w-full hn-:aria-[orientation=horizontal]:after:left-0 hn-:aria-[orientation=horizontal]:after:h-1 hn-:aria-[orientation=horizontal]:after:w-full hn-:aria-[orientation=horizontal]:after:translate-x-0 hn-:aria-[orientation=horizontal]:after:-translate-y-1/2 hn-:[&[aria-orientation=horizontal]>div]:rotate-90",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="hn-:z-10 hn-:flex hn-:h-6 hn-:w-1 hn-:shrink-0 hn-:rounded-lg hn-:bg-border" />
      )}
    </ResizablePrimitive.Separator>
  )
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup }

"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "hn-:relative hn-:flex hn-:w-full hn-:touch-none hn-:items-center hn-:select-none hn-:data-disabled:opacity-50 hn-:data-vertical:h-full hn-:data-vertical:min-h-40 hn-:data-vertical:w-auto hn-:data-vertical:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="hn-:relative hn-:grow hn-:overflow-hidden hn-:rounded-2xl hn-:bg-input/90 hn-:data-horizontal:h-1 hn-:data-horizontal:w-full hn-:data-vertical:h-full hn-:data-vertical:w-1"
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="hn-:absolute hn-:bg-primary hn-:select-none hn-:data-horizontal:h-full hn-:data-vertical:w-full"
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="hn-:block hn-:size-4 hn-:shrink-0 hn-:rounded-2xl hn-:bg-white hn-:shadow-md hn-:ring-1 hn-:ring-black/10 hn-:transition-[color,box-shadow] hn-:duration-200 hn-:select-none hn-:not-dark:bg-clip-padding hn-:hover:ring-4 hn-:hover:ring-ring/30 hn-:focus-visible:ring-4 hn-:focus-visible:ring-ring/30 hn-:focus-visible:outline-hidden hn-:disabled:pointer-events-none hn-:disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }

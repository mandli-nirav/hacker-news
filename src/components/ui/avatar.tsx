"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Avatar({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: "default" | "sm" | "lg"
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "hn-:group/avatar hn-:relative hn-:flex hn-:size-8 hn-:shrink-0 hn-:rounded-full hn-:select-none hn-:after:absolute hn-:after:inset-0 hn-:after:rounded-full hn-:after:border hn-:after:border-border hn-:after:mix-blend-darken hn-:data-[size=lg]:size-10 hn-:data-[size=sm]:size-6 hn-:dark:after:mix-blend-lighten",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "hn-:aspect-square hn-:size-full hn-:rounded-full hn-:object-cover",
        className
      )}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "hn-:flex hn-:size-full hn-:items-center hn-:justify-center hn-:rounded-full hn-:bg-muted hn-:text-sm hn-:text-muted-foreground hn-:group-data-[size=sm]/avatar:text-xs",
        className
      )}
      {...props}
    />
  )
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "hn-:absolute hn-:right-0 hn-:bottom-0 hn-:z-10 hn-:inline-flex hn-:items-center hn-:justify-center hn-:rounded-full hn-:bg-primary hn-:text-primary-foreground hn-:bg-blend-color hn-:ring-2 hn-:ring-background hn-:select-none",
        "hn-:group-data-[size=sm]/avatar:size-2 hn-:group-data-[size=sm]/avatar:[&>svg]:hidden",
        "hn-:group-data-[size=default]/avatar:size-2.5 hn-:group-data-[size=default]/avatar:[&>svg]:size-2",
        "hn-:group-data-[size=lg]/avatar:size-3 hn-:group-data-[size=lg]/avatar:[&>svg]:size-2",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "hn-:group/avatar-group hn-:flex hn-:-space-x-2 hn-:*:data-[slot=avatar]:ring-2 hn-:*:data-[slot=avatar]:ring-background",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "hn-:relative hn-:flex hn-:size-8 hn-:shrink-0 hn-:items-center hn-:justify-center hn-:rounded-full hn-:bg-muted hn-:text-sm hn-:text-muted-foreground hn-:ring-2 hn-:ring-background hn-:group-has-data-[size=lg]/avatar-group:size-10 hn-:group-has-data-[size=sm]/avatar-group:size-6 hn-:[&>svg]:size-4 hn-:group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 hn-:group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
        className
      )}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
}

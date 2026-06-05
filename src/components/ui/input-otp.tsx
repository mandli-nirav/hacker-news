"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"

import { cn } from "@/lib/utils"
import { MinusIcon } from "lucide-react"

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "cn-input-otp flex items-center has-disabled:opacity-50",
        containerClassName
      )}
      spellCheck={false}
      className={cn("hn-:disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn(
        "hn-:flex hn-:items-center hn-:rounded-2xl hn-:has-aria-invalid:border-destructive hn-:has-aria-invalid:ring-3 hn-:has-aria-invalid:ring-destructive/20 hn-:dark:has-aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "hn-:relative hn-:flex hn-:size-8 hn-:items-center hn-:justify-center hn-:border-y hn-:border-r hn-:border-input hn-:bg-input/50 hn-:text-sm hn-:transition-[color,box-shadow] hn-:duration-200 hn-:outline-none hn-:first:rounded-l-2xl hn-:first:border-l hn-:last:rounded-r-2xl hn-:aria-invalid:border-destructive hn-:data-[active=true]:z-10 hn-:data-[active=true]:border-ring hn-:data-[active=true]:ring-3 hn-:data-[active=true]:ring-ring/30 hn-:data-[active=true]:aria-invalid:ring-destructive/20 hn-:dark:data-[active=true]:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="hn-:pointer-events-none hn-:absolute hn-:inset-0 hn-:flex hn-:items-center hn-:justify-center">
          <div className="hn-:h-4 hn-:w-px hn-:animate-caret-blink hn-:bg-foreground hn-:duration-1000" />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-separator"
      className="hn-:flex hn-:items-center hn-:[&_svg:not([class*=size-])]:size-4"
      role="separator"
      {...props}
    >
      <MinusIcon
      />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }

"use client"

import * as React from "react"
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
  type Locale,
} from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from "lucide-react"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "hn-:group/calendar hn-:bg-background hn-:p-3 hn-:[--cell-radius:var(--radius-2xl)] hn-:[--cell-size:--spacing(8)] hn-:in-data-[slot=card-content]:bg-transparent hn-:in-data-[slot=popover-content]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code, { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("hn-:w-fit", defaultClassNames.root),
        months: cn(
          "hn-:relative hn-:flex hn-:flex-col hn-:gap-4 hn-:md:flex-row",
          defaultClassNames.months
        ),
        month: cn("hn-:flex hn-:w-full hn-:flex-col hn-:gap-4", defaultClassNames.month),
        nav: cn(
          "hn-:absolute hn-:inset-x-0 hn-:top-0 hn-:flex hn-:w-full hn-:items-center hn-:justify-between hn-:gap-1",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "hn-:size-(--cell-size) hn-:p-0 hn-:select-none hn-:aria-disabled:opacity-50",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "hn-:size-(--cell-size) hn-:p-0 hn-:select-none hn-:aria-disabled:opacity-50",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "hn-:flex hn-:h-(--cell-size) hn-:w-full hn-:items-center hn-:justify-center hn-:px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "hn-:flex hn-:h-(--cell-size) hn-:w-full hn-:items-center hn-:justify-center hn-:gap-1.5 hn-:text-sm hn-:font-medium",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "hn-:relative hn-:rounded-(--cell-radius)",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "hn-:absolute hn-:inset-0 hn-:bg-popover hn-:opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "hn-:font-medium hn-:select-none",
          captionLayout === "label"
            ? "hn-:text-sm"
            : "hn-:flex hn-:items-center hn-:gap-1 hn-:rounded-(--cell-radius) hn-:text-sm hn-:[&>svg]:size-3.5 hn-:[&>svg]:text-muted-foreground",
          defaultClassNames.caption_label
        ),
        month_grid: "hn-:w-full hn-:border-collapse",
        weekdays: cn("hn-:flex", defaultClassNames.weekdays),
        weekday: cn(
          "hn-:flex-1 hn-:rounded-(--cell-radius) hn-:text-[0.8rem] hn-:font-normal hn-:text-muted-foreground hn-:select-none",
          defaultClassNames.weekday
        ),
        week: cn("hn-:mt-2 hn-:flex hn-:w-full", defaultClassNames.week),
        week_number_header: cn(
          "hn-:w-(--cell-size) hn-:select-none",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "hn-:text-[0.8rem] hn-:text-muted-foreground hn-:select-none",
          defaultClassNames.week_number
        ),
        day: cn(
          "hn-:group/day hn-:relative hn-:aspect-square hn-:h-full hn-:w-full hn-:rounded-(--cell-radius) hn-:p-0 hn-:text-center hn-:select-none hn-:[&:last-child[data-selected=true]_button]:rounded-r-(--cell-radius)",
          props.showWeekNumber
            ? "hn-:[&:nth-child(2)[data-selected=true]_button]:rounded-l-(--cell-radius)"
            : "hn-:[&:first-child[data-selected=true]_button]:rounded-l-(--cell-radius)",
          defaultClassNames.day
        ),
        range_start: cn(
          "hn-:relative hn-:isolate hn-:z-0 hn-:rounded-l-(--cell-radius) hn-:bg-muted hn-:after:absolute hn-:after:inset-y-0 hn-:after:right-0 hn-:after:w-4 hn-:after:bg-muted",
          defaultClassNames.range_start
        ),
        range_middle: cn("hn-:rounded-none", defaultClassNames.range_middle),
        range_end: cn(
          "hn-:relative hn-:isolate hn-:z-0 hn-:rounded-r-(--cell-radius) hn-:bg-muted hn-:after:absolute hn-:after:inset-y-0 hn-:after:left-0 hn-:after:w-4 hn-:after:bg-muted",
          defaultClassNames.range_end
        ),
        today: cn(
          "hn-:rounded-(--cell-radius) hn-:bg-muted hn-:text-foreground hn-:data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "hn-:text-muted-foreground hn-:aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn(
          "hn-:text-muted-foreground hn-:opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("hn-:invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("hn-:size-4", className)} {...props} />
            )
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon className={cn("hn-:size-4", className)} {...props} />
            )
          }

          return (
            <ChevronDownIcon className={cn("hn-:size-4", className)} {...props} />
          )
        },
        DayButton: ({ ...props }) => (
          <CalendarDayButton locale={locale} {...props} />
        ),
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="hn-:flex hn-:size-(--cell-size) hn-:items-center hn-:justify-center hn-:text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "hn-:relative hn-:isolate hn-:z-10 hn-:flex hn-:aspect-square hn-:size-auto hn-:w-full hn-:min-w-(--cell-size) hn-:flex-col hn-:gap-1 hn-:border-0 hn-:leading-none hn-:font-normal hn-:group-data-[focused=true]/day:relative hn-:group-data-[focused=true]/day:z-10 hn-:group-data-[focused=true]/day:border-ring hn-:group-data-[focused=true]/day:ring-[3px] hn-:group-data-[focused=true]/day:ring-ring/50 hn-:data-[range-end=true]:rounded-(--cell-radius) hn-:data-[range-end=true]:rounded-r-(--cell-radius) hn-:data-[range-end=true]:bg-primary hn-:data-[range-end=true]:text-primary-foreground hn-:data-[range-middle=true]:rounded-none hn-:data-[range-middle=true]:bg-muted hn-:data-[range-middle=true]:text-foreground hn-:data-[range-start=true]:rounded-(--cell-radius) hn-:data-[range-start=true]:rounded-l-(--cell-radius) hn-:data-[range-start=true]:bg-primary hn-:data-[range-start=true]:text-primary-foreground hn-:data-[selected-single=true]:bg-primary hn-:data-[selected-single=true]:text-primary-foreground hn-:dark:hover:text-foreground hn-:[&>span]:text-xs hn-:[&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }

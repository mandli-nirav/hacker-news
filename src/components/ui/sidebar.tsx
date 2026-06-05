"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { PanelLeftIcon } from "lucide-react"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContextProps = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open]
  )

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }, [isMobile, setOpen, setOpenMobile])

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed"

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        data-slot="sidebar-wrapper"
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            ...style,
          } as React.CSSProperties
        }
        className={cn(
          "hn-:group/sidebar-wrapper hn-:flex hn-:min-h-svh hn-:w-full hn-:has-data-[variant=inset]:bg-sidebar",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  dir,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          "hn-:flex hn-:h-full hn-:w-(--sidebar-width) hn-:flex-col hn-:bg-sidebar hn-:text-sidebar-foreground",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          dir={dir}
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="hn-:w-(--sidebar-width) hn-:bg-sidebar hn-:p-0 hn-:text-sidebar-foreground hn-:[&>button]:hidden"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className="hn-:sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="hn-:flex hn-:h-full hn-:w-full hn-:flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      className="hn-:group hn-:peer hn-:hidden hn-:text-sidebar-foreground hn-:md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          "hn-:relative hn-:w-(--sidebar-width) hn-:bg-transparent hn-:transition-[width] hn-:duration-200 hn-:ease-linear",
          "hn-:group-data-[collapsible=offcanvas]:w-0",
          "hn-:group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "hn-:group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "hn-:group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
        )}
      />
      <div
        data-slot="sidebar-container"
        data-side={side}
        className={cn(
          "hn-:fixed hn-:inset-y-0 hn-:z-10 hn-:hidden hn-:h-svh hn-:w-(--sidebar-width) hn-:transition-[left,right,width] hn-:duration-200 hn-:ease-linear hn-:data-[side=left]:left-0 hn-:data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] hn-:data-[side=right]:right-0 hn-:data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)] hn-:md:flex",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "hn-:p-2 hn-:group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "hn-:group-data-[collapsible=icon]:w-(--sidebar-width-icon) hn-:group-data-[side=left]:border-r hn-:group-data-[side=right]:border-l",
          className
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="hn-:flex hn-:size-full hn-:flex-col hn-:bg-sidebar hn-:group-data-[variant=floating]:rounded-2xl hn-:group-data-[variant=floating]:shadow-sm hn-:group-data-[variant=floating]:ring-1 hn-:group-data-[variant=floating]:ring-sidebar-border"
        >
          {children}
        </div>
      </div>
    </div>
  )
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon-sm"
      className={cn(className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="hn-:sr-only">Toggle Sidebar</span>
    </Button>
  )
}

function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "hn-:absolute hn-:inset-y-0 hn-:z-20 hn-:hidden hn-:w-4 hn-:transition-all hn-:ease-linear hn-:group-data-[side=left]:-right-4 hn-:group-data-[side=right]:left-0 hn-:after:absolute hn-:after:inset-y-0 hn-:after:start-1/2 hn-:after:w-[2px] hn-:hover:after:bg-sidebar-border hn-:sm:flex hn-:ltr:-translate-x-1/2 hn-:rtl:-translate-x-1/2",
        "hn-:in-data-[side=left]:cursor-w-resize hn-:in-data-[side=right]:cursor-e-resize",
        "hn-:[[data-side=left][data-state=collapsed]_&]:cursor-e-resize hn-:[[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "hn-:group-data-[collapsible=offcanvas]:translate-x-0 hn-:group-data-[collapsible=offcanvas]:after:left-full hn-:hover:group-data-[collapsible=offcanvas]:bg-sidebar",
        "hn-:[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "hn-:[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "hn-:relative hn-:flex hn-:w-full hn-:flex-1 hn-:flex-col hn-:bg-background hn-:md:peer-data-[variant=inset]:m-2 hn-:md:peer-data-[variant=inset]:ml-0 hn-:md:peer-data-[variant=inset]:rounded-2xl hn-:md:peer-data-[variant=inset]:shadow-sm hn-:md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn("hn-:h-8 hn-:w-full hn-:bg-input/50 hn-:shadow-none", className)}
      {...props}
    />
  )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn(
        "hn-:flex hn-:flex-col hn-:gap-2 hn-:p-2 hn-:[--radius:var(--radius-xl)]",
        className
      )}
      {...props}
    />
  )
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("hn-:flex hn-:flex-col hn-:gap-2 hn-:p-2", className)}
      {...props}
    />
  )
}

function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn("hn-:mx-2 hn-:w-auto hn-:bg-sidebar-border", className)}
      {...props}
    />
  )
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "hn-:no-scrollbar hn-:flex hn-:min-h-0 hn-:flex-1 hn-:flex-col hn-:gap-2 hn-:overflow-auto hn-:[--radius:var(--radius-xl)] hn-:group-data-[collapsible=icon]:overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn("hn-:relative hn-:flex hn-:w-full hn-:min-w-0 hn-:flex-col hn-:p-2", className)}
      {...props}
    />
  )
}

function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "div"

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        "hn-:flex hn-:h-8 hn-:shrink-0 hn-:items-center hn-:rounded-xl hn-:px-3 hn-:text-xs hn-:font-medium hn-:text-sidebar-foreground/70 hn-:ring-sidebar-ring hn-:outline-hidden hn-:transition-[margin,opacity] hn-:duration-200 hn-:ease-linear hn-:group-data-[collapsible=icon]:-mt-8 hn-:group-data-[collapsible=icon]:opacity-0 hn-:focus-visible:ring-3 hn-:[&>svg]:size-4 hn-:[&>svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        "hn-:absolute hn-:top-3.5 hn-:right-3 hn-:flex hn-:aspect-square hn-:w-5 hn-:items-center hn-:justify-center hn-:rounded-xl hn-:p-0 hn-:text-sidebar-foreground hn-:ring-sidebar-ring hn-:outline-hidden hn-:transition-transform hn-:group-data-[collapsible=icon]:hidden hn-:after:absolute hn-:after:-inset-2 hn-:hover:bg-sidebar-accent hn-:hover:text-sidebar-accent-foreground hn-:focus-visible:ring-3 hn-:md:after:hidden hn-:[&>svg]:size-4 hn-:[&>svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn("hn-:w-full hn-:text-sm", className)}
      {...props}
    />
  )
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn("hn-:flex hn-:w-full hn-:min-w-0 hn-:flex-col hn-:gap-0.5", className)}
      {...props}
    />
  )
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("hn-:group/menu-item hn-:relative", className)}
      {...props}
    />
  )
}

const sidebarMenuButtonVariants = cva(
  "hn-:peer/menu-button hn-:group/menu-button hn-:flex hn-:w-full hn-:items-center hn-:gap-2 hn-:overflow-hidden hn-:rounded-xl hn-:px-3 hn-:py-2 hn-:text-left hn-:text-sm hn-:whitespace-nowrap hn-:ring-sidebar-ring hn-:outline-hidden hn-:transition-[width,height,padding] hn-:duration-200 hn-:group-has-data-[sidebar=menu-action]/menu-item:pr-8 hn-:group-data-[collapsible=icon]:size-8! hn-:group-data-[collapsible=icon]:p-2! hn-:hover:bg-sidebar-accent hn-:hover:text-sidebar-accent-foreground hn-:focus-visible:ring-3 hn-:active:bg-sidebar-accent hn-:active:text-sidebar-accent-foreground hn-:disabled:pointer-events-none hn-:disabled:opacity-50 hn-:has-[>svg:first-child]:pl-2.5 hn-:has-[>svg:last-child]:pr-2.5 hn-:aria-disabled:pointer-events-none hn-:aria-disabled:opacity-50 hn-:data-open:hover:bg-sidebar-accent hn-:data-open:hover:text-sidebar-accent-foreground hn-:data-active:bg-sidebar-accent hn-:data-active:font-medium hn-:data-active:text-sidebar-accent-foreground hn-:[&_svg]:size-4 hn-:[&_svg]:shrink-0 hn-:[&>span:last-child]:truncate",
  {
    variants: {
      variant: {
        default: "hn-:hover:bg-sidebar-accent hn-:hover:text-sidebar-accent-foreground",
        outline:
          "hn-:bg-background hn-:shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hn-:hover:bg-sidebar-accent hn-:hover:text-sidebar-accent-foreground hn-:hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "hn-:h-8 hn-:text-sm",
        sm: "hn-:h-7 hn-:text-xs",
        lg: "hn-:h-12 hn-:px-3 hn-:text-sm hn-:group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | React.ComponentProps<typeof TooltipContent>
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot.Root : "button"
  const { isMobile, state } = useSidebar()

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  )

  if (!tooltip) {
    return button
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  )
}

function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  showOnHover?: boolean
}) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        "hn-:absolute hn-:top-1.5 hn-:right-1 hn-:flex hn-:aspect-square hn-:w-5 hn-:items-center hn-:justify-center hn-:rounded-xl hn-:p-0 hn-:text-sidebar-foreground hn-:ring-sidebar-ring hn-:outline-hidden hn-:transition-transform hn-:group-data-[collapsible=icon]:hidden hn-:peer-hover/menu-button:text-sidebar-accent-foreground hn-:peer-data-[size=default]/menu-button:top-1.5 hn-:peer-data-[size=lg]/menu-button:top-2.5 hn-:peer-data-[size=sm]/menu-button:top-1 hn-:after:absolute hn-:after:-inset-2 hn-:hover:bg-sidebar-accent hn-:hover:text-sidebar-accent-foreground hn-:focus-visible:ring-3 hn-:md:after:hidden hn-:[&>svg]:size-4 hn-:[&>svg]:shrink-0",
        showOnHover &&
          "hn-:group-focus-within/menu-item:opacity-100 hn-:group-hover/menu-item:opacity-100 hn-:peer-data-active/menu-button:text-sidebar-accent-foreground hn-:aria-expanded:opacity-100 hn-:md:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        "hn-:pointer-events-none hn-:absolute hn-:right-1 hn-:flex hn-:h-5 hn-:min-w-5 hn-:items-center hn-:justify-center hn-:rounded-xl hn-:px-1 hn-:text-xs hn-:font-medium hn-:text-sidebar-foreground hn-:tabular-nums hn-:select-none hn-:group-data-[collapsible=icon]:hidden hn-:peer-hover/menu-button:text-sidebar-accent-foreground hn-:peer-data-[size=default]/menu-button:top-1.5 hn-:peer-data-[size=lg]/menu-button:top-2.5 hn-:peer-data-[size=sm]/menu-button:top-1 hn-:peer-data-active/menu-button:text-sidebar-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<"div"> & {
  showIcon?: boolean
}) {
  // Random width between 50 to 90%.
  const [width] = React.useState(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  })

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn("hn-:flex hn-:h-8 hn-:items-center hn-:gap-2 hn-:rounded-xl hn-:px-2", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="hn-:size-4 hn-:rounded-xl"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="hn-:h-4 hn-:max-w-(--skeleton-width) hn-:flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  )
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        "hn-:mx-3.5 hn-:flex hn-:min-w-0 hn-:translate-x-px hn-:flex-col hn-:gap-1 hn-:border-l hn-:border-sidebar-border hn-:px-2.5 hn-:py-0.5 hn-:group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("hn-:group/menu-sub-item hn-:relative", className)}
      {...props}
    />
  )
}

function SidebarMenuSubButton({
  asChild = false,
  size = "md",
  isActive = false,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
  size?: "sm" | "md"
  isActive?: boolean
}) {
  const Comp = asChild ? Slot.Root : "a"

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "hn-:flex hn-:h-7 hn-:min-w-0 hn-:-translate-x-px hn-:items-center hn-:gap-2 hn-:overflow-hidden hn-:rounded-xl hn-:px-3 hn-:text-sidebar-foreground hn-:ring-sidebar-ring hn-:outline-hidden hn-:group-data-[collapsible=icon]:hidden hn-:hover:bg-sidebar-accent hn-:hover:text-sidebar-accent-foreground hn-:focus-visible:ring-3 hn-:active:bg-sidebar-accent hn-:active:text-sidebar-accent-foreground hn-:disabled:pointer-events-none hn-:disabled:opacity-50 hn-:aria-disabled:pointer-events-none hn-:aria-disabled:opacity-50 hn-:data-[size=md]:text-sm hn-:data-[size=sm]:text-xs hn-:data-active:bg-sidebar-accent hn-:data-active:text-sidebar-accent-foreground hn-:[&>span:last-child]:truncate hn-:[&>svg]:size-4 hn-:[&>svg]:shrink-0 hn-:[&>svg]:text-sidebar-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}

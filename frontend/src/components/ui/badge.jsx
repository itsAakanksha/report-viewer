import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-lg border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden font-mulish",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#3F1470] text-white [a&]:hover:bg-[#5A1F9B]",
        secondary:
          "border-transparent bg-[#3F1470] text-white [a&]:hover:bg-[#5A1F9B] dark:bg-[#FFA301] dark:text-white dark:[a&]:hover:bg-[#FF8C00]",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-[#3F1470] border-[#3F1470] [a&]:hover:bg-[#3F1470] [a&]:hover:text-white dark:text-[#FFA301] dark:border-[#FFA301] dark:[a&]:hover:bg-[#FFA301] dark:[a&]:hover:text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props} />
  );
}

export { Badge, badgeVariants }

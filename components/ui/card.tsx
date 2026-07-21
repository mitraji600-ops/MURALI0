import * as React from "react"
import { cn } from "@/lib/utils"

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-2xl border border-zinc-800/50 bg-surface text-zinc-100", className)}
      {...props}
    />
  )
)
Card.displayName = "Card"

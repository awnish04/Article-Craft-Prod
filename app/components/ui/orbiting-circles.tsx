import React from "react"
import { cn } from "@/lib/utils"

export interface OrbitingCirclesProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
  reverse?: boolean
  duration?: number
  delay?: number
  radius?: number
  path?: boolean
  iconSize?: number
  speed?: number
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  ...props
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed

  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-green-300 stroke-1 dark:stroke-green-300"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}

      {React.Children.map(children, (child, index) => {
        const count = React.Children.count(children)
        const angle = (360 / count) * index

        return (
          <div
            style={{
              "--duration": `${calculatedDuration}s`,
              "--radius": `${radius}px`,  // ✅ pass as px string directly
              "--angle": `${angle}deg`,   // ✅ pass as deg string directly
              "--icon-size": `${iconSize}px`,
              width: `${iconSize}px`,
              height: `${iconSize}px`,
            } as React.CSSProperties}
            className={cn(
              "animate-orbit absolute flex transform-gpu items-center justify-center rounded-full",
              { "[animation-direction:reverse]": reverse },
              className
            )}
            {...props}
          >
            {child}
          </div>
        )
      })}
    </>
  )
}
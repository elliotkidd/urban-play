import * as React from "react";

import { cn } from "@workspace/ui/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <>
        <input
          type={type}
          className={cn(
            "flex text-text bg-nav-bar-background/20 placeholder:text-text/50 rounded gap-4 p-4 w-full text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus:outline-0 focus:ring-0 focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm appearance-none",
            className
          )}
          ref={ref}
          {...props}
        />
      </>
    );
  }
);
Input.displayName = "Input";

export { Input };

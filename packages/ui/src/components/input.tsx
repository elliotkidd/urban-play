import * as React from "react";

import { cn } from "@workspace/ui/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  label: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => {
    return (
      <>
        <label htmlFor={props.name} className="sr-only">
          {label}
        </label>
        <input
          type={type}
          className={cn(
            "flex bg-nav-bar-background/20 rounded gap-4 p-4 w-full text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground text-white placeholder:text-white focus-visible:outline-none focus:outline-0 focus:ring-0 focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm appearance-none",
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

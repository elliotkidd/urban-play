import * as React from "react";

import { cn } from "@workspace/ui/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "block w-full appearance-none text-white bg-nav-bar-background/20 placeholder:text-white rounded-lg p-4 text-base outline-none duration-500 focus:outline-none focus:ring-0",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };

import { cn } from "@workspace/ui/lib/utils";
import React from "react";

import type { DividerProps } from "@/lib/sanity/queries/sections";

export function Divider(sectionSettings: DividerProps) {
  const { colorScheme } = sectionSettings;
  return (
    <div className={cn(colorScheme && `color-scheme-${colorScheme}`)}>
      <hr className="h-px bg-border" />
    </div>
  );
}

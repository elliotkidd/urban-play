import React from "react";
import { twMerge } from "tailwind-merge";

export default function FlipText({
  children,
  className = "",
}: {
  children: any;
  className?: string;
}) {
  return (
    <span
      className={twMerge(
        "group/flip relative flex flex-col overflow-hidden",
        className,
      )}
    >
      <span className="translate-y-0 duration-500 group-hover/flip:-translate-y-full">
        {children}
      </span>
      <span className="absolute w-full translate-y-full duration-500 group-hover/flip:translate-y-0">
        {children}
      </span>
    </span>
  );
}

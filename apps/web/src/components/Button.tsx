import Link from "next/link";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { missingClass } from "@/utils/utils";

import FlipText from "./shared/FlipText";

export const Button = forwardRef(
  (
    {
      as = "button",
      children,
      className = "",
      variant = "solid",
      width = "auto",
      carat = false,
      size = "medium",
      prependIcon,
      appendIcon,
      ...props
    }: {
      as?: React.ElementType;
      className?: string;
      children: any;
      variant?: "solid" | "accent" | "outline" | "inline";
      width?: "auto" | "full";
      carat?: boolean;
      prependIcon?: React.ReactNode;
      appendIcon?: React.ReactNode;
      size?: "xs" | "small" | "medium" | "large";
      [key: string]: any;
    },
    ref,
  ) => {
    const Component: React.ElementType | null = props?.to ? Link : as;

    const variants = {
      solid: `btn btn--solid`,
      accent: `btn btn--accent`,
      outline: `btn btn--outline`,
      inline: "btn--inline",
      underline: `btn btn--underline`,
    };

    const widths = {
      auto: "w-auto",
      full: "w-full",
    };

    const sizes = {
      xs: "btn--xs",
      small: "btn--small",
      medium: "btn--medium",
      large: "btn--large",
    };

    const styles = twMerge(
      missingClass(className, "bg-") && variants[variant],
      missingClass(className, "w-") && widths[width],
      !["inline", "underline"].includes(variant) &&
        missingClass(className, "px-") &&
        sizes[size],
      className,
    );

    const iconClasses = twMerge(
      " duration-500",
      variant === "accent"
        ? "text-contrast group-hover:text-accent"
        : "text-accent group-hover:text-contrast",
    );

    return (
      <>
        <Component
          className={twMerge("group", styles)}
          {...props}
          href={props?.to}
          ref={ref}
        >
          {prependIcon && (
            <>
              <span className={iconClasses}>{prependIcon}</span>
            </>
          )}

          {children}
          {appendIcon && (
            <>
              <span className={iconClasses}>{appendIcon}</span>
            </>
          )}
        </Component>
      </>
    );
  },
);

Button.displayName = "Button";

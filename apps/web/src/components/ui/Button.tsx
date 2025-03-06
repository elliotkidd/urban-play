import Link from "next/link";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import FlipText from "../FlipText";

export const Button = forwardRef(
  (
    {
      as = "button",
      children,
      className = "",
      variant = "default",
      carat = false,
      prependIcon,
      appendIcon,
      ...props
    }: {
      as?: React.ElementType;
      className?: string;
      children: any;
      variant?: "default" | "primary" | "outline" | "inline";
      carat?: boolean;
      prependIcon?: React.ReactNode;
      appendIcon?: React.ReactNode;
      [key: string]: any;
    },
    ref,
  ) => {
    const Component: React.ElementType | null = props?.to ? Link : as;

    const variants = {
      default: `btn btn--default`,
      primary: `btn btn--primary`,
      outline: `btn btn--outline`,
      inline: "btn--inline",
    };

    const styles = twMerge(variants[variant], className);

    const iconClasses = twMerge(
      "duration-500",
      variant === "primary"
        ? "text-contrast group-hover:text-primary"
        : "text-primary group-hover:text-contrast",
    );

    return (
      <>
        <Component
          className={twMerge("group", styles)}
          {...props}
          href={props?.to}
          ref={ref}
        >
          {prependIcon && <span className={iconClasses}>{prependIcon}</span>}
          <FlipText>{children}</FlipText>
          {appendIcon && <span className={iconClasses}>{appendIcon}</span>}
        </Component>
      </>
    );
  },
);

Button.displayName = "Button";

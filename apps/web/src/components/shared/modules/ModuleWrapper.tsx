"use client";

import { motion } from "framer-motion";
import { InferType } from "groqd";
import { twMerge } from "tailwind-merge";

import { useHeaderColorScheme } from "@/hooks/useHeaderColorScheme";
import { SECTION_SETTINGS_FRAGMENT } from "@/sanity/lib/queries/sections";

interface Props {
  page?: any;
  settings: InferType<typeof SECTION_SETTINGS_FRAGMENT>;
  className?: string;
  children: any;
  index?: number;
}

export default function ModuleWrapper({
  settings,
  index,
  children,
  className,
}: Props) {
  const { uid, colorScheme, paddingBottom, paddingTop, hidden } =
    settings ?? {};

  const ref = useHeaderColorScheme(colorScheme);

  // Convert RGB values to CSS color strings
  const getColorStyle = () => {
    if (
      !colorScheme?.primary?.rgb ||
      !colorScheme?.contrast?.rgb ||
      !colorScheme?.accent?.rgb ||
      !colorScheme?.complimentary?.rgb
    )
      return {};

    return {
      "--color-primary": `${colorScheme.primary.rgb.r}, ${colorScheme.primary.rgb.g}, ${colorScheme.primary.rgb.b}`,
      "--color-contrast": `${colorScheme.contrast.rgb.r}, ${colorScheme.contrast.rgb.g}, ${colorScheme.contrast.rgb.b}`,
      "--color-accent": `${colorScheme.accent.rgb.r}, ${colorScheme.accent.rgb.g}, ${colorScheme.accent.rgb.b}`,
      "--color-complimentary": `${colorScheme.complimentary.rgb.r}, ${colorScheme.complimentary.rgb.g}, ${colorScheme.complimentary.rgb.b}`,
    } as React.CSSProperties;
  };

  if (!hidden)
    return (
      <section
        id={uid}
        ref={ref}
        style={getColorStyle()}
        className={twMerge(
          "relative bg-primary",
          paddingBottom ? null : "pb-fluid-md",
          index === 0 ? "pt-fluid-xl" : paddingTop ? null : "pt-fluid-md",
          className,
        )}
      >
        <motion.div
          className="w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, type: "easeInOut" }}
          viewport={{ margin: "-10% 0% -10% 0%" }}
        >
          {children}
        </motion.div>
      </section>
    );
}

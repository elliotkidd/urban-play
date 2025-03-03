"use client";

import { stegaClean } from "@sanity/client/stega";
import React from "react";
import { twMerge } from "tailwind-merge";

import processUrl from "@/utils/processUrl";

import { Link } from "./Link";

interface Props {
  link: any;
  scroll?: boolean;
  children: any;
  className?: string;
  activeClassName?: string;
  onClick?: () => void;
}

const SanityLink = ({
  children,
  link,
  scroll = true,
  className,
  activeClassName,
  ...props
}: Props) => {
  const internalSanityLink = stegaClean(link.linkType) === "internal";

  if (internalSanityLink) {
    const { to } = link.internalLink;
    return (
      <Link
        scroll={scroll}
        href={to ? processUrl(to) : ""}
        className={({ isActive }) =>
          twMerge(className, isActive ? activeClassName : "")
        }
        {...props}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <a
        href={link?.externalLink?.link || null}
        target={link?.externalLink?.openInNewTab ? `_blank` : ""}
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  }
};

export default SanityLink;

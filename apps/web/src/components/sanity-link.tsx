"use client";

import processUrl from "@/utils/processUrl";
import { stegaClean } from "@sanity/client/stega";
import Link from "./link";
import React from "react";
import { twMerge } from "tailwind-merge";
import { TypeFromSelection } from "groqd";
import { CUSTOM_URL_FRAGMENT } from "@/lib/sanity/queries/link";

type Props = TypeFromSelection<typeof CUSTOM_URL_FRAGMENT>;

const SanityLink = ({
  children,
  url: { linkType, internal, external, openInNewTab },
  scroll = true,
  className,
  activeClassName,
  ...props
}: Props) => {
  const internalSanityLink = stegaClean(linkType) === "internal";

  if (internalSanityLink) {
    return (
      <Link
        scroll={scroll}
        href={internal ? processUrl(internal) : ""}
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
        href={external || null}
        target={openInNewTab ? `_blank` : ""}
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  }
};

export default SanityLink;

"use client";

import { TypeFromSelection } from "groqd";
import React from "react";

import SanityLink from "@/components/shared/navigation/SanityLink";
import { NAVIGATION_FRAGMENT } from "@/sanity/lib/queries/fragments";

interface Props {
  menu: TypeFromSelection<typeof NAVIGATION_FRAGMENT>;
}

export default function DesktopMenu({ menu: { navigationItems } }: Props) {
  return (
    <nav className="hidden md:block">
      <ul className="flex h-full items-center gap-6 px-3">
        {navigationItems?.map((item, i) => (
          <li key={item._key || i} className="relative">
            <SanityLink
              link={item.navigationItemUrl}
              className="text-sm text-contrast uppercase font-medium relative flex items-center py-2"
              activeClassName="text-accent"
            >
              {item.text || item.navigationItemUrl.internalLink?.to?.title}
            </SanityLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

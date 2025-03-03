"use client";

import { AnimatePresence, motion } from "framer-motion";
import { TypeFromSelection } from "groqd";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

import SocialIconLinks from "@/components/shared/SocialIconLinks";
import ButtonGroup from "@/components/shared/navigation/ButtonGroup";
import SanityLink from "@/components/shared/navigation/SanityLink";
import { NAVIGATION_FRAGMENT } from "@/sanity/lib/queries/fragments";
import { BUTTON_FRAGMENT } from "@/sanity/lib/queries/link";
import useAppStore from "@/store/app-store";

import { IconChevron } from "../../../Icon";

type Menu = TypeFromSelection<typeof NAVIGATION_FRAGMENT>;

interface Props {
  menu: Menu;
  buttons: TypeFromSelection<typeof BUTTON_FRAGMENT>[];
}

const vars = {
  open: { opacity: 1, height: "auto" },
  collapsed: { opacity: 0, height: 0 },
};

function MobileNestedNavigation({ link, childLinks }) {
  const [open, setOpen] = useState<boolean>(false);
  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="flex w-full justify-between">
        <SanityLink
          link={link}
          className="relative flex flex-1 items-center py-4 text-[20px] font-medium"
          onClick={() =>
            useAppStore.setState({
              openMenuDrawer: false,
            })
          }
        >
          {link.text}
        </SanityLink>
        <button onClick={toggleOpen}>
          <IconChevron
            className={twMerge("transform transition-all duration-200")}
            direction={open ? "up" : "down"}
          />
        </button>
      </div>
      <AnimatePresence>
        {childLinks && open && (
          <motion.div
            className="overflow-hidden"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={vars}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <ul className="space-y-1 pb-2 text-white">
              {childLinks.map((child) => {
                return (
                  <li key={child._key}>
                    <SanityLink
                      link={child}
                      onClick={() =>
                        useAppStore.setState({
                          openMenuDrawer: false,
                        })
                      }
                    >
                      {child.name}
                    </SanityLink>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function MobileMenu({ buttons, menu }: Props) {
  const { navigationItems } = menu;
  const openMenuDrawer = useAppStore((state) => state.openMenuDrawer);

  return (
    <nav
      className={twMerge(
        "fixed inset-0 z-0 flex h-[100dvh] flex-col justify-between gap-5 overflow-y-auto bg-primary pb-5 pt-20 duration-500 md:pt-24",
        openMenuDrawer ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      <ul className="group flex flex-col border-t border-contrast/10 text-contrast">
        {navigationItems &&
          navigationItems.map((item) => {
            const { _key } = item;

            return (
              <li className="relative border-b border-contrast/10" key={_key}>
                <div className="px-fluid-xs">
                  <SanityLink
                    link={item.navigationItemUrl}
                    className="relative flex flex-1 items-center py-4 text-[20px] font-medium"
                    onClick={() =>
                      useAppStore.setState({
                        openMenuDrawer: false,
                      })
                    }
                  >
                    {item.text}
                  </SanityLink>
                </div>
              </li>
            );
          })}
      </ul>
      <div className="space-y-2 px-fluid-xs">
        {buttons && (
          <ButtonGroup
            className="flex flex-col items-stretch gap-2"
            buttons={buttons}
            size="large"
            onClick={() => {
              useAppStore.setState({ openMenuDrawer: false });
            }}
          />
        )}
      </div>
    </nav>
  );
}

"use client";

import { AnimatePresence, motion } from "motion/react";
import { useTransitionRouter } from "next-view-transitions";
import Link from "next/link";
import { useState } from "react";

import { useLenisNavigation } from "@/hooks/use-lenis-navigation";
import { useLenis } from "@/lib/lenis";
import { openMailchimpPopup } from "@/lib/mailchimp-popup";
import type { NavBarType } from "@/lib/sanity/queries/documents";
import type {
  CustomUrlType,
  NavBarColumnType,
  NavBarLinkType,
} from "@/lib/sanity/queries/link";
import { cn } from "@/lib/utils";
import PageAnimation from "./PageAnimation";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
  YoutubeIcon,
} from "./social-icons";

// These timings line up with the backdrop transitions in navbar.scss: the
// bar items fade out, the backdrop grows down, then the drawer items fade in
const drawerVariants = {
  open: {
    transition: { delayChildren: 0.6, staggerChildren: 0.04 },
  },
  closed: {},
  // Skip the fade when a link was clicked, so the page transition starts clean
  exit: (instant: boolean) => ({
    opacity: 0,
    transition: { duration: instant ? 0 : 0.2 },
  }),
};

const drawerItemVariants = {
  open: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  closed: { opacity: 0, y: 8 },
};

const HEADING_CLASS_NAME =
  "font-heading uppercase text-[24px] leading-[1.2] transition-opacity duration-500 hover:opacity-60";

type DrawerColumn = NavBarColumnType | NavBarLinkType;

function DrawerLink({
  url,
  className,
  onNavigate,
  children,
}: {
  url?: CustomUrlType | null;
  className?: string;
  onNavigate: (href: string) => void;
  children: React.ReactNode;
}) {
  const href = (url?.href as string) ?? "/";

  return (
    <Link
      href={href}
      target={url?.openInNewTab ? "_blank" : undefined}
      rel={url?.openInNewTab ? "noopener noreferrer" : undefined}
      scroll={false}
      className={className}
      onClick={(e) => {
        if (url?.openInNewTab) return;
        e.preventDefault();
        onNavigate(href);
      }}
    >
      {children}
    </Link>
  );
}

const PLUS_MINUS_LINE_CLASS_NAME =
  "absolute inset-x-0 top-1/2 -mt-px h-0.5 bg-current [transition:transform_0.5s]";

// Turns from a plus into a minus the same way as the accordions
// (ui/accordion.tsx): both lines spin round to lie flat
function PlusMinusIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <span aria-hidden className="relative size-[14px] flex-none">
      <span
        className={cn(
          PLUS_MINUS_LINE_CLASS_NAME,
          isOpen ? "rotate-0" : "rotate-180",
        )}
      />
      <span
        className={cn(
          PLUS_MINUS_LINE_CLASS_NAME,
          isOpen ? "rotate-0" : "rotate-[270deg]",
        )}
      />
    </span>
  );
}

function DrawerColumnItem({
  column,
  isExpanded,
  onToggle,
  onNavigate,
}: {
  column: NavBarColumnType;
  isExpanded: boolean;
  onToggle: () => void;
  onNavigate: (href: string) => void;
}) {
  const panelId = `nav-drawer-${column._key}`;

  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={panelId}
        className={cn(
          HEADING_CLASS_NAME,
          "flex w-full items-center justify-between text-left",
        )}
      >
        <span>{column.title}</span>
        <PlusMinusIcon isOpen={isExpanded} />
      </button>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={panelId}
            key="links"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
            className="overflow-hidden"
          >
            <ul className="columns-2 gap-4 pt-4 text-[16px] leading-[1.6]">
              {column.links?.map((link) => (
                <li key={link._key}>
                  <DrawerLink
                    url={link.url}
                    onNavigate={onNavigate}
                    className="transition-opacity duration-500 hover:opacity-60"
                  >
                    {link.name}
                  </DrawerLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DrawerSocialLinks({
  socialLinks,
}: {
  socialLinks?: NonNullable<NavBarType["settings"]>["socialLinks"];
}) {
  const { instagram, facebook, twitter, linkedin, youtube } = socialLinks ?? {};

  const links = [
    { url: instagram, label: "Instagram", Icon: InstagramIcon },
    { url: facebook, label: "Facebook", Icon: FacebookIcon },
    { url: twitter, label: "X", Icon: XIcon },
    { url: linkedin, label: "LinkedIn", Icon: LinkedinIcon },
    { url: youtube, label: "YouTube", Icon: YoutubeIcon },
  ].filter((link) => link.url);

  if (!links.length) return null;

  return (
    <ul className="ml-auto flex items-center">
      {links.map(({ url, label, Icon }) => (
        <li key={label}>
          <a
            href={url as string}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex size-[35px] items-center justify-center text-primary-button transition-opacity duration-500 hover:opacity-60"
          >
            <Icon className="size-4 fill-current" />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function NavDrawer({
  navbarData,
  isOpen,
  instantClose,
  onClose,
  onNavigate,
}: {
  navbarData: NavBarType;
  isOpen: boolean;
  instantClose: boolean;
  onClose: () => void;
  onNavigate: () => void;
}) {
  const { drawerColumns, columns, newsletterButtonText, settings } =
    navbarData ?? {};
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const router = useTransitionRouter();
  const lenis = useLenis();
  const { handleNavigation } = useLenisNavigation();

  // Until a drawer menu is set up in Sanity, show the main navigation
  const items = drawerColumns?.length ? drawerColumns : (columns ?? []);

  const openNewsletter = async () => {
    onClose();
    if (!(await openMailchimpPopup())) {
      // No pop-up to open, so take them to the footer signup form instead. The
      // footer is fixed on desktop and revealed at the end of the page, so
      // scroll to the bottom. Restart Lenis first: restarting it later (as the
      // drawer closes) would cancel the scroll.
      lenis?.start();
      lenis?.scrollTo("bottom");
    }
  };

  const navigate = (href: string) => {
    handleNavigation();
    onNavigate();
    router.push(href, { onTransitionReady: PageAnimation });
  };

  return (
    <AnimatePresence
      custom={instantClose}
      onExitComplete={() => setExpandedKey(null)}
    >
      {isOpen && (
        <motion.nav
          id="nav-drawer"
          aria-label="Menu"
          key="nav-drawer"
          initial="closed"
          animate="open"
          exit="exit"
          custom={instantClose}
          variants={drawerVariants}
          className="nav-drawer"
        >
          <ul className="nav-drawer-items" data-lenis-prevent>
            {items.map((column: DrawerColumn) => (
              <motion.li key={column._key} variants={drawerItemVariants}>
                {column._type === "navbarColumn" ? (
                  <DrawerColumnItem
                    column={column as NavBarColumnType}
                    isExpanded={expandedKey === column._key}
                    onToggle={() =>
                      setExpandedKey((key) =>
                        key === column._key ? null : column._key,
                      )
                    }
                    onNavigate={navigate}
                  />
                ) : (
                  <DrawerLink
                    url={(column as NavBarLinkType).url}
                    onNavigate={navigate}
                    className={cn(HEADING_CLASS_NAME, "block")}
                  >
                    {(column as NavBarLinkType).name}
                  </DrawerLink>
                )}
              </motion.li>
            ))}
          </ul>
          <div className="p-5">
            <motion.div
              variants={drawerItemVariants}
              // The right padding lines the last icon up with the close button
              className="flex items-center gap-1 border-t border-nav-bar-text/20 pt-5"
            >
              <button
                type="button"
                className="btn btn--header-size btn--header"
                onClick={openNewsletter}
              >
                {newsletterButtonText || "Join our newsletter"}
              </button>
              <DrawerSocialLinks socialLinks={settings?.socialLinks} />
            </motion.div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

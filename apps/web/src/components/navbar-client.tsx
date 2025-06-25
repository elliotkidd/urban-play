"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@workspace/ui/components/navigation-menu";
import { buttonVariants } from "@workspace/ui/components/button";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

import { useIsMobile } from "@/hooks/use-is-mobile";

import { Logo } from "./logo";
import { SanityButtons } from "./sanity-buttons";
import { NavBarColumnType, NavBarLinkType } from "@/lib/sanity/queries/link";
import { NavBarType } from "@/lib/sanity/queries/documents";
import useStore from "@/store/header";
import { getColorSchemeStyle } from "@/utils/utils";

import { useTransitionRouter } from "next-view-transitions";
import PageAnimation from "./PageAnimation";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

const DURATION = 0.35;
const DELAY = 0.15;

const TRANSITION_WITH_DELAY = {
  duration: DURATION,
  delay: DELAY,
};

const TRANSITION_WITHOUT_DELAY = {
  duration: DURATION,
};

const SPRING_TRANSITION = {
  type: "spring",
  bounce: 0.6,
  visualDuration: 0.35,
};

const menuTriggerLineTopVariants = {
  open: {
    rotate: -45,
    top: 8,
    transition: { ...TRANSITION_WITH_DELAY, ...SPRING_TRANSITION },
  },
  closed: {
    rotate: 0,
    top: 0,
    transition: { ...TRANSITION_WITHOUT_DELAY, ...SPRING_TRANSITION },
  },
};

const menuTriggerLineMiddleVariants = {
  open: {
    scale: 0,
    transition: TRANSITION_WITHOUT_DELAY,
  },
  closed: {
    scale: 1,
    transition: TRANSITION_WITH_DELAY,
  },
};

const menuTriggerLineBottomVariants = {
  open: {
    rotate: 45,
    bottom: 8,
    transition: { ...TRANSITION_WITH_DELAY, ...SPRING_TRANSITION },
  },
  closed: {
    rotate: 0,
    bottom: 0,
    transition: { ...TRANSITION_WITHOUT_DELAY, ...SPRING_TRANSITION },
  },
};

function MobileMenuTrigger({
  isOpen,
  setIsOpen,
  disabled,
  ...props
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  disabled?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className={cn("menu-trigger-btn", props.className)}
      disabled={disabled}
      {...props}
    >
      <div className="relative flex gap-[7px] flex-col">
        <motion.span
          className="menu-trigger-btn-line"
          initial={{ rotate: 0, top: 0 }}
          animate={isOpen ? "open" : "closed"}
          variants={menuTriggerLineTopVariants}
        ></motion.span>
        <motion.span
          className="menu-trigger-btn-line"
          style={{
            originX: "right",
            top: "50%",
          }}
          initial={{ scale: 0 }}
          animate={isOpen ? "open" : "closed"}
          variants={menuTriggerLineMiddleVariants}
        ></motion.span>
        <motion.span
          initial={{ rotate: 0, bottom: 0 }}
          animate={isOpen ? "open" : "closed"}
          variants={menuTriggerLineBottomVariants}
          className="menu-trigger-btn-line relative"
        ></motion.span>
      </div>
      <span className="sr-only">Open menu</span>
    </button>
  );
}

interface MenuItem {
  title: string;
  href?: string;
}

function MenuItemLink({ item }: { item: MenuItem }) {
  return (
    <Link
      className={cn(
        "select-none leading-none outline-none items-center text-center text-nowrap hover:opacity-60 transition-all duration-500",
      )}
      aria-label={`Link to ${item.title ?? item.href}`}
      scroll={false}
      href={item.href ?? "/"}
    >
      <div className="">{item.title}</div>
    </Link>
  );
}

function MobileNavbarAccordionColumn({
  column,
  setIsOpen,
}: {
  column: any;
  setIsOpen: (isOpen: boolean) => void;
}) {
  if (column.type !== "column") return null;
  return (
    <AccordionItem value={column.title ?? column._key} className="border-b-0">
      <AccordionTrigger className="mb-4 py-0 font-semibold hover:no-underline hover:bg-accent hover:text-accent-foreground pr-2 rounded-md">
        <div
          className={cn(buttonVariants({ variant: "ghost" }), "justify-start")}
        >
          {column.title}
        </div>
      </AccordionTrigger>
      <AccordionContent className="mt-2">
        {column.links?.map((item: any) => (
          <MenuItemLink
            key={item._key}
            item={{
              href: item.href ?? "",
              title: item.name ?? "",
            }}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}

const menuVariants = {
  open: {
    height: "calc(100vh - 8rem)",
    transition: {
      visualDuration: 0.5,
      type: "spring",
      bounce: 0.4,
    },
  },
  closed: {
    height: "0",
    transition: {
      duration: 0.5,
      delay: 0.5,
      type: "tween",
      ease: "easeOut",
    },
  },
};

const itemVariants = {
  open: ({ index }: { index: number }) => ({
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      delay: 0.35 + index * 0.1,
      visualDuration: 0.5,
      type: "spring",
      bounce: 0.5,
    },
  }),
  closed: ({ index, totalItems }: { index: number; totalItems: number }) => ({
    opacity: 0,
    x: 50,
    transition: {
      delay: (totalItems - index - 1) * 0.1,
      duration: 0.5,
      type: "tween",
      ease: "backInOut",
    },
  }),
};

function MobileNavbar({
  navbarData,
  headerStyle,
}: {
  navbarData: any;
  headerStyle: React.CSSProperties;
}) {
  const { columns, buttons } = navbarData ?? {};
  const [isOpen, setIsOpen] = useState(false);

  const path = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: This is intentional
  useEffect(() => {
    setIsOpen(false);
  }, [path]);

  return (
    <header id="mobile-navbar" style={headerStyle}>
      <nav className="flex w-full items-center justify-between gap-5">
        <Logo className="w-[50px]" />
        <MobileMenuTrigger isOpen={isOpen} setIsOpen={setIsOpen} />
      </nav>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <ul className="gap-[10px] flex-1 flex flex-col justify-center p-2.5">
              {Array.isArray(columns) &&
                columns?.map(
                  (
                    column: NavBarLinkType | NavBarColumnType,
                    index: number,
                  ) => {
                    if (column._type === "navbarLink") {
                      const { name, _key, url } = column as NavBarLinkType;
                      return (
                        <motion.li
                          custom={{ index, totalItems: columns.length }}
                          variants={itemVariants}
                          key={`column-link-${name}-${_key}`}
                        >
                          <NavbarColumnLink
                            key={`column-link-${name}-${_key}`}
                            column={column}
                            className="text-xl font-bold leading-[120%] block"
                          />
                        </motion.li>
                      );
                    }
                  },
                )}
            </ul>
            <SanityButtons
              buttons={buttons}
              className="flex flex-col gap-4 p-2.5"
              buttonClassName="btn--header w-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavbarColumnLink({
  column,
  className,
}: {
  column: NavBarLinkType | NavBarColumnType;
  className?: string;
}) {
  if (column._type !== "navbarLink") return null;

  const { url, name } = column as NavBarLinkType;
  const router = useTransitionRouter();

  return (
    <Link
      href={url?.href ?? "#"}
      onClick={(e) => {
        e.preventDefault();
        router.push((url?.href as string) ?? "/", {
          onTransitionReady: PageAnimation,
        });
      }}
      target={url?.openInNewTab ? "_blank" : "_self"}
      className={cn(
        "text-nowrap font-medium hover:opacity-60 transition-opacity duration-500",
        className,
      )}
    >
      {name}
    </Link>
  );
}

function NavbarColumn({
  column,
}: {
  column: NavBarColumnType | NavBarLinkType;
}) {
  if (column._type !== "navbarColumn") return null;
  const router = useTransitionRouter();

  const { title, links, url } = column as NavBarColumnType;
  return (
    <NavigationMenuList>
      <NavigationMenuItem className="">
        <NavigationMenuTrigger>
          <Link
            href={url?.href ?? "#"}
            onClick={(e) => {
              e.preventDefault();
              router.push((url?.href as string) ?? "/", {
                onTransitionReady: PageAnimation,
              });
            }}
          >
            {title}
          </Link>
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="px-5 pt-[5px] pb-[15px] space-y-5 text-xs">
            {links?.map((item) => (
              <li key={`${item._key}-${item.name}`}>
                <MenuItemLink
                  item={{
                    href: (item.url?.href as string) ?? "",
                    title: item.name ?? "",
                  }}
                />
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  );
}

export function DesktopNavbar({ navbarData }: { navbarData: NavBarType }) {
  const { columns, buttons } = navbarData ?? {};

  return (
    <>
      <NavigationMenu className="space-x-5">
        {columns?.map((column: NavBarColumnType | NavBarLinkType) => {
          return column._type === "navbarColumn" ? (
            <NavbarColumn key={`nav-${column._key}`} column={column} />
          ) : (
            <NavbarColumnLink
              key={`nav-${column._key}`}
              column={column}
              className="text-xs"
            />
          );
        })}
      </NavigationMenu>
      {buttons && buttons.length > 0 && (
        <div className="justify-self-end flex items-center gap-4 ml-5">
          <SanityButtons
            buttons={buttons}
            className="flex items-center gap-4"
            buttonSize="header"
            buttonClassName="btn--header"
          />
        </div>
      )}
    </>
  );
}

const ClientSideNavbar = ({ navbarData }: { navbarData: NavBarType }) => {
  const isMobile = useIsMobile();
  const colorScheme = useStore((state) => state.colorScheme);

  // Use the color scheme from global state, falling back to the default from navbarData
  const headerStyle = colorScheme
    ? getColorSchemeStyle(colorScheme)
    : getColorSchemeStyle(navbarData.defaultColorScheme);

  if (isMobile === undefined) {
    return null; // Return null on initial render to avoid hydration mismatch
  }

  return (
    <>
      {isMobile ? (
        <MobileNavbar navbarData={navbarData} headerStyle={headerStyle} />
      ) : (
        <header id="navbar" style={headerStyle}>
          <Logo className="w-[36px] flex items-center mr-5" />
          <DesktopNavbar navbarData={navbarData} />
        </header>
      )}
    </>
  );
};

function SkeletonMobileNavbar() {
  return (
    <header id="mobile-navbar" className="md:hidden animate-pulse">
      <nav className="flex w-full items-center justify-between gap-5">
        <Logo className="w-[50px]" />
        <MobileMenuTrigger isOpen={false} setIsOpen={() => {}} disabled />
      </nav>
    </header>
  );
}

function SkeletonDesktopNavbar() {
  return (
    <header className="header-skeleton hidden md:block">
      <div className="grid grid-cols-[1fr_auto] items-center gap-8 w-full">
        <div className="justify-center flex max-w-max flex-1 items-center gap-2">
          <Logo />
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={`nav-item-skeleton-${index.toString()}`}
              className="h-[18px] w-24 rounded bg-text/20 animate-pulse"
            />
          ))}
        </div>

        <div className="justify-self-end">
          <div className="flex items-center gap-4">
            {Array.from({ length: 1 }).map((_, index) => (
              <div
                key={`nav-button-skeleton-${index.toString()}`}
                className="h-10 w-32 rounded-[10px] bg-text/20 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export function NavbarSkeletonResponsive() {
  return (
    <>
      <SkeletonMobileNavbar />
      <SkeletonDesktopNavbar />
    </>
  );
}

// Dynamically import the navbar with no SSR to avoid hydration issues
export const NavbarClient = dynamic(() => Promise.resolve(ClientSideNavbar), {
  ssr: false,
  loading: () => <NavbarSkeletonResponsive />,
});

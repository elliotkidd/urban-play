"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@workspace/ui/components/navigation-menu";
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
import { ChevronLeftIcon } from "lucide-react";

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

function MenuItemLink({
  item,
  className,
  onNavigate,
}: {
  item: MenuItem;
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const router = useTransitionRouter();

  return (
    <Link
      className={cn(
        "select-none leading-none outline-none items-center text-center text-nowrap transition-all duration-500 lg:hover:opacity-100",
        pathname !== item.href && "lg:opacity-60",
        className,
      )}
      aria-label={`Link to ${item.title ?? item.href}`}
      scroll={false}
      onClick={(e) => {
        e.preventDefault();
        onNavigate?.();
        router.push((item.href as string) ?? "/", {
          onTransitionReady: PageAnimation,
        });
      }}
      href={item.href ?? "/"}
    >
      <div className="">{item.title}</div>
    </Link>
  );
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

const slideTransition = {
  x: { type: "spring", stiffness: 300, damping: 30 },
  opacity: { duration: 0.2 },
};

const menuVariants = (isNavigating: boolean) => ({
  open: {
    height: "calc(100vh - 8rem)",
    transition: {
      duration: 0.5,
      // type: "spring",
      // bounce: 0.4,
    },
  },
  closed: {
    height: "0",
    transition: isNavigating
      ? { duration: 0 }
      : {
          duration: 0.5,
          delay: 0.5,
          type: "tween",
          ease: "easeOut",
        },
  },
});

const menuContentVariants = (isNavigating: boolean) => ({
  open: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.5,
    },
  },
  closed: {
    opacity: 0,
    transition: isNavigating ? { duration: 0 } : { duration: 0.5 },
  },
});

function MobileNavbar({
  navbarData,
  headerStyle,
}: {
  navbarData: any;
  headerStyle: React.CSSProperties;
}) {
  const { columns, buttons } = navbarData ?? {};
  const [isOpen, setIsOpen] = useState(false);
  const [activeColumn, setActiveColumn] = useState<string | null>(null);
  const [direction, setDirection] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);

  const path = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: This is intentional
  useEffect(() => {
    setIsOpen(false);
    setActiveColumn(null);
    setDirection(0);
    setIsNavigating(false);
  }, [path]);

  // Reset drill-down state when menu closes
  useEffect(() => {
    if (!isOpen) {
      setActiveColumn(null);
      setDirection(0);
    }
  }, [isOpen]);

  const handleColumnClick = (columnKey: string) => {
    setDirection(1);
    setActiveColumn(columnKey);
  };

  const handleBackClick = () => {
    setDirection(-1);
    setActiveColumn(null);
  };

  const activeColumnData = Array.isArray(columns)
    ? columns.find(
        (col: NavBarColumnType | NavBarLinkType) =>
          col._type === "navbarColumn" && col._key === activeColumn,
      )
    : null;

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
            variants={menuVariants(isNavigating)}
            className="flex"
          >
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuContentVariants(isNavigating)}
              className="flex-1 flex flex-col overflow-hidden relative"
            >
              <div className="flex-1 flex flex-col justify-center p-fluid-xs overflow-hidden relative">
                <AnimatePresence mode="wait" custom={direction}>
                  {!activeColumn ? (
                    <motion.div
                      key="main-menu"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={slideTransition}
                      className="flex flex-col gap-fluid-xs"
                    >
                      {Array.isArray(columns) &&
                        columns?.map(
                          (
                            column: NavBarLinkType | NavBarColumnType,
                            index: number,
                          ) => {
                            if (column._type === "navbarColumn") {
                              const columnData = column as NavBarColumnType;
                              return (
                                <button
                                  key={`column-${column._key}`}
                                  onClick={() => handleColumnClick(column._key)}
                                  className="font-bold text-left hover:bg-accent hover:text-accent-foreground rounded-md transition-colors flex items-center justify-between text-[35px] leading-[95%] font-heading uppercase"
                                >
                                  <span>{columnData.title}</span>
                                  <span className="relative flex-shrink-0 h-[20px] w-[20px]">
                                    <span
                                      className="absolute w-full h-0.5 bg-text transition-[background-color,transform] duration-500 top-1/2 -translate-x-1/2 rotate-180 group-data-[state=open]/trigger:rotate-0 lg:group-data-[state=open]/trigger:bg-white lg:group-hover:bg-white"
                                      style={{
                                        transition:
                                          "background-color 0.5s, transform 0.5s",
                                      }}
                                    ></span>
                                    <span
                                      className="absolute w-full h-0.5 bg-text transition-[background-color,transform] duration-500 top-1/2 -translate-x-1/2 rotate-[270deg] group-data-[state=open]/trigger:rotate-0 lg:group-data-[state=open]/trigger:bg-white lg:group-hover:bg-white"
                                      style={{
                                        transition:
                                          "background-color 0.5s, transform 0.5s",
                                      }}
                                    ></span>
                                  </span>
                                </button>
                              );
                            }
                            const { name, _key } = column as NavBarLinkType;
                            return (
                              <NavbarColumnLink
                                key={`column-link-${name}-${_key}`}
                                column={column}
                                className="text-[35px] leading-[95%] font-heading uppercase"
                                onNavigate={() => setIsNavigating(true)}
                              />
                            );
                          },
                        )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`submenu-${activeColumn}`}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={slideTransition}
                      className="flex flex-col items-start gap-[18px] h-full text-left"
                    >
                      <button
                        onClick={handleBackClick}
                        className="text-[18px] font-semibold leading-none text-left my-fluid-sm transition-colors flex items-center gap-1.5"
                      >
                        <ChevronLeftIcon className="w-5 h-5" />
                        <span>Back</span>
                      </button>
                      {activeColumnData &&
                        activeColumnData._type === "navbarColumn" && (
                          <>
                            {activeColumnData.url?.href && (
                              <NavbarColumnLink
                                column={activeColumnData}
                                className="text-[30px]"
                                onNavigate={() => setIsNavigating(true)}
                              />
                            )}
                            {activeColumnData.links?.map((item: any) => (
                              <MenuItemLink
                                key={item._key}
                                item={{
                                  href: item.url?.href ?? item.href ?? "",
                                  title: item.name ?? "",
                                }}
                                className="text-[30px] font-bold leading-none"
                                onNavigate={() => setIsNavigating(true)}
                              />
                            ))}
                          </>
                        )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <SanityButtons
                buttons={buttons}
                className="flex flex-col gap-4 p-2.5"
                buttonClassName="btn--header w-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavbarColumnLink({
  column,
  className,
  onNavigate,
}: {
  column: NavBarLinkType | NavBarColumnType;
  className?: string;
  onNavigate?: () => void;
}) {
  if (column._type !== "navbarLink") return null;

  const { url, name } = column as NavBarLinkType;
  const router = useTransitionRouter();
  const pathname = usePathname();

  return (
    <Link
      href={url?.href ?? "#"}
      onClick={(e) => {
        e.preventDefault();
        onNavigate?.();
        router.push((url?.href as string) ?? "/", {
          onTransitionReady: PageAnimation,
        });
      }}
      target={url?.openInNewTab ? "_blank" : "_self"}
      className={cn(
        "text-nowrap font-medium transition-opacity duration-500 lg:hover:opacity-100",
        pathname !== url?.href && "lg:opacity-60",
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
  const pathname = usePathname();

  const { title, links, url } = column as NavBarColumnType;

  return (
    <NavigationMenuList>
      <NavigationMenuItem className="">
        <NavigationMenuTrigger
          className={cn(pathname === url?.href && "opacity-100")}
        >
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
        <div className="justify-self-end flex items-center gap-4 ml-5 z-10">
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
          <div className="absolute inset-0 bg-nav-bar-background/20 backdrop-blur-lg rounded-[10px]" />
          <Logo className="w-[36px] flex items-center mr-5 z-10" />
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

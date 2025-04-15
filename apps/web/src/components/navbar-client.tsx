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
import { useEffect, useState } from "react";

import { useIsMobile } from "@/hooks/use-is-mobile";

import { Logo } from "./logo";
import { SanityButtons } from "./sanity-buttons";
import { SanityIcon } from "./sanity-icon";
import SanityLink from "./sanity-link";
import { NavBarColumnType, NavBarLinkType } from "@/lib/sanity/queries/link";
import { NavBarType } from "@/lib/sanity/queries/documents";
import useStore from "@/store/header";
import { getColorSchemeStyle } from "@/utils/utils";
import { Button } from "./ui/Button";
import { twMerge } from "tailwind-merge";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { ColorSchemeFragment } from "@/lib/sanity/queries/fragments";

interface MenuItem {
  title: string;
  description: string;
  icon: JSX.Element;
  href?: string;
}

function MenuItemLink({
  item,
  setIsOpen,
}: {
  item: MenuItem;
  setIsOpen?: (isOpen: boolean) => void;
}) {
  return (
    <Link
      className={twMerge(
        "flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-accent hover:text-accent-foreground items-center focus:bg-accent focus:text-accent-foreground",
      )}
      aria-label={`Link to ${item.title ?? item.href}`}
      onClick={() => setIsOpen?.(false)}
      href={item.href ?? "/"}
    >
      {item.icon}
      <div className="">
        <div className="text-sm font-semibold">{item.title}</div>
        <p className="text-sm leading-snug text-muted-foreground line-clamp-2">
          {item.description}
        </p>
      </div>
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
          className={twMerge(
            buttonVariants({ variant: "ghost" }),
            "justify-start",
          )}
        >
          {column.title}
        </div>
      </AccordionTrigger>
      <AccordionContent className="mt-2">
        {column.links?.map((item: any) => (
          <MenuItemLink
            key={item._key}
            setIsOpen={setIsOpen}
            item={{
              description: item.description ?? "",
              href: item.href ?? "",
              icon: <SanityIcon icon={item.icon} className="size-5 shrink-0" />,
              title: item.name ?? "",
            }}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}

function MobileNavbar({
  navbarData,
  colorScheme,
}: {
  navbarData: any;
  colorScheme: ColorSchemeFragment;
}) {
  const { columns, buttons } = navbarData ?? {};
  const [isOpen, setIsOpen] = useState(false);

  const path = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: This is intentional
  useEffect(() => {
    setIsOpen(false);
  }, [path]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex justify-end">
        <SheetTrigger asChild>
          <Button variant="default" size="icon">
            <Menu className="size-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
      </div>
      <SheetContent
        className="overflow-y-auto"
        style={getColorSchemeStyle(colorScheme)}
      >
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
        </SheetHeader>

        <div className="mb-8 mt-8 flex flex-col gap-4">
          {Array.isArray(columns) &&
            columns?.map((column: NavBarLinkType | NavBarColumnType) => {
              if (column._type === "navbarLink") {
                const { name, _key, url } = column as NavBarLinkType;
                return (
                  <SanityLink key={`column-link-${name}-${_key}`} url={url}>
                    {name}
                  </SanityLink>
                );
              }
              return (
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  key={column._key}
                >
                  <MobileNavbarAccordionColumn
                    column={column}
                    setIsOpen={setIsOpen}
                  />
                </Accordion>
              );
            })}
        </div>
        {Array.isArray(buttons) && buttons.length > 0 && (
          <div className="border-t pt-4">
            <SanityButtons
              buttons={buttons ?? []}
              buttonClassName="w-full"
              className="flex mt-2 flex-col gap-3"
            />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

function NavbarColumnLink({
  column,
}: {
  column: NavBarLinkType | NavBarColumnType;
}) {
  if (column._type !== "navbarLink") return null;

  const { url, name } = column as NavBarLinkType;

  return <SanityLink url={url}>{name}</SanityLink>;
}

function NavbarColumn({
  column,
}: {
  column: NavBarColumnType | NavBarLinkType;
}) {
  if (column._type !== "column") return null;

  const { title, links } = column as NavBarColumnType;
  return (
    <NavigationMenuList>
      <NavigationMenuItem className="text-muted-foreground dark:text-neutral-300">
        <NavigationMenuTrigger>{title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="w-80 p-3">
            {links?.map((item: any) => (
              <li key={item._key}>
                <MenuItemLink
                  item={{
                    description: item.description ?? "",
                    href: item.href ?? "",
                    icon: (
                      <SanityIcon
                        icon={item.icon}
                        className="size-5 shrink-0"
                      />
                    ),
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
    <div className="grid grid-cols-[1fr_auto] items-center gap-8">
      <NavigationMenu className="space-x-4">
        {columns?.map((column: NavBarColumnType | NavBarLinkType) => {
          return column._type === "column" ? (
            <NavbarColumn key={`nav-${column._key}`} column={column} />
          ) : (
            <NavbarColumnLink key={`nav-${column._key}`} column={column} />
          );
        })}
      </NavigationMenu>
      {buttons && buttons.length > 0 && (
        <div className="justify-self-end flex items-center gap-4">
          <SanityButtons
            buttons={buttons}
            className="flex items-center gap-4"
          />
        </div>
      )}
    </div>
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
    <header id="navbar" style={headerStyle}>
      <nav className="grid grid-cols-[auto_1fr] items-center gap-4">
        <Logo />
        {isMobile ? (
          <MobileNavbar
            navbarData={navbarData}
            colorScheme={navbarData.defaultColorScheme}
          />
        ) : (
          <DesktopNavbar navbarData={navbarData} />
        )}
      </nav>
    </header>
  );
};

function SkeletonMobileNavbar() {
  return (
    <div className="md:hidden">
      <div className="flex justify-end">
        <div className="h-12 w-12 rounded-md bg-text animate-pulse" />
      </div>
    </div>
  );
}

function SkeletonDesktopNavbar() {
  return (
    <div className="hidden md:grid grid-cols-[1fr_auto] items-center gap-8 w-full">
      <div className="justify-center flex max-w-max flex-1 items-center gap-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={`nav-item-skeleton-${index.toString()}`}
            className="h-10 w-32 rounded bg-text/20 animate-pulse"
          />
        ))}
      </div>

      <div className="justify-self-end">
        <div className="flex items-center gap-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={`nav-button-skeleton-${index.toString()}`}
              className="h-10 w-32 rounded-[10px] bg-text/20 animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function NavbarSkeletonResponsive() {
  return (
    <header className="header-skeleton">
      <nav className="grid grid-cols-[auto_1fr] items-center gap-4">
        <Logo />
        <>
          <SkeletonMobileNavbar />
          <SkeletonDesktopNavbar />
        </>
      </nav>
    </header>
  );
}

// Dynamically import the navbar with no SSR to avoid hydration issues
export const NavbarClient = dynamic(() => Promise.resolve(ClientSideNavbar), {
  ssr: false,
  loading: () => <NavbarSkeletonResponsive />,
});

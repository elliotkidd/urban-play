"use client";

import { InferType } from "groqd";
import { twMerge } from "tailwind-merge";

import DesktopMenu from "@/components/global/Navbar/components/DesktopMenu";
import MobileMenu from "@/components/global/Navbar/components/MobileMenu";
import ButtonGroup from "@/components/shared/navigation/ButtonGroup";
import ClientSideRoute from "@/components/shared/navigation/ClientSideRoute";
import { headerQuery } from "@/sanity/lib/queries/documents";
import useAppStore from "@/store/app-store";

const logo = (
  <svg
    width="48"
    height="49"
    viewBox="0 0 48 49"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="fill-current"
  >
    <title>OSCAR Events Co</title>
    <path d="M33.593 43.9799L23.9471 31.6122L46.0651 23.1008L47.2275 26.2747L29.3823 33.1463L36.1815 41.864L33.593 43.9799Z" />
    <path d="M27.4552 48.9999L15.5618 33.7387L9.55829 43.0541L6.79419 41.1921L15.3035 27.978L30.0436 46.884L27.4552 48.9999Z" />
    <path d="M3.00197 38.6317L0.237872 36.7644L10.7363 20.4663L0.227539 17.504L1.10585 14.2349L16.0113 18.435L3.00197 38.6317Z" />
    <path d="M25.089 16.1764L2.30968 9.74921L3.19316 6.48007L21.5757 11.6641L21.0797 0.518396L24.3863 0.36499L25.089 16.1764Z" />
    <path d="M29.9972 24.3175L28.9225 0.153406L32.2343 0L33.0971 19.5037L43.301 15.5734L44.4635 18.7473L29.9972 24.3175Z" />
  </svg>
);
export function MenuToggle() {
  var openMenuDrawer = useAppStore((state) => state.openMenuDrawer);
  return (
    <button
      onClick={() =>
        useAppStore.setState({
          openMenuDrawer: !openMenuDrawer,
        })
      }
      className={`pointer-events-auto relative flex h-12 w-12 items-center justify-center md:hidden`}
    >
      <span
        className={twMerge(
          `absolute h-0.5 w-6 translate-y-1 bg-contrast duration-200`,
          openMenuDrawer ? "translate-y-0 rotate-45" : "",
        )}
      />

      <span
        className={twMerge(
          `absolute h-0.5 w-6 -translate-y-1 bg-contrast duration-200`,

          openMenuDrawer ? "translate-y-0 -rotate-45" : "",
        )}
      />
      <span className="sr-only">
        {openMenuDrawer ? "Close menu" : "Open menu"}
      </span>
    </button>
  );
}

type HeaderType = InferType<typeof headerQuery>;

export default function Navbar({ data }: { data: HeaderType }) {
  const { desktopMenu, mobileMenu, buttons } = data ?? {};

  return (
    <>
      <header
        id="header"
        className={twMerge(
          `navbar fixed top-0 z-40 flex items-center w-full justify-center bg-transparent pt-fluid-xs md:pt-fluid-sm duration-200`,
        )}
      >
        <div className={`wrapper w-full z-20`}>
          <div className="h-nav items-center justify-between md:justify-center duration-200 flex gap-4">
            <div className="flex lg:justify-center">
              <ClientSideRoute
                route="/"
                onClick={() => {
                  useAppStore.setState({ openMenuDrawer: false });
                }}
                className="inline-block text-contrast"
              >
                {logo}
              </ClientSideRoute>
            </div>
            <div className="flex h-full w-auto items-center gap-4 rounded-full bg-white/10 backdrop-blur-md  sm:px-1.5 md:px-3">
              {desktopMenu && <DesktopMenu menu={desktopMenu} />}

              <div className="flex flex-1 items-center justify-end gap-2 md:gap-4">
                {buttons && (
                  <ButtonGroup
                    className="hidden flex-wrap items-center justify-end gap-2 sm:flex"
                    buttons={buttons}
                    size="medium"
                  />
                )}
                <MenuToggle />
              </div>
            </div>
          </div>
        </div>
        {(mobileMenu || desktopMenu) && (
          <MobileMenu buttons={buttons} menu={mobileMenu || desktopMenu} />
        )}
      </header>
    </>
  );
}

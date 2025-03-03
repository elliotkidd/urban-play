"use client";

import { usePathname } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { twMerge } from "tailwind-merge";

import { Link } from "@/components/shared/navigation/Link";
import useAppStore from "@/store/app-store";
import processUrl from "@/utils/processUrl";

import ClientSideRoute from "./ClientSideRoute";

export default function CategoryNavigation({ directory, categories }) {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
    rootMargin: "-10% 0px -90% 0px",
  });
  if (inView) {
    useAppStore.setState({
      navbarTheme: "light",
    });
  }

  const pathname = usePathname();

  const btnStyle =
    "inline-block border py-1.5 md:py-2 px-4 md:px-6 rounded-full uppercase font-medium duration-500";
  const inactiveBtnStyle =
    "bg-transparent border-accent text-contrast hover:bg-accent/20";
  const activeBtnStyle = "bg-accent border-accent text-contrast";
  return (
    <>
      {categories && (
        <section className="mb-fluid-sm mt-fluid-sm" ref={ref}>
          <div className="wrapper">
            <ul className="flex flex-wrap gap-2">
              <li>
                <ClientSideRoute
                  route={directory}
                  className={twMerge(
                    btnStyle,
                    pathname === directory ? activeBtnStyle : inactiveBtnStyle,
                  )}
                >
                  All
                </ClientSideRoute>
              </li>
              {categories.map((category, i) => {
                return (
                  <li key={i}>
                    <Link
                      href={processUrl(category)}
                      className={({ isActive }) =>
                        twMerge(
                          btnStyle,
                          isActive ? activeBtnStyle : inactiveBtnStyle,
                        )
                      }
                    >
                      {category?.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}

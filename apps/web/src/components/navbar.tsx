import { sanityFetch } from "@/lib/sanity/live";

import { Logo } from "./logo";
import { NavbarClient, NavbarSkeletonResponsive } from "./navbar-client";
import { navBarQuery } from "@/lib/sanity/queries/link";

export async function NavbarServer() {
  const navbarData = await sanityFetch({ query: navBarQuery.query });

  return <Navbar navbarData={navbarData.data} />;
}

export function Navbar({ navbarData }: { navbarData: any }) {
  const { logo, siteTitle } = navbarData ?? {};

  return (
    <header id="navbar">
      <nav className="grid grid-cols-[auto_1fr] items-center gap-4">
        <Logo />
        <NavbarClient navbarData={navbarData} />
      </nav>
    </header>
  );
}

export function NavbarSkeleton() {
  return (
    <header className="h-[75px] py-4 md:border-b">
      <div className="container mx-auto px-4 md:px-6">
        <nav className="grid grid-cols-[auto_1fr] items-center gap-4">
          <div className="h-[40px] w-[170px] rounded animate-pulse bg-muted" />
          <NavbarSkeletonResponsive />
        </nav>
      </div>
    </header>
  );
}

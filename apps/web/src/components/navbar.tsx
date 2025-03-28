import { sanityFetch } from "@/lib/sanity/live";
import { navBarQuery, NavBarType } from "@/lib/sanity/queries/documents";
import { NavbarClient } from "./navbar-client";

export async function NavbarServer() {
  const navbarData = await sanityFetch({ query: navBarQuery.query });
  return <NavbarClient navbarData={navbarData.data} />;
}

import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import { loadHeader, loadSettings } from "@/sanity/loader/loadQuery";

import NavbarLayout from "./NavbarLayout";

const NavbarPreview = dynamic(() => import("./NavbarPreview"));

export async function Navbar() {
  const initial = await loadHeader();

  const { isEnabled } = await draftMode();

  if (isEnabled) {
    return <NavbarPreview initial={initial} />;
  }

  return <NavbarLayout data={initial.data} />;
}

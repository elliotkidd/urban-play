import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import { loadFooter } from "@/sanity/loader/loadQuery";

import FooterLayout from "./FooterLayout";

const FooterPreview = dynamic(() => import("./FooterPreview"));

export async function Footer() {
  const initial = await loadFooter();

  const { isEnabled } = await draftMode();

  if (isEnabled) {
    return <FooterPreview initial={initial} />;
  }

  return <FooterLayout data={initial.data} />;
}

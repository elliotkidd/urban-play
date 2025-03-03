import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import Home from "@/components/layouts/home/Home";
import { loadHomePage } from "@/sanity/loader/loadQuery";

// type Props = {
//   params: Promise<{ id: string }>;
//   searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
// };

const HomePreview = dynamic(
  () => import("@/components/layouts/home/HomePreview"),
);

export default async function IndexRoute() {
  const initial = await loadHomePage();

  const { isEnabled } = await draftMode();

  if (isEnabled) {
    return <HomePreview initial={initial} />;
  }

  return <Home data={initial.data} />;
}

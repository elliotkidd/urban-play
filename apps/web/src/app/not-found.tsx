import dynamic from "next/dynamic";
import { draftMode } from "next/headers";

import ErrorPage from "@/components/layouts/error/Error";
import { loadErrorPage } from "@/sanity/loader/loadQuery";

const ErrorPreview = dynamic(
  () => import("@/components/layouts/error/ErrorPreview"),
);

export default async function ErrorRoute() {
  const initial = await loadErrorPage();
  const isDraftMode = await draftMode();
  if (isDraftMode.isEnabled) {
    return <ErrorPreview initial={initial} />;
  }

  return (
    <>
      <ErrorPage data={initial.data} />
    </>
  );
}

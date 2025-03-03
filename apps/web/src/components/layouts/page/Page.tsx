import { InferType } from "groqd";

import Modules from "@/components/shared/modules";
import { pagesBySlugQuery } from "@/sanity/lib/queries/documents";

type Props = { data: InferType<typeof pagesBySlugQuery> };

export default function Page({ data }: Props) {
  // Default to an empty object to allow previews on non-existent documents
  const { title, modules } = data ?? {};

  return (
    <>
      <h1 className="sr-only">{title}</h1>
      {modules && <Modules modules={modules} page={data} />}
    </>
  );
}

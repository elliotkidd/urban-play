import { InferType } from "groqd";

import Modules from "@/components/shared/modules";
import { errorPageQuery } from "@/sanity/lib/queries/documents";

export interface Props {
  data: InferType<typeof errorPageQuery>;
}

export function ErrorPage({ data }: Props) {
  // Default to an empty object to allow previews on non-existent documents
  const { modules } = data?.errorPage ?? {};

  return (
    <>
      <h1 className="hidden">404</h1>
      {modules ? <Modules modules={modules} page={data} /> : null}
    </>
  );
}

export default ErrorPage;

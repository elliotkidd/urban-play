import { InferType } from "groqd";

import Modules from "@/components/shared/modules";
import { postsPageQuery } from "@/sanity/lib/queries/documents";

type Props = {
  data: InferType<typeof postsPageQuery>;
};

export function BlogModulesLayout({ data }: Props) {
  const { modules } = data ?? {};

  return <>{modules && <Modules modules={modules} />}</>;
}

export default BlogModulesLayout;

import { Suspense } from "react";

import { BlogIndexHeader } from "@/components/layouts/blog/components/BlogIndexHeader";

export default async function BlogIndexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense>
        <BlogIndexHeader />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </>
  );
}

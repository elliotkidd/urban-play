import { Suspense } from "react";

import { BlogModules } from "@/components/layouts/blog/components/BlogModules";

export default async function BlogIndexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense>{children}</Suspense>

      <Suspense>
        <BlogModules />
      </Suspense>
    </>
  );
}

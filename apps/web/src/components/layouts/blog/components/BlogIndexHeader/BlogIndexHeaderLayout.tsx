"use client";

import { InferType } from "groqd";

import RichText from "@/components/shared/RichText";
import CategoryNavigation from "@/components/shared/navigation/CategoryNavigation";
import { useHeaderColorScheme } from "@/hooks/useHeaderColorScheme";
import { postsPageQuery, postsQuery } from "@/sanity/lib/queries/documents";

type Props = {
  data: InferType<typeof postsPageQuery>;
};

export function BlogIndexHeaderLayout({ data }: Props) {
  const { title, categories, richText, colorScheme } = data ?? {};
  const ref = useHeaderColorScheme(colorScheme);

  return (
    <>
      <section ref={ref} className="space-y-5 pb-fluid pt-fluid-xl">
        <div className="wrapper flex flex-col items-center">
          {richText ? (
            <>
              <h1 className="sr-only">{title}</h1>
              <RichText value={richText} />
            </>
          ) : (
            <h1 className="text-4xl">{title}</h1>
          )}
          <CategoryNavigation directory={"/posts"} categories={categories} />
        </div>
      </section>
    </>
  );
}

export default BlogIndexHeaderLayout;

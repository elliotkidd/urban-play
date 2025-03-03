"use client";

import { InferType } from "groqd";

import { Button } from "@/components/Button";
import RichText from "@/components/shared/RichText";
import SanityImage from "@/components/shared/SanityImage";
import PostCard from "@/components/shared/cards/PostCard";
import { useHeaderColorScheme } from "@/hooks/useHeaderColorScheme";
import { postsBySlugQuery } from "@/sanity/lib/queries/documents";

export interface Props {
  data: InferType<typeof postsBySlugQuery>;
}

export default function Blog({ data }: Props) {
  // Default to an empty object to allow previews on non-existent documents
  const {
    title,
    mainImage,
    body,
    publishedAt,
    categories,
    related,
    colorScheme,
  } = data ?? {};

  let date: Date;
  publishedAt ? (date = new Date(publishedAt)) : (date = new Date());

  const ref = useHeaderColorScheme(colorScheme?.colorScheme);

  return (
    <>
      <header
        className="theme--light py-10 pt-20 text-center md:pt-40"
        ref={ref}
      >
        <div className="wrapper">
          <div className="mx-auto flex max-w-2xl flex-col items-center space-y-4">
            {categories && (
              <ul className="flex items-center flex-wrap gap-1">
                {categories.map((category, i) => {
                  return (
                    <li key={i}>
                      <Button
                        as="a"
                        size="xs"
                        variant="accent"
                        to={`/posts/category/${category?.slug}`}
                      >
                        {category?.title}
                      </Button>
                    </li>
                  );
                })}
              </ul>
            )}
            <h1 className="text-balance font-heading text-3xl">{title}</h1>
          </div>
        </div>
      </header>
      <section className="wrapper">
        {mainImage ? (
          <figure className="relative mx-auto aspect-video w-full max-w-6xl overflow-hidden">
            <SanityImage
              src={mainImage}
              className="absolute inset-0 h-full w-full object-cover"
              width={800}
              height={450}
            />
          </figure>
        ) : null}
      </section>
      <article className="theme--light py-fluid">
        <div className="wrapper">
          <div className="prose-sm prose mx-auto">
            <RichText value={body} />
          </div>
        </div>
      </article>
      <div className="wrapper">
        <svg
          className="w-full text-accent"
          viewBox="0 0 1360 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 9C177.809 9 346.708 3.55907 524.5 3C667.292 2.55099 818.689 5.16866 961.37 3.69136C1046.53 2.80958 1131.28 1.44444 1216.57 1.44444C1264.4 1.44444 1312.17 1 1360 1"
            stroke="currentColor"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
      {related && (
        <section className="py-fluid">
          <div className="wrapper ">
            <h2 className="mb-fluid-sm text-2xl font-heading">Related Posts</h2>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-fluid-sm">
              {related.map((post, i) => {
                return (
                  <li key={i}>
                    <PostCard post={post} index={i} />
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}

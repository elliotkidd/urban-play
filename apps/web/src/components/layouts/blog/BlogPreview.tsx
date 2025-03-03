"use client";

import { type QueryResponseInitial } from "@sanity/react-loader/rsc";
import { InferType } from "groqd";

import { postsBySlugQuery } from "@/sanity/lib/queries/documents";
import { useQuery } from "@/sanity/loader/useQuery";

import Blog from "./Blog";

type Props = {
  params?: Promise<{ slug: string }>;
  initial: QueryResponseInitial<InferType<typeof postsBySlugQuery>>;
};

export default function BlogPreview({ params, initial }: Props) {
  const { data } = useQuery<InferType<typeof postsBySlugQuery>>(
    postsBySlugQuery.query,
    params,
    {
      initial,
    },
  );

  return <Blog data={data!} />;
}

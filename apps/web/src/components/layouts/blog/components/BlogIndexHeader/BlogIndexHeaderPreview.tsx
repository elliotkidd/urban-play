"use client";

import { QueryResponseInitial } from "@sanity/react-loader";
import { InferType } from "groqd";

import { postsPageQuery } from "@/sanity/lib/queries/documents";
import { useQuery } from "@/sanity/loader/useQuery";

import BlogIndexHeaderLayout from "./BlogIndexHeaderLayout";

type Props = {
  initial: QueryResponseInitial<InferType<typeof postsPageQuery>>;
};

export default function BlogIndexHeaderPreview({ initial }: Props) {
  const { data } = useQuery<InferType<typeof postsPageQuery>>(
    postsPageQuery.query,
    {},
    {
      initial,
    },
  );
  return <BlogIndexHeaderLayout data={data!} />;
}

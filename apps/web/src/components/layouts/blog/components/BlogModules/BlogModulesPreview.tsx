"use client";

import { QueryResponseInitial } from "@sanity/react-loader";
import { InferType } from "groqd";

import { postsPageQuery } from "@/sanity/lib/queries/documents";
import { useQuery } from "@/sanity/loader/useQuery";

import BlogModulesLayout from "./BlogModulesLayout";

type Props = {
  initial: QueryResponseInitial<InferType<typeof postsPageQuery>>;
};

export default function BlogModulesPreview({ initial }: Props) {
  const { data } = useQuery<InferType<typeof postsPageQuery>>(
    postsPageQuery.query,
    {},
    {
      initial,
    },
  );
  return <BlogModulesLayout data={data!} />;
}

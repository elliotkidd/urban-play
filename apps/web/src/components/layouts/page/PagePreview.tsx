"use client";

import { type QueryResponseInitial } from "@sanity/react-loader/rsc";
import { InferType } from "groqd";

import { pagesBySlugQuery } from "@/sanity/lib/queries/documents";
import { useQuery } from "@/sanity/loader/useQuery";

import Page from "./Page";

type Props = {
  params: Promise<{ slug: string }>;
  initial: QueryResponseInitial<InferType<typeof pagesBySlugQuery>>;
};

export default function PagePreview({ params, initial }: Props) {
  const { data } = useQuery<InferType<typeof pagesBySlugQuery>>(
    pagesBySlugQuery.query,
    params,
    {
      initial,
    },
  );

  return <Page data={data!} />;
}

"use client";

import { type QueryResponseInitial } from "@sanity/react-loader/rsc";
import { InferType } from "groqd";

import { errorPageQuery } from "@/sanity/lib/queries/documents";
import { useQuery } from "@/sanity/loader/useQuery";

import ErrorPage from "./Error";

type Props = {
  params?: { slug: string; lang: string };
  initial: QueryResponseInitial<InferType<typeof errorPageQuery>>;
};

export default function ErrorPagePreview(props: Props) {
  const { initial } = props;
  const { data, encodeDataAttribute } = useQuery<
    InferType<typeof errorPageQuery>
  >(errorPageQuery.query, {}, { initial });

  if (!data) {
    return (
      <div className="text-center">
        Please start editing your Error document to see the preview!
      </div>
    );
  }

  return <ErrorPage data={data} />;
}

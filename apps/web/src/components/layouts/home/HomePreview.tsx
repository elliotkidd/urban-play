"use client";

import { type QueryResponseInitial } from "@sanity/react-loader/rsc";
import { InferType } from "groqd";

import { homePageQuery } from "@/sanity/lib/queries/documents";
import { useQuery } from "@/sanity/loader/useQuery";

import Home from "./Home";

type Props = {
  params?: { slug: string; lang: string };
  initial: QueryResponseInitial<InferType<typeof homePageQuery>>;
};

export default function HomePagePreview(props: Props) {
  const { initial } = props;
  const { data } = useQuery<InferType<typeof homePageQuery>>(
    homePageQuery.query,
    {},
    { initial },
  );

  if (!data) {
    return (
      <div className="text-center">
        Please start editing your Home document to see the preview!
      </div>
    );
  }

  return <Home data={data} />;
}

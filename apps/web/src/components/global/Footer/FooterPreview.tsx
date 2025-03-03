"use client";

import { InferType } from "groqd";

import { footerQuery, headerQuery } from "@/sanity/lib/queries/documents";
import { useQuery } from "@/sanity/loader/useQuery";

import FooterLayout from "./FooterLayout";

type Props = {
  initial: any;
};

export default function NavbarPreview({ initial }: Props) {
  const { data, encodeDataAttribute } = useQuery<InferType<typeof footerQuery>>(
    footerQuery.query,
    {},
    { initial },
  );

  return <FooterLayout data={data!} />;
}

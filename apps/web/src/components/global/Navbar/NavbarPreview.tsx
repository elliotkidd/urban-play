"use client";

import { InferType } from "groqd";

import { headerQuery } from "@/sanity/lib/queries/documents";
import { useQuery } from "@/sanity/loader/useQuery";

import NavbarLayout from "./NavbarLayout";

type Props = {
  initial: any;
};

export default function NavbarPreview({ initial }: Props) {
  const { data } = useQuery<InferType<typeof headerQuery>>(
    headerQuery.query,
    {},
    { initial },
  );

  return <NavbarLayout data={data!} />;
}

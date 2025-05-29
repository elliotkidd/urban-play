"use client";

import SanityImage from "@/components/sanity-image";
import { ColorSchemeFragment, ImageType } from "@/lib/sanity/queries/fragments";
import useStore from "@/store/header";
import { useEffect } from "react";

export default function Header({
  image,
  title,
  description,
  colourScheme,
}: {
  image: ImageType;
  title: string;
  description: string;
  colourScheme: ColorSchemeFragment;
}) {
  const { setColorScheme } = useStore();

  useEffect(() => {
    setColorScheme(colourScheme);
  }, []);

  return (
    <section className="h-screen flex items-center relative prose overflow-hidden">
      {image && (
        <SanityImage
          src={image}
          className="w-full absolute inset-0 object-cover h-full"
          alt={title}
        />
      )}
      <div className="absolute inset-0 bg-black/20 h-full w-full" />
      <div className="wrapper grid lg:grid-cols-2 gap-4 relative z-10 prose prose-white">
        <h1 className="uppercase text-3xl font-black font-heading">{title}</h1>
        <p className="lead max-w-p-lg mt-0">{description}</p>
      </div>
    </section>
  );
}

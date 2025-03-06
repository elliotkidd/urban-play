import { TileType } from "@/lib/sanity/queries/fragments";
import Link from "./link";
import SanityImage from "./sanity-image";
import processUrl from "@/utils/processUrl";

export default function ProjectTile({ project }: { project: TileType }) {
  const { image, solutions, title } = project;
  return (
    <Link href={processUrl(project)} className="block">
      <div className="relative mb-2 aspect-square rounded-xl overflow-hidden">
        <SanityImage
          src={image}
          className="object-cover inset-0 w-full h-full"
        />
        {solutions && solutions.length > 0 && (
          <span className="absolute bg-nav-bar-background/20 backdrop-blur text-nav-bar-text top-3 left-3 text-xs font-bold px-2 py-1 rounded-lg">
            {solutions.map(({ title }: { title: string }) => title).join(", ")}
          </span>
        )}
      </div>
      <h3 className="text-base font-bold mb-4">{title}</h3>
    </Link>
  );
}

import { LinkReferenceType } from "@/lib/sanity/queries/link";
import Link from "next/link";

export function BlogHeader({
  title,
  solutions,
}: {
  title: string | null;
  solutions: LinkReferenceType[];
}) {
  return (
    <div className="wrapper flex flex-col lg:flex-row justify-between items-start prose mb-fluid-lg">
      <h2 className="h2">{title}</h2>
      <div className="flex gap-2 not-prose items-start flex-wrap lg:justify-end max-w-p">
        {solutions.map((solution: LinkReferenceType) => (
          <Link
            key={solution._id}
            href={`/blog/solution${solution.slug}`}
            className="text-xs bg-nav-bar-background/20 p-4 rounded-lg"
          >
            {solution.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

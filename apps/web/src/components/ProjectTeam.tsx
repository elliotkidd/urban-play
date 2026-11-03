import { type ProjectTeam as ProjectTeamProps } from "@/lib/sanity/queries/documents";
import { cn } from "@/lib/utils";
import SanityImage from "./sanity-image";

export function ProjectTeam({
  team,
  direction,
}: {
  team?: ProjectTeamProps;
  // Matches the desktop annotation layout above it; leave unset on mobile
  direction?: "horizontal" | "vertical";
}) {
  if (!team?.length) return null;

  return (
    <div
      className={cn(
        "not-prose text-xs",
        direction === "horizontal" ? "grid grid-cols-3 gap-2" : "space-y-2",
      )}
    >
      <p className={cn("leading-none text-body-copy")}>
        {team.length > 1 ? "Play Consultants" : "Play Consultant"}
      </p>
      <ul className="list-none col-span-2 space-y-3">
        {team.map(({ _id, name, position, email, image }) => {
          const content = (
            <>
              <div className="relative w-12 aspect-square flex-none rounded-lg overflow-hidden bg-nav-bar-background/20">
                {image && (
                  <SanityImage
                    src={image}
                    alt={name}
                    width={160}
                    height={160}
                    sizes="64px"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
              </div>
              <span className="leading-none">
                <span className="block text-text">{name}</span>
                {position && (
                  <span className="block mt-1 text-body-copy">{position}</span>
                )}
              </span>
            </>
          );

          return (
            <li key={_id}>
              {email ? (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 hover:opacity-70 transition-opacity duration-500"
                >
                  {content}
                </a>
              ) : (
                <div className="flex items-center gap-3">{content}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

import { twMerge } from "tailwind-merge";
import { ImageLinkCard } from "../image-link-card";

export function ImageLinkCards({ cards, smallWrapper }: any) {
  return (
    <div
      className={twMerge(
        "wrapper py-fluid-sm",
        smallWrapper && "wrapper--small",
      )}
    >
      {Array.isArray(cards) && cards.length > 0 && (
        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
          {cards?.map((card) => (
            <ImageLinkCard key={card._key} card={card} className={twMerge()} />
          ))}
        </div>
      )}
    </div>
  );
}

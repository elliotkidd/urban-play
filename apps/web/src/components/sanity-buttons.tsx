import { BUTTON_FRAGMENT } from "@/lib/sanity/queries/link";
import { TypeFromSelection } from "groqd";
import { twMerge } from "tailwind-merge";
import SanityLink from "./sanity-link";
import { Button } from "./ui/Button";
type SanityButtonsProps = {
  buttons: SanityButtonProps[] | null;
  className?: string;
  buttonClassName?: string;
};

type SanityButtonProps = TypeFromSelection<typeof BUTTON_FRAGMENT>;

export function SanityButtons({ buttons, className }: SanityButtonsProps) {
  if (!buttons?.length) return null;

  return (
    <div className={twMerge("flex flex-col sm:flex-row gap-4", className)}>
      {buttons.map(({ url, variant, text, _key }, i) => (
        <SanityLink key={_key} url={url}>
          <Button as="span" variant={variant}>
            {text}
          </Button>
        </SanityLink>
      ))}
    </div>
  );
}

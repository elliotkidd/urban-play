import { BUTTON_FRAGMENT } from "@/lib/sanity/queries/link";
import { TypeFromSelection } from "groqd";
import { twMerge } from "tailwind-merge";
import { Button } from "./ui/Button";
import Link from "next/link";

type SanityButtonsProps = {
  buttons: SanityButtonProps[] | null;
  className?: string;
  buttonClassName?: string;
  buttonSize?: "default" | "icon" | "header";
};

type SanityButtonProps = TypeFromSelection<typeof BUTTON_FRAGMENT>;

export function SanityButtons({
  buttons,
  className,
  buttonClassName,
  buttonSize,
}: SanityButtonsProps) {
  if (!buttons?.length) return null;

  return (
    <div className={twMerge("flex flex-col sm:flex-row gap-4", className)}>
      {buttons.map(({ url, variant, text, _key }, i) => (
        <Link
          key={_key}
          href={url?.href ?? "#"}
          target={url?.openInNewTab ? "_blank" : "_self"}
        >
          <Button
            as="span"
            size={buttonSize}
            variant={variant}
            className={buttonClassName}
          >
            {text}
          </Button>
        </Link>
      ))}
    </div>
  );
}

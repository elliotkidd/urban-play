import { BUTTON_FRAGMENT } from "@/lib/sanity/queries/link";
import { TypeFromSelection } from "groqd";
import { twMerge } from "tailwind-merge";
import { Button } from "./ui/Button";
import Link from "next/link";
import PageAnimation from "./PageAnimation";
import { useTransitionRouter } from "next-view-transitions";

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

  const router = useTransitionRouter();

  return (
    <div className={twMerge("flex flex-col sm:flex-row gap-4", className)}>
      {buttons.map(({ url, variant, text, _key }, i) => (
        <Link
          key={_key}
          onClick={(e) => {
            e.preventDefault();
            router.push((url?.href as string) ?? "/", {
              onTransitionReady: PageAnimation,
            });
          }}
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

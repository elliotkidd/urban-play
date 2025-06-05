import { ColorSchemeFragment } from "@/lib/sanity/queries/fragments";
import useStore from "@/store/header";
import { getColorSchemeStyle } from "@/utils/utils";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { useInView } from "react-intersection-observer";
import { LinkReferenceType } from "@/lib/sanity/queries/link";
import { usePathname } from "next/navigation";

function SectionWrapper({
  children,
  colorScheme,
  type,
  _key,
  removeMarginTop,
  removeMarginBottom,
  className,
  hideOn,
}: {
  children: React.ReactNode;
  colorScheme: ColorSchemeFragment;
  type: string;
  _key: string;
  removeMarginTop: boolean;
  removeMarginBottom: boolean;
  hideOn: LinkReferenceType[];
  className?: string;
}) {
  const { setColorScheme } = useStore();
  const path = usePathname();

  const hideOnPath =
    hideOn &&
    hideOn.length > 0 &&
    hideOn.some((item) => path.includes(item.slug));

  const { ref, inView } = useInView({
    rootMargin: "-10% 0px -90% 0px",
  });

  useEffect(() => {
    if (inView) {
      setColorScheme(colorScheme);
    }
  }, [inView, colorScheme, setColorScheme]);

  return (
    <section
      ref={ref}
      id={`${type}-${_key}`}
      style={getColorSchemeStyle(colorScheme)}
      className={twMerge(
        "relative bg-background text-text",
        !removeMarginTop && "mt-fluid",
        !removeMarginBottom && "mb-fluid",
        (type === "cta" || type === "pageHeader") &&
          "h-screen flex items-center",
        (type === "iconMarquee" ||
          type === "imageMarquee" ||
          type === "awardsAccordion" ||
          type === "process") &&
          "overflow-hidden",
        hideOnPath && "hidden",
        className,
      )}
    >
      {children}
    </section>
  );
}
export default SectionWrapper;

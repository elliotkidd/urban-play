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
  _type,
  _key,
  removeMarginTop,
  removeMarginBottom,
  paddingTopMobile,
  paddingBottomMobile,
  paddingTopDesktop,
  paddingBottomDesktop,
  className,
  hideOn,
  dataSanity,
  hideOnDesktop,
  hideOnMobile,
  containImage,
  roundBottom,
}: {
  children: React.ReactNode;
  colorScheme: ColorSchemeFragment;
  _type: string;
  _key: string;
  paddingTopMobile: string | undefined;
  paddingBottomMobile: string | undefined;
  paddingTopDesktop: string | undefined;
  paddingBottomDesktop: string | undefined;
  removeMarginTop: boolean;
  removeMarginBottom: boolean;
  hideOn: LinkReferenceType[];
  className?: string;
  dataSanity?: string;
  hideOnDesktop: boolean | undefined;
  hideOnMobile: boolean | undefined;
  containImage: boolean | undefined;
  roundBottom: boolean | undefined;
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

  let paddingTopMobileClass = "";
  let paddingBottomMobileClass = "";

  switch (paddingTopMobile) {
    case "xs":
      paddingTopMobileClass = "pt-fluid-xs";
      break;
    case "sm":
      paddingTopMobileClass = "pt-fluid-sm";
      break;
    case "md":
      paddingTopMobileClass = "pt-fluid-md";
      break;
    case "lg":
      paddingTopMobileClass = "pt-fluid-lg";
      break;
    case "xl":
      paddingTopMobileClass = "pt-fluid-xl";
      break;
  }

  switch (paddingBottomMobile) {
    case "xs":
      paddingBottomMobileClass = "pb-fluid-xs";
      break;
    case "sm":
      paddingBottomMobileClass = "pb-fluid-sm";
      break;
    case "md":
      paddingBottomMobileClass = "pb-fluid-md";
      break;
    case "lg":
      paddingBottomMobileClass = "pb-fluid-lg";
      break;
    case "xl":
      paddingBottomMobileClass = "pb-fluid-xl";
      break;
  }

  let paddingTopDesktopClass = "";
  let paddingBottomDesktopClass = "";

  switch (paddingTopDesktop) {
    case "xs":
      paddingTopDesktopClass = "lg:pt-fluid-xs";
      break;
    case "sm":
      paddingTopDesktopClass = "lg:pt-fluid-sm";
      break;
    case "md":
      paddingTopDesktopClass = "lg:pt-fluid-md";
      break;
    case "lg":
      paddingTopDesktopClass = "lg:pt-fluid-lg";
      break;
    case "xl":
      paddingTopDesktopClass = "lg:pt-fluid-xl";
      break;
  }

  switch (paddingBottomDesktop) {
    case "xs":
      paddingBottomDesktopClass = "lg:pb-fluid-xs";
      break;
    case "sm":
      paddingBottomDesktopClass = "lg:pb-fluid-sm";
      break;
    case "md":
      paddingBottomDesktopClass = "lg:pb-fluid-md";
      break;
    case "lg":
      paddingBottomDesktopClass = "lg:pb-fluid-lg";
      break;
    case "xl":
      paddingBottomDesktopClass = "lg:pb-fluid-xl";
      break;
  }

  return (
    <section
      ref={ref}
      id={`${_type}-${_key}`}
      style={getColorSchemeStyle(colorScheme)}
      data-sanity={dataSanity}
      className={twMerge(
        "relative bg-background text-text",
        paddingTopMobileClass,
        paddingBottomMobileClass,
        roundBottom && "rounded-b-xl lg:rounded-none",
        paddingTopDesktopClass,
        paddingBottomDesktopClass,
        !removeMarginTop && "mt-fluid-md",
        !removeMarginBottom && "mb-fluid-md",
        (_type === "cta" || _type === "pageHeader") &&
          "h-screen flex items-center",
        (_type === "iconMarquee" ||
          _type === "imageMarquee" ||
          _type === "awardsAccordion" ||
          _type === "process" ||
          _type === "featuredProjects" ||
          _type === "cta") &&
          "overflow-hidden",
        hideOnPath && "hidden",
        hideOnMobile && "hidden lg:block",
        hideOnDesktop && "lg:hidden",
        _type === "hero" && "h-auto lg:h-screen relative overflow-hidden",
        _type === "imageBanner" && !containImage && "lg:h-screen",
        className,
      )}
    >
      {children}
    </section>
  );
}
export default SectionWrapper;

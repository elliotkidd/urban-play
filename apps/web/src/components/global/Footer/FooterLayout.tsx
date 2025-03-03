"use client";

import { InferType } from "groqd";
import Link from "next/link";

import FlipText from "@/components/shared/FlipText";
import HubSpotForm from "@/components/shared/HubspotForm";
import RichText from "@/components/shared/RichText";
import NewsletterForm from "@/components/shared/forms/NewsletterForm";
import SanityLink from "@/components/shared/navigation/SanityLink";
import { useHeaderColorScheme } from "@/hooks/useHeaderColorScheme";
import { footerQuery } from "@/sanity/lib/queries/documents";

type FooterProps = InferType<typeof footerQuery>;

interface Props {
  data: FooterProps;
}

function FooterMenu({ navigationItems }) {
  return (
    <ul className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:gap-fluid">
      {navigationItems &&
        navigationItems.map((item, i) => {
          return (
            <li key={i}>
              <SanityLink
                link={item.navigationItemUrl}
                className="text-xl text-accent relative flex items-center"
              >
                <FlipText>{item.text}</FlipText>
              </SanityLink>
            </li>
          );
        })}
    </ul>
  );
}

export default function Footer({ data }: Props) {
  const { newsletter, footerMenu, legalMenu, colorScheme } = data ?? {};

  const ref = useHeaderColorScheme(colorScheme);

  // Convert RGB values to CSS color strings
  const getColorStyle = () => {
    if (
      !colorScheme?.primary?.rgb ||
      !colorScheme?.contrast?.rgb ||
      !colorScheme?.accent?.rgb ||
      !colorScheme?.complimentary?.rgb
    )
      return {};

    return {
      "--color-primary": `${colorScheme.primary.rgb.r}, ${colorScheme.primary.rgb.g}, ${colorScheme.primary.rgb.b}`,
      "--color-contrast": `${colorScheme.contrast.rgb.r}, ${colorScheme.contrast.rgb.g}, ${colorScheme.contrast.rgb.b}`,
      "--color-accent": `${colorScheme.accent.rgb.r}, ${colorScheme.accent.rgb.g}, ${colorScheme.accent.rgb.b}`,
      "--color-complimentary": `${colorScheme.complimentary.rgb.r}, ${colorScheme.complimentary.rgb.g}, ${colorScheme.complimentary.rgb.b}`,
    } as React.CSSProperties;
  };

  return (
    <footer
      ref={ref}
      style={getColorStyle()}
      className="relative overflow-hidden bg-primary pt-fluid-md"
    >
      <div className="wrapper grid grid-cols-1 md:grid-cols-3 gap-fluid-sm">
        <div className="col-span-1 md:col-span-2 text-balance">
          {newsletter && <RichText value={newsletter} />}
        </div>
        <div className="col-span-1 prose">
          <HubSpotForm
            portalId="47759019"
            formId="60b15ee4-0871-4dfe-b3a1-58eb88e1fe68"
          />
        </div>
      </div>
      <div className="wrapper py-fluid">
        <svg
          className="w-full text-accent"
          viewBox="0 0 1360 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 9C177.809 9 346.708 3.55907 524.5 3C667.292 2.55099 818.689 5.16866 961.37 3.69136C1046.53 2.80958 1131.28 1.44444 1216.57 1.44444C1264.4 1.44444 1312.17 1 1360 1"
            stroke="currentColor"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
      <div className="wrapper mb-12">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-fluid-xs">
          <div>{footerMenu && <FooterMenu {...footerMenu} />}</div>

          <div>
            {legalMenu && (
              <ul className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:gap-fluid-xs">
                {legalMenu.navigationItems?.map((item, i) => (
                  <li key={i}>
                    <SanityLink
                      link={item.navigationItemUrl}
                      className="text-sm text-accent relative flex items-center"
                    >
                      <FlipText>{item.text}</FlipText>
                    </SanityLink>
                  </li>
                ))}
                <li>
                  <Link
                    className="text-sm text-accent relative flex items-center"
                    href="http://madebyverse.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FlipText>Made By Verse</FlipText>
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="wrapper relative">
        <svg
          viewBox="0 0 1464 306"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="scale-110 translate-y-fluid-sm fill-current text-accent"
        >
          <path d="M0 153.42C0 61.8937 64.5821 0 157.841 0C251.099 0 312.157 60.9975 312.157 152.583C312.157 244.169 247.575 306.003 154.316 306.003C61.0573 306.003 0 244.946 0 153.42ZM217.584 157.423V148.162C217.584 95.1107 197.211 66.7926 156.108 66.7926C115.005 66.7926 94.6328 94.6328 94.6328 148.581V157.841C94.6328 210.892 115.005 239.211 156.108 239.211C197.211 239.211 217.584 211.37 217.584 157.423Z" />
          <path d="M329.422 203.425H403.682C409.417 232.161 426.683 247.634 465.157 247.634C488.158 247.634 501.84 237 501.84 220.212C501.84 203.425 473.521 197.689 439.468 189.684C392.152 178.631 335.575 160.947 335.575 100.368C335.575 39.7888 387.79 0 461.633 0C541.688 0 583.209 40.2667 587.63 101.264H514.684C509.845 72.5279 496.104 57.9506 461.155 57.9506C439.468 57.9506 425.787 69.0031 425.787 85.7908C425.787 105.685 457.152 110.106 492.998 118.052C539.418 128.686 592.47 144.996 592.47 206.053C592.47 267.111 544.257 305.525 465.994 305.525C380.203 305.525 335.097 258.627 329.362 203.365L329.422 203.425Z" />
          <path d="M604.837 153.42C604.837 59.6832 664.998 0 754.314 0C832.577 0 880.79 43.3136 891.424 116.738H813.579C807.366 86.687 787.949 69.0031 757.002 69.0031C717.214 69.0031 698.634 95.5289 698.634 148.581V157.423C698.634 210.474 716.736 237 755.21 237C788.367 237 808.262 221.109 813.579 181.738H893.156C887.421 268.843 830.785 306.003 752.522 306.003C663.206 306.003 604.837 246.738 604.837 153.42Z" />
          <path d="M990.836 6.21411H1090.31L1190.26 299.85H1095.21L1073.52 232.222H982.89L961.204 299.85H888.258L990.836 6.21411ZM1059.42 179.528L1033.43 95.8882H1027.7L998.842 179.528H1059.42Z" />
          <path d="M1205.31 6.21411H1332.21C1430.84 6.21411 1456.47 39.3714 1456.47 84.4773C1456.47 122.115 1434.13 146.072 1399.6 157.483V166.026C1437.71 178.991 1453.07 211.431 1460.48 264.901C1462.27 275.535 1463.58 293.219 1464 299.85H1372.47L1371.58 281.748C1366.74 229.593 1353 194.643 1313.63 194.225H1294.15V299.91H1205.25V6.21411H1205.31ZM1314.52 147.685C1350.79 147.267 1370.26 128.209 1370.26 100.787C1370.26 73.3651 1356.1 60.5204 1318.94 60.5204H1294.21V149.836L1314.52 147.626V147.685Z" />
        </svg>
      </div>
    </footer>
  );
}

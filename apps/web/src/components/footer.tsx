import Link from "next/link";

import { sanityFetch } from "@/lib/sanity/live";
import FooterLogo from "./FooterLogo";
import { footerQuery, FooterType } from "@/lib/sanity/queries/documents";
import SanityLink from "./sanity-link";
import { getColorSchemeStyle } from "@/utils/utils";
import { PageBuilder } from "./pagebuilder";

interface SocialLinksProps {
  data: any;
}

async function fetchFooterData() {
  const response = await sanityFetch({
    query: footerQuery.query,
  });
  return response;
}

export async function FooterServer() {
  const footerData = await fetchFooterData();

  const { data } = footerData ?? {};

  return <Footer data={data} />;
}

function SocialLinks({ data }: SocialLinksProps) {
  if (!data) return null;

  const { facebook, twitter, instagram, youtube, linkedin } = data;

  const socialLinks = [
    {
      url: instagram,
      label: "Instagram",
    },
    { url: facebook, label: "Facebook" },
    { url: twitter, label: "Twitter" },
    { url: linkedin, label: "LinkedIn" },
    {
      url: youtube,
      label: "YouTube",
    },
  ].filter((link) => link.url);

  return (
    <ul className="lg:col-start-6">
      {socialLinks.map(({ url, label }, index) => (
        <li
          key={`social-link-${url}-${index.toString()}`}
          className="hover:opacity-50 transition-opacity duration-500"
        >
          <Link
            href={url ?? "#"}
            target="_blank"
            prefetch={false}
            rel="noopener noreferrer"
            aria-label={label}
          >
            <span className="">{label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function FooterSection({ data }: { data: FooterType }) {
  const { columns, settings, colorScheme, subtitle } = data;
  const { contactDetails, socialLinks } = settings;

  return (
    <footer
      style={getColorSchemeStyle(colorScheme)}
      className="flex w-full py-fluid-xs bg-background text-text overflow-hidden"
    >
      <div className="wrapper flex-grow w-full flex flex-col justify-between h-full">
        <div className="grid lg:grid-cols-6 gap-fluid-sm lg:gap-fluid">
          {Array.isArray(columns) &&
            columns?.length > 0 &&
            columns.map(
              (column, index) =>
                column.links &&
                column?.links?.length > 0 && (
                  <ul key={`column-${column?._key}-${index}`} className="">
                    {column?.links?.map((link: any, index: number) => (
                      <li
                        key={`${link?._key}-${index}-column-${column?._key}`}
                        className="opacity-40 hover:opacity-100 transition-opacity duration-500"
                      >
                        <SanityLink className="" url={link.url}>
                          {link.name}
                        </SanityLink>
                      </li>
                    ))}
                  </ul>
                ),
            )}
          {socialLinks && <SocialLinks data={socialLinks} />}
        </div>
        <div className="mt-fluid-lg pt-8">
          <div className="grid lg:grid-cols-6 mb-fluid-sm gap-fluid-sm">
            <div className="lg:col-span-3 prose">
              <p className="lead max-w-p-lg text-balance">{subtitle}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:block lg:col-start-6 space-y-4 sm:space-y-0 lg:space-y-8">
              <p>
                {contactDetails?.address?.split(",").slice(0, 1)}
                <br />
                {contactDetails?.address?.split(",").slice(1).join(",")}
              </p>
              <p>{contactDetails?.phone}</p>
            </div>
          </div>
          <FooterLogo />
          <div className="mt-6">
            <ul className="flex justify-center gap-fluid lg:justify-start text-xs">
              <li className="opacity-40 hover:opacity-100 transition-opacity duration-500">
                <Link href="/terms">Terms and Conditions</Link>
              </li>
              <li className="opacity-40 hover:opacity-100 transition-opacity duration-500">
                <Link href="/privacy">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Footer({ data }: { data: FooterType }) {
  return (
    <>
      <PageBuilder
        pageBuilder={data.pageBuilder ?? []}
        id={data._id}
        type="footer"
      />
      <FooterSection data={data} />
    </>
  );
}

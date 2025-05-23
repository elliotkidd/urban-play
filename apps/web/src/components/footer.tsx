import { sanityFetch } from "@/lib/sanity/live";
import { footerQuery, type FooterType } from "@/lib/sanity/queries/documents";
import { PageBuilder } from "./pagebuilder";
import { FooterSection } from "./FooterClient";

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

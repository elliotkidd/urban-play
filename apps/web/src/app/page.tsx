import { PageBuilder } from "@/components/pagebuilder";
import { sanityFetch } from "@/lib/sanity/live";
import { getMetaData } from "@/lib/seo";
import { homePageQuery } from "@/lib/sanity/queries/documents";

async function fetchHomePageData() {
  return await sanityFetch({
    query: homePageQuery.query,
  });
}

export async function generateMetadata() {
  const homePageData = await fetchHomePageData();
  if (!homePageData.data) {
    return getMetaData({});
  }
  return getMetaData(homePageData.data);
}

export default async function Page() {
  const { data: homePageData } = await fetchHomePageData();

  if (!homePageData) {
    return <div>No home page data</div>;
  }

  const { _id, _type, pageBuilder } = homePageData ?? {};

  return (
    <>
      <h1 className="sr-only">Urban Play Homepage</h1>
      <PageBuilder pageBuilder={pageBuilder ?? []} id={_id} type={_type} />
    </>
  );
}

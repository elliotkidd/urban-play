import { BlogHeader } from "@/components/blog-card";
import { PageBuilder } from "@/components/pagebuilder";
import SanityImage from "@/components/sanity-image";
import { Button } from "@/components/ui/Button";
import { sanityFetch } from "@/lib/sanity/live";
import {
  BlogIndexPage,
  blogIndexPageQuery,
} from "@/lib/sanity/queries/documents";
import { getMetaData } from "@/lib/seo";
import { getColorSchemeStyle } from "@/utils/utils";
import Link from "next/link";

async function fetchBlogPosts(): Promise<{ data: BlogIndexPage }> {
  return await sanityFetch({
    query: blogIndexPageQuery.query,
  });
}

export async function generateMetadata() {
  const { data } = await fetchBlogPosts();
  if (!data) {
    return getMetaData({});
  }
  return getMetaData(data);
}

async function BlogIndexLayout({ children }: { children: React.ReactNode }) {
  const { data } = await fetchBlogPosts();
  if (!data) return null;
  const {
    title,
    featuredBlog,
    solutions,
    colorScheme,
    pageBuilder,
    _id,
    _type,
  } = data ?? {};

  return (
    <main className="" style={getColorSchemeStyle(colorScheme)}>
      {featuredBlog && (
        <section className="mb-fluid-lg">
          {featuredBlog.image && (
            <>
              <div className="relavitve h-screen w-full">
                <SanityImage
                  src={featuredBlog.image}
                  className="object-cover absolute inset-0 w-full h-full"
                />
              </div>
              <div className="wrapper py-fluid-xs prose flex flex-col lg:flex-row justify-between gap-4 items-start">
                <p className="max-w-p-lg lead">{featuredBlog.description}</p>
                <Link href={featuredBlog.slug}>
                  <Button as="span">Read Article</Button>
                </Link>
              </div>
            </>
          )}
        </section>
      )}
      <BlogHeader title={title} solutions={solutions} />
      {children}
      <PageBuilder pageBuilder={pageBuilder ?? []} id={_id} type={_type} />
    </main>
  );
}
export default BlogIndexLayout;

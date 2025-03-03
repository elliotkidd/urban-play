import { loadSitemap } from "@/sanity/loader/loadQuery";
import processUrl from "@/utils/processUrl";

// Add URL from environment variable
const URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export default async function sitemap() {
  const data = await loadSitemap();

  const staticRoutes = ["/", "/posts"].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily",
    priority: 1.0,
  }));

  const dynamicRoutes = data.data.map((route) => ({
    url: processUrl(route, { base: true }),
    lastModified: route.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}

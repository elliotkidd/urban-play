import { NextResponse } from "next/server";

import { loadPosts, loadPostsByCategory } from "@/sanity/loader/loadQuery";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categorySlug = searchParams.get("categorySlug");
  const page = parseInt(searchParams.get("page") || "1");

  try {
    const result = categorySlug
      ? await loadPostsByCategory(categorySlug, page)
      : await loadPosts(page);

    return NextResponse.json(result);
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Failed to load projects" },
      { status: 500 },
    );
  }
}

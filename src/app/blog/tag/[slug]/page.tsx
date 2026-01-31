import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft, Tag } from "lucide-react";
import { getPosts, getCategories, getTags, getTagBySlug } from "@/lib/blog";
import { PostCard, Sidebar, Newsletter } from "@/components/blog";

interface TagPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = await getTagBySlug(slug);

  if (!tag) {
    return {
      title: "Tag Not Found",
    };
  }

  return {
    title: `#${tag.name} Articles`,
    description: `Browse all articles tagged with #${tag.name} on Nalo Finance Blog`,
    openGraph: {
      title: `#${tag.name} Articles | Nalo Finance Blog`,
      description: `Browse all articles tagged with #${tag.name}`,
    },
    alternates: {
      canonical: `https://nalofinance.com/blog/tag/${slug}`,
    },
  };
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const page = parseInt(pageParam || "1");

  // Fetch data in parallel
  const [tag, categories, tags] = await Promise.all([
    getTagBySlug(slug),
    getCategories(),
    getTags(15),
  ]);

  if (!tag) {
    notFound();
  }

  // Fetch posts for this tag
  let postsData;
  try {
    postsData = await getPosts({ page, limit: 9, tagSlug: slug });
  } catch {
    notFound();
  }
  const { data: posts, pagination } = postsData;

  // Get popular posts for sidebar
  const popularPosts = posts.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-primary/5 border-b-4 border-primary py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary">
                  Blog
                </Link>
              </li>
              <li className="text-muted-foreground">/</li>
              <li className="font-bold">#{tag.name}</li>
            </ol>
          </nav>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary flex items-center justify-center shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
              <Tag className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                #{tag.name}
              </h1>
              <p className="mt-2 text-muted-foreground">
                {tag.postCount} {tag.postCount === 1 ? "article" : "articles"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Posts Grid */}
            <div className="lg:col-span-2">
              {posts.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed border-border">
                  <Tag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h2 className="text-xl font-black uppercase mb-2">No articles yet</h2>
                  <p className="text-muted-foreground mb-4">
                    No articles have been tagged with #{tag.name} yet.
                  </p>
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    View all articles
                  </Link>
                </div>
              ) : (
                <>
                  {/* Posts Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {posts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {pagination.totalPages > 1 && (
                    <div className="flex items-center justify-between mt-12 pt-8 border-t-2 border-border">
                      <div className="text-sm text-muted-foreground">
                        Page {pagination.page} of {pagination.totalPages}
                      </div>
                      <div className="flex gap-2">
                        {pagination.page > 1 && (
                          <Link
                            href={`/blog/tag/${slug}?page=${pagination.page - 1}`}
                            className="px-4 py-2 border-2 border-border font-bold text-sm hover:border-primary hover:bg-primary/5 transition-colors flex items-center gap-2"
                          >
                            <ArrowLeft className="h-4 w-4" />
                            Previous
                          </Link>
                        )}
                        {pagination.page < pagination.totalPages && (
                          <Link
                            href={`/blog/tag/${slug}?page=${pagination.page + 1}`}
                            className="px-4 py-2 border-2 border-primary bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors flex items-center gap-2"
                          >
                            Next
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Sidebar
                categories={categories}
                tags={tags}
                popularPosts={popularPosts}
                currentTag={slug}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter source="footer" />
    </div>
  );
}

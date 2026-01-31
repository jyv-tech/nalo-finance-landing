import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft, FolderOpen } from "lucide-react";
import { getPosts, getCategories, getTags, getCategoryBySlug } from "@/lib/blog";
import { PostCard, Sidebar, Newsletter } from "@/components/blog";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.name} Articles`,
    description: category.description || `Browse all articles in ${category.name} category on Nalo Finance Blog`,
    openGraph: {
      title: `${category.name} Articles | Nalo Finance Blog`,
      description: category.description || `Browse all articles in ${category.name} category`,
      images: category.image ? [{ url: category.image }] : undefined,
    },
    alternates: {
      canonical: `https://nalofinance.com/blog/category/${slug}`,
    },
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const page = parseInt(pageParam || "1");

  // Fetch data in parallel
  const [category, categories, tags] = await Promise.all([
    getCategoryBySlug(slug),
    getCategories(),
    getTags(15),
  ]);

  if (!category) {
    notFound();
  }

  // Fetch posts for this category
  let postsData;
  try {
    postsData = await getPosts({ page, limit: 9, categorySlug: slug });
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
              <li className="font-bold">{category.name}</li>
            </ol>
          </nav>

          <div className="flex items-start gap-6">
            {/* Category Image */}
            {category.image && (
              <div className="hidden md:block relative w-24 h-24 border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] overflow-hidden shrink-0">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex-1">
              <div
                className="inline-block px-3 py-1 text-xs font-black uppercase text-white mb-4"
                style={{ backgroundColor: category.color || "#FFC000" }}
              >
                Category
              </div>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
                {category.name}
              </h1>
              {category.description && (
                <p className="text-lg text-muted-foreground max-w-2xl">
                  {category.description}
                </p>
              )}
              {category._count && (
                <p className="mt-4 text-sm text-muted-foreground">
                  {category._count.posts} {category._count.posts === 1 ? "article" : "articles"}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Bar */}
      {categories.length > 0 && (
        <section className="border-b-2 border-border py-4 overflow-x-auto">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 min-w-max">
              <Link
                href="/blog"
                className="px-4 py-2 text-sm font-black uppercase hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                All Posts
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/blog/category/${cat.slug}`}
                  className={`px-4 py-2 text-sm font-black uppercase transition-colors whitespace-nowrap ${
                    cat.slug === slug
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-primary hover:text-primary-foreground"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Posts Grid */}
            <div className="lg:col-span-2">
              {posts.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed border-border">
                  <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h2 className="text-xl font-black uppercase mb-2">No articles yet</h2>
                  <p className="text-muted-foreground mb-4">
                    No articles have been published in this category yet.
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
                            href={`/blog/category/${slug}?page=${pagination.page - 1}`}
                            className="px-4 py-2 border-2 border-border font-bold text-sm hover:border-primary hover:bg-primary/5 transition-colors flex items-center gap-2"
                          >
                            <ArrowLeft className="h-4 w-4" />
                            Previous
                          </Link>
                        )}
                        {pagination.page < pagination.totalPages && (
                          <Link
                            href={`/blog/category/${slug}?page=${pagination.page + 1}`}
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
                currentCategory={slug}
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

import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Clock, Eye, Heart, ArrowLeft, Tag, User } from "lucide-react";
import {
  getPostBySlug,
  getRelatedPosts,
  getCategories,
  getTags,
  formatDate,
  formatReadTime,
  getAuthorName,
} from "@/lib/blog";
import { sanitizeHtml } from "@/lib/sanitize";
import { PostCardCompact, Newsletter, Sidebar, ShareButtons, FloatingShare, EditorContent, ArticleSchema, BreadcrumbSchema } from "@/components/blog";
import { ViewTracker } from "./view-tracker";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt || `Read ${post.title} on Nalo Finance Blog`,
    keywords: post.metaKeywords?.join(", "),
    authors: post.author ? [{ name: getAuthorName(post.author) }] : undefined,
    openGraph: {
      type: "article",
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt || undefined,
      images: post.ogImage || post.coverImage ? [{ url: post.ogImage || post.coverImage! }] : undefined,
      publishedTime: post.publishedAt || undefined,
      modifiedTime: post.updatedAt,
      authors: post.author ? [getAuthorName(post.author)] : undefined,
      tags: post.tags?.map((t) => t.tag.name),
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt || undefined,
      images: post.ogImage || post.coverImage ? [post.ogImage || post.coverImage!] : undefined,
    },
    alternates: {
      canonical: post.canonicalUrl || `https://nalofinance.com/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  // Fetch data in parallel
  const [post, categories, tags] = await Promise.all([
    getPostBySlug(slug),
    getCategories(),
    getTags(15),
  ]);

  if (!post) {
    notFound();
  }

  // Fetch related posts
  const relatedPosts = await getRelatedPosts(slug, 4);

  const postUrl = `https://nalofinance.com/blog/${post.slug}`;

  // Build breadcrumb items for schema
  const breadcrumbItems = [
    { name: "Home", url: "https://nalofinance.com" },
    { name: "Blog", url: "https://nalofinance.com/blog" },
  ];
  if (post.category) {
    breadcrumbItems.push({
      name: post.category.name,
      url: `https://nalofinance.com/blog/category/${post.category.slug}`,
    });
  }
  breadcrumbItems.push({ name: post.title, url: postUrl });

  return (
    <article className="min-h-screen">
      {/* Structured Data */}
      <ArticleSchema post={post} url={postUrl} />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Hero */}
      <header className="bg-primary/5 border-b-4 border-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary">
                  Blog
                </Link>
              </li>
              <li className="text-muted-foreground">/</li>
              {post.category && (
                <>
                  <li>
                    <Link
                      href={`/blog/category/${post.category.slug}`}
                      className="text-muted-foreground hover:text-primary"
                    >
                      {post.category.name}
                    </Link>
                  </li>
                  <li className="text-muted-foreground">/</li>
                </>
              )}
              <li className="font-bold truncate max-w-[200px]">{post.title}</li>
            </ol>
          </nav>

          <div className="max-w-4xl">
            {/* Category */}
            {post.category && (
              <Link
                href={`/blog/category/${post.category.slug}`}
                className="inline-block px-3 py-1 text-xs font-black uppercase bg-primary text-primary-foreground mb-4 hover:bg-primary/90 transition-colors"
                style={post.category.color ? { backgroundColor: post.category.color } : undefined}
              >
                {post.category.name}
              </Link>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight mb-6">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground mb-6">
              {/* Author */}
              <div className="flex items-center gap-2">
                {post.author?.profilePicture ? (
                  <Image
                    src={post.author.profilePicture}
                    alt={getAuthorName(post.author)}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                )}
                <div>
                  <span className="font-bold text-foreground block">
                    {getAuthorName(post.author)}
                  </span>
                  <span className="text-xs">Author</span>
                </div>
              </div>

              <span className="hidden md:block text-border">|</span>

              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.publishedAt || post.createdAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formatReadTime(post.readTimeMinutes)}
                </span>
              </div>

              <span className="hidden md:block text-border">|</span>

              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {post.viewCount} views
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  {post.likeCount} likes
                </span>
              </div>
            </div>

            {/* Share */}
            <ShareButtons url={postUrl} title={post.title} postId={post.id} />
          </div>
        </div>
      </header>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="relative w-full aspect-video md:aspect-[21/9] bg-muted">
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt || post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Article Content */}
            <div className="lg:col-span-2">
              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-xl text-muted-foreground mb-8 pb-8 border-b-2 border-border font-medium leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {/* Main Content */}
              {post.contentJson ? (
                <EditorContent content={post.contentJson} />
              ) : (
                <div
                  className="prose prose-lg max-w-none
                    prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight
                    prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
                    prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                    prose-p:text-muted-foreground prose-p:leading-relaxed
                    prose-a:text-primary prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-foreground
                    prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic
                    prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                    prose-pre:bg-gray-900 prose-pre:text-gray-100
                    prose-img:rounded-lg prose-img:border-2 prose-img:border-border
                    prose-ul:list-disc prose-ol:list-decimal
                    prose-li:text-muted-foreground
                  "
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
                />
              )}

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t-2 border-border">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    {post.tags.map(({ tag }) => (
                      <Link
                        key={tag.id}
                        href={`/blog/tag/${tag.slug}`}
                        className="px-3 py-1 text-sm font-bold bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        #{tag.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Share Bottom */}
              <div className="mt-8 pt-8 border-t-2 border-border">
                <p className="font-bold mb-4">Enjoyed this article? Share it!</p>
                <ShareButtons url={postUrl} title={post.title} postId={post.id} />
              </div>

              {/* Author Box */}
              {post.author && (
                <div className="mt-12 p-6 border-2 border-border bg-muted/30">
                  <div className="flex items-start gap-4">
                    {post.author.profilePicture ? (
                      <Image
                        src={post.author.profilePicture}
                        alt={getAuthorName(post.author)}
                        width={80}
                        height={80}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <User className="h-10 w-10 text-primary" />
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-bold uppercase text-muted-foreground mb-1">
                        Written by
                      </p>
                      <h3 className="text-xl font-black uppercase">
                        {getAuthorName(post.author)}
                      </h3>
                      <p className="text-muted-foreground mt-2">
                        Member of the Nalo Finance team, passionate about helping Nigerians
                        achieve financial freedom.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-black uppercase mb-6">Related Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <div key={relatedPost.id} className="border-2 border-border p-4">
                        <PostCardCompact post={relatedPost} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Sidebar
                  categories={categories}
                  tags={tags}
                  currentCategory={post.category?.slug}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter source="post" />

      {/* View Tracker */}
      <ViewTracker postId={post.id} />

      {/* Floating Share (Mobile) */}
      <FloatingShare url={postUrl} title={post.title} postId={post.id} />
    </article>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts, getBlogPostBySlug } from "@/data/blog";
import { Calendar, Clock, ArrowLeft, Tag, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { RevealBlock } from "@/components/motion/reveal";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — DevPath Academy Blog`,
    description: post.excerpt,
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function renderContent(content: string) {
  const lines = content.split("\n");
  return lines.map((line, i) => {
    if (line.startsWith("## ")) {
      return (
        <h2 key={i} className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-3">
          {line.replace("## ", "")}
        </h2>
      );
    }
    if (line.startsWith("**") && line.endsWith("**")) {
      return (
        <p key={i} className="font-semibold text-slate-800 dark:text-slate-200 mt-4 mb-1">
          {line.replace(/\*\*/g, "")}
        </p>
      );
    }
    if (line.startsWith("- ")) {
      return (
        <li key={i} className="text-slate-600 dark:text-slate-400 ml-4 list-disc">
          <span dangerouslySetInnerHTML={{ __html: line.replace(/^- /, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
        </li>
      );
    }
    if (line.startsWith("|") || line.match(/^[|:\-]+$/)) {
      return null;
    }
    if (line.trim() === "") {
      return <br key={i} />;
    }
    return (
      <p
        key={i}
        className="text-slate-600 dark:text-slate-400 leading-relaxed"
        dangerouslySetInnerHTML={{
          __html: line.replace(/\*\*(.*?)\*\*/g, "<strong class='text-slate-800 dark:text-slate-200'>$1</strong>"),
        }}
      />
    );
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero banner */}
      <RevealBlock
        className={cn(
          "h-64 sm:h-80 w-full bg-linear-to-br flex items-end",
          post.gradientFrom,
          post.gradientTo
        )}
      >
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 pb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Blog
          </Link>
          <span className="inline-block rounded-full bg-white/20 border border-white/30 px-2.5 py-0.5 text-xs font-semibold text-white mb-3">
            {post.category}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">{post.title}</h1>
        </div>
      </RevealBlock>

      <RevealBlock delay={0.05} className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
        {/* Author + meta */}
        <div className="flex items-center gap-4 pb-8 border-b border-border">
          <div
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold",
              post.author.avatarColor
            )}
          >
            {post.author.initials}
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">{post.author.name}</p>
            <p className="text-xs text-slate-500">{post.author.role}</p>
          </div>
          <div className="ml-auto flex flex-col items-end gap-1 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Excerpt */}
        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed mt-6 mb-6 italic border-l-2 border-indigo-400 pl-4">
          {post.excerpt}
        </p>

        {/* Content */}
        <article className="prose-custom space-y-3">
          {renderContent(post.content)}
        </article>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-border">
          <span className="flex items-center gap-1 text-xs text-slate-400 mr-1">
            <Tag className="h-3.5 w-3.5" /> Tags:
          </span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-slate-50 dark:bg-slate-900 px-2.5 py-0.5 text-xs text-slate-600 dark:text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Author card */}
        <div className="mt-10 rounded-2xl border border-border bg-slate-50 dark:bg-slate-900 p-5">
          <div className="flex items-start gap-4">
            <div
              className={cn(
                "flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-base font-bold",
                post.author.avatarColor
              )}
            >
              {post.author.initials}
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white">{post.author.name}</p>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 mb-2">{post.author.role}</p>
              <p className="text-sm text-slate-500">
                An expert instructor at DevPath Academy. Teaching thousands of students to build
                real skills and land their dream jobs.
              </p>
            </div>
          </div>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="mt-14">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
              More Articles
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {related.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="group rounded-xl border border-border bg-white dark:bg-slate-900 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div
                    className={cn(
                      "h-2 w-full bg-linear-to-r",
                      rp.gradientFrom,
                      rp.gradientTo
                    )}
                  />
                  <div className="p-4">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">
                      {rp.category}
                    </span>
                    <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mt-1 text-sm line-clamp-2">
                      {rp.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {rp.readTime}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </RevealBlock>
    </div>
  );
}

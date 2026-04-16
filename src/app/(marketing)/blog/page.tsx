import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export const metadata = {
  title: "Blog — DevPath Academy",
  description: "Expert insights on web development, AI, data science, and cloud engineering.",
};

export default function BlogPage() {
  const featured = blogPosts.filter((p) => p.featured);
  const rest = blogPosts.filter((p) => !p.featured);

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen">
      {/* Hero */}
      <section className="border-b border-border bg-slate-50 dark:bg-slate-900 py-14 sm:py-20 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
            <BookOpen className="h-3.5 w-3.5" />
            The DevPath Blog
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Expert Insights & <span className="text-indigo-600 dark:text-indigo-400">Learning Guides</span>
          </h1>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            In-depth articles from our instructors — covering web development, AI, data science,
            cloud engineering, and career growth.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Featured posts */}
        {featured.length > 0 && (
          <section className="mb-16">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-full bg-indigo-500" />
              Featured Articles
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {featured.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-2xl border border-border bg-white dark:bg-slate-900 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div
                    className={cn(
                      "h-36 bg-linear-to-br flex items-end p-4",
                      post.gradientFrom,
                      post.gradientTo
                    )}
                  >
                    <span className="rounded-full bg-white/20 backdrop-blur-sm border border-white/30 px-2.5 py-0.5 text-xs font-semibold text-white">
                      {post.category}
                    </span>
                  </div>
                  <div className="flex flex-col flex-1 p-5">
                    <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2 flex-1 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={cn(
                            "flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold",
                            post.author.avatarColor
                          )}
                        >
                          {post.author.initials}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            {post.author.name}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400">
                            <span className="flex items-center gap-0.5">
                              <Calendar className="h-3 w-3" />
                              {formatDate(post.publishedAt)}
                            </span>
                            <span className="flex items-center gap-0.5">
                              <Clock className="h-3 w-3" />
                              {post.readTime}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-indigo-500 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All articles */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full bg-slate-400" />
            All Articles
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[...rest, ...featured].map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-border bg-white dark:bg-slate-900 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
              >
                <div
                  className={cn(
                    "h-2.5 w-full bg-linear-to-r",
                    post.gradientFrom,
                    post.gradientTo
                  )}
                />
                <div className="flex flex-col flex-1 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-[10px] font-semibold bg-linear-to-r text-white",
                        post.gradientFrom,
                        post.gradientTo
                      )}
                    >
                      {post.category}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 mb-2 flex-1">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold shrink-0",
                        post.author.avatarColor
                      )}
                    >
                      {post.author.initials}
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                        {post.author.name}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {formatDate(post.publishedAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

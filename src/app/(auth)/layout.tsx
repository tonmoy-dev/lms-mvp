import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Code2 } from "lucide-react";

export const metadata: Metadata = {
  title: {
    template: "%s | DevPath Academy",
    default: "DevPath Academy",
  },
};

const quotes = [
  {
    text: "Knowledge is power.",
    author: "Sir Isaac Newton",
    source: "Philosophiæ Naturalis Principia Mathematica",
  },
];

const quote = quotes[0];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-white dark:bg-slate-950">
      {/* Left panel — form */}
      <div className="flex flex-1 flex-col px-6 py-10 sm:px-10 lg:px-16 xl:px-24">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
            <Code2 className="h-4 w-4 text-white" />
          </div>
          <span className="text-base font-bold text-slate-900 dark:text-white">
            DevPath<span className="text-indigo-600 dark:text-indigo-400"> Academy</span>
          </span>
        </Link>

        {/* Form content */}
        <div className="flex flex-1 flex-col justify-center max-w-sm w-full mx-auto">
          {children}
        </div>
      </div>

      {/* Right panel — quote */}
      <div className="hidden lg:flex lg:w-[46%] xl:w-[44%] flex-col items-center justify-center bg-[#f3f4f6] dark:bg-slate-900 px-12">
        <div className="flex flex-col items-center gap-6 max-w-sm text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
            <BookOpen className="h-9 w-9 text-slate-700 dark:text-slate-300" strokeWidth={1.5} />
          </div>
          <blockquote className="space-y-3">
            <p className="text-lg font-semibold leading-relaxed text-slate-800 dark:text-slate-200">
              &ldquo;{quote.text}&rdquo;
            </p>
            <footer className="text-sm text-slate-500 dark:text-slate-400">
              — {quote.author}, {quote.source}
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, Command } from "lucide-react";
import { courses } from "@/data/courses";
import { cn } from "@/lib/utils";

const pages = [
  { title: "Home", href: "/" },
  { title: "Courses", href: "/courses" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

interface SearchResult {
  type: "course" | "page";
  title: string;
  subtitle?: string;
  href: string;
}

export function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const results: SearchResult[] = useMemo(() => {
    if (!query.trim()) {
      return pages.map((p) => ({ type: "page" as const, title: p.title, href: p.href }));
    }

    const q = query.toLowerCase();
    const courseResults: SearchResult[] = courses
      .filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.instructor.name.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      )
      .map((c) => ({
        type: "course" as const,
        title: c.title,
        subtitle: `${c.instructor.name} · ${c.category}`,
        href: `/courses/${c.slug}`,
      }));

    const pageResults: SearchResult[] = pages
      .filter((p) => p.title.toLowerCase().includes(q))
      .map((p) => ({ type: "page" as const, title: p.title, href: p.href }));

    return [...courseResults, ...pageResults];
  }, [query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  function navigate(href: string) {
    setOpen(false);
    router.push(href);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      e.preventDefault();
      navigate(results[selectedIndex].href);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div className="relative mx-auto mt-[15vh] w-full max-w-lg px-4">
        <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl">
          {/* Input */}
          <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-700 px-4 py-3">
            <Search className="h-4 w-4 shrink-0 text-slate-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search courses, pages..."
              className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white outline-none placeholder:text-slate-400"
            />
            <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-[10px] font-medium text-slate-500 dark:text-slate-400">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-72 overflow-y-auto p-2">
            {results.length === 0 ? (
              <div className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                No results found
              </div>
            ) : (
              results.map((result, i) => (
                <button
                  key={result.href}
                  onClick={() => navigate(result.href)}
                  onMouseEnter={() => setSelectedIndex(i)}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                    selectedIndex === i
                      ? "bg-emerald-50 dark:bg-emerald-950/50"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800"
                  )}
                >
                  <div className="min-w-0">
                    <p
                      className={cn(
                        "truncate text-sm font-medium",
                        selectedIndex === i
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-slate-900 dark:text-white"
                      )}
                    >
                      {result.title}
                    </p>
                    {result.subtitle && (
                      <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                        {result.subtitle}
                      </p>
                    )}
                  </div>
                  <ArrowRight
                    className={cn(
                      "h-3.5 w-3.5 shrink-0 transition-opacity",
                      selectedIndex === i
                        ? "opacity-100 text-emerald-500"
                        : "opacity-0"
                    )}
                  />
                </button>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-700 px-4 py-2">
            <div className="flex items-center gap-3 text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-1 py-0.5 font-mono">
                  &uarr;&darr;
                </kbd>
                navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-1 py-0.5 font-mono">
                  &crarr;
                </kbd>
                select
              </span>
            </div>
            <span className="flex items-center gap-1 text-[10px] text-slate-400">
              <Command className="h-3 w-3" />K to toggle
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SearchTrigger() {
  function openSearch() {
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true })
    );
  }

  return (
    <button
      onClick={openSearch}
      className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 text-xs text-slate-500 dark:text-slate-400 transition-colors hover:border-slate-300 hover:text-slate-700 dark:hover:border-slate-600 dark:hover:text-slate-300"
    >
      <Search className="h-3.5 w-3.5" />
      Search...
      <kbd className="ml-1 flex items-center gap-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-1 py-0.5 text-[10px] font-medium">
        <Command className="h-2.5 w-2.5" />K
      </kbd>
    </button>
  );
}

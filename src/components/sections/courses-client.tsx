"use client";

import { useMemo, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  BookOpen,
  Users,
  Globe,
  SlidersHorizontal,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { courseIconMap, courseTypeStyles } from "@/lib/course-utils";
import { Course, CourseType, CourseCategory } from "@/data/courses";

const courseTypes: CourseType[] = ["Live", "Bootcamp", "Hybrid", "Self-paced"];
const allCategories: (CourseCategory | "All")[] = [
  "All",
  "Web Development",
  "Data Science",
  "AI & Machine Learning",
  "Cloud & DevOps",
  "Cybersecurity",
];
const sortOptions = [
  { label: "Most Popular", value: "popular" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

interface CoursesClientProps {
  courses: Course[];
}

function CourseGridCard({ course }: { course: Course }) {
  const savings =
    course.originalPrice && course.originalPrice > course.price
      ? Math.round((1 - course.price / course.originalPrice) * 100)
      : null;

  return (
    <Link href={`/courses/${course.slug}`} className="block">
      <Card className="group flex h-full flex-col overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div
          className={cn(
            "relative flex h-44 shrink-0 items-center justify-center",
            `bg-gradient-to-br ${course.gradientFrom} ${course.gradientTo}`
          )}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/25 text-white backdrop-blur-sm">
            {courseIconMap[course.iconName] ?? <Globe className="h-8 w-8" />}
          </div>
          <span
            className={cn(
              "absolute left-3 top-3 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
              courseTypeStyles[course.type]
            )}
          >
            {course.type}
          </span>
          {savings && (
            <span className="absolute right-3 top-3 rounded-full bg-rose-500 px-2 py-0.5 text-xs font-bold text-white">
              -{savings}%
            </span>
          )}
        </div>

        <CardContent className="flex flex-1 flex-col p-4">
          <div className="mb-3 flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback
                className={cn(
                  "text-xs font-semibold",
                  course.instructor.avatarColor
                )}
              >
                {course.instructor.initials}
              </AvatarFallback>
            </Avatar>
            <span className="truncate text-xs text-slate-500 dark:text-slate-400">
              {course.instructor.name}
            </span>
          </div>

          <h3 className="mb-2 line-clamp-2 flex-1 text-sm font-semibold leading-snug text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {course.title}
          </h3>

          <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" />
              {course.lessonCount} lessons
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {course.studentCount.toLocaleString()}
            </span>
          </div>

          {course.nextBatch && (
            <p className="mb-3 text-xs text-indigo-600 dark:text-indigo-400 font-medium">
              Next batch: {new Date(course.nextBatch).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </p>
          )}

          <div className="mt-auto flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-slate-900 dark:text-white">
                ${course.price}
              </span>
              {course.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  ${course.originalPrice}
                </span>
              )}
            </div>
            <span
              className={cn(
                buttonVariants({ size: "sm" }),
                "shrink-0 bg-slate-900 text-white hover:bg-slate-700 dark:bg-indigo-600 dark:hover:bg-indigo-700"
              )}
            >
              View Course
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export function CoursesClient({ courses }: CoursesClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("q") ?? "";
  const activeCategory = (searchParams.get("category") as CourseCategory | "All") || "All";
  const sortBy = searchParams.get("sort") ?? "popular";
  const activeTypesParam = searchParams.get("types");
  const activeTypes = useMemo(
    () => new Set(activeTypesParam ? activeTypesParam.split(",") as CourseType[] : []),
    [activeTypesParam]
  );

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === "" || value === "All" || value === "popular") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }
      const qs = params.toString();
      router.replace(`/courses${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [router, searchParams]
  );

  function setSearch(value: string) {
    updateParams({ q: value || null });
  }

  function setActiveCategory(cat: CourseCategory | "All") {
    updateParams({ category: cat === "All" ? null : cat });
  }

  function setSortBy(value: string) {
    updateParams({ sort: value === "popular" ? null : value });
  }

  function toggleType(type: CourseType) {
    const next = new Set(activeTypes);
    if (next.has(type)) next.delete(type);
    else next.add(type);
    updateParams({ types: next.size > 0 ? Array.from(next).join(",") : null });
  }

  function clearAll() {
    router.replace("/courses", { scroll: false });
  }

  const filtered = useMemo(() => {
    let result = [...courses];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.subtitle.toLowerCase().includes(q) ||
          c.instructor.name.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      );
    }

    if (activeCategory !== "All") {
      result = result.filter((c) => c.category === activeCategory);
    }

    if (activeTypes.size > 0) {
      result = result.filter((c) => activeTypes.has(c.type));
    }

    switch (sortBy) {
      case "popular":
        result.sort((a, b) => b.studentCount - a.studentCount);
        break;
      case "newest":
        result.sort((a, b) => a.slug.localeCompare(b.slug));
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
    }

    return result;
  }, [courses, search, activeCategory, activeTypes, sortBy]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Search + Sort bar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search courses, instructors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-white dark:bg-slate-800"
          />
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 shrink-0 text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Type filter pills */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {courseTypes.map((type) => (
          <button
            key={type}
            onClick={() => toggleType(type)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
              activeTypes.has(type)
                ? "border-indigo-600 bg-indigo-600 text-white"
                : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:border-indigo-300 hover:text-indigo-600"
            )}
          >
            {type}
          </button>
        ))}

        <div className="mx-1 h-4 w-px bg-slate-300 dark:bg-slate-600" />

        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
              activeCategory === cat
                ? "border-slate-900 bg-slate-900 text-white dark:border-indigo-500 dark:bg-indigo-600"
                : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-400 hover:text-slate-900"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
        Showing{" "}
        <span className="font-semibold text-slate-800 dark:text-white">
          {filtered.length}
        </span>{" "}
        course{filtered.length !== 1 ? "s" : ""}
        {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
      </p>

      {/* Course grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((course) => (
            <CourseGridCard key={course.slug} course={course} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Search className="mb-4 h-10 w-10 text-slate-300 dark:text-slate-600" />
          <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300">
            No courses found
          </h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Try adjusting your filters or search term.
          </p>
          <button
            onClick={clearAll}
            className={cn(buttonVariants({ variant: "outline" }), "mt-4")}
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}

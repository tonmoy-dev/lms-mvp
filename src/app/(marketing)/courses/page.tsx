import { Suspense } from "react";
import { CoursesClient } from "@/components/sections/courses-client";
import { courses, categories } from "@/data/courses";

export const metadata = {
  title: "Explore Courses — DevPath Academy",
  description:
    "Browse 120+ industry-vetted courses in web development, AI, data science, and more.",
};

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Explore Courses
          </h1>
          <p className="mt-3 text-base text-slate-500 dark:text-slate-400">
            Learn from industry experts at your own pace
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map(({ label, count }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-1.5 text-sm text-slate-600 dark:text-slate-400 shadow-sm"
              >
                <span className="font-medium text-slate-800 dark:text-slate-200">{label}</span>
                <span className="rounded-full bg-indigo-100 dark:bg-indigo-900/50 px-1.5 py-0.5 text-xs font-semibold text-indigo-700 dark:text-indigo-400">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Suspense>
        <CoursesClient courses={courses} />
      </Suspense>
    </div>
  );
}

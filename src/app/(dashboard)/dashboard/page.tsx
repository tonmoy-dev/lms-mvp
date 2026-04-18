"use client";

import Link from "next/link";
import {
  BookOpen,
  Trophy,
  Clock,
  Award,
  Play,
  ChevronRight,
  Flame,
  TrendingUp,
  Star,
} from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import { mockUser } from "@/data/user";
import { courses } from "@/data/courses";
import { courseIconComponents } from "@/lib/course-utils";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const { user } = useAuth();
  const displayName = user?.name ?? "there";
  const firstName = displayName.split(" ")[0];

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const inProgress = mockUser.enrolledCourses.filter((c) => c.progress < 100);
  const completed = mockUser.enrolledCourses.filter((c) => c.progress === 100);

  const recommended = courses
    .filter(
      (c) => !mockUser.enrolledCourses.some((e) => e.slug === c.slug)
    )
    .slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">{greeting}</p>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
          {firstName}, keep up the momentum! 🚀
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          You&apos;ve been on a roll. Here&apos;s your learning overview.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          {
            label: "Enrolled",
            value: mockUser.enrolledCourses.length,
            icon: BookOpen,
            color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30",
          },
          {
            label: "Completed",
            value: mockUser.completedCourses,
            icon: Trophy,
            color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30",
          },
          {
            label: "Hours Learned",
            value: mockUser.totalLearningHours,
            icon: Clock,
            color: "text-amber-600 bg-amber-50 dark:bg-amber-900/30",
          },
          {
            label: "Certificates",
            value: mockUser.certificatesEarned,
            icon: Award,
            color: "text-teal-600 bg-teal-50 dark:bg-teal-900/30",
          },
        ].map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-xl border border-border bg-white dark:bg-slate-900 p-4 flex flex-col gap-2"
          >
            <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", color)}>
              <Icon className="h-4.5 w-4.5" />
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
          </div>
        ))}
      </div>

      {/* Streak banner */}
      <div className="rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 p-4 sm:p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
            <Flame className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-white">7-day learning streak!</p>
            <p className="text-xs text-emerald-100">
              You&apos;ve been learning every day this week. Keep it up!
            </p>
          </div>
        </div>
        <div className="flex gap-1 shrink-0">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-6 w-6 rounded-md flex items-center justify-center",
                i < 7 ? "bg-white/30" : "bg-white/10"
              )}
            >
              <div className="h-2.5 w-2.5 rounded-sm bg-white" />
            </div>
          ))}
        </div>
      </div>

      {/* Continue Learning */}
      {inProgress.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              Continue Learning
            </h2>
            <Link
              href="/courses"
              className="text-xs text-emerald-600 hover:underline dark:text-emerald-400 flex items-center gap-1"
            >
              Browse all <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {inProgress.map((course) => {
              const IconComp = courseIconComponents[course.iconName as keyof typeof courseIconComponents];
              return (
                <div
                  key={course.slug}
                  className="group rounded-xl border border-border bg-white dark:bg-slate-900 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div
                    className={cn(
                      "h-2 w-full bg-linear-to-r",
                      course.gradientFrom,
                      course.gradientTo
                    )}
                  />
                  <div className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-linear-to-br text-white",
                          course.gradientFrom,
                          course.gradientTo
                        )}
                      >
                        {IconComp && <IconComp className="h-5 w-5" />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-2 leading-tight">
                          {course.title}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">{course.instructor}</p>
                      </div>
                    </div>

                    <div className="space-y-1.5 mb-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500 dark:text-slate-400">Progress</span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          {course.progress}%
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full bg-linear-to-r",
                            course.gradientFrom,
                            course.gradientTo
                          )}
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>

                    <Link
                      href={`/learn/${course.slug}/l1`}
                      className={cn(
                        "flex items-center justify-center gap-2 w-full rounded-lg py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90 bg-linear-to-r",
                        course.gradientFrom,
                        course.gradientTo
                      )}
                    >
                      <Play className="h-3.5 w-3.5 fill-white" />
                      Continue
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Completed courses */}
      {completed.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
            <Trophy className="h-5 w-5 text-amber-500" />
            Completed Courses
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {completed.map((course) => {
              const IconComp = courseIconComponents[course.iconName as keyof typeof courseIconComponents];
              return (
                <div
                  key={course.slug}
                  className="rounded-xl border border-border bg-white dark:bg-slate-900 overflow-hidden"
                >
                  <div
                    className={cn(
                      "h-2 w-full bg-linear-to-r",
                      course.gradientFrom,
                      course.gradientTo
                    )}
                  />
                  <div className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-linear-to-br text-white",
                          course.gradientFrom,
                          course.gradientTo
                        )}
                      >
                        {IconComp && <IconComp className="h-5 w-5" />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-2 leading-tight">
                          {course.title}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">{course.instructor}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full">
                        <Trophy className="h-3 w-3" />
                        Completed
                      </span>
                      <Link
                        href={`/courses/${course.slug}`}
                        className="text-xs text-emerald-600 hover:underline dark:text-emerald-400"
                      >
                        View certificate
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Recommended */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Star className="h-5 w-5 text-amber-500" />
            Recommended for You
          </h2>
          <Link
            href="/courses"
            className="text-xs text-emerald-600 hover:underline dark:text-emerald-400 flex items-center gap-1"
          >
            See all <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.map((course) => {
            const IconComp = courseIconComponents[course.iconName as keyof typeof courseIconComponents];
            return (
              <Link
                key={course.slug}
                href={`/courses/${course.slug}`}
                className="group rounded-xl border border-border bg-white dark:bg-slate-900 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div
                  className={cn(
                    "h-24 w-full bg-linear-to-br flex items-center justify-center",
                    course.gradientFrom,
                    course.gradientTo
                  )}
                >
                  {IconComp && <IconComp className="h-8 w-8 text-white/80" />}
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-2 mb-1">
                    {course.title}
                  </p>
                  <p className="text-xs text-slate-500 mb-2">{course.instructor.name}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      ${course.price}
                    </span>
                    <span className="text-xs text-amber-600 font-semibold flex items-center gap-0.5">
                      <Star className="h-3 w-3 fill-amber-500 stroke-amber-500" />
                      {course.rating}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

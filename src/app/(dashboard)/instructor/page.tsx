"use client";

import Link from "next/link";
import {
  Users,
  DollarSign,
  Star,
  BookOpen,
  TrendingUp,
  Eye,
  BarChart2,
  Plus,
  ChevronRight,
  Award,
  MessageSquare,
} from "lucide-react";
import { courses } from "@/data/courses";
import { courseIconComponents } from "@/lib/course-utils";
import { useAuth } from "@/components/providers/auth-provider";
import { cn } from "@/lib/utils";

const mockStats = {
  totalStudents: 9450,
  totalRevenue: 142800,
  avgRating: 4.87,
  totalCourses: courses.length,
  monthlyStudents: 423,
  monthlyRevenue: 12400,
};

const mockActivity = [
  { name: "Marcus Reid", action: "enrolled in Full-Stack Web Development", time: "2 min ago" },
  { name: "Sofia Patel", action: "completed React & Next.js Mastery", time: "15 min ago" },
  { name: "Huang Wei", action: "left a 5★ review on ML & AI Fundamentals", time: "1 hr ago" },
  { name: "Amir Hassan", action: "enrolled in Data Science with Python", time: "2 hr ago" },
  { name: "Priya Sharma", action: "asked a question in AWS Cloud & DevOps", time: "3 hr ago" },
];

const instructorCourses = courses.map((c) => ({
  ...c,
  students: c.studentCount,
  revenue: c.price * Math.floor(c.studentCount * 0.7),
  completionRate: Math.floor(Math.random() * 30 + 65),
}));

export default function InstructorPage() {
  const { user } = useAuth();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Instructor Panel</p>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
            Welcome back, {user?.name?.split(" ")[0] ?? "Instructor"} 👋
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Here&apos;s an overview of your courses and students.
          </p>
        </div>
        <button className="hidden sm:flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors">
          <Plus className="h-4 w-4" />
          New Course
        </button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {[
          {
            label: "Total Students",
            value: mockStats.totalStudents.toLocaleString(),
            sub: `+${mockStats.monthlyStudents} this month`,
            icon: Users,
            color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30",
          },
          {
            label: "Total Revenue",
            value: `$${(mockStats.totalRevenue / 1000).toFixed(0)}k`,
            sub: `+$${(mockStats.monthlyRevenue / 1000).toFixed(1)}k this month`,
            icon: DollarSign,
            color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30",
          },
          {
            label: "Avg. Rating",
            value: mockStats.avgRating.toFixed(2),
            sub: "Across all courses",
            icon: Star,
            color: "text-amber-600 bg-amber-50 dark:bg-amber-900/30",
          },
          {
            label: "Courses",
            value: mockStats.totalCourses,
            sub: "Active & published",
            icon: BookOpen,
            color: "text-teal-600 bg-teal-50 dark:bg-teal-900/30",
          },
          {
            label: "Completions",
            value: "1,284",
            sub: "Certificates issued",
            icon: Award,
            color: "text-sky-600 bg-sky-50 dark:bg-sky-900/30",
          },
          {
            label: "Reviews",
            value: "847",
            sub: "Total reviews",
            icon: MessageSquare,
            color: "text-rose-600 bg-rose-50 dark:bg-rose-900/30",
          },
        ].map(({ label, value, sub, icon: Icon, color }) => (
          <div
            key={label}
            className="col-span-1 rounded-xl border border-border bg-white dark:bg-slate-900 p-4"
          >
            <div className={cn("mb-3 w-9 h-9 rounded-lg flex items-center justify-center", color)}>
              <Icon className="h-4.5 w-4.5" />
            </div>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{value}</p>
            <p className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-0.5">{label}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Course table */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-white dark:bg-slate-900 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart2 className="h-4.5 w-4.5 text-emerald-500" />
              Your Courses
            </h2>
            <Link
              href="/courses"
              className="text-xs text-emerald-600 hover:underline dark:text-emerald-400 flex items-center gap-0.5"
            >
              View public listing <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {instructorCourses.map((course) => {
              const IconComp = courseIconComponents[course.iconName as keyof typeof courseIconComponents];
              return (
                <div
                  key={course.slug}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-linear-to-br text-white",
                      course.gradientFrom,
                      course.gradientTo
                    )}
                  >
                    {IconComp && <IconComp className="h-5 w-5" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                      {course.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {course.type} · {course.level}
                    </p>
                  </div>
                  <div className="hidden sm:grid grid-cols-3 gap-6 text-center shrink-0">
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {course.students.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-slate-400">Students</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        ${(course.revenue / 1000).toFixed(0)}k
                      </p>
                      <p className="text-[10px] text-slate-400">Revenue</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-amber-600">
                        ★ {course.rating}
                      </p>
                      <p className="text-[10px] text-slate-400">Rating</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Link
                      href={`/courses/${course.slug}`}
                      className="rounded-md p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                      title="Preview"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/courses/${course.slug}`}
                      className="rounded-md p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                      title="Analytics"
                    >
                      <TrendingUp className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent activity */}
        <div className="rounded-xl border border-border bg-white dark:bg-slate-900 overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="h-4.5 w-4.5 text-emerald-500" />
              Recent Activity
            </h2>
          </div>
          <div className="divide-y divide-border">
            {mockActivity.map((item, i) => (
              <div key={i} className="px-5 py-3.5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 h-7 w-7 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-xs font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                    {item.name[0]}
                  </div>
                  <div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-snug">
                      <span className="font-semibold">{item.name}</span> {item.action}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{item.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-border">
            <button className="text-xs text-emerald-600 hover:underline dark:text-emerald-400">
              View all activity →
            </button>
          </div>
        </div>
      </div>

      {/* Revenue chart placeholder */}
      <div className="rounded-xl border border-border bg-white dark:bg-slate-900 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <DollarSign className="h-4.5 w-4.5 text-emerald-500" />
            Revenue Overview
          </h2>
          <div className="flex items-center gap-2">
            {["7d", "30d", "90d", "1y"].map((p) => (
              <button
                key={p}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                  p === "30d"
                    ? "bg-emerald-600 text-white"
                    : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        {/* Simulated bar chart */}
        <div className="flex items-end gap-1.5 h-32">
          {[45, 72, 58, 90, 65, 88, 70, 95, 75, 82, 68, 100, 78, 88, 62, 74, 85, 92, 55, 80, 66, 91, 73, 87, 69, 94, 77, 83, 60, 98].map(
            (h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-emerald-100 dark:bg-emerald-900/30 relative overflow-hidden group"
              >
                <div
                  className="absolute bottom-0 w-full rounded-sm bg-linear-to-t from-emerald-600 to-emerald-500 group-hover:from-emerald-700 group-hover:to-emerald-600 transition-colors"
                  style={{ height: `${h}%` }}
                />
              </div>
            )
          )}
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-slate-400">
          <span>Apr 1</span>
          <span>Apr 8</span>
          <span>Apr 15</span>
          <span>Apr 22</span>
          <span>Apr 30</span>
        </div>
      </div>
    </div>
  );
}

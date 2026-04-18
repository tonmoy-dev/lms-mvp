import Link from "next/link";
import { Users, BookOpen } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { courseTypeStyles } from "@/lib/course-utils";

import type { CourseType } from "@/data/courses";

export interface CourseCardProps {
  title: string;
  instructor: string;
  instructorInitials: string;
  type: CourseType;
  lessonCount: number;
  studentCount?: number;
  price: string;
  slug: string;
  gradientFrom: string;
  gradientTo: string;
  icon: React.ReactNode;
}

export function CourseCard({
  title,
  instructor,
  instructorInitials,
  type,
  lessonCount,
  studentCount,
  price,
  slug,
  gradientFrom,
  gradientTo,
  icon,
}: CourseCardProps) {
  return (
    <Link href={`/courses/${slug}`} className="block h-full">
      <Card className="group h-full overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        {/* Thumbnail */}
        <div
          className={cn(
            "relative flex h-44 items-center justify-center",
            `bg-gradient-to-br ${gradientFrom} ${gradientTo}`
          )}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/25 text-white backdrop-blur-sm">
            {icon}
          </div>
          {/* Type badge */}
          <span
            className={cn(
              "absolute left-3 top-3 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
              courseTypeStyles[type]
            )}
          >
            {type}
          </span>
        </div>

        <CardContent className="p-4">
          {/* Instructor */}
          <div className="mb-3 flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs font-semibold">
                {instructorInitials}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {instructor}
            </span>
          </div>

          {/* Title */}
          <h3 className="mb-3 line-clamp-2 text-sm font-semibold leading-snug text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {title}
          </h3>

          {/* Meta */}
          <div className="mb-4 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" />
              {lessonCount} lessons
            </span>
            {studentCount !== undefined && (
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                {studentCount.toLocaleString()} students
              </span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-slate-900 dark:text-white">
              {price}
            </span>
            <span className="rounded-md border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-600 transition-colors group-hover:bg-emerald-50 dark:border-emerald-500/30 dark:text-emerald-400 dark:group-hover:bg-emerald-950/40">
              View Course
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

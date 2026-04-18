"use client";

import Link from "next/link";
import {
  BookOpen,
  Award,
  Clock,
  MapPin,
  CalendarDays,
  Mail,
  ArrowRight,
  CheckCircle,
  Globe,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { courseIconMap } from "@/lib/course-utils";
import type { UserProfile, EnrolledCourse } from "@/data/user";
import { useAuth } from "@/components/providers/auth-provider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function StatCard({
  icon: Icon,
  label,
  value,
  iconBg,
  iconColor,
}: {
  icon: typeof BookOpen;
  label: string;
  value: string | number;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <Card className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
      <CardContent className="flex items-center gap-4 p-4">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
            iconBg
          )}
        >
          <Icon className={cn("h-5 w-5", iconColor)} />
        </div>
        <div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function EnrolledCourseCard({ course }: { course: EnrolledCourse }) {
  const isComplete = course.progress === 100;
  const lastDate = new Date(course.lastAccessed).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card className="group overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-col sm:flex-row">
        <div
          className={cn(
            "flex h-32 w-full shrink-0 items-center justify-center sm:h-auto sm:w-36",
            `bg-linear-to-br ${course.gradientFrom} ${course.gradientTo}`
          )}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/25 text-white backdrop-blur-sm">
            {courseIconMap[course.iconName] ?? <Globe className="h-8 w-8" />}
          </div>
        </div>

        <CardContent className="flex flex-1 flex-col justify-between gap-3 p-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
              {course.title}
            </h3>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              by {course.instructor}
            </p>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">
                {isComplete ? (
                  <span className="flex items-center gap-1 font-medium text-emerald-600">
                    <CheckCircle className="h-3.5 w-3.5" />
                    Completed
                  </span>
                ) : (
                  `${course.progress}% complete`
                )}
              </span>
              <span className="text-slate-400 dark:text-slate-500">Last: {lastDate}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  isComplete ? "bg-emerald-500" : "bg-emerald-500"
                )}
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>

          <Link
            href={`/courses/${course.slug}`}
            className={cn(
              buttonVariants({ size: "sm" }),
              "w-fit gap-1.5",
              isComplete
                ? "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
            )}
          >
            {isComplete ? "Review Course" : "Continue Learning"}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </CardContent>
      </div>
    </Card>
  );
}

export function ProfileClient({ user: mockData }: { user: UserProfile }) {
  const { user: authUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authUser) {
      router.push("/signin");
    }
  }, [authUser, router]);

  if (!authUser) return null;

  // Merge mock data with authenticated user data
  const user = { ...mockData, ...authUser };

  const joinDate = new Date(user.joinedDate || new Date()).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const inProgress = user.enrolledCourses.filter((c) => c.progress < 100);
  const completed = user.enrolledCourses.filter((c) => c.progress === 100);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Profile header */}
      <Card className="overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
        <div className="h-32 bg-linear-to-r from-emerald-500 via-teal-500 to-purple-500" />
        <CardContent className="relative px-6 pb-6">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
            <Avatar className="-mt-12 h-24 w-24 border-4 border-white dark:border-slate-900 shadow-lg">
              <AvatarFallback
                className={cn(
                  "text-2xl font-bold",
                  user.avatarColor
                )}
              >
                {user.initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">{user.name}</h1>
              <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {user.bio}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5" />
                  {user.email}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {user.location}
                </span>
                <span className="flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5" />
                  Joined {joinDate}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats row */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          icon={BookOpen}
          label="Enrolled Courses"
          value={user.enrolledCourses.length}
          iconBg="bg-emerald-100"
          iconColor="text-emerald-600"
        />
        <StatCard
          icon={Award}
          label="Certificates Earned"
          value={user.certificatesEarned}
          iconBg="bg-emerald-100"
          iconColor="text-emerald-600"
        />
        <StatCard
          icon={Clock}
          label="Learning Hours"
          value={user.totalLearningHours}
          iconBg="bg-teal-100"
          iconColor="text-teal-600"
        />
      </div>

      {/* In-progress courses */}
      {inProgress.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
            Continue Learning
          </h2>
          <div className="space-y-4">
            {inProgress.map((course) => (
              <EnrolledCourseCard key={course.slug} course={course} />
            ))}
          </div>
        </section>
      )}

      {/* Completed courses */}
      {completed.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
            Completed Courses
          </h2>
          <div className="space-y-4">
            {completed.map((course) => (
              <EnrolledCourseCard key={course.slug} course={course} />
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {user.enrolledCourses.length === 0 && (
        <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-16 text-center">
          <BookOpen className="mb-4 h-10 w-10 text-slate-300 dark:text-slate-600" />
          <h3 className="text-base font-semibold text-slate-700 dark:text-slate-200">
            No courses yet
          </h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Start your learning journey by enrolling in a course.
          </p>
          <Link
            href="/courses"
            className={cn(
              buttonVariants(),
              "mt-4 bg-emerald-600 text-white hover:bg-emerald-700"
            )}
          >
            Browse Courses
          </Link>
        </div>
      )}
    </div>
  );
}

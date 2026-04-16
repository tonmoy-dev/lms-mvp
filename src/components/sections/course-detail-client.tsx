"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Users,
  BookOpen,
  Globe,
  CheckCircle,
  Lock,
  Play,
  Star,
  CalendarDays,
  Award,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  MessageSquare,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { courseIconMapLg, courseTypeStyles, courseLevelStyles } from "@/lib/course-utils";
import type { Course, CourseType, CurriculumSection, Batch } from "@/data/courses";
import { RevealBlock } from "@/components/motion/reveal";
import { getReviewsForCourse, getRatingDistribution, type CourseReview } from "@/data/reviews";

/* ─────────────── Tab types ─────────────── */
type Tab = "overview" | "curriculum" | "batches" | "instructor" | "reviews" | "faq";

const TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "curriculum", label: "Curriculum" },
  { id: "batches", label: "Batches" },
  { id: "instructor", label: "Instructor" },
  { id: "reviews", label: "Reviews" },
  { id: "faq", label: "FAQ" },
];

/* ─────────────── Curriculum accordion ─────────────── */
function CurriculumAccordion({ section, index }: { section: CurriculumSection; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const totalDuration = section.lessons
    .map((l) => parseInt(l.duration))
    .reduce((a, b) => a + b, 0);

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
      >
        <div>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{section.title}</h4>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            {section.lessons.length} lessons · {totalDuration} min
          </p>
        </div>
        {open ? (
          <ChevronUp className="h-4 w-4 shrink-0 text-slate-400" />
        ) : (
          <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
        )}
      </button>

      {open && (
        <ul className="divide-y divide-slate-100 dark:divide-slate-700 border-t border-slate-200 dark:border-slate-700">
          {section.lessons.map((lesson) => (
            <li
              key={lesson.id}
              className="flex items-center justify-between gap-3 px-5 py-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                {lesson.preview ? (
                  <Play className="h-4 w-4 shrink-0 text-indigo-500" />
                ) : (
                  <Lock className="h-4 w-4 shrink-0 text-slate-300" />
                )}
                <span className="truncate text-sm text-slate-700 dark:text-slate-300">{lesson.title}</span>
                {lesson.preview && (
                  <span className="shrink-0 rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-600">
                    Preview
                  </span>
                )}
              </div>
              <span className="shrink-0 text-xs text-slate-400">{lesson.duration}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ─────────────── Reviews panel ─────────────── */
function ReviewsPanel({ reviews }: { reviews: CourseReview[] }) {
  const dist = getRatingDistribution(reviews);
  const avg = reviews.length > 0
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  function StarRow({ count, filled }: { count: number; filled: boolean }) {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            className={cn(
              "h-3 w-3",
              n <= count
                ? filled
                  ? "fill-amber-400 stroke-amber-400"
                  : "fill-slate-200 stroke-slate-200 dark:fill-slate-700 dark:stroke-slate-700"
                : "fill-slate-200 stroke-slate-200 dark:fill-slate-700 dark:stroke-slate-700"
            )}
          />
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <MessageSquare className="h-10 w-10 text-slate-300 dark:text-slate-600 mb-3" />
        <p className="text-slate-600 dark:text-slate-400 font-medium">No reviews yet</p>
        <p className="text-sm text-slate-400 mt-1">Be the first to share your experience!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Summary */}
      <div className="flex flex-col sm:flex-row gap-8 rounded-2xl border border-border bg-slate-50 dark:bg-slate-900 p-6">
        <div className="flex flex-col items-center justify-center text-center shrink-0">
          <p className="text-5xl font-bold text-slate-900 dark:text-white">{avg}</p>
          <div className="flex gap-0.5 my-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star
                key={n}
                className={cn(
                  "h-4 w-4",
                  n <= Math.round(parseFloat(avg))
                    ? "fill-amber-400 stroke-amber-400"
                    : "fill-slate-200 stroke-slate-200"
                )}
              />
            ))}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">{reviews.length} reviews</p>
        </div>

        <div className="flex-1 space-y-1.5">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = dist[star] ?? 0;
            const pct = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;
            return (
              <div key={star} className="flex items-center gap-2">
                <StarRow count={star} filled={true} />
                <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-amber-400"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 w-8 text-right">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review list */}
      <div className="space-y-5">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="rounded-xl border border-border bg-white dark:bg-slate-900 p-5"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                    review.authorColor
                  )}
                >
                  {review.authorInitials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {review.authorName}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star
                          key={n}
                          className={cn(
                            "h-3 w-3",
                            n <= review.rating
                              ? "fill-amber-400 stroke-amber-400"
                              : "fill-slate-200 stroke-slate-200"
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-slate-400">
                      {new Date(review.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
              {review.title}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {review.body}
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
              <ThumbsUp className="h-3.5 w-3.5" />
              {review.helpful} people found this helpful
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────── Batch card ─────────────── */
function BatchCard({ batch, courseSlug }: { batch: Batch; courseSlug: string }) {
  const seatsPercent = Math.round(
    ((batch.seats - batch.seatsLeft) / batch.seats) * 100
  );
  const isSelfPaced = batch.seatsLeft === 9999;
  const savings = batch.originalPrice
    ? batch.originalPrice - batch.price
    : null;

  return (
    <Card className="border border-slate-200 dark:border-slate-700">
      <CardContent className="p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1">
            <h4 className="font-semibold text-slate-900 dark:text-white">{batch.name}</h4>
            {!isSelfPaced && (
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {new Date(batch.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  {" — "}
                  {new Date(batch.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  {batch.seatsLeft} / {batch.seats} seats remaining
                </span>
              </div>
            )}
            {!isSelfPaced && (
              <div className="mt-3">
                <div className="mb-1 flex justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Seats filled</span>
                  <span>{seatsPercent}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                  <div
                    className="h-full rounded-full bg-indigo-500 transition-all"
                    style={{ width: `${seatsPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            <div className="text-right">
              <span className="text-xl font-bold text-slate-900 dark:text-white">${batch.price}</span>
              {batch.originalPrice && (
                <span className="ml-2 text-sm text-slate-400 line-through">
                  ${batch.originalPrice}
                </span>
              )}
              {savings && (
                <p className="text-xs font-medium text-emerald-600">
                  You save ${savings}
                </p>
              )}
            </div>
            <Link
              href={`/courses/${courseSlug}/enroll`}
              className={cn(
                buttonVariants({ size: "sm" }),
                "bg-indigo-600 text-white hover:bg-indigo-700"
              )}
            >
              {isSelfPaced ? "Enroll Now" : "Reserve a Seat"}
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ─────────────── Pricing sidebar ─────────────── */
function PricingSidebar({ course }: { course: Course }) {
  const discount =
    course.originalPrice && course.originalPrice > course.price
      ? Math.round((1 - course.price / course.originalPrice) * 100)
      : null;

  const savings = course.originalPrice ? course.originalPrice - course.price : null;

  return (
    <div className="sticky top-24">
      {/* Course thumbnail */}
      <div
        className={cn(
          "relative flex h-48 items-center justify-center rounded-t-2xl",
          `bg-linear-to-br ${course.gradientFrom} ${course.gradientTo}`
        )}
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/25 text-white backdrop-blur-sm">
          {courseIconMapLg[course.iconName] ?? <Globe className="h-10 w-10" />}
        </div>
        <div className="absolute inset-0 flex items-center justify-center rounded-t-2xl bg-black/20">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg">
            <Play className="ml-1 h-5 w-5 text-slate-800" />
          </div>
        </div>
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-bold text-slate-700 shadow">
          Preview
        </span>
      </div>

      {/* Pricing card */}
      <Card className="rounded-t-none border-t-0 shadow-lg dark:border-slate-700">
        <CardContent className="p-5">
          {/* Price */}
          <div className="mb-4">
            {course.originalPrice && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-400 line-through">
                  ${course.originalPrice}
                </span>
                {discount && (
                  <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-bold text-rose-600">
                    -{discount}% OFF
                  </span>
                )}
              </div>
            )}
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">${course.price}</span>
            {savings && (
              <p className="text-xs font-medium text-emerald-600">You save ${savings}</p>
            )}
          </div>

          {/* Enroll CTA */}
          <Link
            href="#batches"
            className={cn(
              buttonVariants({ size: "lg" }),
              "w-full justify-center bg-indigo-600 text-white hover:bg-indigo-700"
            )}
          >
            View Batches
          </Link>

          {/* Course meta */}
          <ul className="mt-5 space-y-2.5 text-sm">
            <li className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <BookOpen className="h-4 w-4" /> Lessons
              </span>
              <span className="font-medium text-slate-800 dark:text-slate-200">{course.lessonCount}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Star className="h-4 w-4" /> Level
              </span>
              <span className="font-medium text-slate-800 dark:text-slate-200">{course.level}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Globe className="h-4 w-4" /> Language
              </span>
              <span className="font-medium text-slate-800 dark:text-slate-200">{course.language}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Award className="h-4 w-4" /> Certificate
              </span>
              <span className="font-medium text-slate-800 dark:text-slate-200">{course.certificate ? "Yes" : "No"}</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Bottom enroll card (mobile hidden, shown below for mobile) */}
      <div className="mt-3 rounded-xl bg-slate-50 dark:bg-slate-800 p-4 text-center">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Free to join · No credit card to preview
        </p>
      </div>
    </div>
  );
}

/* ─────────────── FAQ ─────────────── */
const faqs = [
  {
    q: "Is this course suitable for complete beginners?",
    a: "Absolutely — the course is structured to guide you from fundamentals all the way to advanced topics, with no prior experience assumed unless stated in the requirements.",
  },
  {
    q: "Do I get lifetime access?",
    a: "Yes. Once enrolled you have permanent access to all lessons, updates, and new content added to the course.",
  },
  {
    q: "What is the refund policy?",
    a: "We offer a full refund within 14 days of enrollment if you are not satisfied. No questions asked.",
  },
  {
    q: "Will I receive a certificate on completion?",
    a: "Yes — a verified certificate of completion with a unique URL is issued automatically once you finish all lessons.",
  },
  {
    q: "Can I watch on mobile?",
    a: "Yes. The platform is fully responsive and works on any device. You can also download lessons for offline viewing in the mobile app.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
      >
        <span className="text-sm font-semibold text-slate-900 dark:text-white">{q}</span>
        {open ? (
          <ChevronUp className="h-4 w-4 shrink-0 text-slate-400" />
        ) : (
          <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
        )}
      </button>
      {open && (
        <div className="border-t border-slate-200 dark:border-slate-700 px-5 py-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {a}
        </div>
      )}
    </div>
  );
}

/* ─────────────── Main component ─────────────── */
export function CourseDetailClient({ course }: { course: Course }) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const tabContentRef = useRef<HTMLDivElement>(null);

  function switchTab(tab: Tab) {
    setActiveTab(tab);
    setTimeout(() => {
      tabContentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  return (
    <>
      {/* Breadcrumb */}
      <RevealBlock>
        <nav className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            <li>
              <Link href="/" className="hover:text-indigo-600 transition-colors">
                Home
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li>
              <Link href="/courses" className="hover:text-indigo-600 transition-colors">
                Courses
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li className="max-w-[200px] truncate font-medium text-slate-800 dark:text-slate-200">{course.title}</li>
          </ol>
        </div>
        </nav>
      </RevealBlock>

      <RevealBlock delay={0.05} className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* ── Left column ── */}
          <div className="flex-1 min-w-0">
            {/* Tag row */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
                {course.category}
              </span>
              <span
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold",
                  courseTypeStyles[course.type]
                )}
              >
                <span className="inline-flex h-2 w-2 rounded-full bg-current opacity-60" />
                {course.type}
              </span>
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold",
                  courseLevelStyles[course.level]
                )}
              >
                {course.level}
              </span>
            </div>

            {/* Title + subtitle */}
            <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              {course.title}
            </h1>
            <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-400">{course.subtitle}</p>

            {/* Stats row */}
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                {course.studentCount.toLocaleString()} students
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" />
                {course.lessonCount} lessons
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                {course.rating} rating
              </span>
            </div>

            {/* Instructor attribution */}
            <div className="mt-4 flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback
                  className={cn("text-xs font-semibold", course.instructor.avatarColor)}
                >
                  {course.instructor.initials}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                by{" "}
                <button
                  onClick={() => switchTab("instructor")}
                  className="font-medium text-indigo-600 hover:underline"
                >
                  {course.instructor.name}
                </button>
              </span>
            </div>

            {/* Mobile pricing card */}
            <div className="mt-6 lg:hidden">
              <PricingSidebar course={course} />
            </div>

            {/* ── Tabs ── */}
            <div className="mt-8">
              <div className="border-b border-slate-200 dark:border-slate-700">
                <nav className="-mb-px flex overflow-x-auto">
                  {TABS.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => switchTab(tab.id)}
                      className={cn(
                        "shrink-0 border-b-2 px-5 py-3 text-sm font-semibold transition-colors",
                        activeTab === tab.id
                          ? "border-indigo-600 text-indigo-600"
                          : "border-transparent text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-700 dark:hover:text-slate-200"
                      )}
                    >
                      {tab.label}
                      {tab.id === "batches" && (
                        <span className="ml-1.5 rounded-full bg-indigo-100 px-1.5 py-0.5 text-xs text-indigo-700">
                          {course.batches.length}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              <div ref={tabContentRef} className="mt-6 scroll-mt-24">
                {/* ── Overview tab ── */}
                {activeTab === "overview" && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="mb-3 text-lg font-bold text-slate-900 dark:text-white">
                        About This Course
                      </h2>
                      <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">{course.about}</p>
                    </div>

                    <div>
                      <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
                        What You&apos;ll Learn
                      </h2>
                      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        {course.whatYouLearn.map((item) => (
                          <div key={item} className="flex items-start gap-2.5">
                            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                            <span className="text-sm text-slate-700 dark:text-slate-300">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h2 className="mb-3 text-lg font-bold text-slate-900 dark:text-white">Requirements</h2>
                      <ul className="space-y-2">
                        {course.requirements.map((req) => (
                          <li key={req} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* ── Curriculum tab ── */}
                {activeTab === "curriculum" && (
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white">Course Curriculum</h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {course.curriculum.reduce((s, sec) => s + sec.lessons.length, 0)} lessons
                        across {course.curriculum.length} modules
                      </p>
                    </div>
                    <div className="space-y-3">
                      {course.curriculum.map((section, i) => (
                        <CurriculumAccordion key={section.title} section={section} index={i} />
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Batches tab ── */}
                {activeTab === "batches" && (
                  <div id="batches">
                    <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">Available Batches</h2>
                    <div className="space-y-4">
                      {course.batches.map((batch) => (
                        <BatchCard key={batch.id} batch={batch} courseSlug={course.slug} />
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Instructor tab ── */}
                {activeTab === "instructor" && (
                  <div>
                    <h2 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">Your Instructor</h2>
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16 shrink-0">
                        <AvatarFallback
                          className={cn(
                            "text-xl font-bold",
                            course.instructor.avatarColor
                          )}
                        >
                          {course.instructor.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                          {course.instructor.name}
                        </h3>
                        <p className="text-sm text-indigo-600">{course.instructor.title}</p>

                        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            {course.instructor.rating} instructor rating
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" />
                            {course.instructor.students.toLocaleString()} students
                          </span>
                          <span className="flex items-center gap-1">
                            <BookOpen className="h-3.5 w-3.5" />
                            {course.instructor.courses} courses
                          </span>
                        </div>

                        <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">{course.instructor.bio}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Reviews tab ── */}
                {activeTab === "reviews" && (
                  <div>
                    <h2 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">
                      Student Reviews
                    </h2>
                    <ReviewsPanel reviews={getReviewsForCourse(course.slug)} />
                  </div>
                )}

                {/* ── FAQ tab ── */}
                {activeTab === "faq" && (
                  <div>
                    <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
                      Frequently Asked Questions
                    </h2>
                    <div className="space-y-3">
                      {faqs.map((faq) => (
                        <FaqItem key={faq.q} q={faq.q} a={faq.a} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Right column (desktop sidebar) ── */}
          <div className="hidden w-80 shrink-0 lg:block xl:w-96">
            <PricingSidebar course={course} />
          </div>
        </div>
      </RevealBlock>
    </>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Code2,
  Play,
  CheckCircle2,
  Circle,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Lock,
  Clock,
  BookOpen,
  List,
  ChevronDown,
} from "lucide-react";
import { Course, Lesson, CurriculumSection } from "@/data/courses";
import { cn } from "@/lib/utils";

interface Props {
  course: Course;
  currentLessonId: string;
}

function flattenLessons(curriculum: CurriculumSection[]): Lesson[] {
  return curriculum.flatMap((s) => s.lessons);
}

export function CoursePlayerClient({ course, currentLessonId }: Props) {
  const router = useRouter();
  const allLessons = flattenLessons(course.curriculum);
  const currentIndex = allLessons.findIndex((l) => l.id === currentLessonId);
  const currentLesson = allLessons[currentIndex] ?? allLessons[0];

  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set(allLessons.slice(0, currentIndex).map((l) => l.id))
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(
    new Set(course.curriculum.map((_, i) => i))
  );

  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const progressPercent = Math.round((completedLessons.size / allLessons.length) * 100);

  function markComplete() {
    setCompletedLessons((prev) => new Set([...prev, currentLesson.id]));
    if (nextLesson) {
      router.push(`/learn/${course.slug}/${nextLesson.id}`);
    }
  }

  function toggleSection(idx: number) {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }

  return (
    <div className="flex h-screen flex-col bg-slate-950 text-white overflow-hidden">
      {/* Top bar */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-800 px-4 gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <Link href="/" className="shrink-0 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600">
              <Code2 className="h-3.5 w-3.5 text-white" />
            </div>
          </Link>
          <div className="h-4 w-px bg-slate-700" />
          <Link
            href={`/courses/${course.slug}`}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Back to course
          </Link>
          <div className="h-4 w-px bg-slate-700 hidden sm:block" />
          <p className="hidden sm:block text-sm font-semibold text-white truncate max-w-60">
            {course.title}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Progress */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="h-1.5 w-24 rounded-full bg-slate-700 overflow-hidden">
              <div
                className="h-full rounded-full bg-indigo-500 transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs text-slate-400">{progressPercent}%</span>
          </div>
          {/* Toggle sidebar on mobile */}
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="flex items-center gap-1.5 rounded-md border border-slate-700 px-2.5 py-1.5 text-xs text-slate-300 hover:bg-slate-800 transition-colors lg:hidden"
          >
            {sidebarOpen ? <X className="h-3.5 w-3.5" /> : <List className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">Curriculum</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Video area */}
          <div className="w-full bg-black aspect-video flex items-center justify-center relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                  <Play className="h-7 w-7 text-white fill-white ml-1" />
                </div>
                <p className="text-sm text-slate-400">Video content loads here</p>
                <p className="text-xs text-slate-600 mt-1">{currentLesson.duration}</p>
              </div>
            </div>
            {/* Gradient overlay for realism */}
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/20 pointer-events-none" />
          </div>

          {/* Lesson info */}
          <div className="flex-1 p-4 sm:p-6 max-w-4xl">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="text-xs text-indigo-400 font-semibold uppercase tracking-wide mb-1">
                  Lesson {currentIndex + 1} of {allLessons.length}
                </p>
                <h1 className="text-xl sm:text-2xl font-bold text-white">{currentLesson.title}</h1>
                <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {currentLesson.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5" />
                    {course.title}
                  </span>
                </div>
              </div>

              {completedLessons.has(currentLesson.id) ? (
                <div className="flex items-center gap-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-emerald-400 shrink-0">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Completed
                </div>
              ) : (
                <button
                  onClick={markComplete}
                  className="rounded-lg bg-indigo-600 hover:bg-indigo-700 px-4 py-1.5 text-xs font-semibold text-white transition-colors shrink-0"
                >
                  Mark Complete
                </button>
              )}
            </div>

            {/* Lesson content placeholder */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 mb-6">
              <h3 className="text-sm font-semibold text-white mb-3">Lesson Notes</h3>
              <div className="space-y-2">
                {[
                  "Follow along with the video to get the most out of this lesson.",
                  "Practice the exercises shown in the demo section.",
                  "Check the resources tab for additional reading and code samples.",
                  "Ask questions in the Q&A section below the video if you get stuck.",
                ].map((note, i) => (
                  <p key={i} className="text-sm text-slate-400 flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0" />
                    {note}
                  </p>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              {prevLesson ? (
                <Link
                  href={`/learn/${course.slug}/${prevLesson.id}`}
                  className="flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Previous:</span>
                  <span className="max-w-32 truncate text-xs sm:text-sm">{prevLesson.title}</span>
                </Link>
              ) : (
                <div />
              )}
              {nextLesson ? (
                <Link
                  href={`/learn/${course.slug}/${nextLesson.id}`}
                  className="flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 px-4 py-2 text-sm font-medium text-white transition-colors"
                >
                  <span className="max-w-32 truncate text-xs sm:text-sm">{nextLesson.title}</span>
                  <span className="hidden sm:inline">: Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ) : (
                <button
                  onClick={() => router.push(`/courses/${course.slug}`)}
                  className="flex items-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition-colors"
                >
                  🎉 Finish Course
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Curriculum sidebar */}
        <aside
          className={cn(
            "w-80 border-l border-slate-800 bg-slate-900 flex-col overflow-y-auto",
            "hidden lg:flex",
            sidebarOpen && "fixed inset-y-0 right-0 z-40 flex lg:static"
          )}
        >
          <div className="sticky top-0 bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between z-10">
            <h3 className="text-sm font-semibold text-white">Course Content</h3>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden rounded-md p-1 text-slate-400 hover:bg-slate-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Overall progress */}
          <div className="px-4 py-3 border-b border-slate-800">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-400">
                {completedLessons.size} / {allLessons.length} lessons
              </span>
              <span className="text-indigo-400 font-semibold">{progressPercent}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-700 overflow-hidden">
              <div
                className="h-full rounded-full bg-indigo-500 transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Sections */}
          <div className="divide-y divide-slate-800">
            {course.curriculum.map((section, sIdx) => (
              <div key={sIdx}>
                <button
                  onClick={() => toggleSection(sIdx)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-800/50 transition-colors"
                >
                  <span className="text-xs font-semibold text-slate-300 pr-2">{section.title}</span>
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 text-slate-500 shrink-0 transition-transform",
                      expandedSections.has(sIdx) && "rotate-180"
                    )}
                  />
                </button>
                {expandedSections.has(sIdx) && (
                  <div>
                    {section.lessons.map((lesson) => {
                      const isActive = lesson.id === currentLesson.id;
                      const isDone = completedLessons.has(lesson.id);
                      return (
                        <Link
                          key={lesson.id}
                          href={`/learn/${course.slug}/${lesson.id}`}
                          className={cn(
                            "flex items-start gap-3 px-4 py-2.5 text-xs transition-colors",
                            isActive
                              ? "bg-indigo-600/10 border-l-2 border-indigo-500"
                              : "hover:bg-slate-800/50 border-l-2 border-transparent"
                          )}
                        >
                          <div className="mt-0.5 shrink-0">
                            {isDone ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                            ) : isActive ? (
                              <Play className="h-4 w-4 text-indigo-400 fill-indigo-400" />
                            ) : lesson.preview ? (
                              <Circle className="h-4 w-4 text-slate-500" />
                            ) : (
                              <Lock className="h-3.5 w-3.5 text-slate-600 mt-0.5" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p
                              className={cn(
                                "leading-snug",
                                isActive
                                  ? "text-indigo-300 font-medium"
                                  : isDone
                                  ? "text-slate-400 line-through"
                                  : "text-slate-400"
                              )}
                            >
                              {lesson.title}
                            </p>
                            <p className="text-slate-600 mt-0.5">{lesson.duration}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

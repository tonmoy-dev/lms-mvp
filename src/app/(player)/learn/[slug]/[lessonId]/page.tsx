import { notFound } from "next/navigation";
import { getCourseBySlug } from "@/data/courses";
import { CoursePlayerClient } from "@/components/sections/course-player-client";

interface Props {
  params: Promise<{ slug: string; lessonId: string }>;
}

export async function generateStaticParams() {
  const { courses } = await import("@/data/courses");
  return courses.flatMap((course) =>
    course.curriculum.flatMap((section) =>
      section.lessons.map((lesson) => ({
        slug: course.slug,
        lessonId: lesson.id,
      }))
    )
  );
}

export default async function CoursePlayerPage({ params }: Props) {
  const { slug, lessonId } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  return <CoursePlayerClient course={course} currentLessonId={lessonId} />;
}

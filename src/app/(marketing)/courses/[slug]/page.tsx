import { notFound } from "next/navigation";
import { CourseDetailClient } from "@/components/sections/course-detail-client";
import { courses, getCourseBySlug } from "@/data/courses";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return {};
  return {
    title: `${course.title} — DevPath Academy`,
    description: course.subtitle,
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) notFound();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <CourseDetailClient course={course} />
    </div>
  );
}

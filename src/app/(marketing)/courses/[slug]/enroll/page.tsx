import { notFound } from "next/navigation";
import { getCourseBySlug } from "@/data/courses";
import { EnrollmentClient } from "@/components/sections/enrollment-client";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { courses } = await import("@/data/courses");
  return courses.map((c) => ({ slug: c.slug }));
}

export default async function EnrollPage({ params }: Props) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  return <EnrollmentClient course={course} />;
}

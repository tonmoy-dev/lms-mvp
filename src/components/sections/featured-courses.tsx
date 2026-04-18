"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { homeGridContainerVariants, homeGridItemVariants } from "@/lib/page-motion";
import { ArrowRight, Shield, Globe, Video, FileText } from "lucide-react";
import { CourseCard, CourseCardProps } from "@/components/ui/course-card";

const courses: CourseCardProps[] = [
  {
    title: "Regular Offline ISSB Course",
    instructor: "M Asif Rahman",
    instructorInitials: "AR",
    type: "Offline",
    lessonCount: 40,
    studentCount: 1520,
    price: "৳8000",
    slug: "regular-offline-issb",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-teal-600",
    icon: <Shield className="h-8 w-8" />,
  },
  {
    title: "Regular Online ISSB Course",
    instructor: "M Asif Rahman",
    instructorInitials: "AR",
    type: "Live",
    lessonCount: 35,
    studentCount: 890,
    price: "৳8000",
    slug: "regular-online-issb",
    gradientFrom: "from-sky-400",
    gradientTo: "to-blue-600",
    icon: <Globe className="h-8 w-8" />,
  },
  {
    title: "OC Asif's Special Recorded Course",
    instructor: "M Asif Rahman",
    instructorInitials: "AR",
    type: "Self-paced",
    lessonCount: 20,
    studentCount: 3100,
    price: "৳4080",
    slug: "oc-asif-special-recorded",
    gradientFrom: "from-amber-400",
    gradientTo: "to-orange-500",
    icon: <Video className="h-8 w-8" />,
  },
  {
    title: "ISSB Screening Test Mock",
    instructor: "PFDA Team",
    instructorInitials: "PT",
    type: "Test",
    lessonCount: 1,
    studentCount: 450,
    price: "৳1000",
    slug: "issb-screening-test",
    gradientFrom: "from-rose-400",
    gradientTo: "to-red-600",
    icon: <FileText className="h-8 w-8" />,
  },
];

export function FeaturedCourses() {
  return (
    <section id="courses" className="bg-slate-50 dark:bg-slate-900 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Popular Courses
          </h2>
          <p className="mt-3 text-base text-slate-500 dark:text-slate-400">
            Start your journey with our most sought-after programs
          </p>
        </div>

        {/* Grid — horizontal scroll on mobile, 4 cols on desktop */}
        <motion.div
          variants={homeGridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {courses.map((course) => (
            <motion.div key={course.slug} variants={homeGridItemVariants}>
              <CourseCard {...course} />
            </motion.div>
          ))}
        </motion.div>

        {/* View all link */}
        <div className="mt-10 text-center">
          <Link
            href="/courses"
            className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-800 transition-colors"
          >
            View All Courses <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

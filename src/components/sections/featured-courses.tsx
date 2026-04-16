"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Brain, BarChart2, Layers } from "lucide-react";
import { CourseCard, CourseCardProps } from "@/components/ui/course-card";

const courses: CourseCardProps[] = [
  {
    title: "Full-Stack Web Development Bootcamp",
    instructor: "Alex Rivera",
    instructorInitials: "AR",
    type: "Bootcamp",
    lessonCount: 48,
    studentCount: 3124,
    price: "$199",
    slug: "fullstack-web-dev",
    gradientFrom: "from-indigo-500",
    gradientTo: "to-violet-600",
    icon: <Globe className="h-8 w-8" />,
  },
  {
    title: "Machine Learning & AI Fundamentals",
    instructor: "Dr. Sarah Lin",
    instructorInitials: "SL",
    type: "Live",
    lessonCount: 32,
    studentCount: 1890,
    price: "$249",
    slug: "ml-ai-fundamentals",
    gradientFrom: "from-violet-500",
    gradientTo: "to-pink-500",
    icon: <Brain className="h-8 w-8" />,
  },
  {
    title: "Data Science & Analytics with Python",
    instructor: "James Okafor",
    instructorInitials: "JO",
    type: "Hybrid",
    lessonCount: 28,
    studentCount: 975,
    price: "$179",
    slug: "data-science-python",
    gradientFrom: "from-emerald-400",
    gradientTo: "to-cyan-500",
    icon: <BarChart2 className="h-8 w-8" />,
  },
  {
    title: "React & Next.js — Modern Frontend Mastery",
    instructor: "Priya Nair",
    instructorInitials: "PN",
    type: "Self-paced",
    lessonCount: 22,
    studentCount: 2450,
    price: "$149",
    slug: "react-nextjs-mastery",
    gradientFrom: "from-amber-400",
    gradientTo: "to-orange-500",
    icon: <Layers className="h-8 w-8" />,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0, 0, 0.2, 1] as const } },
};

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
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {courses.map((course) => (
            <motion.div key={course.slug} variants={cardVariants}>
              <CourseCard {...course} />
            </motion.div>
          ))}
        </motion.div>

        {/* View all link */}
        <div className="mt-10 text-center">
          <Link
            href="/courses"
            className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            View All Courses <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

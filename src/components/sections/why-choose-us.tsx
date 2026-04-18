"use client";

import { motion } from "framer-motion";
import { homeGridContainerVariants, homeGridItemVariants } from "@/lib/page-motion";
import {
  BadgeCheck,
  Video,
  Award,
  Rocket,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: BadgeCheck,
    title: "Ex-Officer Mentors",
    description:
      "Every instructor is a former armed forces officer or psychologist with real-world experience in the selection process.",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    icon: Video,
    title: "Comprehensive Training",
    description:
      "We provide rigorous physical, psychological, and theoretical training tailored for ISSB and preliminary exams.",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
  },
  {
    icon: Award,
    title: "Proven Success Rate",
    description:
      "Hundreds of our cadets have successfully secured their Green Cards and are currently serving as officers.",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    icon: Rocket,
    title: "Mock Screenings",
    description:
      "Experience realistic ISSB mock tests and interviews to eliminate fear and build unshakable confidence.",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0, 0, 0.2, 1] as const } },
};

export function WhyChooseUs() {
  return (
    <section className="bg-white dark:bg-slate-950 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Why Defense Academy?
          </h2>
          <p className="mt-3 text-base text-slate-500 dark:text-slate-400">
            The right guidance to turn your dream into reality
          </p>
        </div>

        {/* Feature grid */}
        <motion.div
          variants={homeGridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map(({ icon: Icon, title, description, iconBg, iconColor }) => (
            <motion.div key={title} variants={homeGridItemVariants}>
              <Card className="h-full border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <CardContent className="flex flex-col gap-4 p-6">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg}`}
                  >
                    <Icon className={`h-5 w-5 ${iconColor}`} />
                  </div>
                  <div>
                    <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-white">{title}</h3>
                    <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">{description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Browse CTA */}
        <div className="mt-12 text-center">
          <a
            href="#courses"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2.5 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-100"
          >
            Browse All Courses →
          </a>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
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
    title: "Industry-Certified Mentors",
    description:
      "Every instructor is a working professional with at least 5 years of real-world experience — not just academic credentials.",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    icon: Video,
    title: "Live + On-Demand Hybrid",
    description:
      "Join live sessions with your cohort or catch up with full recordings anytime. You set the pace — we keep you on track.",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    icon: Award,
    title: "Recognised Certificates",
    description:
      "Earn verifiable completion certificates accepted by top tech companies. Each cert includes a unique shareable URL.",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    icon: Rocket,
    title: "Project-Based Learning",
    description:
      "Build a real portfolio while you learn. Every course includes hands-on projects you can immediately showcase to employers.",
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
            Why DevPath Academy?
          </h2>
          <p className="mt-3 text-base text-slate-500 dark:text-slate-400">
            A platform designed to turn curiosity into a career
          </p>
        </div>

        {/* Feature grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map(({ icon: Icon, title, description, iconBg, iconColor }) => (
            <motion.div key={title} variants={cardVariants}>
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
            className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-5 py-2.5 text-sm font-semibold text-indigo-700 transition-colors hover:bg-indigo-100"
          >
            Browse All Courses →
          </a>
        </div>
      </div>
    </section>
  );
}

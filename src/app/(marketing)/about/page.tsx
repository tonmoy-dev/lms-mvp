import type { Metadata } from "next";
import {
  Users,
  Target,
  Globe,
  Award,
  BookOpen,
  Rocket,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About — DevPath Academy",
  description:
    "Learn about our mission, team, and commitment to high-quality tech education.",
};

const stats = [
  { label: "Active Learners", value: "28,000+", icon: Users },
  { label: "Expert Courses", value: "120+", icon: BookOpen },
  { label: "Countries Reached", value: "95+", icon: Globe },
  { label: "Completion Rate", value: "87%", icon: Award },
];

const values = [
  {
    icon: Target,
    title: "Practical Over Theory",
    description:
      "Every course is project-driven. You build real portfolio pieces, not toy examples.",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "Learning is better together. Our cohort model ensures accountability and peer support.",
  },
  {
    icon: Rocket,
    title: "Industry-Relevant",
    description:
      "Curriculum is reviewed quarterly so you always learn what employers actually need.",
  },
  {
    icon: Award,
    title: "Accessible Quality",
    description:
      "World-class education at fair prices with flexible payment options and scholarships.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-white dark:bg-slate-950 py-20 border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            About DevPath Academy
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
            We believe the best way to learn tech is by building. DevPath
            Academy connects ambitious learners with industry practitioners
            through project-based courses, live cohorts, and a supportive global
            community.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-slate-50 dark:bg-slate-900 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map(({ label, value, icon: Icon }) => (
              <Card
                key={label}
                className="border border-slate-200 dark:border-slate-700 text-center"
              >
                <CardContent className="flex flex-col items-center gap-2 p-6">
                  <Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    {value}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="bg-white dark:bg-slate-950 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Our Mission
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
            To democratize tech education by providing world-class, hands-on
            learning experiences that prepare people for real careers &mdash;
            regardless of their background, location, or prior experience.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-50 dark:bg-slate-900 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {values.map(({ icon: Icon, title, description }) => (
              <Card key={title} className="border border-slate-200 dark:border-slate-700">
                <CardContent className="flex gap-4 p-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-900/40">
                    <Icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                      {description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

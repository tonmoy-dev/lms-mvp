"use client";

import { motion } from "framer-motion";
import { homeGridContainerVariants, homeGridItemVariants } from "@/lib/page-motion";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    stars: 5,
    quote:
      "The live cohort sessions with Alex completely changed how I approach building web apps. Getting real-time feedback from an actual senior engineer — you simply cannot get that from tutorials.",
    name: "Marcus Chen",
    initials: "MC",
    course: "Full-Stack Bootcamp",
    location: "Student from Singapore",
    avatarColor: "bg-indigo-100 text-indigo-700",
  },
  {
    stars: 5,
    quote:
      "I tried four other platforms before DevPath. The project-based structure here is unmatched — by week three I already had something live in production. Now I have three portfolio pieces employers actually care about.",
    name: "Isabelle Moreau",
    initials: "IM",
    course: "React & Next.js Mastery",
    location: "Student from France",
    avatarColor: "bg-violet-100 text-violet-700",
  },
  {
    stars: 5,
    quote:
      "As a career-changer I needed structured, trustworthy tech education. The mentors are patient, the curriculum is up-to-date, and the community Slack channel kept me accountable every single week.",
    name: "Daniel Osei",
    initials: "DO",
    course: "Machine Learning & AI",
    location: "Career changer from Ghana",
    avatarColor: "bg-emerald-100 text-emerald-700",
  },
];

export function Testimonials() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            What Our Students Say
          </h2>
          <p className="mt-3 text-base text-slate-500 dark:text-slate-400">
            Hear from our growing community of learners
          </p>
        </div>

        {/* Cards */}
        <motion.div
          variants={homeGridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {testimonials.map(({ stars, quote, name, initials, course, location, avatarColor }) => (
            <motion.div key={name} variants={homeGridItemVariants}>
              <Card className="flex h-full flex-col border border-slate-200 dark:border-slate-700 shadow-sm">
                <CardContent className="flex flex-1 flex-col gap-4 p-6">
                  {/* Stars */}
                  <div className="flex gap-0.5">
                    {Array.from({ length: stars }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="flex-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    &ldquo;{quote}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-3 border-t border-slate-100 dark:border-slate-700 pt-4">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className={`text-xs font-semibold ${avatarColor}`}>
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {course} · {location}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { Hero } from "@/components/sections/hero";
import { FeaturedCourses } from "@/components/sections/featured-courses";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { Testimonials } from "@/components/sections/testimonials";
import { InstructorCta } from "@/components/sections/instructor-cta";
import { FinalCta } from "@/components/sections/final-cta";

/**
 * Client-only bundle: avoids React hydration errors when browser extensions
 * (e.g. Dark Reader) mutate SVGs in the DOM before hydration. Search engines
 * that execute JavaScript still see full content.
 */
export default function HomeSections() {
  return (
    <>
      <Hero />
      <FeaturedCourses />
      <WhyChooseUs />
      <Testimonials />
      <InstructorCta />
      <FinalCta />
    </>
  );
}

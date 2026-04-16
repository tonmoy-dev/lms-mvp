"use client";

import dynamic from "next/dynamic";
import {
  HeroSkeleton,
  FeaturedCoursesSkeleton,
  WhyChooseUsSkeleton,
  TestimonialsSkeleton,
  InstructorCtaSkeleton,
  FinalCtaSkeleton,
} from "@/components/skeletons/home-skeletons";

const Hero = dynamic(
  () => import("@/components/sections/hero").then((m) => ({ default: m.Hero })),
  { loading: () => <HeroSkeleton /> }
);

const FeaturedCourses = dynamic(
  () =>
    import("@/components/sections/featured-courses").then((m) => ({
      default: m.FeaturedCourses,
    })),
  { loading: () => <FeaturedCoursesSkeleton /> }
);

const WhyChooseUs = dynamic(
  () =>
    import("@/components/sections/why-choose-us").then((m) => ({
      default: m.WhyChooseUs,
    })),
  { loading: () => <WhyChooseUsSkeleton /> }
);

const Testimonials = dynamic(
  () =>
    import("@/components/sections/testimonials").then((m) => ({
      default: m.Testimonials,
    })),
  { loading: () => <TestimonialsSkeleton /> }
);

const InstructorCta = dynamic(
  () =>
    import("@/components/sections/instructor-cta").then((m) => ({
      default: m.InstructorCta,
    })),
  { loading: () => <InstructorCtaSkeleton /> }
);

const FinalCta = dynamic(
  () =>
    import("@/components/sections/final-cta").then((m) => ({
      default: m.FinalCta,
    })),
  { loading: () => <FinalCtaSkeleton /> }
);

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

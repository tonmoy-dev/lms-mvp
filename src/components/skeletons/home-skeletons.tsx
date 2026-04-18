function Pulse({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-md bg-slate-200 dark:bg-slate-700 ${className ?? ""}`} />
  );
}

export function HeroSkeleton() {
  return (
    <section className="bg-white dark:bg-slate-950 pb-20 pt-16">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {/* Badge pill */}
        <div className="mb-6 flex justify-center">
          <Pulse className="h-7 w-64 rounded-full" />
        </div>
        {/* Headline */}
        <Pulse className="mx-auto h-12 w-3/4 sm:h-14 md:h-16" />
        <Pulse className="mx-auto mt-3 h-12 w-1/2 sm:h-14 md:h-16" />
        {/* Subtext */}
        <Pulse className="mx-auto mt-6 h-4 w-2/3" />
        <Pulse className="mx-auto mt-2 h-4 w-1/2" />
        {/* CTA buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Pulse className="h-11 w-40 rounded-lg" />
          <Pulse className="h-11 w-44 rounded-lg" />
        </div>
        {/* Stats row */}
        <div className="mt-14 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <Pulse className="h-8 w-20" />
              <Pulse className="h-3.5 w-24" />
            </div>
          ))}
        </div>
        {/* Trust badges */}
        <div className="mt-10 border-t border-slate-100 dark:border-slate-800 pt-8">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {[0, 1, 2, 3].map((i) => (
              <Pulse key={i} className="h-4 w-32" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeaturedCoursesSkeleton() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 flex flex-col items-center gap-3">
          <Pulse className="h-9 w-52" />
          <Pulse className="h-4 w-72" />
        </div>
        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
            >
              {/* Gradient header area */}
              <Pulse className="h-36 rounded-none" />
              <div className="p-4 space-y-3">
                {/* Badge + type */}
                <Pulse className="h-5 w-16 rounded-full" />
                {/* Title */}
                <Pulse className="h-4 w-full" />
                <Pulse className="h-4 w-4/5" />
                {/* Instructor */}
                <Pulse className="h-3.5 w-28" />
                {/* Stats row */}
                <div className="flex gap-3 pt-1">
                  <Pulse className="h-3 w-16" />
                  <Pulse className="h-3 w-20" />
                </div>
                {/* Price */}
                <div className="flex items-center justify-between pt-2">
                  <Pulse className="h-5 w-12" />
                  <Pulse className="h-8 w-24 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* View all link */}
        <div className="mt-10 flex justify-center">
          <Pulse className="h-4 w-32" />
        </div>
      </div>
    </section>
  );
}

export function WhyChooseUsSkeleton() {
  return (
    <section className="bg-white dark:bg-slate-950 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 flex flex-col items-center gap-3">
          <Pulse className="h-9 w-60" />
          <Pulse className="h-4 w-72" />
        </div>
        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-4"
            >
              <Pulse className="h-11 w-11 rounded-xl" />
              <div className="space-y-2">
                <Pulse className="h-4 w-3/4" />
                <Pulse className="h-3.5 w-full" />
                <Pulse className="h-3.5 w-5/6" />
                <Pulse className="h-3.5 w-4/5" />
              </div>
            </div>
          ))}
        </div>
        {/* CTA pill */}
        <div className="mt-12 flex justify-center">
          <Pulse className="h-10 w-44 rounded-full" />
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSkeleton() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 flex flex-col items-center gap-3">
          <Pulse className="h-9 w-64" />
          <Pulse className="h-4 w-72" />
        </div>
        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 gap-4"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Pulse key={s} className="h-4 w-4 rounded-sm" />
                ))}
              </div>
              {/* Quote lines */}
              <div className="flex-1 space-y-2">
                <Pulse className="h-3.5 w-full" />
                <Pulse className="h-3.5 w-full" />
                <Pulse className="h-3.5 w-5/6" />
                <Pulse className="h-3.5 w-3/4" />
              </div>
              {/* Author */}
              <div className="flex items-center gap-3 border-t border-slate-100 dark:border-slate-700 pt-4">
                <Pulse className="h-9 w-9 rounded-full" />
                <div className="space-y-1.5">
                  <Pulse className="h-3.5 w-24" />
                  <Pulse className="h-3 w-36" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InstructorCtaSkeleton() {
  return (
    <section className="bg-slate-900 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          {/* Left copy */}
          <div className="max-w-xl space-y-4">
            <Pulse className="h-6 w-40 rounded-full bg-slate-700" />
            <Pulse className="h-9 w-72 bg-slate-700" />
            <Pulse className="h-9 w-56 bg-slate-700" />
            <Pulse className="h-4 w-full bg-slate-700" />
            <Pulse className="h-4 w-5/6 bg-slate-700" />
            {/* Perks */}
            <div className="space-y-3 pt-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <Pulse className="h-4 w-4 rounded-full bg-slate-700 shrink-0" />
                  <Pulse className="h-3.5 w-52 bg-slate-700" />
                </div>
              ))}
            </div>
          </div>
          {/* Right CTA */}
          <Pulse className="h-11 w-40 rounded-lg bg-slate-700 shrink-0" />
        </div>
      </div>
    </section>
  );
}

export function FinalCtaSkeleton() {
  return (
    <section className="relative overflow-hidden py-24 bg-emerald-700">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4">
          {/* Heading */}
          <Pulse className="h-10 w-3/4 bg-emerald-500" />
          <Pulse className="h-10 w-1/2 bg-emerald-500" />
          {/* Subtext */}
          <Pulse className="mt-1 h-4 w-2/3 bg-emerald-500" />
          <Pulse className="h-4 w-1/2 bg-emerald-500" />
          {/* Buttons */}
          <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row">
            <Pulse className="h-11 w-40 rounded-lg bg-emerald-500" />
            <Pulse className="h-11 w-36 rounded-lg bg-emerald-500" />
          </div>
          {/* Fine print */}
          <Pulse className="h-3 w-40 bg-emerald-500" />
        </div>
      </div>
    </section>
  );
}

export default function CoursesLoading() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header skeleton */}
      <div className="bg-white border-b border-slate-200 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto h-10 w-56 animate-pulse rounded-lg bg-slate-200" />
          <div className="mx-auto mt-3 h-5 w-72 animate-pulse rounded-lg bg-slate-100" />
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-8 w-28 animate-pulse rounded-full bg-slate-100"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="h-10 flex-1 animate-pulse rounded-lg bg-slate-200" />
          <div className="h-10 w-44 animate-pulse rounded-lg bg-slate-200" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white"
            >
              <div className="h-44 animate-pulse bg-slate-200" />
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 animate-pulse rounded-full bg-slate-200" />
                  <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
                </div>
                <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
                <div className="flex items-center gap-3">
                  <div className="h-3 w-20 animate-pulse rounded bg-slate-100" />
                  <div className="h-3 w-16 animate-pulse rounded bg-slate-100" />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="h-5 w-14 animate-pulse rounded bg-slate-200" />
                  <div className="h-8 w-24 animate-pulse rounded-lg bg-slate-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

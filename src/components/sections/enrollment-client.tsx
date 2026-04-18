"use client";

import { Batch, Course } from "@/data/courses";
import { courseIconComponents } from "@/lib/course-utils";
import { cn } from "@/lib/utils";
import {
  Award,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  CreditCard,
  Loader2,
  Lock,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  course: Course;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function EnrollmentClient({ course }: Props) {
  const router = useRouter();
  const [selectedBatch, setSelectedBatch] = useState<Batch>(course.batches[0]!);
  const [step, setStep] = useState<"select" | "payment" | "success">("select");
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [cardErrors, setCardErrors] = useState<Record<string, string>>({});

  const IconComp =
    courseIconComponents[course.iconName as keyof typeof courseIconComponents];

  const savings = selectedBatch.originalPrice
    ? selectedBatch.originalPrice - selectedBatch.price
    : 0;

  function formatCardNumber(value: string) {
    return value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  }

  function formatExpiry(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  }

  function validateCard() {
    const errors: Record<string, string> = {};
    const rawNumber = cardData.number.replace(/\s/g, "");
    if (!rawNumber || rawNumber.length < 16)
      errors.number = "Enter a valid 16-digit card number.";
    if (!cardData.name.trim()) errors.name = "Cardholder name is required.";
    if (!cardData.expiry || cardData.expiry.length < 5)
      errors.expiry = "Enter a valid expiry date (MM/YY).";
    if (!cardData.cvv || cardData.cvv.length < 3)
      errors.cvv = "Enter a valid CVV.";
    return errors;
  }

  async function handlePayment(e: React.FormEvent) {
    e.preventDefault();
    const errors = validateCard();
    if (Object.keys(errors).length > 0) {
      setCardErrors(errors);
      return;
    }
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 1800));
    setIsProcessing(false);
    setStep("success");
    toast.success("Enrollment confirmed! Welcome to the course.");
  }

  if (step === "success") {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
            <CheckCircle2 className="h-10 w-10 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            You&apos;re enrolled! 🎉
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-1">
            Welcome to <strong>{course.title}</strong>.
          </p>
          <p className="text-sm text-slate-500 mb-8">
            Your batch starts on{" "}
            <strong>{formatDate(selectedBatch.startDate)}</strong>. Check your
            email for confirmation and onboarding details.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/learn/${course.slug}/${course.curriculum[0]?.lessons[0]?.id ?? "l1"}`}
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition-colors"
            >
              <Zap className="h-4 w-4" />
              Start Learning Now
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4">
      <div className="mx-auto max-w-5xl">
        {/* Back link */}
        <Link
          href={`/courses/${course.slug}`}
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 mb-6 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to course
        </Link>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left: Form */}
          <div className="lg:col-span-2 space-y-5">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                {step === "select" ? "Select Your Batch" : "Payment Details"}
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                {step === "select"
                  ? "Choose a batch that fits your schedule."
                  : "Your payment is secured with 256-bit SSL encryption."}
              </p>
            </div>

            {step === "select" ? (
              <>
                {/* Batch selection */}
                <div className="space-y-3">
                  {course.batches.map((batch) => {
                    const isSelected = selectedBatch.id === batch.id;
                    const isFull = batch.seatsLeft === 0;
                    return (
                      <button
                        key={batch.id}
                        onClick={() => !isFull && setSelectedBatch(batch)}
                        disabled={isFull}
                        className={cn(
                          "w-full rounded-xl border-2 p-4 text-left transition-all",
                          isSelected
                            ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20"
                            : "border-border bg-white dark:bg-slate-900 hover:border-emerald-200 dark:hover:border-emerald-800",
                          isFull && "opacity-50 cursor-not-allowed",
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <div
                              className={cn(
                                "mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0",
                                isSelected
                                  ? "border-emerald-600 bg-emerald-600"
                                  : "border-slate-300 dark:border-slate-600",
                              )}
                            >
                              {isSelected && (
                                <div className="h-1.5 w-1.5 rounded-full bg-white" />
                              )}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900 dark:text-white text-sm">
                                {batch.name}
                              </p>
                              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-xs text-slate-500">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3.5 w-3.5" />
                                  {formatDate(batch.startDate)} —{" "}
                                  {formatDate(batch.endDate)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Users className="h-3.5 w-3.5" />
                                  {isFull
                                    ? "Sold out"
                                    : `${batch.seatsLeft} seats left`}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="font-bold text-slate-900 dark:text-white">
                              ${batch.price}
                            </p>
                            {batch.originalPrice && (
                              <p className="text-xs text-slate-400 line-through">
                                ${batch.originalPrice}
                              </p>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setStep("payment")}
                  className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 py-3.5 text-sm font-bold text-white transition-colors flex items-center justify-center gap-2"
                >
                  <Lock className="h-4 w-4" />
                  Proceed to Payment — ${selectedBatch.price}
                </button>
              </>
            ) : (
              <form onSubmit={handlePayment} className="space-y-4">
                <div className="rounded-xl border border-border bg-white dark:bg-slate-900 p-5 space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={cardData.number}
                        onChange={(e) => {
                          setCardData((p) => ({
                            ...p,
                            number: formatCardNumber(e.target.value),
                          }));
                          setCardErrors((p) => ({ ...p, number: "" }));
                        }}
                        className={cn(
                          "w-full rounded-lg border px-3 py-2.5 pr-10 text-sm bg-background text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-emerald-500/30 transition",
                          cardErrors.number
                            ? "border-red-400"
                            : "border-border",
                        )}
                      />
                      <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    </div>
                    {cardErrors.number && (
                      <p className="text-xs text-red-500">
                        {cardErrors.number}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="Alex Johnson"
                      value={cardData.name}
                      onChange={(e) => {
                        setCardData((p) => ({ ...p, name: e.target.value }));
                        setCardErrors((p) => ({ ...p, name: "" }));
                      }}
                      className={cn(
                        "w-full rounded-lg border px-3 py-2.5 text-sm bg-background text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-emerald-500/30 transition",
                        cardErrors.name ? "border-red-400" : "border-border",
                      )}
                    />
                    {cardErrors.name && (
                      <p className="text-xs text-red-500">{cardErrors.name}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardData.expiry}
                        onChange={(e) => {
                          setCardData((p) => ({
                            ...p,
                            expiry: formatExpiry(e.target.value),
                          }));
                          setCardErrors((p) => ({ ...p, expiry: "" }));
                        }}
                        className={cn(
                          "w-full rounded-lg border px-3 py-2.5 text-sm bg-background text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-emerald-500/30 transition",
                          cardErrors.expiry
                            ? "border-red-400"
                            : "border-border",
                        )}
                      />
                      {cardErrors.expiry && (
                        <p className="text-xs text-red-500">
                          {cardErrors.expiry}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        value={cardData.cvv}
                        onChange={(e) => {
                          setCardData((p) => ({
                            ...p,
                            cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
                          }));
                          setCardErrors((p) => ({ ...p, cvv: "" }));
                        }}
                        className={cn(
                          "w-full rounded-lg border px-3 py-2.5 text-sm bg-background text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-emerald-500/30 transition",
                          cardErrors.cvv ? "border-red-400" : "border-border",
                        )}
                      />
                      {cardErrors.cvv && (
                        <p className="text-xs text-red-500">{cardErrors.cvv}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Lock className="h-3.5 w-3.5 text-emerald-500" />
                  256-bit SSL encrypted. Your card details are never stored.
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep("select")}
                    className="flex-1 rounded-xl border border-border py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    // disabled={isProcessing}
                    disabled
                    className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-70 py-3 text-sm font-bold text-white transition-colors flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processing…
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4" />
                        Pay ${selectedBatch.price}
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: Shield, label: "Secure Payment", sub: "256-bit SSL" },
                { icon: Award, label: "Certificate", sub: "Upon completion" },
                { icon: Zap, label: "Instant Access", sub: "After payment" },
              ].map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="rounded-lg border border-border bg-white dark:bg-slate-900 p-3 text-center"
                >
                  <Icon className="h-5 w-5 text-emerald-500 mx-auto mb-1" />
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {label}
                  </p>
                  <p className="text-[10px] text-slate-500">{sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Order summary */}
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-white dark:bg-slate-900 overflow-hidden sticky top-6">
              {/* Course banner */}
              <div
                className={cn(
                  "h-24 flex items-center justify-center bg-linear-to-br",
                  course.gradientFrom,
                  course.gradientTo,
                )}
              >
                {IconComp && <IconComp className="h-10 w-10 text-white/80" />}
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-tight">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    by {course.instructor.name}
                  </p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Batch</span>
                    <span className="font-medium text-slate-900 dark:text-white text-xs text-right max-w-28">
                      {selectedBatch.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Starts</span>
                    <span className="font-medium text-slate-900 dark:text-white text-xs">
                      {formatDate(selectedBatch.startDate)}
                    </span>
                  </div>
                  {selectedBatch.originalPrice && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Original price</span>
                      <span className="text-slate-400 line-through text-xs">
                        ${selectedBatch.originalPrice}
                      </span>
                    </div>
                  )}
                  {savings > 0 && (
                    <div className="flex justify-between">
                      <span className="text-emerald-600 text-xs font-semibold">
                        You save
                      </span>
                      <span className="text-emerald-600 font-semibold text-xs">
                        -${savings}
                      </span>
                    </div>
                  )}
                </div>

                <div className="border-t border-border pt-3 flex justify-between items-center">
                  <span className="font-bold text-slate-900 dark:text-white">
                    Total
                  </span>
                  <span className="text-xl font-bold text-slate-900 dark:text-white">
                    ${selectedBatch.price}
                  </span>
                </div>

                {course.certificate && (
                  <p className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg px-3 py-2">
                    <Award className="h-3.5 w-3.5 shrink-0" />
                    Certificate of completion included
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, ArrowLeft, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) {
      setError("Email is required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle className="h-7 w-7 text-emerald-600" />
        </div>
        <h1 className="mt-4 text-xl font-bold text-slate-900">
          Check your inbox
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          If <span className="font-medium text-slate-700">{email}</span> is
          registered, we&apos;ve sent a password reset link.
        </p>
        <Link
          href="/signin"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Forgot your password?
        </h1>
        <p className="mt-1.5 text-sm text-slate-500">
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="space-y-1">
          <label
            htmlFor="email"
            className="text-sm font-medium text-slate-700"
          >
            Email address
          </label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            aria-invalid={!!error}
            aria-describedby={error ? "email-error" : undefined}
            className="h-11 px-3 text-sm"
            autoComplete="email"
          />
          {error && (
            <p id="email-error" className="text-xs text-destructive">
              {error}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Send Reset Link"
          )}
        </Button>
      </form>

      <Link
        href="/signin"
        className="mt-5 flex items-center justify-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Sign In
      </Link>
    </>
  );
}

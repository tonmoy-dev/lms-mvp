"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { GoogleIcon } from "@/components/ui/google-icon";
import { useAuth } from "@/components/providers/auth-provider";
import { cn } from "@/lib/utils";

type InputMode = "email" | "phone";

export default function RegisterPage() {
  const { register, signIn } = useAuth();
  const router = useRouter();
  const [inputMode, setInputMode] = useState<InputMode>("email");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  function validate() {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters.";
    }

    if (inputMode === "email") {
      if (!formData.email) {
        newErrors.email = "Email is required.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Enter a valid email address.";
      }
    } else {
      if (!formData.phone) {
        newErrors.phone = "Phone number is required.";
      } else if (!/^\+?[\d\s\-()]{7,15}$/.test(formData.phone)) {
        newErrors.phone = "Enter a valid phone number.";
      }
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!agreedToTerms) {
      newErrors.terms = "You must agree to the Terms of Service.";
    }

    return newErrors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    await register(formData.fullName, formData.email || formData.phone, formData.password);
    setIsLoading(false);
    router.push("/dashboard");
  }

  async function handleGoogleSignIn() {
    setIsGoogleLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    await signIn("alex@devpath.com", "password123");
    setIsGoogleLoading(false);
    router.push("/dashboard");
  }

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Create an account
        </h1>
        <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
          Enter your details below to create your account
        </p>
      </div>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isGoogleLoading || isLoading}
        className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-border bg-background py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isGoogleLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <GoogleIcon />
        )}
        Continue with Google
      </button>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">or</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="space-y-1">
          <label
            htmlFor="fullName"
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Full Name
          </label>
          <Input
            id="fullName"
            type="text"
            name="fullName"
            placeholder="Your full name"
            value={formData.fullName}
            onChange={handleChange}
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className="h-11 px-3 text-sm"
            autoComplete="name"
          />
          {errors.fullName && (
            <p id="fullName-error" className="text-xs text-destructive">
              {errors.fullName}
            </p>
          )}
        </div>

        <div className="flex rounded-lg border border-border p-0.5">
          <button
            type="button"
            onClick={() => setInputMode("email")}
            className={cn(
              "flex-1 rounded-md py-1.5 text-sm font-medium transition-colors",
              inputMode === "email"
                ? "bg-slate-900 text-white shadow-sm dark:bg-indigo-600"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            )}
          >
            Email
          </button>
          <button
            type="button"
            onClick={() => setInputMode("phone")}
            className={cn(
              "flex-1 rounded-md py-1.5 text-sm font-medium transition-colors",
              inputMode === "phone"
                ? "bg-slate-900 text-white shadow-sm dark:bg-indigo-600"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            )}
          >
            Phone
          </button>
        </div>

        <div className="space-y-1">
          {inputMode === "email" ? (
            <Input
              type="email"
              name="email"
              placeholder="m@example.com"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="h-11 px-3 text-sm"
              autoComplete="email"
            />
          ) : (
            <Input
              type="tel"
              name="phone"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={handleChange}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className="h-11 px-3 text-sm"
              autoComplete="tel"
            />
          )}
          {errors.email && (
            <p id="email-error" className="text-xs text-destructive">
              {errors.email}
            </p>
          )}
          {errors.phone && (
            <p id="phone-error" className="text-xs text-destructive">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label
            htmlFor="password"
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Minimum 8 characters"
              value={formData.password}
              onChange={handleChange}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              className="h-11 px-3 pr-10 text-sm"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p id="password-error" className="text-xs text-destructive">
              {errors.password}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Confirm Password
          </label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Repeat your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={
                errors.confirmPassword ? "confirmPassword-error" : undefined
              }
              className="h-11 px-3 pr-10 text-sm"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              aria-label={showConfirm ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              {showConfirm ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p id="confirmPassword-error" className="text-xs text-destructive">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Checkbox
            id="terms"
            checked={agreedToTerms}
            onChange={(e) => {
              setAgreedToTerms(e.target.checked);
              if (errors.terms)
                setErrors((prev) => ({ ...prev, terms: "" }));
            }}
            label={
              <>
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="font-medium text-slate-900 dark:text-slate-100 underline underline-offset-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-slate-900 dark:text-slate-100 underline underline-offset-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </>
            }
          />
          {errors.terms && (
            <p className="text-xs text-destructive pl-6">{errors.terms}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading || isGoogleLoading}
          className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Create Account"
          )}
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-slate-500 dark:text-slate-400">
        Already have an account?{" "}
        <Link
          href="/signin"
          className="font-semibold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          Sign in
        </Link>
      </p>
    </>
  );
}

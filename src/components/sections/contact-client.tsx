"use client";

import { useState } from "react";
import { Mail, MapPin, Clock, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RevealBlock } from "@/components/motion/reveal";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@devpath.academy",
    iconBg: "bg-indigo-100 dark:bg-indigo-900/40",
    iconColor: "text-indigo-600 dark:text-indigo-400",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Remote-first, worldwide",
    iconBg: "bg-violet-100 dark:bg-violet-900/40",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/40",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
];

export function ContactClient() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);
    setSubmitted(true);
    toast.success("Message sent!", {
      description: "We'll get back to you within 24 hours.",
    });
  }

  return (
    <RevealBlock className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Info cards */}
        <div className="space-y-4 lg:col-span-2">
          {contactInfo.map(({ icon: Icon, label, value, iconBg, iconColor }) => (
            <Card key={label} className="border border-slate-200 dark:border-slate-700">
              <CardContent className="flex items-center gap-4 p-4">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
                >
                  <Icon className={`h-5 w-5 ${iconColor}`} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {value}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Form */}
        <Card className="border border-slate-200 dark:border-slate-700 lg:col-span-3">
          <CardContent className="p-6">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40">
                  <CheckCircle className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                  Message sent!
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Thank you for reaching out. We&apos;ll get back to you within
                  24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-email"
                      className="text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Email
                    </label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      className="h-11"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Subject
                  </label>
                  <Input
                    id="subject"
                    placeholder="How can we help?"
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    placeholder="Tell us more..."
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 bg-indigo-600 text-white hover:bg-indigo-700 text-sm font-semibold"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </RevealBlock>
  );
}

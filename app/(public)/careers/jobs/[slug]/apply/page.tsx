"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Briefcase,
  Building2,
  BadgeDollarSign,
  MonitorCog,
  CalendarClock,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import logo from "@/assets/logo-1.png";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import Reveal from "@/components/public/shared/Reveal";

type JobInfo = {
  id: number;
  title: string;
  location: string;
  type: string;
  salary: string | null;
  industry: string | null;
  jobFunction: string | null;
  deadline: string | null;
  createdAt: string;
};

export default function ApplicationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const [job, setJob] = useState<JobInfo | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    coverLetter: "",
    portfolio: "",
    linkedIn: "",
    resume: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/jobs/${slug}`)
      .then((r) => r.json())
      .then((data) => setJob(data))
      .catch(() => setJob(null));
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const fd = new FormData();
      fd.append("jobSlug", slug);
      fd.append("fullName", formData.fullName);
      fd.append("email", formData.email);
      fd.append("phone", formData.phone);
      fd.append("address", formData.address);
      fd.append("coverLetter", formData.coverLetter);
      fd.append("portfolio", formData.portfolio);
      fd.append("linkedIn", formData.linkedIn);
      if (formData.resume) fd.append("resume", formData.resume);

      const res = await fetch("/api/applications", {
        method: "POST",
        body: fd,
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Submission failed");

      toast.success("Application submitted successfully!");
      setTimeout(() => router.push(`/careers/jobs/${slug}`), 1500);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-secondary/50 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:bg-background transition-all duration-200";

  return (
    <div className="pt-16 lg:py-24">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Application Form */}

    
            
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-background border border-primary rounded-lg p-6 md:p-8">
              <div className="flex items-center gap-4 mb-6">
                {job ? (
                  <>
                    <Image
                      src={logo}
                      alt="Article Craft"
                      className="w-10 h-10 object-cover rounded-full"
                    />
                    <div>
                      <h5 className="text-xl font-medium">{job.title}</h5>
                      <p className="text-xs text-muted-foreground">
                        Application Form
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-[220px]" />
                      <Skeleton className="h-4 w-[140px]" />
                    </div>
                  </>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Personal Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                      Full name *
                    </label>
                    <Input
                      required
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className={inputClass}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                      Email address *
                    </label>
                    <Input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={inputClass}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                      Phone *
                    </label>
                    <Input
                      type="tel"
                      required
                      placeholder="+977 98XXXXXXXX"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className={inputClass}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                      Address *
                    </label>
                    <Input
                      required
                      placeholder="City, Country"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Cover Letter */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                    Cover letter *
                  </label>
                  <Textarea
                    required
                    rows={5}
                    placeholder="Tell us why you're interested in this role..."
                    value={formData.coverLetter}
                    onChange={(e) =>
                      setFormData({ ...formData, coverLetter: e.target.value })
                    }
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                      Portfolio
                    </label>
                    <Input
                      type="url"
                      placeholder="https://yourportfolio.com"
                      value={formData.portfolio}
                      onChange={(e) =>
                        setFormData({ ...formData, portfolio: e.target.value })
                      }
                      className={inputClass}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                      LinkedIn
                    </label>
                    <Input
                      type="url"
                      placeholder="https://linkedin.com/in/you"
                      value={formData.linkedIn}
                      onChange={(e) =>
                        setFormData({ ...formData, linkedIn: e.target.value })
                      }
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Resume Upload */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                    Resume *
                  </label>

                  {!formData.resume ? (
                    <label className="flex flex-col items-center justify-center w-full h-32 border border-dashed border-border rounded-lg cursor-pointer bg-secondary/30 hover:bg-secondary/50 transition">
                      <p className="text-sm text-muted-foreground">
                        <span className="text-primary font-medium">
                          Click to upload
                        </span>{" "}
                        or drag & drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF, DOC, DOCX · Max 5MB
                      </p>

                      <Input
                        type="file"
                        required
                        accept=".pdf,.doc,.docx"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            resume: e.target.files?.[0] || null,
                          })
                        }
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="flex items-center justify-between p-3 border rounded-lg bg-secondary/40">
                      <p className="text-sm truncate">{formData.resume.name}</p>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, resume: null })
                        }
                        className="text-xs text-destructive"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 flex-wrap gap-3">
                  <p className="text-xs text-muted-foreground">
                    We'll never share your details.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-6 py-4 text-white rounded-full text-sm font-bold bg-primary hover:scale-105 transition-all duration-300 ease-out disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {isSubmitting && (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    )}
                    {isSubmitting ? "Submitting..." : "Submit application"}
                  </button>
                </div>
              </form>
            </div>
          </div>


          
          {/* Right Column - Job Info */}

            
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-background border border-primary rounded-lg p-6">
                <h4 className="text-sm font-bold tracking-widest uppercase text-black mb-4">
                  Job details
                </h4>

                {!job ? (
                  <div className="space-y-4">
                    {/* Row skeletons */}
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Skeleton className="w-4 h-4 rounded-sm mt-1" />
                        <Skeleton className="h-4 w-[140px]" />
                      </div>
                    ))}

                    {/* Button skeleton */}
                    <Skeleton className="h-12 w-full rounded-full mt-6" />
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 text-sm">
                      <div className="flex items-start gap-3">
                        <Clock className="w-4 h-4 text-primary mt-0.5" />
                        <span className="text-muted-foreground">
                          Posted{" "}
                          {new Date(job.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      {job.deadline && (
                        <div className="flex items-start gap-3">
                          <CalendarClock className="w-4 h-4 text-primary mt-0.5" />
                          <span className="text-muted-foreground">
                            Deadline: {job.deadline}
                          </span>
                        </div>
                      )}

                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-primary mt-0.5" />
                        <span className="text-muted-foreground">
                          {job.location}
                        </span>
                      </div>

                      {job.salary && (
                        <div className="flex items-start gap-3">
                          <BadgeDollarSign className="w-4 h-4 text-primary mt-0.5" />
                          <span className="text-muted-foreground">
                            {job.salary}
                          </span>
                        </div>
                      )}

                      {job.industry && (
                        <div className="flex items-start gap-3">
                          <Building2 className="w-4 h-4 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium text-sm">
                              {job.industry}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Industry
                            </p>
                          </div>
                        </div>
                      )}

                      {job.type && (
                        <div className="flex items-start gap-3">
                          <Briefcase className="w-4 h-4 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium text-sm">{job.type}</p>
                            <p className="text-xs text-muted-foreground">
                              Employment type
                            </p>
                          </div>
                        </div>
                      )}

                      {job.jobFunction && (
                        <div className="flex items-start gap-3">
                          <MonitorCog className="w-4 h-4 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium text-sm">
                              {job.jobFunction}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Job function
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

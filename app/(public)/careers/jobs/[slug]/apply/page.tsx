"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  Briefcase,
  Building2,
  BadgeDollarSign,
  MonitorCog,
  CalendarClock,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import logo from "@/assets/logo-1.png";

// Mock job data (same as job detail page)
const jobData = {
  title: "Senior Software Engineer (Backend)",
  company: "Article Craft Tech",
  level: "Senior Level",
  location: "Remote",
  type: "Full-time",
  posted: "2 days ago",
  deadline: "March 31, 2024",
  applicants: 24,
  salary: "$120,000 - $150,000",
  industry: "Software Development",
  jobFunction: "Engineering",
};

export default function ApplicationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Application submitted:", formData);

    toast.success("Application submitted successfully!", {
      position: "top-center",
    });

    setIsSubmitting(false);

    // Redirect back to job page after 2 seconds
    setTimeout(() => {
      router.push(`/careers/jobs/${slug}`);
    }, 2000);
  };

  return (
    <div className="pt-16 lg:py-24">
      {/* Main Content */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Application Form */}
          <div className="lg:col-span-2 space-y-4">
            {/* Back Button */}
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Job Details
            </button>

            {/* Form Card */}
            <div className="bg-secondary rounded-xl p-6 border">
              {/* Job Title & Company */}
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src={logo}
                  alt={jobData.company}
                  className="w-10 h-10 object-contain rounded-full"
                />
                <div>
                  <h3 className="text-xl font-bold">{jobData.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Application Form
                  </p>
                </div>
              </div>

              {/* Application Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Personal Information Section */}
                <div>
                  <h4>Personal Information</h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="fullName"
                        required
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        placeholder="John Doe"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">
                        Email Address{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="john@example.com"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">
                        Phone Number <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+1 (555) 000-0000"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">
                        Address <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="address"
                        required
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        placeholder="City, State, Country"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Information Section */}
                <div>
                  <h4>Professional Information</h4>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="coverLetter">
                        Cover Letter <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="coverLetter"
                        required
                        value={formData.coverLetter}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            coverLetter: e.target.value,
                          })
                        }
                        placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                        className="min-h-[150px] resize-none mt-1 bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="portfolio">Portfolio URL</Label>
                        <Input
                          id="portfolio"
                          type="url"
                          value={formData.portfolio}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              portfolio: e.target.value,
                            })
                          }
                          placeholder="https://yourportfolio.com"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="linkedIn">LinkedIn Profile</Label>
                        <Input
                          id="linkedIn"
                          type="url"
                          value={formData.linkedIn}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              linkedIn: e.target.value,
                            })
                          }
                          placeholder="https://linkedin.com/in/yourprofile"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="resume">
                        Resume/CV <span className="text-destructive">*</span>
                      </Label>

                      {/* File Upload Area */}
                      <div className="mt-2">
                        {!formData.resume ? (
                          <label
                            htmlFor="resume"
                            className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer bg-background hover:bg-secondary/50 transition"
                          >
                            <div className="flex flex-col items-center justify-center py-8">
                              <svg
                                className="w-10 h-10 mb-3 text-primary"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                />
                              </svg>
                              <p className="text-sm">
                                <span className="font-semibold text-primary">
                                  Click to Upload
                                </span>{" "}
                                <span className="text-muted-foreground">
                                  or drag and drop
                                </span>
                              </p>
                              <p className="text-xs text-muted-foreground">
                                (Max. File size: 5 MB)
                              </p>
                              <p className="text-xs text-muted-foreground mt-2">
                                Accepted formats: PDF, DOC, DOCX
                              </p>
                            </div>
                            <Input
                              id="resume"
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
                          <div className="flex items-center justify-between p-4 border rounded-lg bg-background">
                            <div className="flex items-center gap-3 flex-1">
                              <svg
                                className="w-8 h-8 text-muted-foreground"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                />
                              </svg>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">
                                  {formData.resume.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {(formData.resume.size / 1024).toFixed(0)} KB
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                setFormData({ ...formData, resume: null })
                              }
                              className="ml-4 text-muted-foreground hover:text-destructive transition"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                    className="px-6 py-6 rounded-xl text-sm font-semibold"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-6 text-white rounded-xl text-sm font-bold bg-primary hover:scale-105 transition-all duration-300 ease-out disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner data-icon="inline-start" className="mr-2" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Sticky Sidebar (Job Info) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Job Info Card */}
              <div className="bg-secondary rounded-xl p-6 border">
                <h4 className="mb-4">Job Details</h4>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">
                      Posted {jobData.posted}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">
                      {jobData.applicants} people have applied
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <CalendarClock className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">
                      Deadline: {jobData.deadline}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">
                      {jobData.location}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <BadgeDollarSign className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">
                      {jobData.salary}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <Building2 className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-semibold text-sm">
                        {jobData.industry}
                      </p>
                      <p className="text-xs text-muted-foreground">Industry</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-semibold text-sm">{jobData.type}</p>
                      <p className="text-xs text-muted-foreground">
                        Employment Type
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <MonitorCog className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-semibold text-sm">
                        {jobData.jobFunction}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Job Functions
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

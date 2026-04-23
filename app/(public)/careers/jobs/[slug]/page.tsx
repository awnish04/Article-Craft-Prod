import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Briefcase,
  Building2,
  MonitorCog,
  CalendarClock,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-1.png";
import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let job;
  try {
    const [found] = await db
      .select()
      .from(jobs)
      .where(eq(jobs.slug, slug))
      .limit(1);
    job = found;
  } catch {
    job = null;
  }

  if (!job) return notFound();

  // Parse newline-separated text fields into arrays
  const toList = (val: string | null) =>
    val
      ? val
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

  const responsibilities = toList(job.responsibilities);
  const requiredSkills = toList(job.requiredSkills);
  const goodToHave = toList(job.goodToHave);
  const lookingFor = toList(job.lookingFor);

  return (
    <div className="pt-16 lg:py-24">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Job Details */}
          <div className="lg:col-span-2 space-y-4 bg-secondary rounded-xl p-6 border">
            {/* Job Title */}
            <div className="flex items-center gap-4">
              <Image
                src={logo}
                alt="Article Craft Tech"
                className="w-10 h-10 object-contain rounded-md"
              />
              <h3>{job.title}</h3>
            </div>

            {/* Job Description */}
            {job.description && (
              <div>
                <h4>Job Description</h4>

                <span className="text-muted-foreground">{job.description}</span>
              </div>
            )}

            {/* Role Summary */}
            {job.roleSummary && (
              <div>
                <h4>Role Summary</h4>
                <span className="text-muted-foreground">{job.roleSummary}</span>
              </div>
            )}

            {/* Responsibilities */}
            {responsibilities.length > 0 && (
              <div>
                <h4>Responsibilities</h4>
                <ul className="space-y-2">
                  {responsibilities.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Required Skills */}
            {requiredSkills.length > 0 && (
              <div>
                <h4>Required Skills</h4>
                <ul className="space-y-3">
                  {requiredSkills.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Qualifications */}
            {toList(job.experience).length > 0 && (
              <div>
                <h4>Qualifications</h4>
                <ul className="space-y-2">
                  {toList(job.experience).map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Good to Have */}
            {goodToHave.length > 0 && (
              <div>
                <h4>Good to Have</h4>
                <ul className="space-y-3">
                  {goodToHave.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Looking For */}
            {lookingFor.length > 0 && (
              <div>
                <h4>What We&apos;re Looking For</h4>
                <ul className="space-y-3">
                  {lookingFor.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column - Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-secondary rounded-xl p-6 border">
                <h4 className="mb-4">Job Details</h4>
                <div className="space-y-4 mb-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-5 h-5 text-primary" />
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
                    <div className="flex items-center gap-3 text-sm">
                      <CalendarClock className="w-5 h-5 text-primary" />
                      <span className="text-muted-foreground">
                        Deadline: {job.deadline}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">
                      {job.location}
                    </span>
                  </div>
                  {job.salary && (
                    <div className="flex items-center gap-3 text-sm">
                      <Wallet className="w-5 h-5 text-primary" />
                      <span className="text-muted-foreground">
                        {job.salary}
                      </span>
                    </div>
                  )}
                  {job.industry && (
                    <div className="flex items-center gap-3 text-sm">
                      <Building2 className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-semibold text-sm">{job.industry}</p>
                        <p className="text-xs text-muted-foreground">
                          Industry
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-sm">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-semibold text-sm">{job.type}</p>
                      <p className="text-xs text-muted-foreground">
                        Employment Type
                      </p>
                    </div>
                  </div>
                  {job.jobFunction && (
                    <div className="flex items-center gap-3 text-sm">
                      <MonitorCog className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-semibold text-sm">
                          {job.jobFunction}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Job Function
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <Link href={`/careers/jobs/${slug}/apply`} className="block">
                  <Button className="w-full py-6 text-white text-sm font-bold bg-primary hover:scale-105 transition-all duration-300 ease-out">
                    Apply for this job
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

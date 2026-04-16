import Image from "next/image";
import Link from "next/link";
import OfficeGathering_2 from "@/assets/OfficeGathering_2.jpg";
import Workspace_7 from "@/assets/Workspace_7.jpg";
import OfficeGathering_3 from "@/assets/OfficeGathering_3.jpg";
import Reveal from "@/components/public/shared/Reveal";
import Benefits from "@/components/public/careers/Benefits";
import Openings from "@/components/public/careers/Openings";
import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

// Revalidate every 60 seconds so new job postings appear without a full rebuild
export const revalidate = 60;

export default async function CareersPage() {
  let allJobs: (typeof jobs.$inferSelect)[] = [];
  try {
    allJobs = await db.select().from(jobs).orderBy(desc(jobs.createdAt));
  } catch {
    allJobs = [];
  }

  return (
    <div className="pt-16 lg:pt-28">
      {/* Hero */}
      <section className="container mx-auto px-4 lg:px-8 py-12 lg:py-16 items-center text-center">
        <div className="max-w-6xl mx-auto">
          <Reveal delay={0.4}>
            <h1>
              <span className="block">
                Shaping the <span className="text-primary">Future</span> with
              </span>
              <span className="block">
                Custom{" "}
                <span className="text-primary">Software Development</span>
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.5}>
            <p>
              Article Craft Tech specializes in building robust VoIP
              infrastructure, leveraging AI-powered communication systems, and
              delivering strategic integration solutions that optimize
              workflows, improve customer engagement, and enable businesses to
              stay ahead in a competitive global market.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
          {[OfficeGathering_2, Workspace_7, OfficeGathering_3].map((img, i) => (
            <Reveal key={i} delay={0.5 + i * 0.15}>
              <Image
                src={img}
                alt="Careers"
                className="rounded-lg object-cover w-full h-48 sm:h-56 md:h-64"
                priority={i === 0}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <img
          src="/Whangaehu.svg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-white/80 to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
          <div className="max-w-3xl">
            <Reveal delay={0.5}>
              <div className="inline-block border border-primary text-primary px-4 py-1 rounded-full text-xs font-semibold mb-4">
                CAREER
              </div>
            </Reveal>
            <Reveal delay={0.5}>
              <h2>
                <span className="text-primary">Join forces</span> with us to
                craft something{" "}
                <span className="text-primary">truly exceptional</span>
              </h2>
            </Reveal>
            <Reveal delay={0.5}>
              <p>Check out the perfect employee engagement in action, today.</p>
            </Reveal>
            <Reveal delay={0.5}>
              <div className="flex gap-4 mt-6">
                <Link
                  href="#openings"
                  className="inline-flex items-center px-6 py-4 text-white rounded-full text-sm font-bold bg-primary hover:scale-105 transition-all duration-300 ease-out"
                >
                  View Job Openings
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Benefits />
      <Openings jobs={allJobs} />
    </div>
  );
}

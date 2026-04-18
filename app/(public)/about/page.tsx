"use client";

import Image from "next/image";

import StatsSection from "@/components/public/home/StatsSection";
import LeaderSection from "@/components/public/about/LeaderSection";
import CoreValues from "@/components/public/about/CoreValues";
import Approach from "@/components/public/about/Approach";
import Testimonials from "@/components/public/about/Testimonials";

// Images (make sure these are inside /public or properly imported)
import BoardRoom_1 from "@/assets/BoardRoom_1.jpg";
import Office_7 from "@/assets/Office_7.jpg";
import Office_2 from "@/assets/Office_2.jpg";
import Reveal from "@/components/public/shared/Reveal";

export default function AboutPage() {
  return (
    <div className="pt-16 lg:pt-28">
      {/* Hero */}
      <section className="container mx-auto px-4 lg:px-8 py-12 lg:py-16 items-center text-center">
        <div className="text-center max-w-4xl mx-auto">
          <Reveal delay={0.4}>
            <h1>
              <span className="block">
                Building Smarter <span className="text-primary">Software </span>{" "}
                Driving <span className="text-primary">Intelligent </span>{" "}
                Automation
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.5}>
            <p className="max-w-3xl mx-auto md:text-center text-justify">
              We help organizations work smarter by automating workflows and
              building reliable, secure software powered by practical AI —
              reducing manual effort, improving accuracy, and unlocking insights
              through thoughtful design and continuous optimization.
            </p>
          </Reveal>
        </div>

        {/* Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
          {[Office_2, Office_7, BoardRoom_1].map((img, i) => (
            <Reveal key={i} delay={0.5 + i * 0.15}>
              <Image
                src={img}
                alt="Office"
                className="rounded-lg object-cover w-full h-48 sm:h-56 md:h-64"
                priority={i === 0}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats */}
      <StatsSection />

      {/* Workspace */}
      {/* <CreativeHub /> */}

      {/* Leadership Section */}
      <LeaderSection />

      {/* Core Values */}
      <CoreValues />

      {/* Approach */}
      <Approach />

      {/* Testimonials */}
      <Testimonials />
    </div>
  );
}

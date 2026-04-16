"use client";

import Image from "next/image";

import StatsSection from "@/components/public/home/StatsSection";
import CreativeHub from "@/components/public/home/CreativeHub";
import LeaderSection from "@/components/public/about/LeaderSection";
import CoreValues from "@/components/public/about/CoreValues";
import Approach from "@/components/public/about/Approach";
import Testimonials from "@/components/public/about/Testimonials";

// Images (make sure these are inside /public or properly imported)
import heroImg1 from "@/assets/hero-office-1.jpg";
import heroImg2 from "@/assets/hero-office-2.jpg";
import heroImg3 from "@/assets/hero-office-3.jpg";
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
                Powering a Connected{" "}
                <span className="text-primary">World </span>
              </span>
              <span className="block">
                With <span className="text-primary">Smarter </span> Technology
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.5}>
            <p>
              We help enterprises break barriers with intelligent VoIP and
              AI-enabled communication systems built to unify teams, streamline
              operations, and enable global growth.
            </p>
          </Reveal>
        </div>

        {/* Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
          {[heroImg1, heroImg2, heroImg3].map((img, i) => (
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

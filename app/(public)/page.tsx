"use client";

import Image from "next/image";
import Reveal from "@/components/public/shared/Reveal";
import CreativeHub from "@/components/public/home/CreativeHub";
import MissionVision from "@/components/public/home/MissionVision";

import BoardRoom_1 from "@/assets/BoardRoom_1.jpg";
import Office_8 from "@/assets/Office_8.jpg";
import Office_9 from "@/assets/Office_9.jpg";
import OfficeGathering_6 from "@/assets/OfficeGathering_6.jpg";
import Workspace_8 from "@/assets/Workspace_8.jpg";
import Workspace_9 from "@/assets/Workspace_9.jpg";
import Workspace_10 from "@/assets/Workspace_10.jpg";
import StatsSection from "@/components/public/home/StatsSection";
import Team from "@/components/public/home/Team";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity";
import Link from "next/link";

export default function Home() {
  return (
    <div className="pt-16 lg:pt-28">
      {/* Hero */}
      <section className="container mx-auto px-4 lg:px-8 py-12 lg:py-16 items-center text-center">
        <div className="max-w-5xl mx-auto">
          <Reveal delay={0.4}>
            <h1 className="leading-tight">
              <span className="block">
                Building <span className="text-primary">Custom</span> Software,
              </span>
              <span className="block">
                Driving Intelligent{" "}
                <span className="text-primary">Automation.</span>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.5}>
            <p>
              Working with Article Craft has revolutionized our operations.
              Their expertise in both custom software and AI helped us build a
              solution that we couldn't find anywhere else.
            </p>
          </Reveal>
          <Reveal delay={0.5}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <a
                href="/services"
                className="w-full sm:w-auto justify-center inline-flex items-center px-6 py-4 bg-primary text-white rounded-full text-sm font-bold hover:scale-105 transition-all duration-300 ease-out"
              >
                Get a Free Consultation
              </a>
              <Link
                href="/careers"
                className="w-full sm:w-auto justify-center border border-border bg-white hover:border-primary inline-flex items-center px-6 py-4 rounded-full text-sm font-bold hover:scale-105 transition-all duration-300 ease-out text-black"
                onClick={() => {
                  const element = document.getElementById("events");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                View Careers
              </Link>
            </div>
          </Reveal>
        </div>
        {/* Images scroll velocity - Full Width */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-8 mt-12">
          <Reveal delay={0.5}>
            <ScrollVelocityContainer className="w-full">
              <ScrollVelocityRow
                baseVelocity={6}
                direction={1}
                className="py-4"
              >
                {[
                  BoardRoom_1,
                  Office_8,
                  OfficeGathering_6,
                  Workspace_9,
                  Workspace_10,
                ].map((img, idx) => (
                  <Image
                    key={idx}
                    src={img}
                    alt="Office"
                    width={200}
                    height={50}
                    className="mx-2 lg:mx-4 inline-block h-28 w-36 lg:h-32 lg:w-64 rounded-lg object-cover shadow-sm"
                  />
                ))}
              </ScrollVelocityRow>
              <ScrollVelocityRow
                baseVelocity={6}
                direction={-1}
                className="py-4"
              >
                {[
                  Workspace_8,
                  OfficeGathering_6,
                  Office_9,
                  BoardRoom_1,
                ].map((img, idx) => (
                  <Image
                    key={idx}
                    src={img}
                    alt="Office"
                    width={200}
                    height={50}
                    className="mx-2 lg:mx-4 inline-block h-28 w-36 lg:h-32 lg:w-64 rounded-lg object-cover shadow-sm"
                  />
                ))}
              </ScrollVelocityRow>
            </ScrollVelocityContainer>
          </Reveal>
          <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r"></div>
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l"></div>
        </div>
      </section>

      {/* Stats */}
      <Reveal>
        <StatsSection />
      </Reveal>

      {/* Mission & Vision */}
      <MissionVision />

      {/* Workspace */}
      <CreativeHub />

      {/* Team Section */}
      <Team />
    </div>
  );
}

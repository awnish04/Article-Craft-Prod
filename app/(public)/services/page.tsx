"use client";

import Reveal from "@/components/public/shared/Reveal";
import ServiceDomains from "@/components/public/services/ServiceDomains";
import Clients from "@/components/public/services/Clients";

export default function ServicesPage() {
  return (
    <div className="pt-16 lg:pt-28">
      {/* Hero */}
      <section className="container mx-auto px-4 lg:px-8 py-12 lg:py-16 items-center text-center">
        <div className="text-center max-w-4xl mx-auto">
          <Reveal delay={0.5}>
            <h1>
              Services <span className="text-primary">&</span> Expertise
            </h1>
          </Reveal>
          <Reveal delay={0.5}>
            <p className="max-w-4xl mx-auto md:text-center text-justify">
              Article Craft specializes in building custom software, automating
              complex workflows, and delivering AI-powered solutions that reduce
              manual effort, improve accuracy, and help businesses scale with
              confidence in a fast-moving digital world.
            </p>
          </Reveal>
        </div>
      </section>

      <ServiceDomains />
      <Clients />
    </div>
  );
}

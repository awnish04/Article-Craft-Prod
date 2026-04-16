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
          <Reveal delay={0.4}>
            <h1>
              Services <span className="text-primary">&</span> Expertise
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
      </section>

      <ServiceDomains />
      <Clients />
    </div>
  );
}

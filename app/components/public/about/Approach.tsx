"use client";

import Image from "next/image";
import Reveal from "@/components/public/shared/Reveal";
import heroImg1 from "@/assets/hero-office-1.jpg";

export default function Approach() {
  return (
    <section className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
      <div className="grid md:grid-cols-[1.6fr_1fr] gap-5">
        <div>
          <Reveal delay={0.5}>
            <div className="inline-block border border-primary text-primary px-4 py-1 rounded-full text-xs font-semibold mb-4">
              APPROACH
            </div>
          </Reveal>

          <Reveal delay={0.5}>
            <h2>
              Building <span className="text-primary">Smarter</span> Digital{" "}
              <span className="text-primary">Solutions</span>
            </h2>
          </Reveal>

          <Reveal delay={0.5}>
            <p>
              At Article Craft Tech, we turn ideas into reliable digital
              products. Our team focuses on creating solutions that are easy to
              use, scalable, and built for long-term success.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.5}>
          <Image
            src={heroImg1}
            alt="Modern workspace"
            className="rounded-lg object-cover w-full h-full shadow-lg"
          />
        </Reveal>
      </div>
    </section>
  );
}

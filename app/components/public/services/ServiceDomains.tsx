"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import Reveal from "@/components/public/shared/Reveal";

import HeroImg1 from "@/assets/HeroImg1.jpg";
import HeroImg2 from "@/assets/HeroImg2.jpg";
import HeroImg3 from "@/assets/HeroImg3.jpg";
import HeroImg4 from "@/assets/HeroImg4.jpg";

type Service = {
  title: string;
  desc: string;
  video?: string;
  img?: StaticImageData;
};

const services: Service[] = [
  {
    title: "Introduction",
    desc: "We build reliable and scalable communication systems tailored to your business needs.",
    video: "/ArticleCraftVideo.mp4",
  },
  {
    title: "Cloud Communication",
    desc: "Modern cloud-based calling, messaging, and video solutions in one place.",
    img: HeroImg1,
  },
  {
    title: "Custom Integrations",
    desc: "Seamlessly connect your tools with custom APIs and workflows.",
    img: HeroImg2,
  },
  {
    title: "AI Voice Solutions",
    desc: "Smart voice automation and analytics powered by AI.",
    img: HeroImg4,
  },
  {
    title: "24/7 Support",
    desc: "Reliable support and monitoring to keep your systems running smoothly.",
    img: HeroImg3,
  },
];

export default function ServiceDomains() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? 0 : index);
  };

  return (
    <section className="bg-secondary">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-20">
        <div className="grid md:grid-cols-[1fr_1fr] gap-12">
          {/* Left Side - Header & Navigation */}
          <div>
            <div className="mb-8">
              <Reveal delay={0.5}>
                <div className="inline-block border border-primary text-primary px-4 py-1 rounded-full text-xs font-semibold mb-4">
                  OUR SERVICES
                </div>
              </Reveal>
              <Reveal delay={0.5}>
                <h2>
                  Expert <span className="text-primary">Care </span> For Your
                  Specific <span className="text-primary">Needs</span>
                </h2>
              </Reveal>
              <Reveal delay={0.5}>
                <p>
                  Our expertise lies in crafting scalable, resilient
                  communication architectures that align with modern enterprise
                  complexity and unlock operational excellence.
                </p>
              </Reveal>
            </div>

            <div className="space-y-2">
              {services.map((svc, i) => (
                <Reveal key={svc.title} delay={0.3 + i * 0.05}>
                  <button
                    onClick={() => toggle(i)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${
                      openIndex === i
                        ? "text-secondary bg-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-primary/30 border"
                    }`}
                  >
                    {svc.title}
                  </button>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right Side - Service Content */}
          <div className="relative min-h-[600px]">
            {services.map((svc, i) => (
              <div
                key={svc.title}
                className={`transition-all duration-500 ${
                  openIndex === i
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"
                }`}
              >
                <Reveal delay={0.5}>
                  <div className="bg-secondary rounded-2xl overflow-hidden mb-6">
                    {svc.video ? (
                      <video
                        src={svc.video}
                        controls
                        className="w-full h-64 md:h-80 object-contain bg-[#F5EFE8]"
                      />
                    ) : svc.img ? (
                      <Image
                        src={svc.img}
                        alt={svc.title}
                        className="w-full h-64 md:h-80 object-cover"
                      />
                    ) : null}
                  </div>
                </Reveal>

                <Reveal delay={0.5}>
                  <h3>{svc.title}</h3>
                </Reveal>

                <Reveal delay={0.5}>
                  <p>{svc.desc}</p>
                </Reveal>

                <Reveal delay={0.5}>
                  <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                    <Link
                      href="#"
                      className="w-full sm:w-auto justify-center inline-flex items-center px-6 py-4 text-white rounded-full text-sm font-bold bg-primary hover:scale-105 transition-all duration-300 ease-out"
                    >
                      Details Services
                    </Link>
                    <Link
                      href="#"
                      className="w-full sm:w-auto justify-center border border-border bg-white hover:border-primary inline-flex items-center px-6 py-4 rounded-full text-sm font-bold hover:scale-105 transition-all duration-300 ease-out text-black"
                    >
                      Book Appointment
                    </Link>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

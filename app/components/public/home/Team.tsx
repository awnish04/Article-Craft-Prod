"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Reveal from "@/components/public/shared/Reveal";

import team1 from "@/assets/TeamImages/1.png";
import team2 from "@/assets/TeamImages/2.png";
import team3 from "@/assets/TeamImages/3.png";
import team4 from "@/assets/TeamImages/4.png";
import team5 from "@/assets/TeamImages/5.png";

// Criss-cross origin offsets for diagonal entry
const LEFT_ORIGINS = [{ x: -50, y: -50, rotate: -20 }];

const RIGHT_ORIGINS = [{ x: 50, y: 50, rotate: 20 }];

const IMAGES = [team1, team2, team3, team4, team5];

// Team members for mobile view
const TEAM_MEMBERS = [
  { name: "John Doe", role: "Founder & Chairman", img: team1 },
  { name: "John Doe", role: "CEO & Co-Founder", img: team2 },
  { name: "Jane Doe", role: "CTO", img: team3 },
  { name: "Jane Doe", role: "Lead Developer", img: team4 },
  { name: "John Doe", role: "Lead Developer", img: team5 },
];

// Left column: 5 images in zig-zag pattern - alternating close and far
const LEFT_COLUMN = Array.from({ length: 5 }, (_, i) => {
  const isClose = i % 2 === 1;

  return {
    img: IMAGES[(i + 5) % IMAGES.length],
    offsetX: isClose ? 60 : 250,
    origin: LEFT_ORIGINS[i % LEFT_ORIGINS.length],
  };
});

// Right column: 5 images in zig-zag pattern - alternating close and far
const RIGHT_COLUMN = Array.from({ length: 5 }, (_, i) => {
  const isClose = i % 2 === 1;

  return {
    img: IMAGES[(i + 1) % IMAGES.length],
    offsetX: isClose ? -60 : -250,
    origin: RIGHT_ORIGINS[i % RIGHT_ORIGINS.length],
  };
});

// Individual team member image component with useInView
function TeamMemberImage({
  src,
  alt,
  origin,
}: {
  src: any;
  alt: string;
  origin: { x: number; y: number; rotate: number };
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "0px",
    amount: 0.5,
  });

  return (
    <motion.div
      ref={ref}
      className="relative w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden border border-primary"
      animate={
        isInView
          ? { scale: 1, opacity: 1, x: 0, y: 0, rotate: 0 }
          : {
              scale: 0,
              opacity: 0,
              x: origin.x,
              y: origin.y,
              rotate: origin.rotate,
            }
      }
      transition={{
        duration: 1,
        ease: [0.12, 0.8, 0.24, 1],
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-[center_39%]"
        loading="lazy"
      />
    </motion.div>
  );
}

export default function Team() {
  return (
    <>
      {/* ================= DESKTOP ================= */}
      <section
        className="hidden md:block relative h-[180vh]"
        style={{ scrollBehavior: "smooth" }}
      >
        {/* Sticky center content */}
        <div className="sticky top-0 h-screen flex items-center justify-center pointer-events-none">
          <div className="relative z-10 max-w-2xl mx-auto px-6 text-center pointer-events-auto">
            <Reveal delay={0.5}>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2 }}
              >
                Our Creative <span className="text-primary">Team</span>
              </motion.h2>
            </Reveal>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We&apos;re building a team that shapes how the world&apos;s most
              ambitious companies present themselves.
              <br />
              If that excites you, let&apos;s talk.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8"
            >
              <Link
                href="/careers"
                className="w-full sm:w-auto justify-center inline-flex items-center px-6 py-4 bg-foreground text-white rounded-full text-sm font-bold bg-primary hover:scale-105 transition-all duration-300 ease-out"
              >
                Our Team
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Left column - absolute positioned */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="flex flex-col items-start gap-20 py-16">
            {LEFT_COLUMN.map((member, idx) => (
              <div
                key={`left-${idx}`}
                style={{
                  transform: `translateX(${member.offsetX}px)`,
                }}
              >
                <TeamMemberImage
                  src={member.img}
                  alt="Team member"
                  origin={member.origin}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right column - absolute positioned with offset */}
        <div className="absolute top-0 right-0 w-[28%] lg:w-[48%] h-full">
          <div className="flex flex-col items-end gap-20 py-16">
            {RIGHT_COLUMN.map((member, idx) => (
              <div
                key={`right-${idx}`}
                style={{
                  transform: `translateX(${member.offsetX}px)`,
                }}
              >
                <TeamMemberImage
                  src={member.img}
                  alt="Team member"
                  origin={member.origin}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MOBILE ================= */}
      <section className="md:hidden bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl font-bold">
                Our Creative <span className="text-primary">Team</span>
              </h2>
            </Reveal>

            <p className="mt-4 text-muted-foreground">
              We build modern digital experiences.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
            {TEAM_MEMBERS.map((member, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-2 border-primary">
                    <Image
                      src={member.img}
                      alt={member.name}
                      fill
                      className="object-cover object-[center_29%]"
                    />
                  </div>
                  <h6 className="font-bold">{member.name}</h6>
                  <h6 className="text-sm">{member.role}</h6>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/careers"
              className="w-auto justify-center inline-flex items-center px-6 py-4 bg-foreground text-white rounded-full text-sm font-bold bg-primary hover:scale-105 transition-all duration-300 ease-out"
            >
              Our Team →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Reveal from "@/components/public/shared/Reveal";

import team2 from "@/assets/TeamImages/Team_2.jpg";
import team3 from "@/assets/TeamImages/Team_3.jpg";
import team4 from "@/assets/TeamImages/Team_4.jpg";
import team5 from "@/assets/TeamImages/Team_5.jpg";
import team6 from "@/assets/TeamImages/Team_6.jpg";
import team7 from "@/assets/TeamImages/Team_7.jpg";
import team8 from "@/assets/TeamImages/Team_8.jpg";
import team9 from "@/assets/TeamImages/Team_9.jpg";
import team10 from "@/assets/TeamImages/Team_10.jpg";

// ─── constants ────────────────────────────────────────────────────────────────
const IMAGES = [team2, team3, team4, team5, team6, team7, team8, team9, team10];

const TEAM_MEMBERS = [
  { img: team2 },
  { img: team3 },
  { img: team4 },
  { img: team5 },
  { img: team6 },
  { img: team7 },
  { img: team8 },
  { img: team9 },
  { img: team10 },
];

/**
 * How many images appear in each side column.
 * Keeping it at 8 gives a generous scroll without being excessive.
 */
const COLUMN_COUNT = 9;

/**
 * Vertical gap between images (px).  Tailwind gap-16 = 64 px.
 * The scroll section height is derived from this so the columns
 * never get clipped.
 */
const GAP_PX = 80; // roughly gap-20

// ─── Per-breakpoint layout config ─────────────────────────────────────────────
//
//  imgSize   – rendered diameter (px) of each circular avatar
//  closeX    – inward  offset for the "close" zig-zag step   (px from edge)
//  farX      – outward offset for the "far"   zig-zag step   (px from edge)
//  paddingY  – top / bottom padding of each column (px)
//
// We embed these as Tailwind + inline-style combinations so they work
// without a JS resize listener and stay SSR-safe.

// ─── Column data builders ──────────────────────────────────────────────────────

/**
 * Build column entries.
 * `side` controls which end of LEFT_ORIGINS / RIGHT_ORIGINS to use.
 */
function buildColumn(
  side: "left" | "right",
  count: number,
): Array<{
  img: (typeof IMAGES)[number];
  // Tailwind classes for offset – applied via className
  mdOffsetClass: string;
  lgOffsetClass: string;
  origin: { x: number; y: number; rotate: number };
}> {
  return Array.from({ length: count }, (_, i) => {
    const isClose = i % 2 === 1;

    // ── left side: positive translateX moves image inward (right)
    // ── right side: negative translateX moves image inward (left)
    let mdOffset: string;
    let lgOffset: string;

    if (side === "left") {
      mdOffset = isClose ? "translate-x-12" : "translate-x-32";
      lgOffset = isClose ? "lg:translate-x-16" : "lg:translate-x-52";
    } else {
      mdOffset = isClose ? "-translate-x-12" : "-translate-x-32";
      lgOffset = isClose ? "lg:-translate-x-16" : "lg:-translate-x-52";
    }

    const origin =
      side === "left"
        ? { x: -50, y: -50, rotate: -20 }
        : { x: 50, y: 50, rotate: 20 };

    return {
      img: IMAGES[(i + (side === "left" ? 5 : 2)) % IMAGES.length],
      mdOffsetClass: mdOffset,
      lgOffsetClass: lgOffset,
      origin,
    };
  });
}

const LEFT_COLUMN = buildColumn("left", COLUMN_COUNT);
const RIGHT_COLUMN = buildColumn("right", COLUMN_COUNT);

// ─── Sub-components ────────────────────────────────────────────────────────────

function TeamMemberImage({
  src,
  alt,
  origin,
  className = "",
}: {
  src: any;
  alt: string;
  origin: { x: number; y: number; rotate: number };
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "0px", amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      /**
       * Size classes:
       *  md  → w-24 h-24  (96 px)
       *  lg  → w-32 h-32  (128 px)
       *  xl  → w-40 h-40  (160 px)
       */
      className={`relative w-28 h-28 lg:w-32 lg:h-32
                  rounded-full overflow-hidden border border-primary shrink-0 ${className}`}
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
      transition={{ duration: 1, ease: [0.12, 0.8, 0.24, 1] }}
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

// ─── Main component ────────────────────────────────────────────────────────────

export default function Team() {
  /**
   * Scroll-section height calculation
   * ───────────────────────────────────
   * We need the outer section to be tall enough that:
   *   1. The sticky center panel stays visible for a meaningful duration.
   *   2. ALL column images scroll into view (and trigger useInView).
   *
   * Formula:
   *   totalColumnHeight = COLUMN_COUNT × (imgSize + GAP_PX) + paddingY×2
   *
   * For safety we add one extra viewport height so the last image
   * has room to animate before the section ends.
   *
   * We express this in a CSS custom property so it works without JS
   * and adapts to breakpoints via Tailwind's md/lg prefixes.
   *
   * md:  imgSize ≈ 96px  → row ≈ 176px  → 8 rows ≈ 1408px  + 100vh pad
   * lg:  imgSize ≈ 128px → row ≈ 208px  → 8 rows ≈ 1664px  + 100vh pad
   * xl:  imgSize ≈ 160px → row ≈ 240px  → 8 rows ≈ 1920px  + 100vh pad
   *
   * We round up generously so Tailwind arbitrary values stay clean.
   */

  return (
    <>
      {/* ═══════════════════ DESKTOP (md+) ═══════════════════ */}
      <section
        className={`
          hidden md:block relative
          md:h-[calc(9*176px+30vh)]
          lg:h-[calc(9*208px+20vh)]
          xl:h-[calc(9*240px+5vh)]
        `}
      >
        {/* Sticky centre ─────────────────────────────────── */}
        <div className="sticky top-0 h-screen flex items-center justify-center pointer-events-none">
          <div className="relative mx-auto px-6 text-start md:text-center pointer-events-auto">
            <Reveal delay={0.5}>
              <h2>
                Our Creative <span className="text-primary">Team</span>
              </h2>
            </Reveal>

            <p className="max-w-xl md:mx-auto">
              We&apos;re building a team that shapes how the world&apos;s most
              ambitious companies present themselves.
              <br />
              If that excites you, let&apos;s talk.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8"
            >
              <Link
                href="/careers"
                className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-6 py-4
                           bg-primary text-white rounded-full text-sm font-bold
                           hover:scale-105 transition-all duration-300 ease-out"
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

        {/* Left column ────────────────────────────────────── */}
        <div className="absolute top-0 left-0 h-full flex flex-col items-start gap-20 py-16 pointer-events-none">
          {LEFT_COLUMN.map((member, idx) => (
            <div
              key={`left-${idx}`}
              className={`transition-transform ${member.mdOffsetClass} ${member.lgOffsetClass}`}
            >
              <TeamMemberImage
                src={member.img}
                alt={`Team member ${idx + 1}`}
                origin={member.origin}
              />
            </div>
          ))}
        </div>

        {/* Right column ───────────────────────────────────── */}
        <div className="absolute top-0 right-0 h-full flex flex-col items-end gap-20 py-16 pointer-events-none">
          {RIGHT_COLUMN.map((member, idx) => (
            <div
              key={`right-${idx}`}
              className={`transition-transform ${member.mdOffsetClass} ${member.lgOffsetClass}`}
            >
              <TeamMemberImage
                src={member.img}
                alt={`Team member ${idx + 1}`}
                origin={member.origin}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════ MOBILE (< md) ═══════════════════ */}
      <section className="md:hidden bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl font-bold">
                Our Creative <span className="text-primary">Team</span>
              </h2>
            </Reveal>

            <p className="max-w-xl mx-auto text-center">
              We&apos;re building a team that shapes how the world&apos;s most
              ambitious companies present themselves.
              <br />
              If that excites you, let&apos;s talk.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full mx-auto">
            {TEAM_MEMBERS.map((member, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-3 rounded-full overflow-hidden border-2 border-primary">
                    <Image
                      src={member.img}
                      alt=""
                      fill
                      className="object-cover object-[center_29%]"
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/careers"
              className="w-auto justify-center inline-flex items-center px-6 py-4
                         bg-primary text-white rounded-full text-sm font-bold
                         hover:scale-105 transition-all duration-300 ease-out"
            >
              Our Team →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}


"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Building2, Users, PartyPopper, MonitorCog } from "lucide-react";

import Workspace_1 from "@/assets/Workspace_1.jpg";
import Workspace_2 from "@/assets/Workspace_2.jpg";
import Workspace_3 from "@/assets/Workspace_3.jpg";
import Workspace_4 from "@/assets/Workspace_4.jpg";
import Workspace_5 from "@/assets/Workspace_5.jpg";
import Workspace_6 from "@/assets/Workspace_6.jpg";

import BoardRoom_1 from "@/assets/BoardRoom_1.jpg";
import BoardRoom_2 from "@/assets/BoardRoom_2.jpg";
import BoardRoom_3 from "@/assets/BoardRoom_3.jpg";
import BoardRoom_4 from "@/assets/BoardRoom_4.jpg";
import BoardRoom_5 from "@/assets/BoardRoom_5.jpg";

import Office_1 from "@/assets/Office_1.jpg";
import Office_2 from "@/assets/Office_2.jpg";
import Office_3 from "@/assets/Office_3.jpg";
import Office_4 from "@/assets/Office_4.jpg";
import Office_5 from "@/assets/Office_5.jpg";
import Office_6 from "@/assets/Office_6.jpg";

import OfficeGathering_1 from "@/assets/OfficeGathering_1.jpg";
import OfficeGathering_2 from "@/assets/OfficeGathering_2.jpg";
import OfficeGathering_3 from "@/assets/OfficeGathering_3.jpg";
import OfficeGathering_4 from "@/assets/OfficeGathering_4.jpg";
import OfficeGathering_5 from "@/assets/OfficeGathering_5.jpg";
import Reveal from "@/components/public/shared/Reveal";

const spaces = [
  {
    Icon: Building2,
    name: "Workspaces",
    images: [
      Workspace_1,
      Workspace_2,
      Workspace_3,
      Workspace_4,
      Workspace_5,
      Workspace_6,
    ],
  },
  {
    Icon: Users,
    name: "Boardroom",
    images: [BoardRoom_1, BoardRoom_2, BoardRoom_3, BoardRoom_4, BoardRoom_5],
  },
  {
    Icon: PartyPopper,
    name: "Gatherings",
    images: [
      OfficeGathering_1,
      OfficeGathering_2,
      OfficeGathering_3,
      OfficeGathering_4,
      OfficeGathering_5,
      OfficeGathering_5,
    ],
  },
  {
    Icon: MonitorCog,
    name: "Office",
    images: [Office_1, Office_2, Office_3, Office_4, Office_5, Office_6],
  },
];

// Each layout is an array of 5 grid classes — all 5 slots always filled
const gridLayouts = [
  // Layout 0 – no gaps
  [
    "col-start-3 row-start-1",
    "col-start-1 row-start-1 col-span-2 row-span-2",
    "col-start-3 row-start-2",
    "col-start-1 row-start-3",
    "col-start-2 row-start-3",
    "col-start-3 row-start-3", // ✅ added
  ],

  // Layout 1 – mirrored
  [
    "col-start-2 row-start-1 col-span-2 row-span-2",
    "col-start-1 row-start-1",
    "col-start-1 row-start-2 col-span-1 row-span-2",
    "col-start-2 row-start-3",
    "col-start-3 row-start-3",
    "col-start-1 row-start-3", // ✅ added
  ],

  // Layout 2 – wide bottom
  [
    "col-start-2 row-start-2 col-span-2 row-span-2",
    "col-start-3 row-start-1",
    "col-start-1 row-start-2",
    "col-start-2 row-start-1",
    "col-start-1 row-start-3",
    "col-start-1 row-start-1", // ✅ fills center gap
  ],

  // Layout 3 – center focus
  [
    "col-start-1 row-start-1",
    "col-start-2 row-start-1 col-span-2 row-span-2",
    "col-start-1 row-start-2",
    "col-start-1 row-start-3",
    "col-start-2 row-start-3",
    "col-start-3 row-start-3", // ✅ added
  ],
];

export default function CreativeHub() {
  const [activeTab, setActiveTab] = useState(0);
  const currentLayout = gridLayouts[activeTab % gridLayouts.length];

  return (
    <section className="bg-secondary py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <Reveal delay={0.5}>
          <div className="inline-block border border-primary text-primary px-4 py-1 rounded-full text-xs font-semibold mb-4">
            WORKSPACE
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <h2>
            Where <span className="text-primary">Ideas</span> Find Their{" "}
            <span className="text-primary">Edge</span>
          </h2>
        </Reveal>

        <Reveal delay={0.5}>
          <p className="text-justify">
            More than a workspace, this is a hub of creativity and momentum.
            Built for innovators and problem-solvers, it empowers you to turn
            bold ideas into real-world impact. Here, collaboration meets
            execution, and ambition finds the tools it needs to grow and
            succeed.
          </p>
        </Reveal>

        {/* Mobile Tabs */}
        {/* <div className="lg:hidden flex flex-wrap justify-center items-center  gap-2 mt-4 overflow-hidden pb-2">
          {spaces.map((space, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-1 px-4 py-2 rounded-full whitespace-nowrap text-xs font-semibold transition-all duration-300 ${
                activeTab === idx
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-card text-muted-foreground shadow-md"
              }`}
            >
              <space.Icon className="w-4 h-4" />
              {space.name}
            </button>
          ))}
        </div> */}

        <div
          className="lg:hidden w-full flex justify-start gap-2 overflow-x-auto whitespace-nowrap py-4"
          style={{
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {spaces.map((space, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-1 px-2.5 py-2 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                activeTab === idx
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-card text-muted-foreground shadow-md"
              }`}
            >
              <space.Icon className="w-4 h-4" />
              {space.name}
            </button>
          ))}
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </div>

        {/* Grid + Tabs */}
        <div className="mt-2 lg:mt-10 grid lg:grid-cols-[1fr_auto] gap-8">
          {/* Image Grid */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-3 auto-rows-[100px] md:auto-rows-[180px] lg:auto-rows-[210px] gap-3"
              >
                {spaces[activeTab].images.map((image, idx) => (
                  <motion.div
                    key={idx}
                    className={`${currentLayout[idx]} rounded-lg overflow-hidden`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.07 }}
                  >
                    <Image
                      src={image}
                      alt={`${spaces[activeTab].name} ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-all duration-400 ease cursor-pointer"
                      loading={idx === 0 ? undefined : "lazy"}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Vertical Tabs - Desktop */}
          <div className="hidden lg:flex flex-col gap-12 ml-2">
            {spaces.map((space, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`h-32 w-10 rounded-full text-xs font-medium transition-all flex flex-col items-center justify-center gap-2 ${
                  activeTab === idx
                    ? "bg-primary text-white shadow-md"
                    : "bg-background border border-border hover:border-primary"
                }`}
              >
                <space.Icon className="w-5 h-5" />
                <span
                  className="text-xs font-semibold tracking-wide"
                  style={{ writingMode: "vertical-lr" }}
                >
                  {space.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

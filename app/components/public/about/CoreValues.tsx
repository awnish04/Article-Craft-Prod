"use client";

import {
  Shield,
  Lightbulb,
  Users,
  TrendingUp,
  Leaf,
  Heart,
  LucideIcon,
} from "lucide-react";
import Reveal from "@/components/public/shared/Reveal";

interface CoreValue {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const coreValues: CoreValue[] = [
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "Pioneering new solutions in communication technology",
  },
  {
    icon: Shield,
    title: "Quality & Excellence",
    desc: "Delivering world-class products and services",
  },
  {
    icon: Users,
    title: "Collaboration",
    desc: "Building together across borders and cultures",
  },
  {
    icon: TrendingUp,
    title: "Empowerment",
    desc: "Enabling growth through technology and knowledge",
  },
  {
    icon: Leaf,
    title: "Sustainability & Well-being",
    desc: "Caring for our people and the planet",
  },
  {
    icon: Heart,
    title: "Integrity",
    desc: "Operating with honesty and transparency",
  },
];

export default function CoreValues() {
  return (
    <div className="bg-secondary">
      <section className="container mx-auto px-4 lg:px-8 py-12 lg:py-16 items-center text-center">
        <Reveal delay={0}>
          <h2>
            Our Core <span className="text-primary"> Values</span>
          </h2>
        </Reveal>

        <Reveal delay={0.5}>
          <p>Values that guide everything we do.</p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
          {coreValues.map((val, i) => {
            const Icon = val.icon;
            return (
              <Reveal key={val.title} delay={0.5 + i * 0.08}>
                <div className="bg-white border border-primary rounded-xl p-5 text-left hover:shadow hover:shadow-sm hover:shadow-primary transition-all ease-in-out duration-400">
                  <Icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="text-sm font-bold">{val.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {val.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}

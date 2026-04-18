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
    desc: "Continuously exploring smarter ways to automate and build software",
  },
  {
    icon: Shield,
    title: "Quality & Excellence",
    desc: "Delivering reliable, secure, and thoroughly tested solutions",
  },
  {
    icon: Users,
    title: "Collaboration",
    desc: "Working closely with clients across industries and borders",
  },
  {
    icon: TrendingUp,
    title: "Empowerment",
    desc: "Enabling teams to do more through automation and intelligent tools",
  },
  {
    icon: Leaf,
    title: "Sustainability & Well-being",
    desc: "Building systems that support people and responsible growth",
  },
  {
    icon: Heart,
    title: "Integrity",
    desc: "Transparent delivery and honest communication at every step",
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
          <p>The principles that guide every solution we build.</p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 lg:mt-12">
          {coreValues.map((val, i) => {
            const Icon = val.icon;
            return (
              <Reveal key={val.title} delay={0.5 + i * 0.08}>
                <div className="bg-white border border-primary rounded-xl p-5 text-left hover:shadow hover:shadow-primary transition-all ease-in-out duration-400">
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

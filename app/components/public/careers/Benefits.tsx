"use client";

import {
  TrendingUp,
  DollarSign,
  GraduationCap,
  Heart,
  Coffee,
  Calendar,
  Briefcase,
  Shield,
  LucideIcon,
} from "lucide-react";
import Reveal from "@/components/public/shared/Reveal";

interface Benefit {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const benefits: Benefit[] = [
  {
    icon: TrendingUp,
    title: "Career Growth",
    desc: "Work on real AI and automation products that sharpen your skills fast.",
  },
  {
    icon: DollarSign,
    title: "Competitive Pay",
    desc: "Compensation that reflects your skills, experience, and contributions.",
  },
  {
    icon: GraduationCap,
    title: "Mentorship & Learning",
    desc: "Hands-on guidance, knowledge sharing, and structured learning paths.",
  },
  {
    icon: Heart,
    title: "Health Benefits",
    desc: "Comprehensive health and dental coverage for you and your family.",
  },
  {
    icon: Coffee,
    title: "Daily Meals",
    desc: "Complimentary lunch and refreshments to keep you energized.",
  },
  {
    icon: Calendar,
    title: "5-Day Work Week",
    desc: "A structured schedule that respects your time and personal life.",
  },
  {
    icon: Briefcase,
    title: "Work-Life Balance",
    desc: "Flexible hours designed to keep you performing at your best.",
  },
  {
    icon: Shield,
    title: "Insurance Coverage",
    desc: "Full insurance packages so you can focus on the work that matters.",
  },
];

export default function Benefits() {
  return (
    <div>
      <section className="container mx-auto px-4 lg:px-8 py-12 lg:py-16 items-center text-center">
        <Reveal delay={0.5}>
          <h2>
            Benefits of <span className="text-primary">Joining</span>{" "}
            <span className="text-primary">Article Craft</span>
          </h2>
        </Reveal>

        <Reveal delay={0.5}>
          <p>We invest in our people the same way we invest in our products.</p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <Reveal key={b.title} delay={i * 0.1}>
                <div className="bg-background border border-primary rounded-xl p-5 text-left hover-primary hover:shadow hover:shadow-primary transition-all ease-in-out duration-400">
                  <Icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="text-sm font-bold">{b.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{b.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}

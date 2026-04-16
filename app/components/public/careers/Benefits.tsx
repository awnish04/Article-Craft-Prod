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
    title: "Level up career",
    desc: "Work with experienced engineers and cutting-edge projects.",
  },
  {
    icon: DollarSign,
    title: "Compensation",
    desc: "Competitive salary for your skill and experience.",
  },
  {
    icon: GraduationCap,
    title: "Mentorship & Learning",
    desc: "Knowledge sharing, training, and career guidance.",
  },
  {
    icon: Heart,
    title: "Health Benefits",
    desc: "Comprehensive health and dental coverage.",
  },
  {
    icon: Coffee,
    title: "Lunch",
    desc: "Complimentary lunch and refreshments daily.",
  },
  {
    icon: Calendar,
    title: "5 Working Days",
    desc: "Enjoy a balanced work schedule.",
  },
  {
    icon: Briefcase,
    title: "Work-Life Balance",
    desc: "Flexible hours to keep you at your best.",
  },
  {
    icon: Shield,
    title: "Insurance Coverage",
    desc: "Full insurance packages for employees.",
  },
];

export default function Benefits() {
  return (
    <div>
      <section className="container mx-auto px-4 lg:px-8 py-12 lg:py-16 items-center text-center">
        <Reveal delay={0.5}>
          <h2>
            Benefits of <span className="text-primary">Working</span> with{" "}
            <span className="text-primary">Us</span>
          </h2>
        </Reveal>

        <Reveal delay={0.5}>
          <p>Grow with our innovative team where technology meets empathy.</p>
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

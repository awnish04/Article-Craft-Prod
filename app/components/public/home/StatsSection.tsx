"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/public/shared/Reveal";

const stats = [
  { value: 20, suffix: "+", label: "Creative Minds" },
  { value: 8, suffix: "+", label: "Countries Reached" },
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 2, suffix: "", label: "Intellectual Properties" },
];

export default function StatsSection() {
  return (
    <section className="bg-secondary">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16 items-center text-center">
        <Reveal delay={0.2}>
          <h2 className="mb-20">
            <span className="text-primary">Article Craft</span> Tech Statistics
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center transition-all duration-700"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <Reveal delay={0.2}>
                <p className=" mt-2">{stat.label}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 2000;
          const increment = value / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div ref={ref} className="text-3xl md:text-6xl font-extrabold text-primary">
      {count}
      {suffix}
    </div>
  );
}

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
    <section className="bg-secondary py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="text-center">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="text-muted-foreground mt-2">{stat.label}</p>
              </div>
            </Reveal>
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
          const end = value;
          const duration = 2000;
          const increment = end / (duration / 16);

          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div ref={ref}>
      <h2 className="text-4xl md:text-5xl font-bold text-primary">
        {count}
        {suffix}
      </h2>
    </div>
  );
}

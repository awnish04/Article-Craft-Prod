"use client";
import Reveal from "@/components/public/shared/Reveal";
import { Globe, Eye } from "lucide-react";

const missionVisionData = [
  {
    icon: Globe,
    title: "Mission",
    text: "We help organizations work smarter by automating workflows and building reliable, secure software powered by practical AI, reducing manual effort, improving accuracy, and unlocking insights through thoughtful design, transparent delivery, and continuous optimization for clients.",
  },
  {
    icon: Eye,
    title: "Vision",
    text: "To become the most trusted automation and AI partner, transforming how organizations operate through simple, scalable, human centered systems that improve efficiency, strengthen trust, enhance customer experience, and support sustainable growth across diverse industries.",
  },
];

export default function MissionVision() {
  return (
    <div>
      <section className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <Reveal delay={0.5}>
          <h2>
            Our <span className="text-primary">Mission & Vision</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 mt-10">
          {missionVisionData.map((card, i) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.title} delay={i * 0.5}>
                <div className="bg-white rounded-xl p-8 border border-primary hover:shadow-primary hover:shadow transition-shadow">
                  <div className="flex justift-center items-center gap-4">
                    <Icon className="w-10 h-10 text-primary" />
                    <h3>{card.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{card.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}

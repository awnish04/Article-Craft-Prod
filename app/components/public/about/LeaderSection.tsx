"use client";

import Image, { StaticImageData } from "next/image";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import Reveal from "@/components/public/shared/Reveal";

import Leader_1 from "@/assets/TeamImages/Leader_1.jpg";
import Leader_2 from "@/assets/TeamImages/Leader_2.jpeg";

const leaders = [
  {
    name: "Mijash paudyal",
    role: "CEO",
    img: Leader_1,
    social: {
      twitter: "#",
      github: "#",
      linkedin: "#",
    },
  },
  {
    name: "Riwaj Neupane",
    role: "Director",
    img: Leader_2,
    social: {
      twitter: "#",
      github: "#",
      linkedin: "#",
    },
  },
];

// ---------------- SOCIAL CONFIG ----------------

const SOCIAL_ICONS = {
  twitter: TwitterLogoIcon,
  github: GitHubLogoIcon,
  linkedin: LinkedInLogoIcon,
};

// ---------------- COMPONENT ----------------

export default function LeaderSection() {
  return (
    <div>
      <section className="container mx-auto px-4 lg:px-8 py-12 lg:py-16 items-center text-center">
        {/* Heading */}
        <div className="mb-10 md:mb-14 text-center">
          <Reveal>
            <h2 className="max-w-3xl mx-auto md:text-center text-justify">
              Meet The <span className="text-primary">Leaders</span> Behind{" "}
              <span className="text-primary">Article Craft</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="max-w-3xl mx-auto md:text-center text-justify ">
              Our leadership team brings deep expertise in technology,
              automation, and building products that create lasting impact.
            </p>
          </Reveal>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
          {leaders.map((leader, i) => (
            <Reveal key={leader.name} delay={0.4 + i * 0.15}>
              <div className="group">
                <div className="relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 group-hover:shadow-2xl">
                  {/* Image */}
                  <Image
                    src={leader.img}
                    alt={leader.name}
                    className="w-full h-[470px] md:h-[420px] lg:h-[450px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Info Card */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white rounded-xl mx-3 mb-3 p-3 transition-all duration-300 group-hover:-translate-y-1 hover:shadow-sm hover:shadow-primary">
                    <div className="flex justify-between">
                      {/* Text */}
                      <div className="text-start">
                        <h4 className="font-bold text-foreground">
                          {leader.name}
                        </h4>
                        <h6 className="text-sm text-muted-foreground">
                          {leader.role}
                        </h6>
                      </div>

                      {/* Dynamic Social Icons */}
                      <div className="flex items-center gap-2">
                        {Object.entries(leader.social).map(([key, url]) => {
                          if (!url) return null;

                          const Icon =
                            SOCIAL_ICONS[key as keyof typeof SOCIAL_ICONS];

                          return (
                            <a
                              key={key}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300"
                              aria-label={`${leader.name} on ${key}`}
                            >
                              <Icon className="w-4 h-4" />
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

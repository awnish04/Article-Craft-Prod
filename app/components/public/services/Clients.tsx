"use client";

import Image from "next/image";
import Reveal from "@/components/public/shared/Reveal";

const clients = [
  { name: "Mijaro", logo: "/ClientLogo/MijaroLogo.png" },
  { name: "Tatwam", logo: "/ClientLogo/Tatwamlogo.png" },
  { name: "Mijaro", logo: "/ClientLogo/MijaroLogo.png" },
  { name: "Tatwam", logo: "/ClientLogo/Tatwamlogo.png" },
  { name: "Mijaro", logo: "/ClientLogo/MijaroLogo.png" },
  { name: "Tatwam", logo: "/ClientLogo/Tatwamlogo.png" },
  { name: "Mijaro", logo: "/ClientLogo/MijaroLogo.png" },
  { name: "Tatwam", logo: "/ClientLogo/Tatwamlogo.png" },
];

const LogoCard = ({
  client,
  prefix,
  i,
}: {
  client: (typeof clients)[0];
  prefix: string;
  i: number;
}) => (
  <div
    key={`${prefix}-${i}`}
    className="bg-white rounded-xl p-4 h-20 flex items-center justify-center"
  >
    <Image
      src={client.logo}
      alt={client.name}
      width={100}
      height={50}
      className="object-contain"
    />
  </div>
);

export default function Clients() {
  const doubled = [...clients, ...clients];

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4 lg:px-8 items-center text-center">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left">
            <Reveal delay={0.5}>
              <h2>
                Our <span className="text-primary">Major Clients</span>
              </h2>
            </Reveal>
            <Reveal delay={0.5}>
              <p>
                Trusted by leading technology companies worldwide to deliver
                exceptional communication solutions and drive business growth.
              </p>
            </Reveal>
          </div>

          {/* Right - Scrolling Logos */}
          <div className="relative h-[400px] overflow-hidden">
            <div className="absolute inset-0 flex gap-4">
              {/* Column 1 - Scroll Down */}
              <Reveal delay={0.1}>
                <div className="flex-1">
                  <div className="animate-scroll-down space-y-10">
                    {doubled.map((client, i) => (
                      <LogoCard
                        key={`col1-${i}`}
                        client={client}
                        prefix="col1"
                        i={i}
                      />
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Column 2 - Scroll Up */}
              <Reveal delay={0.3}>
                <div className="flex-1">
                  <div className="animate-scroll-up space-y-10">
                    {doubled.map((client, i) => (
                      <LogoCard
                        key={`col2-${i}`}
                        client={client}
                        prefix="col2"
                        i={i}
                      />
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Column 3 - Scroll Down Slow */}
              <Reveal delay={0.6}>
                <div className="flex-1">
                  <div className="animate-scroll-down-slow space-y-10">
                    {doubled.map((client, i) => (
                      <LogoCard
                        key={`col3-${i}`}
                        client={client}
                        prefix="col3"
                        i={i}
                      />
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Gradient Overlays */}
            <div className="absolute top-0 left-0 right-0 h-10 bg-linear-to-b from-background to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-linear-to-t from-background to-transparent pointer-events-none z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image, { StaticImageData } from "next/image";
import Reveal from "@/components/public/shared/Reveal";
import team1 from "@/assets/TeamImages/Team_1.jpg";
import team2 from "@/assets/TeamImages/Team_2.jpg";
import team3 from "@/assets/TeamImages/Team_3.jpg";
import team4 from "@/assets/TeamImages/Team_4.jpg";
import team5 from "@/assets/TeamImages/Team_5.jpg";
import team6 from "@/assets/TeamImages/Team_6.jpg";

interface Testimonial {
  name: string;
  role: string;
  text: string;
  img: StaticImageData;
}

const testimonials: Testimonial[] = [
  {
    name: "Ramesh Timalsina",
    role: "Quality Assurance Engineer",
    text: "The collaborative team and focus on innovation drive my commitment to ensuring the highest quality standards. The emphasis on meticulous testing, user-centered design, and continuous professional growth make this an ideal environment for enhancing my skills and delivering flawless products.",
    img: team1,
  },
  {
    name: "Yurika Khanal",
    role: "WordPress Designer",
    text: "The team is incredibly talented, and the projects are always challenging and rewarding. The supportive atmosphere and emphasis on creativity have allowed me to excel in my role.",
    img: team2,
  },
  {
    name: "Darshan Timalsina",
    role: "R&D Associate",
    text: "The innovative projects and challenges in the platform engineering keep me motivated to push the boundaries of my technical skills. The team's focus on creativity, efficiency, and continuous improvement has been essential in helping me deliver robust, scalable solutions.",
    img: team3,
  },
  {
    name: "Tukanath Paudel",
    role: "Associate Project Manager",
    text: "The team's dedication to a collaborative environment makes every day exciting. The emphasis on continuous learning and staying ahead of marketing trends has significantly boosted my professional growth.",
    img: team4,
  },
  {
    name: "Basanta Gurung",
    role: "Associate Project Manager",
    text: "The team's commitment to efficiency and continuous improvement is inspiring. The supportive environment and focus on professional growth have significantly enhanced my skills.",
    img: team5,
  },
  {
    name: "Vidha Sapkota",
    role: "UI/UX Designer",
    text: "The team's dedication to creating intuitive and visually appealing user experiences inspires me every day. The collaborative environment, combined with a focus on innovation and seamless design, allows me to continually enhance my skills and contribute to impactful projects.",
    img: team6,
  },
];

export default function Testimonials() {
  return (
    <div className="bg-secondary">
      <section className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <Reveal delay={0}>
          <h2>
            What Our <span className="text-primary">Team</span> Says
          </h2>
          <p>Let's Hear From Them</p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {testimonials.map((testimonial, i) => (
            <Reveal key={testimonial.name} delay={i * 0.1}>
              <div className="bg-white shadow rounded-xl p-6 hover:shadow-primary hover:shadow transition">
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src={testimonial.img}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h6 className="font-bold text-sm">{testimonial.name}</h6>
                    <h6 className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </h6>
                  </div>
                </div>
                <h6 className="text-sm text-muted-foreground leading-relaxed">
                  {testimonial.text}
                </h6>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

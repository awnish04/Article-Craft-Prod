"use client";

import Image, { StaticImageData } from "next/image";
import Reveal from "@/components/public/shared/Reveal";
import team2 from "@/assets/TeamImages/Team_2.jpg";
import team3 from "@/assets/TeamImages/Team_3.jpg";
import team8 from "@/assets/TeamImages/Team_8.jpg";
import team5 from "@/assets/TeamImages/Team_5.jpg";
import team6 from "@/assets/TeamImages/Team_6.jpg";
import team7 from "@/assets/TeamImages/Team_7.jpg";

interface Testimonial {
  name: string;
  role: string;
  text: string;
  img: StaticImageData;
}

const testimonials: Testimonial[] = [
  {
    name: "Yurika Khanal",
    role: "WordPress Designer",
    text: "Every project brings a new design challenge, and the team always pushes for something better. The culture of creativity and support makes it easy to do your best work consistently.",
    img: team2,
  },
  {
    name: "Darshan Timalsina",
    role: "R&D Associate",
    text: "Being part of a team that builds real AI and automation solutions is incredibly motivating. The culture rewards curiosity and encourages you to experiment, iterate, and deliver things that actually work in the real world.",
    img: team3,
  },
  {
    name: "Tukanath Paudel",
    role: "Associate Project Manager",
    text: "Managing projects here means working with people who are genuinely invested in outcomes. The collaborative environment and focus on continuous learning have sharpened my skills more than any role before.",
    img: team8,
  },
  {
    name: "Basanta Gurung",
    role: "Associate Project Manager",
    text: "The team's commitment to delivering on time without cutting corners is something I deeply respect. The supportive culture and clear processes make every project feel achievable, no matter the complexity.",
    img: team5,
  },
  {
    name: "Vidha Sapkota",
    role: "UI/UX Designer",
    text: "Designing for automation and AI products is a unique challenge, and this team gives you the space to solve it thoughtfully. The collaborative energy and focus on user-centered design keep me inspired every day.",
    img: team6,
  },
  {
    name: "Priya Shrestha",
    role: "Frontend Developer",
    text: "Working at the intersection of design and technology means every day looks different. The team pushes you to write clean, thoughtful code while keeping the user experience at the center of every decision it's the kind of environment where you grow fast.",
    img: team7,
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
          <p>The people behind Article Craft, in their own words.</p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {testimonials.map((testimonial, i) => (
            <Reveal key={testimonial.name} delay={i * 0.1}>
              <div className="bg-white shadow rounded-xl p-6 hover:shadow-primary hover:shadow transition">
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src={testimonial.img}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover object-[center_29%]"
                  />
                  <div>
                    {/* <h6 className="font-bold text-sm">{testimonial.name}</h6> */}
                    {/* <h6 className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </h6> */}
                  </div>
                </div>
                <h6 className="text-sm text-muted-foreground leading-relaxed text-justify">
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

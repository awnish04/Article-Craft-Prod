"use client";

import { useState } from "react";
import { ExternalLink, MoveRight } from "lucide-react";
import Reveal from "@/components/public/shared/Reveal";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you soon.");
    setForm({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };
  // container mx - auto px - 4 md: px - 8 py - 16 md: py - 24
  return (
    <div className="pt-16 lg:pt-28 min-h-screen bg-background">
      <div className="container grid md:grid-cols-2">
        {/* Left Side - Info */}
        <div className="bg-background px-4 lg:px-8 py-8 lg:py-16 flex flex-col justify-between">
          <div className="w-full">
            <Reveal delay={0}>
              <h1 className="mb-8">
                Let's get
                <br />
                in touch
              </h1>
            </Reveal>
          </div>

          <div className="space-y-6">
            <Reveal delay={0.4}>
              <h6 className="text-muted-foreground">Phone</h6>
              <div className="flex flex-col">
                <a
                  href="tel:+16168983513"
                  className="text-lg font-semibold hover:text-primary transition-colors"
                >
                  +1 616 898 3513
                </a>
                <a
                  href="tel:+16168983513"
                  className="text-lg font-semibold hover:text-primary transition-colors"
                >
                  +977 974 444 6642
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.5}>
              <div>
                <h6 className="text-muted-foreground">Email</h6>
                <a
                  href="mailto:hello@slabs.com"
                  className="text-lg font-semibold hover:text-primary transition-colors"
                >
                  Info@articlecraft.org
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.6}>
              <div>
                <h6 className="text-muted-foreground">Office</h6>
                <h6 className="text-muted-foreground text-lg font-semibold">
                  kathmandu ,<br />
                  New Baneshwor, 44600
                </h6>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold mt-2 hover:text-primary transition-colors group"
                >
                  See on Google Map
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="bg-foreground text-background px-6 md:px-12 lg:px-16 py-12 md:py-16 lg:py-20">
          <Reveal delay={0.2}>
            <div className="flex items-start gap-4 mb-12 items-center">
              <div className="group">
                <MoveRight
                  size={100}
                  strokeWidth={0.5}
                  className="transition-all duration-300 group-hover:translate-x-2"
                />
              </div>
              <p className="text-muted-foreground max-w-md">
                Great! We're excited to hear from you and let's start something
                special together. call us for any inquiry.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-background">
              Contact
            </h2>
          </Reveal>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Reveal delay={0.4}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-transparent border-b border-background/30 pb-3 text-background placeholder:text-background/50 focus:outline-none focus:border-background transition-colors"
                    placeholder="Name"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-background/30 pb-3 text-background placeholder:text-background/50 focus:outline-none focus:border-background transition-colors"
                    placeholder="Email"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-background/30 pb-3 text-background placeholder:text-background/50 focus:outline-none focus:border-background transition-colors"
                    placeholder="Phone"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-background/30 pb-3 text-background placeholder:text-background/50 focus:outline-none focus:border-background transition-colors"
                    placeholder="Subject"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.6}>
              <div>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-background/30 pb-3 text-background placeholder:text-background/50 focus:outline-none focus:border-background transition-colors resize-none"
                  placeholder="Tell us about your interested in"
                />
              </div>
            </Reveal>

            <Reveal delay={0.7}>
              <button
                type="submit"
                className="w-full items-center px-6 py-4 text-white rounded-full text-md font-bold bg-primary hover:scale-105 transition-all duration-300 ease-out  mt-8"
                // className="inline-flex items-center px-6 py-4 text-white rounded-full text-sm font-bold bg-primary hover:scale-105 transition-all duration-300 ease-out"
              >
                Send To Us
              </button>
            </Reveal>
          </form>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full h-64 md:h-80 lg:h-96 bg-muted">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9476519598093!2d-73.99185368459395!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale"
        />
      </div>
    </div>
  );
}

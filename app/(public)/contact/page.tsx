"use client";

import { useState } from "react";
import { MapPin, Clock, Phone, Mail, Loader2 } from "lucide-react";
import Reveal from "@/components/public/shared/Reveal";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      toast.success("Message sent — we'll be in touch shortly!");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-secondary/50 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:bg-background transition-all duration-200";

  const infoBlocks = [
    {
      icon: Phone,
      label: "Phone",
      content: (
        <>
          <a
            href="tel:+16168983513"
            className="block hover:text-primary transition-colors"
          >
            +1 616 898 3513
          </a>
          <a
            href="tel:+9779744446642"
            className="block hover:text-primary transition-colors"
          >
            +977 974 444 6642
          </a>
        </>
      ),
    },
    {
      icon: Mail,
      label: "Email",
      content: (
        <a
          href="mailto:Info@articlecraft.org"
          className="hover:text-primary transition-colors"
        >
          Info@articlecraft.org
        </a>
      ),
    },
    {
      icon: MapPin,
      label: "Office",
      content: (
        <>
          <span className="block">Kathmandu,</span>
          <span className="block">New Baneshwor, 44600</span>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-2 hover:underline"
          >
            <MapPin className="w-3 h-3" /> View on map
          </a>
        </>
      ),
    },
    {
      icon: Clock,
      label: "Hours",
      content: (
        <>
          <span className="block">Mon – Fri</span>
          <span className="block text-muted-foreground">
            10:00 AM – 05:00 PM
          </span>
        </>
      ),
    },
  ];

  return (
    <div className="pt-16 lg:pt-28">
      <section className="container mx-auto px-4 lg:px-8 py-8 lg:pt-0 lg:pb-16">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <Reveal delay={0}>
            <div className="mb-10">
              <h1 className="text-4xl lg:text-5xl font-medium leading-tight mb-3">
                Get in touch
              </h1>
              <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
                We'd love to hear from you. Fill in the form and our team will
                respond within 24 hours.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-[1fr_2fr] gap-4 items-start">
            {/* Info Card */}
            <Reveal delay={0.2}>
              <div className="bg-background border border-primary rounded-lg p-6 flex flex-col gap-5">
                {infoBlocks.map((block, i) => (
                  <div key={block.label}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center">
                        <block.icon className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                        {block.label}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-foreground leading-relaxed pl-9">
                      {block.content}
                    </div>
                    {i < infoBlocks.length - 1 && (
                      <div className="mt-5 h-px bg-border" />
                    )}
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Form Card */}
            <Reveal delay={0.3}>
              <div className="bg-background border border-primary rounded-lg p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium text-foreground">
                    Send a message
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                        Full name
                      </label>
                      <Input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className={inputClass}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                        Email address
                      </label>
                      <Input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        className={inputClass}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                        Phone
                      </label>
                      <Input
                        type="tel"
                        placeholder="+1 000 000 0000"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        className={inputClass}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                        Subject
                      </label>
                      <Input
                        type="text"
                        placeholder="e.g. Partnership inquiry"
                        value={form.subject}
                        onChange={(e) =>
                          setForm({ ...form, subject: e.target.value })
                        }
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                      Message
                    </label>
                    <Textarea
                      required
                      rows={5}
                      placeholder="Describe how we can help you..."
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2 flex-wrap gap-3">
                    <p className="text-xs text-muted-foreground max-w-[220px] leading-relaxed">
                      We'll never share your details with third parties.
                    </p>
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center gap-2 px-6 py-4 text-white rounded-full text-sm font-bold bg-primary hover:scale-105 transition-all duration-300 ease-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                      {loading ? "Sending..." : "Send message"}
                    </button>
                  </div>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

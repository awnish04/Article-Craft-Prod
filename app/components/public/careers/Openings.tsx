"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import Reveal from "@/components/public/shared/Reveal";
import type { Job } from "@/lib/db/schema";

const categories = [
  "All positions",
  "Full Time",
  "Part Time",
  "Contract",
  "Internship",
];

interface Props {
  jobs: Job[];
}

export default function Openings({ jobs }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All positions");

  const filtered = jobs.filter((job) => {
    const matchesSearch = job.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "All positions" || job.type === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-secondary">
      <section
        id="openings"
        className="container mx-auto px-4 lg:px-8 py-12 lg:py-16 items-center text-center"
      >
        <Reveal delay={0}>
          <h2>
            Current <span className="text-primary">Openings</span>
          </h2>
        </Reveal>
        <Reveal delay={0.5}>
          <p>Explore opportunities and grow with us.</p>
        </Reveal>

        {/* Search */}
        <Reveal delay={0.5}>
          <div className="max-w-2xl mx-auto mt-10">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border bg-background text-sm focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <button className="bg-foreground text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition">
                Search
              </button>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mt-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:bg-primary/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Job List */}
        <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.length === 0 ? (
            <div className="col-span-2 py-12 text-center text-muted-foreground">
              No job openings found.
            </div>
          ) : (
            filtered.map((job) => (
              <div
                key={job.id}
                className="bg-secondary rounded-xl p-5 text-left hover:shadow-sm hover:shadow-primary transition-all ease-in-out duration-400 border border-primary"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-bold">{job.title}</h3>
                  <span className="text-xs text-muted-foreground">
                    {job.type}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {job.location} {job.salary ? `· ${job.salary}` : ""}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Apply now to be part of something exceptional.
                </p>
                <Link
                  href={`/careers/jobs/${job.slug}`}
                  className="inline-flex items-center gap-2 mt-4 text-xs font-semibold text-primary hover:underline"
                >
                  View Details
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

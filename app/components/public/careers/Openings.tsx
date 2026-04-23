"use client";

import { useState } from "react";
import { Search, SearchX } from "lucide-react";
import Link from "next/link";
import Reveal from "@/components/public/shared/Reveal";
import type { Job } from "@/lib/db/schema";
import { Badge } from "@/components/ui/badge";

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
            <div className="flex flex-wrap gap-2 mt-4 items-center justify-center">
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
        <Reveal delay={0.5}>
          <div
            className={`max-w-4xl mx-auto mt-8 ${
              filtered.length === 1
                ? "flex justify-center"
                : "grid grid-cols-1 lg:grid-cols-2 gap-4"
            }`}
          >
            {filtered.length === 0 ? (
              <div className="col-span-2 py-12 text-center border border-primary rounded-lg">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <SearchX className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No job openings found
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    We couldn't find any positions matching your search. Try
                    adjusting your filters or check back later for new
                    opportunities.
                  </p>
                </div>
              </div>
            ) : (
              filtered.map((job) => (
                <div
                  key={job.id}
                  className={`bg-secondary rounded-xl p-5 text-left hover:shadow-sm hover:shadow-primary transition-all ease-in-out duration-400 border border-primary ${
                    filtered.length === 1 ? "max-w-md w-full" : ""
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold">{job.title}</h3>

                    <Badge>{job.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {job.location} {job.salary ? `· ${job.salary}` : ""}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Apply now to be part of something exceptional.
                  </p>
                  <Link
                    href={`/careers/jobs/${job.slug}`}
                    className="group inline-flex items-center gap-2 mt-4 text-sm font-semibold text-primary"
                  >
                    <span className="relative">
                      View Details
                      <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
                    </span>

                    <svg
                      className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1"
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
        </Reveal>
      </section>
    </div>
  );
}

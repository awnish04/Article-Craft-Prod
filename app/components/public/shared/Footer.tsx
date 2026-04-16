"use client";

import Link from "next/link";
import { FaFacebook, FaLinkedin, FaMailBulk, FaPhoneAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        {/* Grid Wrapper */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* 1. Logo & Description */}
          <div className="flex flex-col md:col-span-1">
            <span className="text-xl font-extrabold">Article Craft</span>
            <p className="mt-4 text-sm sm:text-base text-primary-foreground/70 leading-relaxed">
              Article Craft provides end to end automation, AI, and custom software solutions, from workflow integration and reporting systems to chatbot development, analytics, and scalable cloud based tools tailored to business need.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-5">
              {/** Reusable social icon */}
              <a
                href="#"
                className="w-8 h-8 rounded-full text-white bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <FaLinkedin/>
              </a>

              <a
                href="#"
                className="w-8 h-8 rounded-full text-white bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <FaMailBulk/>
              </a>

              <a
                href="#"
                className="w-8 h-8 rounded-full text-white bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <FaFacebook/>
              </a>
            </div>
          </div>

          {/* 2. Clients */}
          <div>
            <h4 className="font-semibold mb-4">Clients</h4>
              <ul className="space-y-1">
              <li>
                <a
                  href="#"
                    className="hover:text-primary-foreground transition-colors text-lg text-primary-foreground/70"
                >
                  Mijaro AI
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-foreground transition-colors text-lg text-primary-foreground/70"
                >
                  Tatwam Venturess
                </a>
              </li>
            </ul>
          </div>

          {/* 3. Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <div>

            </div>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/services"
                  className="hover:text-primary-foreground transition-colors text-lg text-primary-foreground/70"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary-foreground transition-colors text-lg text-primary-foreground/70"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-primary-foreground transition-colors text-lg text-primary-foreground/70"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary-foreground transition-colors text-lg text-primary-foreground/70"
                >
                  Contact us
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. ISO Certification / Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div>
              <p className="flex items-center gap-2 text-primary-foreground/70">
                <FaMailBulk /> Info@articlecraft.org
              </p>
              <p className="flex items-center gap-2 text-primary-foreground/70">
                <FaPhoneAlt /> +1 616 898 3513
              </p>
              <p className="flex items-center gap-2 text-primary-foreground/70">
                <FaPhoneAlt /> +977 974 444 6642
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-primary-foreground/10 mt-4 flex flex-col sm:flex-row justify-between items-center ">
          {/* <p className="text-primary-foreground/70 leading-relaxed text-sm">
            Certified to ISO 27001:2022 for Information Security Management.
          </p> */}
          <p className="text-primary-foreground/70 leading-relaxed text-sm">
            2026 © Article Craft Tech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

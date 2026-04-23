"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "@/assets/logo-1.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "About", path: "/about" },
  { label: "Careers", path: "/careers" },
  { label: "Contact Us", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-2 md:px-2 py-2">
        <div className="container mx-auto bg-background/95 backdrop-blur-md shadow-lg rounded-full border border-border">
          <div className="flex items-center justify-between h-16 md:h-16 px-4 md:px-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={logo}
                alt="Article Craft Logo"
                className="w-12 h-12 rounded-full object-cover "
              />
              <span className="text-lg md:text-xl font-extrabold text-foreground">
                Article<span className="text-primary">Craft</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-4 py-2 text-sm font-bold rounded-full transition-all ${
                    pathname === link.path
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-5">
                <span
                  className={`absolute left-0 w-6 h-0.5 bg-foreground transition-all duration-300 ease-in-out ${
                    isOpen ? "top-2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-2 w-6 h-0.5 bg-foreground transition-all duration-300 ease-in-out ${
                    isOpen ? "opacity-0 translate-x-3" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 w-6 h-0.5 bg-foreground transition-all duration-300 ease-in-out ${
                    isOpen ? "top-2 -rotate-45" : "top-4"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-60 md:hidden ${
          isOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-foreground/20 backdrop-blur-sm transition-opacity duration-100 ease-in-out ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Menu panel */}
        <div
          className={`absolute top-0 left-0 right-0 bg-background shadow-2xl transition-all duration-150 ease-in-out origin-top ${
            isOpen ? "scale-y-100 opacity-100" : "scale-y-95 opacity-0"
          }`}
        >
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center bg-secondary rounded-full shadow-md hover:bg-border transition-all duration-300 group"
            aria-label="Close menu"
            style={{
              opacity: isOpen ? 1 : 0,
              transition: `opacity 0.1s ease ${isOpen ? "0.15s" : "0s"}`,
            }}
          >
            <div className="relative w-6 h-6 transition-transform duration-300 group-hover:rotate-90">
              <span className="absolute left-0 top-[11px] w-6 h-0.5 bg-foreground rotate-45" />
              <span className="absolute left-0 top-[11px] w-6 h-0.5 bg-foreground -rotate-45" />
            </div>
          </button>

          {/* Menu Items */}
          <div className="flex flex-col px-8 pt-20 pb-12 gap-6 min-h-screen">
            {navLinks.map((link, i) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-4xl font-extrabold py-4 text-center transition-all duration-300 hover:scale-110 hover:text-primary ${
                  pathname === link.path ? "text-primary" : "text-foreground"
                }`}
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateY(0)" : "translateY(-10px)",
                  transition: isOpen
                    ? `opacity 0.2s ease ${i * 0.06 + 0.15}s, transform 0.2s ease ${i * 0.06 + 0.15}s`
                    : `opacity 0.15s ease ${(navLinks.length - i - 1) * 0.04}s, transform 0.15s ease ${(navLinks.length - i - 1) * 0.04}s`,
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

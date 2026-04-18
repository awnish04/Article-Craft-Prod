"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const rotation = useMotionValue(0);

  const smoothRotation = useSpring(rotation, {
    stiffness: 60,
    damping: 20,
    mass: 1,
  });

  const smoothedRotation = useTransform(smoothRotation, (r) => r);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          const scrollPercent = Math.round((scrollTop / docHeight) * 100);

          setIsVisible(scrollTop > 300);
          const clampedProgress = Math.min(Math.max(scrollPercent, 1), 99);
          setScrollProgress(clampedProgress);
          rotation.set(clampedProgress * 30);

          setIsAtBottom(
            scrollTop + window.innerHeight >=
              document.documentElement.scrollHeight - 50,
          );
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [rotation]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const text = "SCROLL TOP • SCROLL TOP • SCROLL TOP •";
  const letters = text.split("");
  const radius = isMobile ? 5 : 6; // 👈 tighter orbit for 40px button

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          onClick={scrollToTop}
          className={`fixed bottom-5 right-5 z-40 rounded-full text-primary flex items-center justify-center cursor-pointer ${
            isMobile ? "w-10 h-10" : "w-20 h-20" // 👈 40px on mobile, 80px on desktop
          }`}
          aria-label="Scroll to top"
        >
          <motion.div
            className="relative w-full h-full"
            style={{ rotate: smoothedRotation }}
          >
            {letters.map((letter, index) => (
              <span
                key={`${index}-${letter}`}
                className={`absolute top-1/2 left-1/2 inline-block font-normal tracking-wider text-primary ${
                  isMobile ? "text-[6px]" : "text-[10px]" // 👈 smaller text on mobile
                }`}
                style={{
                  transform: `
                    translate(-50%, -50%)
                    rotate(${(360 / letters.length) * index}deg)
                    translateY(${-radius}ch)
                  `,
                  transformOrigin: "center",
                }}
              >
                {letter}
              </span>
            ))}
          </motion.div>

          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {isAtBottom ? (
                <motion.div
                  key="arrow"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowUp className={isMobile ? "w-3 h-3" : "w-5 h-5"} />{" "}
                  {/* 👈 smaller arrow on mobile */}
                </motion.div>
              ) : (
                <motion.div
                  key="percentage"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className={`font-medium ${isMobile ? "text-[8px]" : "text-xs"}`} // 👈 smaller % text on mobile
                >
                  {scrollProgress}%
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

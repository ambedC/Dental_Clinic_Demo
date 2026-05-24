'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Initial Page Load Reveal Timeline (Plays once)
      const loadTl = gsap.timeline({ defaults: { ease: "power4.out" } });

      loadTl.fromTo(
        ".reveal-line",
        { yPercent: 105 },
        { yPercent: 0, duration: 1.4, stagger: 0.12 }
      );

      loadTl.fromTo(
        ".fade-in-content",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1.2 },
        "-=0.9"
      );

      // 2. Scroll Scrub Out Timeline (Tied to scroll progress)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",      // Starts scrolling immediately
          end: "bottom 30%",     // Ends when scroll reaches 70% of hero height
          scrub: 1,              // Smooth scrub
        }
      });

      scrollTl.to(".reveal-line", { yPercent: -100, opacity: 0, stagger: 0.05 }, 0)
              .to(".fade-in-content", { opacity: 0, y: -40 }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative w-full z-20 flex-1 flex flex-col justify-end px-6 pb-8 pt-2 md:px-16 md:pb-16 lg:px-24 lg:pb-20 select-none">
      {/* Large Typography (Middle Upper Area) */}
      <div className="mb-auto mt-6 sm:mt-12 md:mt-20 max-w-4xl">
        <h1 className="text-[8.8vw] sm:text-7xl md:text-8xl lg:text-[6.2vw] font-sans font-light tracking-tight text-white leading-[0.98] select-text">
          <div className="overflow-hidden block py-1">
            <span className="reveal-line block">Bespoke Smiles,</span>
          </div>
          <div className="overflow-hidden block py-1">
            <span className="reveal-line block">Designed</span>
          </div>
          <div className="overflow-hidden block py-1">
            <span className="reveal-line font-serif italic font-light block mt-1 text-white/95">
              to Perfection
            </span>
          </div>
        </h1>
      </div>

      {/* Small content (Bottom Center) */}
      <div className="fade-in-content flex flex-col items-center justify-center text-center gap-1.5 w-full md:max-w-lg mx-auto mt-6 sm:mt-10 md:mt-12 opacity-0">
        <p className="text-white/80 text-xs sm:text-xs md:text-sm font-light tracking-[1px] leading-[20px] select-text">
          A new standard of personalized dentistry. Combining advanced clinical precision with an unmatched dedication to your comfort.
        </p>
        <a
          href="#appointment"
          className="group inline-flex items-center justify-center text-white/95 hover:text-white font-inter text-base sm:text-md tracking-wide transition-colors mt-2"
        >
          <span className="group-hover:translate-x-1 transition-transform duration-300">
            (Book a consultation)
          </span>
        </a>
      </div>
    </main>
  );
}

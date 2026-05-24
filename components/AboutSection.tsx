'use client';

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Orchestrated scrub timeline for side-by-side About Section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%",      // Starts when About top enters viewport
          end: "bottom 85%",     // Ends when About is mostly visible
          scrub: 1.2,            // Link to scroll progress
        }
      });

      tl.fromTo(
        ".about-image-wrap", 
        { opacity: 0, x: -60, scale: 0.96 }, 
        { opacity: 1, x: 0, scale: 1 }, 
        0
      )
      .fromTo(
        ".about-label", 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0 }, 
        0.05
      )
      .fromTo(
        ".about-title-reveal", 
        { opacity: 0, y: 40 }, 
        { opacity: 1, y: 0 }, 
        0.1
      )
      .fromTo(
        ".about-desc-wrap", 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0 }, 
        0.15
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="w-full min-h-screen bg-white text-zinc-900 py-16 px-6 md:py-28 md:px-16 lg:px-24 flex items-center font-sans relative overflow-hidden"
    >
      {/* Side-by-Side Flex Layout (Responsive: Stacks on mobile, side-by-side on desktop) */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-20 xl:gap-28 w-full">
        
        {/* Left Column: Image */}
        <div className="about-image-wrap w-full max-w-md mx-auto lg:mx-0 lg:w-[42%] aspect-square lg:aspect-[4/5] relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-sm bg-zinc-100 order-2 lg:order-1">
          <Image
            src="/about.jpg"
            alt="About Ferox Dentistry"
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover object-center"
          />
        </div>

        {/* Right Column: All Text Content */}
        <div className="w-full lg:w-[52%] flex flex-col items-start gap-6 md:gap-8 lg:gap-10 order-1 lg:order-2">
          {/* Label */}
          <div className="about-label flex items-center gap-2 text-zinc-400 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase select-none">
            <span>•</span>
            <span>About</span>
          </div>

          {/* Heading */}
          <div className="about-title-reveal select-text">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.8vw] font-light leading-[1.2] text-zinc-800 tracking-tight font-sans">
              At Ferox, we are dedicated to providing exceptional{" "}
              <span className="font-serif italic font-light text-zinc-950">
                dental care in a warm,
              </span>{" "}
              welcoming environment. Our experienced team uses the latest technology{" "}
              <span className="font-serif italic font-light text-zinc-950">
                to offer a range of treatments.
              </span>
            </h2>
          </div>

          {/* Icon & Description Wrap */}
          <div className="about-desc-wrap flex flex-col items-start gap-4 mt-2 md:mt-4">
            {/* Dot Circle Icon */}
            <div className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center select-none shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
            </div>

            {/* Paragraph */}
            <p className="text-zinc-500 text-xs sm:text-xs md:text-sm font-light tracking-[0.5px] leading-relaxed max-w-md select-text">
              We offer top-tier dental care in a welcoming space, using advanced technology for tailored treatments that prioritize your smile.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

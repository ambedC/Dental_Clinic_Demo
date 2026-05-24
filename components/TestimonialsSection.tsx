'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface TestimonialItem {
  id: number;
  quote: string;
  author: string;
  service: string;
  rating: string;
}

const testimonialsData: TestimonialItem[] = [
  {
    id: 1,
    quote: "The absolute precision and care I experienced at Ferox completely changed my perspective on dentistry. It is true clinical artistry.",
    author: "Victoria Sterling",
    service: "Aesthetic Dentistry",
    rating: "5.0"
  },
  {
    id: 2,
    quote: "Ferox designed my veneers with such natural detail. The team uses state-of-the-art technology and ensures complete comfort throughout.",
    author: "Julian Mercer",
    service: "Porcelain Veneers",
    rating: "5.0"
  },
  {
    id: 3,
    quote: "An outstanding practice. The orthodontic treatment was seamless, and the results exceeded every expectation. Highly recommend.",
    author: "Dr. Marcus Thorne",
    service: "Orthodontic Care",
    rating: "5.0"
  }
];

export default function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%",
          end: "bottom 90%",
          scrub: 1.2,
        }
      });

      tl.fromTo(
        ".testimonials-label",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0 },
        0
      )
      .fromTo(
        ".testimonials-title",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0 },
        0.05
      )
      .fromTo(
        ".testimonial-card",
        { opacity: 0, y: 50, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.08 },
        0.1
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="testimonials"
      className="w-full min-h-screen bg-[#0d0d0d] text-white py-16 px-6 md:py-28 md:px-16 lg:px-24 flex flex-col justify-between font-sans relative overflow-hidden"
    >
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-start gap-6 md:gap-12 lg:gap-24 w-full">
        {/* Label */}
        <div className="testimonials-label flex items-center gap-2 text-zinc-500 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase select-none w-full md:w-[15%]">
          <span>•</span>
          <span>Reviews</span>
        </div>

        {/* Heading */}
        <div className="testimonials-title w-full md:w-[85%] select-text">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5vw] font-sans font-light leading-[1.15] text-white tracking-tight">
            Patient Stories
            <br />
            <span className="font-serif italic font-light text-zinc-300">
              of Restored confidence
            </span>
          </h2>
        </div>
      </div>

      {/* Grid of Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 md:mt-24 w-full">
        {testimonialsData.map((item) => (
          <div
            key={item.id}
            className="testimonial-card flex flex-col justify-between p-8 rounded-[2rem] bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-all duration-500 hover:border-white/[0.12] aspect-square w-full max-w-sm mx-auto md:max-w-none"
          >
            {/* Top Rating */}
            <div className="flex items-center justify-between w-full">
              <span className="text-[10px] md:text-xs tracking-widest uppercase font-medium text-zinc-500">
                ({item.service})
              </span>
              <span className="text-[10px] md:text-xs font-serif italic text-zinc-400">
                ( {item.rating} Rating )
              </span>
            </div>

            {/* Quote */}
            <p className="text-zinc-200 text-sm sm:text-[15px] md:text-base lg:text-[1.1rem] font-light leading-relaxed tracking-wide mt-6 mb-8 italic font-serif">
              &ldquo;{item.quote}&rdquo;
            </p>

            {/* Author */}
            <div className="flex flex-col gap-1">
              <span className="w-6 h-[1px] bg-zinc-700 mb-2" />
              <h4 className="text-white text-sm md:text-base font-sans font-medium tracking-tight">
                {item.author}
              </h4>
              <span className="text-zinc-500 text-[10px] uppercase tracking-wider">
                Verified Patient
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

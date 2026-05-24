'use client';

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ServiceItem {
  id: string;
  title: string;
  italicWord: string;
  description: string;
  image: string;
}

const servicesData: ServiceItem[] = [
  {
    id: "01",
    title: "Aesthetic dentistry",
    italicWord: "dentistry",
    description: "Premium cosmetic treatments including advanced teeth whitening and bonding to craft your perfect smile.",
    image: "/services-01.png"
  },
  {
    id: "02",
    title: "Veneers",
    italicWord: "",
    description: "Ultra-thin, custom-made porcelain shells bonded to the front of teeth for an instant smile transformation.",
    image: "/services-02.png"
  },
  {
    id: "03",
    title: "Wisdom tooth extraction",
    italicWord: "extraction",
    description: "Safe, gentle, and virtually pain-free surgical removal of impacted or problematic wisdom teeth.",
    image: "/services-03.png"
  },
  {
    id: "04",
    title: "Implantation",
    italicWord: "",
    description: "State-of-the-art dental implants to replace missing teeth with natural-looking, permanent results.",
    image: "/services-04.png"
  },
  {
    id: "05",
    title: "Orthodontic treatment",
    italicWord: "treatment",
    description: "Clear aligners and modern braces tailored to align your teeth comfortably and efficiently.",
    image: "/services-05.png"
  },
  {
    id: "06",
    title: "Professional hygiene",
    italicWord: "hygiene",
    description: "Comprehensive scaling, polishing, and preventive care to maintain long-term oral health.",
    image: "/services-06.png"
  }
];

function ServiceCard({ id, title, italicWord, description, image }: ServiceItem) {
  const renderTitle = () => {
    if (!italicWord) return title;
    const parts = title.split(italicWord);
    return (
      <>
        {parts[0]}
        <span className="font-serif italic font-light">{italicWord}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className="service-card group [perspective:1000px] aspect-square w-full max-w-sm mx-auto sm:max-w-none cursor-pointer select-none">
      <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        
        {/* Card Front (White, enlarged text, minimal spacing) */}
        <div className="absolute inset-0 w-full h-full rounded-[2rem] md:rounded-[2.5rem] bg-white p-6 md:p-8 flex flex-col justify-between [backface-visibility:hidden] shadow-sm hover:shadow-md transition-shadow duration-500">
          {/* Top Section */}
          <div className="flex items-start justify-between w-full">
            {/* Render Image */}
            <div className="w-16 h-16 md:w-20 md:h-20 relative bg-zinc-50 rounded-2xl overflow-hidden flex items-center justify-center p-2">
              <Image 
                src={image} 
                alt={title} 
                width={80} 
                height={80} 
                className="object-contain" 
              />
            </div>
            {/* Plus Indicator */}
            <div className="text-zinc-400 text-xs tracking-wider">
              ( + )
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col gap-2 mt-4">
            {/* Number ID */}
            <span className="text-zinc-400 text-xs select-none">
              ({id})
            </span>
            {/* Enlarged Title Text */}
            <h3 className="text-2xl sm:text-3xl md:text-[1.85rem] font-sans font-light text-zinc-900 tracking-tight leading-[1.1] md:leading-[1.15]">
              {renderTitle()}
            </h3>
          </div>
        </div>

        {/* Card Back (Dark grey, white description) */}
        <div className="absolute inset-0 w-full h-full rounded-[2rem] md:rounded-[2.5rem] bg-[#1a1a1a] p-6 md:p-8 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-md">
          {/* Top Section */}
          <div className="flex items-start justify-between w-full">
            <span className="text-zinc-500 text-xs select-none">
              ({id})
            </span>
            {/* Minus Indicator */}
            <div className="text-zinc-500 text-xs tracking-wider">
              ( - )
            </div>
          </div>

          {/* Middle/Bottom Description */}
          <div className="flex flex-col gap-3 mb-2 md:mb-4">
            <span className="text-zinc-500 text-[10px] tracking-widest uppercase font-medium">
              Service Details
            </span>
            <p className="text-white text-sm sm:text-base md:text-lg lg:text-[1.2rem] font-light tracking-wide leading-relaxed">
              {description}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Scrub animations for Services section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%",
          end: "bottom 90%",
          scrub: 1.2,
        }
      });

      tl.fromTo(
        ".services-label", 
        { opacity: 0, x: -20 }, 
        { opacity: 1, x: 0 }, 
        0
      )
      .fromTo(
        ".services-title-wrap", 
        { opacity: 0, y: 40 }, 
        { opacity: 1, y: 0 }, 
        0.05
      )
      .fromTo(
        ".service-card", 
        { opacity: 0, y: 60, scale: 0.97 }, 
        { opacity: 1, y: 0, scale: 1, stagger: 0.05 }, 
        0.1
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="services"
      className="w-full min-h-screen bg-[#ebebeb] text-zinc-900 py-16 px-6 md:py-28 md:px-16 lg:px-24 flex flex-col justify-between font-sans relative overflow-hidden"
    >
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-start gap-6 md:gap-12 lg:gap-24 w-full">
        {/* Label */}
        <div className="services-label flex items-center gap-2 text-zinc-500 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase select-none w-full md:w-[15%]">
          <span>•</span>
          <span>Services</span>
        </div>

        {/* Big Heading & Description */}
        <div className="services-title-wrap w-full md:w-[85%] select-text flex flex-col items-start gap-5">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5vw] font-light leading-[1.15] text-zinc-900 tracking-tight font-sans">
            Transforming Smiles
            <br />
            <span className="font-serif italic font-light text-zinc-950">
              with Modern Treatments
            </span>
          </h2>
          <p className="text-zinc-600 text-xs sm:text-xs md:text-sm font-light tracking-[0.5px] leading-relaxed max-w-lg">
            Whether you&apos;re in need of a routine check-up, a cosmetic enhancement, or emergency care, we have the expertise and technology to give you the best possible care.
          </p>
        </div>
      </div>

      {/* Grid Section (Uniform grid without offset columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-16 md:mt-24 w-full">
        {servicesData.map((service) => (
          <ServiceCard key={service.id} {...service} />
        ))}
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef, useState, FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    service: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

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
        ".contact-label",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0 },
        0
      )
      .fromTo(
        ".contact-form-wrap",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0 },
        0.05
      )
      .fromTo(
        ".contact-info-wrap",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0 },
        0.1
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: "", email: "", service: "", message: "" });
    }, 3000);
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="w-full min-h-screen bg-[#faf9f7] text-zinc-900 py-16 px-6 md:py-28 md:px-16 lg:px-24 flex flex-col justify-between font-sans relative overflow-hidden"
    >
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-start gap-6 md:gap-12 lg:gap-24 w-full">
        {/* Label */}
        <div className="contact-label flex items-center gap-2 text-zinc-400 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase select-none w-full md:w-[15%]">
          <span>•</span>
          <span>Contact</span>
        </div>

        {/* Heading */}
        <div className="w-full md:w-[85%] select-text">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5vw] font-sans font-light leading-[1.15] text-zinc-900 tracking-tight">
            Begin your journey
            <br />
            <span className="font-serif italic font-light text-zinc-700">
              to a perfect smile
            </span>
          </h2>
        </div>
      </div>

      {/* Forms & Info Content Grid */}
      <div className="flex flex-col lg:flex-row items-stretch justify-between gap-16 mt-16 md:mt-24 w-full">
        {/* Left: Contact Form */}
        <div className="contact-form-wrap w-full lg:w-[50%] bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-zinc-100 flex flex-col justify-between">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center text-center py-16 gap-4">
              <div className="w-12 h-12 rounded-full border border-zinc-300 flex items-center justify-center select-none shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
              </div>
              <h3 className="text-xl font-serif italic text-zinc-850">Thank you</h3>
              <p className="text-sm font-light text-zinc-500 max-w-xs">
                Your consultation request has been received. Our concierge team will reach out shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-[10px] uppercase tracking-wider text-zinc-400 font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="e.g. Charlotte Rose"
                  className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm font-light text-zinc-800 placeholder-zinc-300 border border-zinc-100 focus:outline-none focus:border-zinc-300 transition-colors"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-[10px] uppercase tracking-wider text-zinc-400 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="e.g. charlotte@example.com"
                  className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm font-light text-zinc-800 placeholder-zinc-300 border border-zinc-100 focus:outline-none focus:border-zinc-300 transition-colors"
                />
              </div>

              {/* Service Select */}
              <div className="flex flex-col gap-2">
                <label htmlFor="service" className="text-[10px] uppercase tracking-wider text-zinc-400 font-medium">
                  Desired Treatment
                </label>
                <select
                  id="service"
                  required
                  value={formState.service}
                  onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                  className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm font-light text-zinc-800 border border-zinc-100 focus:outline-none focus:border-zinc-300 transition-colors appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select a service...</option>
                  <option value="aesthetic">Aesthetic Dentistry</option>
                  <option value="veneers">Porcelain Veneers</option>
                  <option value="implant">Dental Implantation</option>
                  <option value="orthodontics">Orthodontics</option>
                  <option value="hygiene">Professional Hygiene</option>
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-[10px] uppercase tracking-wider text-zinc-400 font-medium">
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Tell us about your dental goals..."
                  className="w-full bg-zinc-50 rounded-xl px-4 py-3 text-sm font-light text-zinc-800 placeholder-zinc-300 border border-zinc-100 focus:outline-none focus:border-zinc-300 transition-colors resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="group inline-flex items-center justify-start text-zinc-900 hover:text-zinc-700 font-serif italic text-base sm:text-lg tracking-wide transition-colors mt-4 self-start"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  ( Submit Request )
                </span>
              </button>
            </form>
          )}
        </div>

        {/* Right: Contact Information */}
        <div className="contact-info-wrap w-full lg:w-[42%] flex flex-col justify-between py-2 gap-12 lg:gap-0">
          
          {/* Clinic Details */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
                Address
              </span>
              <p className="text-zinc-750 text-sm md:text-base font-light tracking-wide leading-relaxed">
                142 Excellence Blvd, Suite 400<br />
                New York, NY 10013
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
                Contact Details
              </span>
              <a
                href="tel:+15550192834"
                className="text-zinc-750 hover:text-zinc-900 text-sm md:text-base font-light tracking-wide transition-colors"
              >
                +1 (555) 019-2834
              </a>
              <a
                href="mailto:hello@feroxclinic.com"
                className="text-zinc-750 hover:text-zinc-900 text-sm md:text-base font-light tracking-wide transition-colors"
              >
                hello@feroxclinic.com
              </a>
            </div>
          </div>

          {/* Working Hours */}
          <div className="flex flex-col gap-6 bg-zinc-50 border border-zinc-100 p-8 rounded-[2rem]">
            <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
              Opening Hours
            </span>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-sm font-light text-zinc-700">
                <span>Monday - Friday</span>
                <span className="font-medium text-zinc-900">8:00 AM - 6:00 PM</span>
              </div>
              <div className="w-full h-[1px] bg-zinc-200/60" />
              <div className="flex justify-between items-center text-sm font-light text-zinc-700">
                <span>Saturday</span>
                <span className="font-medium text-zinc-900">9:00 AM - 3:00 PM</span>
              </div>
              <div className="w-full h-[1px] bg-zinc-200/60" />
              <div className="flex justify-between items-center text-sm font-light text-zinc-400">
                <span>Sunday</span>
                <span>Closed</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

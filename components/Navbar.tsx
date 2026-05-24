'use client';

import { useState, useEffect } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "About Us", href: "#about" },
    { label: "Our Doctors", href: "#doctors" },
    { label: "Contact", href: "#contact" }
  ];

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="relative w-full z-50 flex items-center justify-between px-6 py-6 md:px-16 md:py-8 lg:px-24">
        {/* Logo */}
        <a href="#home" className="flex items-center select-none">
          <span className="font-sans text-[11px] md:text-lg font-semibold tracking-[0.25em] text-white hover:text-white/80 transition-colors uppercase">
            Ferox
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[10px] md:text-[11px] font-medium tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA / Contact Info */}
        {/* <div className="hidden md:block">
          <a
            href="tel:+15550192834"
            className="text-[10px] md:text-[11px] font-medium tracking-[0.2em] uppercase text-white hover:text-white/80 transition-colors duration-200"
          >
            +1 (555) 019-2834
          </a>
        </div> */}

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 focus:outline-none z-50 group"
          aria-label="Toggle navigation menu"
        >
          <span
            className={`w-5 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? "transform rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-white my-1 transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? "transform -rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-black/95 z-40 md:hidden flex flex-col justify-center items-center p-8 transition-all duration-500 ease-in-out ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl font-serif italic tracking-wide text-white/95 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:+15550192834"
            onClick={() => setIsMenuOpen(false)}
            className="text-xs tracking-[0.25em] mt-8 uppercase font-medium text-white/70 hover:text-white transition-colors duration-200"
          >
            +1 (555) 019-2834
          </a>
        </nav>
      </div>
    </>
  );
}

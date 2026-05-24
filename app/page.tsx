import HeroBackground from "@/components/HeroBackground";
import Navbar from "@/components/Navbar";
import HeroContent from "@/components/HeroContent";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <div className="w-full bg-black scroll-smooth">
      {/* Fullscreen Hero Section */}
      <div className="relative w-full h-screen overflow-hidden flex flex-col justify-between text-white font-sans">
        {/* Background with optimized Next.js Image & gradient overlays */}
        <HeroBackground src="/hero-bg.jpg" alt="Dental Hero Background" />

        {/* Header and navigation controls */}
        <Navbar />

        {/* Hero section main messaging and CTA buttons */}
        <HeroContent />
      </div>

      {/* About Section */}
      <AboutSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}

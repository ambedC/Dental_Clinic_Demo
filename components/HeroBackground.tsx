import Image from "next/image";

interface HeroBackgroundProps {
  src: string;
  alt: string;
}

export default function HeroBackground({ src, alt }: HeroBackgroundProps) {
  return (
    <div className="absolute inset-0 z-0 select-none pointer-events-none">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        className="object-cover object-[75%_center] md:object-[right_30%_center] brightness-[0.78] contrast-[1.02]"
      />
      {/* Soft luxury gradients to ensure readability and match reference image shadows */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 z-10" />
    </div>
  );
}

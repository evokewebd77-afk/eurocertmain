import React from 'react';

const LOGO_NAMES = [
  "image copy -1.png", "image copy 0.png", "image copy 1.png", "image copy 2.png", "image copy 3.png",
  "image copy 4.png", "image copy 5.png", "image copy 6.png", "image copy 7.png", "image copy 8.png",
  "image copy 9.png", "image copy 10.png", "image copy 11.png", "image copy 12.png", "image copy 13.png",
  "image copy 14.png", "image copy 15.png", "image copy 16.png", "image copy 17.png", "image copy 18.png",
  "image copy 19.png", "image copy 20.png", "image copy 21.png", "image copy 22.png", "image copy 23.png",
  "image copy 24.png", "image copy 25.png", "image copy 26.png", "image copy 27.png", "image copy 28.png",
  "image copy 29.png", "image copy 30.png", "image copy 31.png", "image copy 32.png", "image copy 33.png"
];

const group1 = LOGO_NAMES.slice(0, 12);
const group2 = LOGO_NAMES.slice(12, 24);
const group3 = LOGO_NAMES.slice(24);

function MarqueeRow({ logos, direction = "left", duration = 35 }) {
  const doubledLogos = [...logos, ...logos];
  const animClass = direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className="overflow-hidden relative py-4">
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#030a16] to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#030a16] to-transparent pointer-events-none"></div>
      
      <div 
        className={`flex gap-6 items-center w-max ${animClass}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {doubledLogos.map((logo, idx) => (
          <div 
            key={`${logo}-${idx}`}
            className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center justify-center p-4 hover:shadow-[0_8px_30px_rgba(212,168,67,0.15)] hover:border-[#d8ad4c]/20 transition-all duration-300 group"
          >
            <img 
              src={`/${encodeURIComponent(logo)}`}
              alt="Certification logo"
              className="max-w-full max-h-full object-contain opacity-85 group-hover:opacity-100 transition-opacity duration-300"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CertificationsStandards() {
  return (
    <section id="certifications-standards" className="relative overflow-hidden bg-[#030a16] py-16 lg:py-24 border-t border-white/10">
      <div className="absolute inset-0 bg-[#030a16]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,168,67,0.06)_0%,transparent_60%)] pointer-events-none"></div>

      <div className="relative z-10">
        <div className="container mx-auto px-6 text-center mb-10">
          <h4 className="heading-font text-[11px] text-[#d8ad4c] tracking-[0.5em] uppercase mb-3 font-bold">
            Global Standards Spectrum
          </h4>
          <h2 className="heading-font text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            Certifications & Standards
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Internationally recognized certifications and standards we provide to help your business succeed globally.
          </p>
        </div>

        <div className="space-y-4">
          <MarqueeRow logos={group1} direction="left" duration={40} />
          <MarqueeRow logos={group2} direction="right" duration={35} />
          <MarqueeRow logos={group3} direction="left" duration={38} />
        </div>
      </div>
    </section>
  );
}

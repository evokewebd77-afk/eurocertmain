import React, { useState, useEffect } from 'react';

export default function FloatingActionButtons() {
  const [visible, setVisible] = useState(false);
  const [isFostacPage, setIsFostacPage] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname.includes('/training/fostac')) {
      setIsFostacPage(true);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 250) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (isFostacPage) {
    return null;
  }

  const phoneNum = "919316012883";
  const emailUrl = "mailto:info@eurocert.in?cc=eurocert.mv@gmail.com";

  return (
    <div 
      className={`fixed bottom-24 right-5 sm:bottom-28 sm:right-7 z-[9999] flex flex-col gap-3 transition-all duration-400 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
      }`}
    >
      {/* Phone Button */}
      <a
        href={`tel:+${phoneNum}`}
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#061226]/90 backdrop-blur-md border border-[#d8ad4c]/40 text-[#d8ad4c] hover:bg-[#d8ad4c] hover:text-[#030a16] shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-[#d8ad4c] hover:shadow-[0_0_25px_rgba(216,173,76,0.6)] flex items-center justify-center transition-all duration-300 group cursor-pointer"
        aria-label="Call us (+91 9316012883)"
        title="Call us: +91 9316012883"
      >
        <i className="fas fa-phone text-sm transition-transform group-hover:scale-110"></i>
      </a>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${phoneNum}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#061226]/90 backdrop-blur-md border border-[#d8ad4c]/40 text-[#d8ad4c] hover:bg-[#25D366] hover:text-white hover:border-[#25D366] shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(37,211,102,0.6)] flex items-center justify-center transition-all duration-300 group cursor-pointer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <i className="fab fa-whatsapp text-lg transition-transform group-hover:scale-110"></i>
      </a>

      {/* Mail Button */}
      <a
        href={emailUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#061226]/90 backdrop-blur-md border border-[#d8ad4c]/40 text-[#d8ad4c] hover:bg-[#d8ad4c] hover:text-[#030a16] shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-[#d8ad4c] hover:shadow-[0_0_25px_rgba(216,173,76,0.6)] flex items-center justify-center transition-all duration-300 group cursor-pointer"
        aria-label="Email Us"
        title="Email Us: info@eurocert.in"
      >
        <i className="fas fa-envelope text-sm transition-transform group-hover:scale-110"></i>
      </a>

      {/* Back to Top Button */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#061226]/90 backdrop-blur-md border border-[#d8ad4c]/40 text-[#d8ad4c] hover:bg-[#d8ad4c] hover:text-[#030a16] shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-[#d8ad4c] hover:shadow-[0_0_25px_rgba(216,173,76,0.6)] flex items-center justify-center transition-all duration-300 group cursor-pointer"
        aria-label="Scroll to top"
        title="Back to top"
      >
        <i className="fas fa-chevron-up text-sm transition-transform group-hover:-translate-y-0.5"></i>
      </button>
    </div>
  );
}

import React, { useState, useEffect } from 'react';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const triggerBtn = document.getElementById('open-mobile-menu-btn');
    if (triggerBtn) {
      triggerBtn.addEventListener('click', handleOpen);
    }
    return () => {
      if (triggerBtn) {
        triggerBtn.removeEventListener('click', handleOpen);
      }
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex bg-black/90 backdrop-blur-2xl text-white">
      <div className="w-full h-full p-6 overflow-y-auto relative flex flex-col">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 text-3xl text-white/80 hover:text-white"
          aria-label="Close mobile navigation"
        >
          &times;
        </button>

        <div className="mb-8 pt-4">
          <a href="/" onClick={() => setIsOpen(false)} className="inline-block">
            <img src="https://res.cloudinary.com/dwnnakrrh/image/upload/f_auto,q_auto:good,w_1600/v1782367859/eurocert/Untitled_design_19_.png.png" alt="EUROCERT Logo" class="h-12 w-auto" />
          </a>
        </div>

        <nav className="space-y-4 text-sm font-semibold uppercase tracking-wider heading-font flex-1">
          <a href="/ce-certification" onClick={() => setIsOpen(false)} className="block py-2 border-b border-white/10 hover:text-eurogold-400">CE Marking</a>
          <a href="/food-certification" onClick={() => setIsOpen(false)} className="block py-2 border-b border-white/10 hover:text-eurogold-400">Food & Agri</a>
          <a href="/social-audits" onClick={() => setIsOpen(false)} className="block py-2 border-b border-white/10 hover:text-eurogold-400">Social Audits</a>
          <a href="/management-systems" onClick={() => setIsOpen(false)} className="block py-2 border-b border-white/10 hover:text-eurogold-400">Management Systems</a>
          <a href="/sustainability" onClick={() => setIsOpen(false)} className="block py-2 border-b border-white/10 hover:text-eurogold-400">Sustainability</a>
          <a href="/training" onClick={() => setIsOpen(false)} className="block py-2 border-b border-white/10 hover:text-eurogold-400">Training</a>
          <a href="/accreditations" onClick={() => setIsOpen(false)} className="block py-2 border-b border-white/10 hover:text-eurogold-400">Accreditations</a>
          <a href="/certified-clients" onClick={() => setIsOpen(false)} className="block py-2 border-b border-white/10 hover:text-eurogold-400">Certified Clients</a>
          <a href="/contact" onClick={() => setIsOpen(false)} className="block py-2 border-b border-white/10 hover:text-eurogold-400">Contact Us</a>
        </nav>

        <div className="pt-6 border-t border-white/10 text-xs text-white/60 space-y-2">
          <div><i className="fas fa-phone mr-2 text-eurogold-400"></i>+91 9316012883</div>
          <div><i className="fas fa-envelope mr-2 text-eurogold-400"></i>info@eurocert.in</div>
        </div>
      </div>
    </div>
  );
}

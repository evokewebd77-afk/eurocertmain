import React, { useState, useEffect, useRef } from 'react';

const COUNTRIES = [
  { name: "Greece", desc: "Headquarters — Eurocert SA (est. 1998), Greece", position: [39.1, 21.8], isHQ: true },
  { name: "Australia", desc: "Eurocert activities", position: [-25.3, 133.8] },
  { name: "Bahrain", desc: "Eurocert activities", position: [26.1, 50.6] },
  { name: "Bangladesh", desc: "Eurocert activities", position: [23.7, 90.4] },
  { name: "Bulgaria", desc: "Eurocert activities", position: [42.7, 25.5] },
  { name: "Canada", desc: "Eurocert activities", position: [56.1, -106.3] },
  { name: "Egypt", desc: "Eurocert activities", position: [26.8, 30.8] },
  { name: "France", desc: "Eurocert activities", position: [46.2, 2.2] },
  { name: "Gabon", desc: "Eurocert activities", position: [-0.8, 11.6] },
  { name: "Georgia", desc: "Eurocert activities", position: [42.3, 43.4] },
  { name: "India", desc: "Eurocert activities", position: [30.7, 76.8] },
  { name: "Iran", desc: "Eurocert activities", position: [32.4, 53.7] },
  { name: "Italy", desc: "Eurocert activities", position: [41.9, 12.6] },
  { name: "Japan", desc: "Eurocert activities", position: [36.2, 138.3] },
  { name: "Jordan", desc: "Eurocert activities", position: [31.0, 36.2] },
  { name: "Kingdom of Saudi Arabia", desc: "Eurocert activities", position: [24.0, 45.0] },
  { name: "Libya", desc: "Eurocert activities", position: [27.0, 17.0] },
  { name: "Malaysia", desc: "Eurocert activities", position: [4.2, 102.0] },
  { name: "Nepal", desc: "Eurocert activities", position: [28.4, 84.1] },
  { name: "Netherlands", desc: "Eurocert activities", position: [52.1, 5.3] },
  { name: "Nigeria", desc: "Eurocert activities", position: [9.1, 8.7] },
  { name: "Pakistan", desc: "Eurocert activities", position: [30.4, 69.3] },
  { name: "Philippines", desc: "Eurocert activities", position: [12.9, 121.8] },
  { name: "Republic of Cyprus", desc: "Eurocert activities", position: [35.1, 33.4] },
  { name: "Republic of Ghana", desc: "Eurocert activities", position: [7.9, -1.0] },
  { name: "Republic of Indonesia", desc: "Eurocert activities", position: [-0.8, 113.9] },
  { name: "Republic of Iraq", desc: "Eurocert activities", position: [33.0, 44.0] },
  { name: "Republic of Korea (South Korea)", desc: "Eurocert activities", position: [35.9, 127.8] },
  { name: "Republic of Kuwait", desc: "Eurocert activities", position: [29.3, 47.5] },
  { name: "Republic of Maldives", desc: "Eurocert activities", position: [3.2, 73.2] },
  { name: "Republic of South Africa", desc: "Eurocert activities", position: [-30.6, 22.9] },
  { name: "Romania", desc: "Eurocert activities", position: [46.0, 25.0] },
  { name: "Rwanda", desc: "Eurocert activities", position: [-2.0, 29.9] },
  { name: "Singapore", desc: "Eurocert activities", position: [1.35, 103.8] },
  { name: "Sri Lanka", desc: "Eurocert activities", position: [7.9, 80.8] },
  { name: "State of Qatar", desc: "Eurocert activities", position: [25.3, 51.5] },
  { name: "Sultanate of Oman", desc: "Eurocert activities", position: [21.5, 55.9] },
  { name: "Taiwan", desc: "Eurocert activities", position: [23.5, 121.0] },
  { name: "Tanzania", desc: "Eurocert activities", position: [-6.4, 34.9] },
  { name: "Thailand", desc: "Eurocert activities", position: [15.9, 100.9] },
  { name: "Turkey", desc: "Eurocert activities", position: [39.0, 35.0] },
  { name: "Vietnam", desc: "Eurocert activities", position: [14.1, 108.3] },
  { name: "United Arab Emirates (UAE)", desc: "Eurocert activities", position: [24.0, 54.0] },
  { name: "United Kingdom", desc: "Eurocert activities", position: [54.0, -2.5] },
  { name: "United States of America", desc: "Eurocert activities", position: [38.0, -97.0] },
  { name: "Kazakhstan", desc: "Eurocert activities", position: [48.0, 68.0] },
  { name: "Russian Federation", desc: "Eurocert activities", position: [61.5, 105.3] },
  { name: "Uzbekistan", desc: "Eurocert activities", position: [41.3, 64.4] },
  { name: "Yemen", desc: "Eurocert activities", position: [15.6, 48.5] }
];

export default function GlobalPresenceMap() {
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('Greece');
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});

  const filteredCountries = COUNTRIES.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    // Dynamically load Leaflet JS & CSS
    if (typeof window === 'undefined') return;

    const loadLeaflet = async () => {
      if (!window.L) {
        if (!document.getElementById('leaflet-css')) {
          const link = document.createElement('link');
          link.id = 'leaflet-css';
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          document.head.appendChild(link);
        }

        await new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          script.onload = resolve;
          document.body.appendChild(script);
        });
      }

      const L = window.L;
      if (!mapContainerRef.current || mapInstanceRef.current) return;

      const map = L.map(mapContainerRef.current, {
        center: [30, 20],
        zoom: 2.5,
        minZoom: 2,
        maxZoom: 8,
        zoomControl: false,
        attributionControl: false
      });

      L.control.zoom({ position: 'topleft' }).addTo(map);

      // Dark Matter Map Tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      mapInstanceRef.current = map;

      const hqPos = [39.1, 21.8]; // Greece HQ

      // Draw connection lines & markers for 49 countries
      COUNTRIES.forEach((country) => {
        const isHQ = country.isHQ;

        // Draw curved connection arc line from Greece to target country
        if (!isHQ) {
          const latlngs = [
            hqPos,
            [(hqPos[0] + country.position[0]) / 2 + 5, (hqPos[1] + country.position[1]) / 2],
            country.position
          ];
          L.polyline(latlngs, {
            color: '#D4A843',
            weight: 1.2,
            opacity: 0.45,
            smoothFactor: 1
          }).addTo(map);
        }

        // Custom Gold / HQ Marker Icon
        const iconHtml = isHQ 
          ? `<div style="background:#D4A843; width:16px; height:16px; border-radius:50%; border:3px solid #fff; box-shadow:0 0 15px #D4A843; animation:pulse 2s infinite;"></div>`
          : `<div style="background:#D4A843; width:10px; height:10px; border-radius:50%; border:2px solid #030a16; box-shadow:0 0 8px rgba(212,168,67,0.7);"></div>`;

        const customIcon = L.divIcon({
          html: iconHtml,
          className: 'custom-map-marker',
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        });

        const marker = L.marker(country.position, { icon: customIcon }).addTo(map);

        marker.bindTooltip(
          `<div style="font-family:sans-serif; padding:4px 8px; font-weight:bold; color:#030a16;">${country.name} ${isHQ ? '★ (HQ)' : ''}</div>`,
          { permanent: false, direction: 'top' }
        );

        marker.on('click', () => {
          setSelectedCountry(country.name);
          map.setView(country.position, 4, { animate: true });
        });

        markersRef.current[country.name] = marker;
      });
    };

    loadLeaflet();
  }, []);

  const handleCountryClick = (c) => {
    setSelectedCountry(c.name);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(c.position, 4, { animate: true });
      if (markersRef.current[c.name]) {
        markersRef.current[c.name].openTooltip();
      }
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#030a16] py-16 lg:py-24 border-t border-b border-white/10">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,67,0.05)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4A843]/10 border border-[#D4A843]/30 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#D4A843] animate-ping"></span>
            <span className="text-xs font-bold text-[#D4A843] uppercase tracking-widest">
              49 countries <span className="text-white/40 font-normal">and growing</span>
            </span>
          </div>

          <h2 className="heading-font text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Global <span className="bg-gradient-to-r from-[#D4A843] to-[#f3e5ab] bg-clip-text text-transparent">Presence</span>
          </h2>

          <p className="text-white/60 text-sm sm:text-base leading-relaxed">
            With headquarters in Greece, Eurocert operates internationally through the Eurocert Group, supporting clients across industries worldwide.
          </p>
        </div>

        {/* Map Box */}
        <div className="relative rounded-3xl border border-white/10 bg-[#061021] overflow-hidden shadow-2xl mb-8">

          {/* Search Bar Overlay */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-md">
            <div className="relative">
              <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-sm"></i>
              <input
                type="text"
                placeholder="Search country..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#030a16]/90 backdrop-blur-md border border-white/15 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#D4A843] shadow-lg transition-all"
              />
            </div>
          </div>

          {/* Leaflet Canvas Container */}
          <div 
            ref={mapContainerRef} 
            className="w-full h-[480px] sm:h-[540px] bg-[#030a16]"
          ></div>
        </div>

        {/* Country Filter Chips Grid (Matching User Screenshot 2) */}
        <div className="rounded-3xl border border-white/10 bg-[#061021]/80 backdrop-blur-md p-6 sm:p-8">
          <div className="flex flex-wrap gap-2.5 justify-center">
            {filteredCountries.map((c) => {
              const isSelected = selectedCountry === c.name;
              return (
                <button
                  key={c.name}
                  onClick={() => handleCountryClick(c)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#D4A843] text-slate-950 font-bold shadow-[0_0_15px_rgba(212,168,67,0.4)] scale-105'
                      : 'bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 hover:border-white/20'
                  }`}
                >
                  {c.isHQ && <span className="text-amber-300 font-bold">★</span>}
                  {c.name}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

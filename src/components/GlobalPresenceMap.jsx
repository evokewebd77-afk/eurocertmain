import React, { useState, useEffect, useRef } from 'react';

const COUNTRIES = [
  { name: "Greece", desc: "Global Headquarters — Eurocert SA (est. 1998), Greece", position: [39.1, 21.8], isHQ: true },
  { name: "Australia", desc: "Eurocert International Operations", position: [-25.3, 133.8] },
  { name: "Bahrain", desc: "Eurocert Regional Operations", position: [26.1, 50.6] },
  { name: "Bangladesh", desc: "Eurocert Regional Operations", position: [23.7, 90.4] },
  { name: "Bulgaria", desc: "Eurocert European Operations", position: [42.7, 25.5] },
  { name: "Canada", desc: "Eurocert Americas Operations", position: [56.1, -106.3] },
  { name: "Egypt", desc: "Eurocert MENA Operations", position: [26.8, 30.8] },
  { name: "France", desc: "Eurocert European Operations", position: [46.2, 2.2] },
  { name: "Gabon", desc: "Eurocert Africa Operations", position: [-0.8, 11.6] },
  { name: "Georgia", desc: "Eurocert Regional Operations", position: [42.3, 43.4] },
  { name: "India", desc: "Eurocert Asia Headquarters", position: [30.7, 76.8] },
  { name: "Iran", desc: "Eurocert Regional Operations", position: [32.4, 53.7] },
  { name: "Italy", desc: "Eurocert European Operations", position: [41.9, 12.6] },
  { name: "Japan", desc: "Eurocert East Asia Operations", position: [36.2, 138.3] },
  { name: "Jordan", desc: "Eurocert MENA Operations", position: [31.0, 36.2] },
  { name: "Kingdom of Saudi Arabia", desc: "Eurocert Middle East Operations", position: [24.0, 45.0] },
  { name: "Libya", desc: "Eurocert MENA Operations", position: [27.0, 17.0] },
  { name: "Malaysia", desc: "Eurocert SE Asia Operations", position: [4.2, 102.0] },
  { name: "Nepal", desc: "Eurocert South Asia Operations", position: [28.4, 84.1] },
  { name: "Netherlands", desc: "Eurocert European Operations", position: [52.1, 5.3] },
  { name: "Nigeria", desc: "Eurocert Africa Operations", position: [9.1, 8.7] },
  { name: "Pakistan", desc: "Eurocert South Asia Operations", position: [30.4, 69.3] },
  { name: "Philippines", desc: "Eurocert SE Asia Operations", position: [12.9, 121.8] },
  { name: "Republic of Cyprus", desc: "Eurocert Mediterranean Operations", position: [35.1, 33.4] },
  { name: "Republic of Ghana", desc: "Eurocert Africa Operations", position: [7.9, -1.0] },
  { name: "Republic of Indonesia", desc: "Eurocert SE Asia Operations", position: [-0.8, 113.9] },
  { name: "Republic of Iraq", desc: "Eurocert Middle East Operations", position: [33.0, 44.0] },
  { name: "Republic of Korea (South Korea)", desc: "Eurocert East Asia Operations", position: [35.9, 127.8] },
  { name: "Republic of Kuwait", desc: "Eurocert Middle East Operations", position: [29.3, 47.5] },
  { name: "Republic of Maldives", desc: "Eurocert Operations", position: [3.2, 73.2] },
  { name: "Republic of South Africa", desc: "Eurocert Africa Operations", position: [-30.6, 22.9] },
  { name: "Romania", desc: "Eurocert European Operations", position: [46.0, 25.0] },
  { name: "Rwanda", desc: "Eurocert Africa Operations", position: [-2.0, 29.9] },
  { name: "Singapore", desc: "Eurocert SE Asia Hub", position: [1.35, 103.8] },
  { name: "Sri Lanka", desc: "Eurocert South Asia Operations", position: [7.9, 80.8] },
  { name: "State of Qatar", desc: "Eurocert Middle East Operations", position: [25.3, 51.5] },
  { name: "Sultanate of Oman", desc: "Eurocert Middle East Operations", position: [21.5, 55.9] },
  { name: "Taiwan", desc: "Eurocert East Asia Operations", position: [23.5, 121.0] },
  { name: "Tanzania", desc: "Eurocert Africa Operations", position: [-6.4, 34.9] },
  { name: "Thailand", desc: "Eurocert SE Asia Operations", position: [15.9, 100.9] },
  { name: "Turkey", desc: "Eurocert Regional Operations", position: [39.0, 35.0] },
  { name: "Vietnam", desc: "Eurocert SE Asia Operations", position: [14.1, 108.3] },
  { name: "United Arab Emirates (UAE)", desc: "Eurocert Middle East Hub", position: [24.0, 54.0] },
  { name: "United Kingdom", desc: "Eurocert European Operations", position: [54.0, -2.5] },
  { name: "United States of America", desc: "Eurocert Americas Operations", position: [38.0, -97.0] },
  { name: "Kazakhstan", desc: "Eurocert Central Asia Operations", position: [48.0, 68.0] },
  { name: "Russian Federation", desc: "Eurocert Regional Operations", position: [61.5, 105.3] },
  { name: "Uzbekistan", desc: "Eurocert Central Asia Operations", position: [41.3, 64.4] },
  { name: "Yemen", desc: "Eurocert Regional Operations", position: [15.6, 48.5] }
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
        center: [32, 25],
        zoom: 2.8,
        minZoom: 2,
        maxZoom: 7,
        zoomControl: false,
        attributionControl: false
      });

      L.control.zoom({ position: 'topleft' }).addTo(map);

      // CARTO Dark Matter Tiles with high contrast
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png', {
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      mapInstanceRef.current = map;

      const hqPos = [39.1, 21.8]; // Greece HQ

      // Curved Connection Lines
      const getCurvedPoints = (start, end) => {
        const lat1 = start[0], lng1 = start[1];
        const lat2 = end[0], lng2 = end[1];
        const midLat = (lat1 + lat2) / 2 + Math.min(Math.abs(lng2 - lng1) * 0.15, 18);
        const midLng = (lng1 + lng2) / 2;
        
        const points = [];
        for (let t = 0; t <= 1; t += 0.05) {
          const lat = (1 - t) * (1 - t) * lat1 + 2 * (1 - t) * t * midLat + t * t * lat2;
          const lng = (1 - t) * (1 - t) * lng1 + 2 * (1 - t) * t * midLng + t * t * lng2;
          points.push([lat, lng]);
        }
        return points;
      };

      // Draw Arcs & Markers with Permanent Text Labels (Matching User Screenshot)
      COUNTRIES.forEach((country) => {
        const isHQ = country.isHQ;

        if (!isHQ) {
          const curvedPoints = getCurvedPoints(hqPos, country.position);
          L.polyline(curvedPoints, {
            color: '#d8ad4c',
            weight: 1.4,
            opacity: 0.55,
            smoothFactor: 1,
            lineCap: 'round'
          }).addTo(map);
        }

        // Custom Marker HTML containing Dot + Permanent Country Name Label
        const markerHtml = isHQ 
          ? `<div style="display:flex; align-items:center; white-space:nowrap; pointer-events:auto; cursor:pointer;">
              <div style="position:relative; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                <div style="position:absolute; width:22px; height:22px; border-radius:50%; background:#3b82f6; opacity:0.5; animation:pulse 2s infinite;"></div>
                <div style="width:14px; height:14px; border-radius:50%; background:#3b82f6; border:2.5px solid #ffffff; box-shadow:0 0 12px #3b82f6;"></div>
              </div>
              <span style="margin-left:6px; font-size:12px; font-weight:800; color:#ffffff; background:rgba(59,130,246,0.9); padding:2px 7px; border-radius:5px; text-shadow:0 1px 2px #000; font-family:system-ui,-apple-system,sans-serif; letter-spacing:0.02em;">Greece</span>
             </div>`
          : `<div style="display:flex; align-items:center; white-space:nowrap; pointer-events:auto; cursor:pointer;" class="group">
              <div style="width:8px; height:8px; border-radius:50%; background:#ffffff; border:1.5px solid #000; box-shadow:0 0 6px rgba(255,255,255,0.9); flex-shrink:0;"></div>
              <span style="margin-left:6px; font-size:10.5px; font-weight:700; color:#ffffff; text-shadow:0 1px 3px #000, 0 0 3px #000; font-family:system-ui,-apple-system,sans-serif; letter-spacing:0.01em;">${country.name}</span>
             </div>`;

        const customIcon = L.divIcon({
          html: markerHtml,
          className: 'custom-leaflet-marker-with-label',
          iconSize: [120, 20],
          iconAnchor: [6, 10]
        });

        const marker = L.marker(country.position, { icon: customIcon }).addTo(map);

        const popupContent = `
          <div style="background:#061021; color:#fff; padding:10px 14px; border-radius:12px; border:1px solid rgba(212,168,67,0.4); font-family:sans-serif; min-width:180px; box-shadow:0 10px 30px rgba(0,0,0,0.5);">
            <div style="display:flex; align-items:center; gap:6px; margin-bottom:4px;">
              <span style="color:#d8ad4c; font-weight:bold; font-size:13px;">${isHQ ? '★ ' : '📍 '}</span>
              <strong style="font-size:14px; color:#fff;">${country.name}</strong>
            </div>
            <p style="margin:0; font-size:11px; color:rgba(255,255,255,0.65); line-height:1.4;">${country.desc}</p>
          </div>
        `;

        marker.bindPopup(popupContent, {
          closeButton: false,
          className: 'custom-leaflet-popup'
        });

        marker.on('click', () => {
          setSelectedCountry(country.name);
          map.setView(country.position, 4.5, { animate: true });
        });

        markersRef.current[country.name] = marker;
      });
    };

    loadLeaflet();
  }, []);

  const handleCountryClick = (c) => {
    setSelectedCountry(c.name);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(c.position, 4.5, { animate: true });
      if (markersRef.current[c.name]) {
        markersRef.current[c.name].openPopup();
      }
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#030a16] py-16 lg:py-24 border-t border-b border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(212,168,67,0.06)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d8ad4c]/10 border border-[#d8ad4c]/30 mb-4 shadow-[0_0_20px_rgba(212,168,67,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#d8ad4c] animate-pulse"></span>
            <span className="text-xs font-bold text-[#d8ad4c] uppercase tracking-widest">
              49 countries <span className="text-white/40 font-normal">and growing</span>
            </span>
          </div>

          <h2 className="heading-font text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Global <span className="bg-gradient-to-r from-[#d8ad4c] via-[#f3e5ab] to-[#d8ad4c] bg-clip-text text-transparent">Presence</span>
          </h2>

          <p className="text-white/60 text-sm sm:text-base leading-relaxed">
            With headquarters in Greece, Eurocert operates internationally through the Eurocert Group, supporting clients across industries worldwide.
          </p>
        </div>

        {/* Map Container */}
        <div className="relative rounded-3xl border border-white/15 bg-[#040d1a] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] mb-8">

          {/* Search Bar Overlay */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-md">
            <div className="relative shadow-2xl">
              <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-sm"></i>
              <input
                type="text"
                placeholder="Search country..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#030a16]/95 backdrop-blur-md border border-white/20 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#d8ad4c] shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all"
              />
            </div>
          </div>

          {/* Leaflet Canvas */}
          <div 
            ref={mapContainerRef} 
            className="w-full h-[480px] sm:h-[560px] bg-[#030a16]"
            style={{ filter: 'contrast(1.1) brightness(0.95)' }}
          ></div>
        </div>

        {/* 49 Country Filter Chips Grid */}
        <div className="rounded-3xl border border-white/10 bg-[#061021]/90 backdrop-blur-md p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-wrap gap-2 sm:gap-2.5 justify-center">
            {filteredCountries.map((c) => {
              const isSelected = selectedCountry === c.name;
              return (
                <button
                  key={c.name}
                  onClick={() => handleCountryClick(c)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#d8ad4c] to-[#e5bc5f] text-slate-950 font-bold shadow-[0_0_18px_rgba(212,168,67,0.45)] scale-105 border border-[#d8ad4c]'
                      : 'bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 hover:border-[#d8ad4c]/40'
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

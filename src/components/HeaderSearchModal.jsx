import React, { useState, useEffect } from 'react';

export default function HeaderSearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const triggerBtn = document.getElementById('open-site-search-btn');
    if (triggerBtn) {
      triggerBtn.addEventListener('click', handleOpen);
    }
    return () => {
      if (triggerBtn) {
        triggerBtn.removeEventListener('click', handleOpen);
      }
    };
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    const timer = setTimeout(() => {
      fetch('/index.txt')
        .then((res) => res.text())
        .then((text) => {
          const lines = text.split('\n');
          const matched = [];
          const q = query.toLowerCase();
          for (const line of lines) {
            if (line.toLowerCase().includes(q)) {
              const parts = line.split('|');
              const title = parts[0] || line;
              const url = parts[1] || '/';
              matched.push({ title: title.trim(), url: url.trim() });
              if (matched.length >= 10) break;
            }
          }
          setResults(matched);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md">
      <div className="bg-[#060e1f] border border-white/20 rounded-2xl w-full max-w-xl shadow-2xl p-6 relative text-white">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-white/60 hover:text-white text-xl"
          aria-label="Close search"
        >
          &times;
        </button>

        <h3 className="heading-font text-sm uppercase tracking-widest text-eurogold-400 mb-4 font-bold">
          Search Eurocert Services & Standards
        </h3>

        <div className="relative mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type standard name, e.g. ISO 9001, FSSC, CE marking..."
            autoFocus
            className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-4 pr-10 text-white placeholder-white/40 focus:outline-none focus:border-eurogold-400 text-sm"
          />
          <i className="fas fa-search absolute right-3 top-3.5 text-white/50 text-sm"></i>
        </div>

        {loading && <div className="text-xs text-white/50 py-3">Searching site catalog...</div>}

        {!loading && query && results.length === 0 && (
          <div className="text-xs text-white/50 py-3">No matching standards found for "{query}".</div>
        )}

        {results.length > 0 && (
          <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
            {results.map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                onClick={() => setIsOpen(false)}
                className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition text-xs font-semibold text-white/90 hover:text-eurogold-400"
              >
                {item.title}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

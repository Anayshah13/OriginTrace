"use client";

import React, { useState } from "react";
import InteractiveWorldMap from "@/app/components/InteractiveWorldMap";
import { Search, Globe2, ScanLine } from "lucide-react";
import { motion } from "motion/react";

export default function LandingPage() {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");

  const connections = [
    { start: { lat: 34.0522, lng: -118.2437 }, end: { lat: 40.7128, lng: -74.0060 } }, // LA to NY
    { start: { lat: 40.7128, lng: -74.0060 }, end: { lat: 51.5074, lng: -0.1278 } }, // NY to London
    { start: { lat: 51.5074, lng: -0.1278 }, end: { lat: 48.8566, lng: 2.3522 } }, // London to Paris
    { start: { lat: 48.8566, lng: 2.3522 }, end: { lat: 35.6762, lng: 139.6503 } }, // Paris to Tokyo
    { start: { lat: 35.6762, lng: 139.6503 }, end: { lat: 37.7749, lng: -122.4194 } }, // Tokyo to SF
    { start: { lat: 1.3521, lng: 103.8198 }, end: { lat: -33.8688, lng: 151.2093 } }, // Singapore to Sydney
    { start: { lat: -23.5505, lng: -46.6333 }, end: { lat: 34.0522, lng: -118.2437 } }, // Sao Paulo to LA
    { start: { lat: 28.6139, lng: 77.2090 }, end: { lat: -1.2921, lng: 36.8219 } }, // New Delhi to Nairobi
    { start: { lat: -1.2921, lng: 36.8219 }, end: { lat: 48.8566, lng: 2.3522 } }, // Nairobi to Paris
    
    // New Nodes and Connections appended
    { start: { lat: 51.5074, lng: -0.1278 }, end: { lat: 52.5200, lng: 13.4050 } }, // London to Berlin
    { start: { lat: 52.5200, lng: 13.4050 }, end: { lat: 55.7558, lng: 37.6173 } }, // Berlin to Moscow
    { start: { lat: 55.7558, lng: 37.6173 }, end: { lat: 39.9042, lng: 116.4074 } }, // Moscow to Beijing
    { start: { lat: 39.9042, lng: 116.4074 }, end: { lat: 35.6762, lng: 139.6503 } }, // Beijing to Tokyo
    { start: { lat: 35.6762, lng: 139.6503 }, end: { lat: 37.5665, lng: 126.9780 } }, // Tokyo to Seoul
    { start: { lat: -33.8688, lng: 151.2093 }, end: { lat: -26.2041, lng: 28.0473 } }, // Sydney to Johannesburg
    { start: { lat: -26.2041, lng: 28.0473 }, end: { lat: 6.5244, lng: 3.3792 } }, // Johannesburg to Lagos
    { start: { lat: -23.5505, lng: -46.6333 }, end: { lat: 19.4326, lng: -99.1332 } }, // Sao Paulo to Mexico City
    { start: { lat: 19.4326, lng: -99.1332 }, end: { lat: 34.0522, lng: -118.2437 } }, // Mexico City to LA
    { start: { lat: 40.7128, lng: -74.0060 }, end: { lat: 43.6532, lng: -79.3832 } }, // NY to Toronto
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#030610] text-[#e0e5f0] overflow-hidden flex flex-col font-sans selection:bg-cyan-500/30">
      
      {/* Background Interactive Map */}
      <div className="absolute inset-0 z-0 opacity-80 mix-blend-screen">
        <InteractiveWorldMap dots={connections} />
        {/* Subtle radial overlay for focus */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_10%,_#030610_80%)] pointer-events-none" />
      </div>

      {/* Navbar */}
      <nav className="relative z-20 w-full flex items-center justify-between p-6 bg-transparent">
        <div className="flex items-center gap-2">
          <Globe2 className="w-5 h-5 text-cyan-500" />
          <span className="text-sm font-medium tracking-widest text-cyan-50/80 uppercase">Synergy</span>
        </div>
        <div className="flex items-center gap-6 text-xs tracking-wider text-white/50 uppercase font-['DM_Mono']">
          <button className="hover:text-cyan-400 transition-colors">Documentation</button>
          <button className="hover:text-cyan-400 transition-colors">API</button>
          <button className="px-4 py-1.5 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all bg-black/50 rounded-full">Login</button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 mt-[-30vh]">
        
        {/* Logo Icon */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 relative flex items-center justify-center w-24 h-24 bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.15)] backdrop-blur-sm"
          style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
        >
          <div className="absolute inset-[2px] bg-[#030610] z-0" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
          <ScanLine className="w-10 h-10 text-cyan-400 relative z-10" />
        </motion.div>

        {/* Website Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-blue-400 drop-shadow-sm uppercase font-['Orbitron']">
            Global<span className="font-light">Trace</span>
          </h1>
          <p className="mt-4 text-sm md:text-base text-blue-50/90 max-w-lg tracking-wide uppercase font-['Rajdhani'] drop-shadow-md">
            Identify origin nodes, trace supply routes, and map raw material dependencies across the global grid.
          </p>
        </motion.div>

        {/* Search / Text Area (Sharp, brutalist/tech aesthetic) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="w-full max-w-xl relative group"
        >
          {/* Main search container (pill shape) */}
          <div className={`relative flex items-stretch rounded-full overflow-hidden bg-[#050B1B]/80 backdrop-blur-xl border border-white/10 transition-all duration-500 ${isFocused ? 'border-amber-400/50 shadow-[0_0_30px_rgba(245,166,35,0.15)] bg-[#050B1B]' : 'hover:border-white/20'}`}>
            
            {/* Context label */}
            <div className="hidden sm:flex items-center pl-6 pr-3 border-r border-white/10 bg-white/5 backdrop-blur-sm text-[10px] uppercase tracking-widest text-cyan-500 font-bold select-none font-['DM_Mono']">
              Target ID
            </div>

            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Enter company name"
              rows={1}
              className="flex-1 bg-transparent px-4 py-3 outline-none text-base text-white font-['DM_Mono'] placeholder:text-white/40 resize-none overflow-hidden"
              spellCheck="false"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  // Trigger search
                }
              }}
            />

            <button className="flex items-center justify-center pr-6 pl-4 bg-cyan-950/30 border-l border-white/10 text-cyan-500 hover:bg-cyan-500 hover:text-black transition-all group/btn">
              <Search className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
            </button>
          </div>
          
          {/* Scanning line animation */}
          {isFocused && (
            <motion.div 
              layoutId="scanline"
              initial={{ left: 0, opacity: 0 }}
              animate={{ left: "100%", opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-0 w-32 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent z-10" 
            />
          )}

        </motion.div>
        
        {/* Subtle grid layer below text input */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />

      </main>
    </div>
  );
}

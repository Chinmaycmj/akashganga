'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-900 text-slate-400 text-xs py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold tracking-wider">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>THE INFINITE COSMOS</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              From the core of Earth to the edge of the observable universe. An interactive, animated astrophysics learning platform built to inspire wonder, communicate rigorous scientific scale, and distinguish verified knowledge from theoretical speculation.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-medium pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Scientific Content Governance & Verified Astronomical Data</span>
            </div>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="text-slate-200 font-semibold mb-3 text-xs uppercase tracking-wider">Exploration</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/journey" className="hover:text-white transition-colors">
                  Zoom Out to Infinity (14 Stages)
                </Link>
              </li>
              <li>
                <Link href="/atlas" className="hover:text-white transition-colors">
                  Cosmic Knowledge Atlas
                </Link>
              </li>
              <li>
                <Link href="/labs" className="hover:text-white transition-colors">
                  Signature Interactive Labs
                </Link>
              </li>
              <li>
                <Link href="/glossary" className="hover:text-white transition-colors">
                  Astronomical Glossary
                </Link>
              </li>
              <li>
                <Link href="/bookmarks" className="hover:text-white transition-colors">
                  My Bookmarks & Discovery Notes
                </Link>
              </li>
            </ul>
          </div>

          {/* Scientific Sources */}
          <div>
            <h4 className="text-slate-200 font-semibold mb-3 text-xs uppercase tracking-wider">Source Grounding</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>NASA Goddard Space Flight Center</li>
              <li>ESA & Planck Satellite Collaboration</li>
              <li>Event Horizon Telescope (EHT)</li>
              <li>James Webb Space Telescope (JWST)</li>
              <li>USGS & Seismological Tomography</li>
              <li>Peer-Reviewed Physical Review & Nature</li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-6 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>
            The Infinite Cosmos Platform • Production Educational Release. All astronomical calculations conform to standard ΛCDM cosmology and General Relativity.
          </p>
          <div className="flex items-center gap-4">
            <span>Accessible 2D & 3D WebGL</span>
            <span>Zero Fabricated Data</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

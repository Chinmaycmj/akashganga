'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAudio } from '@/context/AudioContext';
import { useUserProgress } from '@/context/UserProgressContext';
import SearchModal from '@/components/common/SearchModal';
import {
  Compass,
  BookOpen,
  FlaskConical,
  Bookmark,
  Volume2,
  VolumeX,
  Search,
  Menu,
  X,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const { isMuted, toggleMute, playClickSound } = useAudio();
  const { visitedStages, bookmarks } = useUserProgress();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Keyboard shortcut Ctrl+K / Cmd+K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'The Journey', href: '/journey', icon: Compass },
    { label: 'Knowledge Atlas', href: '/atlas', icon: BookOpen },
    { label: 'Interactive Labs', href: '/labs', icon: FlaskConical },
    { label: 'Glossary', href: '/glossary', icon: HelpCircle },
    { label: 'Bookmarks', href: '/bookmarks', icon: Bookmark, badge: bookmarks.length },
  ];

  const totalStages = 14;
  const progressPercent = Math.round((visitedStages.length / totalStages) * 100);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={() => playClickSound()}
            className="flex items-center gap-2.5 text-white font-bold tracking-wider group shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-indigo-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-extrabold tracking-widest bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                THE INFINITE COSMOS
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-mono -mt-1 hidden sm:inline">
                Interactive Universe Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 text-xs">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => playClickSound()}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                    isActive
                      ? 'bg-slate-800 text-white font-semibold border border-slate-700 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{link.label}</span>
                  {link.badge && link.badge > 0 ? (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-600 text-white font-mono ml-0.5">
                      {link.badge}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-2 text-xs"
              title="Search Cosmic Objects & Topics (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden lg:inline text-[9px] px-1 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 font-mono">
                Ctrl K
              </kbd>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleMute}
              className={`p-2 rounded-lg border transition-all ${
                !isMuted
                  ? 'bg-indigo-950/80 border-indigo-500/60 text-indigo-300 shadow-md shadow-indigo-900/30'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
              title={isMuted ? 'Unmute Ambient Soundscape' : 'Mute Soundscape'}
            >
              {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Progress Pill */}
            <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-slate-800 text-xs">
              <div className="text-right">
                <div className="text-[10px] text-slate-400 font-mono">Journey Progress</div>
                <div className="text-xs font-semibold text-indigo-300 font-mono">
                  {visitedStages.length}/{totalStages} Stages ({progressPercent}%)
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 md:hidden border border-slate-800 text-slate-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-md px-4 py-3 space-y-1">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    playClickSound();
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-lg flex items-center justify-between text-sm ${
                    isActive ? 'bg-indigo-950/80 text-white font-medium border border-indigo-700/50' : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-indigo-400" />
                    <span>{link.label}</span>
                  </div>
                  {link.badge && link.badge > 0 ? (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-600 text-white font-mono">
                      {link.badge}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Universal Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}

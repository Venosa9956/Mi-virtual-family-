import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Download, Gamepad2 } from 'lucide-react';
import { sound } from '../services/soundService';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenZipModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onOpenZipModal }) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleToggleMusic = () => {
    const active = sound.toggleMusic();
    setIsPlayingMusic(active);
  };

  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#090514]/90 backdrop-blur-md border-b border-[#2d1f52]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => onNavigate('index')}
          className="text-lg font-bold tracking-tight text-[#c084fc] hover:text-[#d8b4fe] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer text-left"
        >
          <span>OUR FRIENDSHIP 2026 💜</span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => onNavigate('index')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentPage === 'index' ? 'text-white font-semibold underline underline-offset-8 decoration-[#9333ea]' : 'hover:text-white'
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => onNavigate('domititan')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentPage === 'domititan' ? 'text-white font-semibold underline underline-offset-8 decoration-[#9333ea]' : 'hover:text-white'
            }`}
          >
            Domititan 📺
          </button>
          <button
            onClick={() => onNavigate('bendy')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentPage === 'bendy' ? 'text-white font-semibold underline underline-offset-8 decoration-[#ea580c]' : 'hover:text-white'
            }`}
          >
            Bendy 👑🔇
          </button>
          <button
            onClick={() => onNavigate('sunny')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentPage === 'sunny' ? 'text-white font-semibold underline underline-offset-8 decoration-[#eab308]' : 'hover:text-white'
            }`}
          >
            Sunny ☀️
          </button>
          <button
            onClick={() => onNavigate('mini')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentPage === 'mini' ? 'text-white font-semibold underline underline-offset-8 decoration-[#a855f7]' : 'hover:text-white'
            }`}
          >
            Mini ✨
          </button>
          <button
            onClick={() => onNavigate('efra')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentPage === 'efra' ? 'text-white font-semibold underline underline-offset-8 decoration-[#dc2626]' : 'hover:text-white'
            }`}
          >
            Efra 🐺🔥
          </button>
        </nav>

        {/* Zone 3: Action Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Sound Controls */}
          <button
            onClick={handleToggleMusic}
            title={isPlayingMusic ? 'Pausar música ambiental' : 'Reproducir música ambiental cósmica'}
            className={`p-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer flex items-center gap-1.5 ${
              isPlayingMusic
                ? 'bg-[#4c1d95]/70 border-[#a855f7] text-[#e9d5ff] shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                : 'bg-[#150d2a] border-[#2d1f52] text-slate-300 hover:text-white hover:border-[#4c1d95]'
            }`}
          >
            <Music className={`w-4 h-4 ${isPlayingMusic ? 'animate-bounce' : ''}`} />
            <span className="hidden sm:inline">{isPlayingMusic ? 'Música ON' : 'Música'}</span>
          </button>

          <button
            onClick={handleToggleMute}
            title={isMuted ? 'Activar efectos de sonido' : 'Silenciar efectos'}
            className="p-2 rounded-lg text-xs font-medium border bg-[#150d2a] border-[#2d1f52] text-slate-300 hover:text-white hover:border-[#4c1d95] transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Download ZIP */}
          <button
            onClick={onOpenZipModal}
            title="Descargar paquete ZIP con todo el proyecto"
            className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-200 bg-[#1e133c] hover:bg-[#2d1d57] border border-[#3b236d] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar ZIP</span>
          </button>

          {/* Play Game CTA */}
          <button
            onClick={() => onNavigate('juego')}
            className="px-3.5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#9333ea] to-[#7c3aed] hover:from-[#a855f7] hover:to-[#9333ea] rounded-lg transition-all shadow-[0_4px_15px_rgba(147,51,234,0.35)] hover:shadow-[0_6px_22px_rgba(147,51,234,0.55)] cursor-pointer whitespace-nowrap flex items-center gap-1.5"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>JUGAR 🎮</span>
          </button>
        </div>
      </div>

      {/* Mobile Secondary Navigation Row */}
      <div className="lg:hidden border-t border-[#1e133c] px-4 py-2 flex items-center justify-between overflow-x-auto gap-3 text-xs text-slate-300">
        <button
          onClick={() => onNavigate('index')}
          className={`whitespace-nowrap px-2 py-1 rounded ${currentPage === 'index' ? 'text-white bg-[#2e1065]' : ''}`}
        >
          Inicio
        </button>
        <button
          onClick={() => onNavigate('domititan')}
          className={`whitespace-nowrap px-2 py-1 rounded ${currentPage === 'domititan' ? 'text-white bg-[#2e1065]' : ''}`}
        >
          Domititan
        </button>
        <button
          onClick={() => onNavigate('bendy')}
          className={`whitespace-nowrap px-2 py-1 rounded ${currentPage === 'bendy' ? 'text-white bg-[#2e1065]' : ''}`}
        >
          Bendy
        </button>
        <button
          onClick={() => onNavigate('sunny')}
          className={`whitespace-nowrap px-2 py-1 rounded ${currentPage === 'sunny' ? 'text-white bg-[#2e1065]' : ''}`}
        >
          Sunny
        </button>
        <button
          onClick={() => onNavigate('mini')}
          className={`whitespace-nowrap px-2 py-1 rounded ${currentPage === 'mini' ? 'text-white bg-[#2e1065]' : ''}`}
        >
          Mini
        </button>
        <button
          onClick={() => onNavigate('efra')}
          className={`whitespace-nowrap px-2 py-1 rounded ${currentPage === 'efra' ? 'text-white bg-[#2e1065]' : ''}`}
        >
          Efra
        </button>
        <button
          onClick={onOpenZipModal}
          className="whitespace-nowrap px-2 py-1 rounded text-[#c084fc] font-semibold"
        >
          Descargar ZIP
        </button>
      </div>
    </header>
  );
};

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { BendyPage } from './pages/BendyPage';
import { DomititanPage } from './pages/DomititanPage';
import { SunnyPage } from './pages/SunnyPage';
import { MiniPage } from './pages/MiniPage';
import { EfraPage } from './pages/EfraPage';
import { GamePage } from './pages/GamePage';
import { ZipDownloadModal } from './components/ZipDownloadModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('index');
  const [isZipModalOpen, setIsZipModalOpen] = useState<boolean>(false);

  // Sync initial URL path
  useEffect(() => {
    const syncPageFromUrl = () => {
      const path = window.location.pathname.toLowerCase();
      if (path.includes('bendy')) setCurrentPage('bendy');
      else if (path.includes('domititan')) setCurrentPage('domititan');
      else if (path.includes('sunny')) setCurrentPage('sunny');
      else if (path.includes('mini')) setCurrentPage('mini');
      else if (path.includes('efra')) setCurrentPage('efra');
      else if (path.includes('juego')) setCurrentPage('juego');
      else setCurrentPage('index');
    };

    syncPageFromUrl();
    window.addEventListener('popstate', syncPageFromUrl);
    return () => window.removeEventListener('popstate', syncPageFromUrl);
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update history state smoothly
    const urlMap: Record<string, string> = {
      index: '/',
      domititan: '/domititan.html',
      bendy: '/bendy.html',
      sunny: '/sunny.html',
      mini: '/mini.html',
      efra: '/efra.html',
      juego: '/juego.html',
    };
    const targetUrl = urlMap[page] || '/';
    window.history.pushState({}, '', targetUrl);
  };

  return (
    <div className="min-h-screen bg-[#090514] text-slate-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      {/* Hide standard navbar when playing the game to give maximum viewport to the canvas */}
      {currentPage !== 'juego' && (
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenZipModal={() => setIsZipModalOpen(true)}
        />
      )}

      <div className="flex-1">
        {currentPage === 'index' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenZipModal={() => setIsZipModalOpen(true)}
          />
        )}
        {currentPage === 'bendy' && <BendyPage onNavigate={handleNavigate} />}
        {currentPage === 'domititan' && <DomititanPage onNavigate={handleNavigate} />}
        {currentPage === 'sunny' && <SunnyPage onNavigate={handleNavigate} />}
        {currentPage === 'mini' && <MiniPage onNavigate={handleNavigate} />}
        {currentPage === 'efra' && <EfraPage onNavigate={handleNavigate} />}
        {currentPage === 'juego' && (
          <GamePage
            onNavigate={handleNavigate}
            onOpenZipModal={() => setIsZipModalOpen(true)}
          />
        )}
      </div>

      {/* ZIP Downloader Modal */}
      <ZipDownloadModal
        isOpen={isZipModalOpen}
        onClose={() => setIsZipModalOpen(false)}
      />
    </div>
  );
}

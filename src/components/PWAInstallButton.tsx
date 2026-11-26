import React, { useState } from 'react';
import { Smartphone, Share, PlusSquare, ExternalLink, X, MonitorSmartphone } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'compact' | 'hero' | 'mobile';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ variant = 'compact' }) => {
  const { isInstallable, isInstalled, isIOS, isInIframe, install } = usePWAInstall();
  const [showGuideModal, setShowGuideModal] = useState(false);

  // Suppress when already running in standalone installed PWA mode
  if (isInstalled) {
    return null;
  }

  const handleClick = async () => {
    if (isInstallable) {
      const accepted = await install();
      if (accepted) return;
    }
    setShowGuideModal(true);
  };

  const label = isIOS ? 'Instalar en iOS' : 'Instalar App';

  const buttonNode = (() => {
    if (variant === 'mobile') {
      return (
        <button
          onClick={handleClick}
          className="whitespace-nowrap px-2.5 py-1 rounded bg-[#2d1857] border border-[#6b21a8] text-emerald-300 font-semibold flex items-center gap-1 cursor-pointer"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>{label}</span>
        </button>
      );
    }

    if (variant === 'hero') {
      return (
        <button
          onClick={handleClick}
          className="px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base text-emerald-100 bg-[#0d2a25] hover:bg-[#123b34] border border-emerald-500/50 hover:border-emerald-400 transition-all cursor-pointer flex items-center gap-2 shadow-[0_6px_20px_rgba(16,185,129,0.2)]"
        >
          <MonitorSmartphone className="w-5 h-5 text-emerald-400" />
          <span>{isInstallable ? 'Instalar en tu dispositivo' : label}</span>
        </button>
      );
    }

    // compact (Navbar desktop)
    return (
      <button
        onClick={handleClick}
        title="Instalar OUR FRIENDSHIP 2026 en tu dispositivo"
        className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-200 bg-[#0d2a25] hover:bg-[#133b34] border border-emerald-600/50 hover:border-emerald-400 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
      >
        <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
        <span>{label}</span>
      </button>
    );
  })();

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '/';

  return (
    <>
      {buttonNode}

      {showGuideModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
          onClick={() => setShowGuideModal(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-[#120926] border border-[#4c1d95] p-6 shadow-[0_20px_60px_rgba(147,51,234,0.4)] text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300">
                  <MonitorSmartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {isIOS ? 'Instalar en iPhone / iPad' : 'Instalar en tu dispositivo'}
                  </h3>
                  <p className="text-xs text-purple-300">OUR FRIENDSHIP — 2026 (PWA)</p>
                </div>
              </div>
              <button
                onClick={() => setShowGuideModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#231245] cursor-pointer"
                aria-label="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {isInIframe ? (
              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs">
                  Estás viendo la app dentro de una vista previa embebida. Por seguridad, Chrome, Edge y Android solo muestran la opción <strong>«Instalar en tu dispositivo»</strong> cuando abres la página en una pestaña independiente.
                </div>
                <ol className="space-y-2 list-decimal list-inside text-xs text-slate-200">
                  <li>Toca el botón de abajo para abrir la app en una pestaña nueva.</li>
                  <li>En Chrome/Edge (PC) verás el ícono <strong>Instalar</strong> en la barra de direcciones o en el menú <strong>⋮ → Enviar y compartir / Instalar aplicación</strong>.</li>
                  <li>En Android/Chrome toca <strong>⋮ → Instalar aplicación</strong> o usa este mismo botón de <strong>Instalar App</strong>.</li>
                </ol>
                <a
                  href={currentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Abrir en pestaña independiente para instalar</span>
                </a>
              </div>
            ) : isIOS ? (
              <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <p className="text-slate-200">
                  En iPhone o iPad (Safari), instala la app en tu pantalla de inicio en 2 pasos:
                </p>
                <div className="p-3 rounded-xl bg-[#1a0e35] border border-[#3b1f6d] flex items-center gap-3 text-xs">
                  <Share className="w-5 h-5 text-sky-400 shrink-0" />
                  <span>
                    1. Toca el botón <strong>Compartir</strong> en la barra de Safari.
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#1a0e35] border border-[#3b1f6d] flex items-center gap-3 text-xs">
                  <PlusSquare className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>
                    2. Desliza y selecciona <strong>Agregar a la pantalla de inicio</strong>.
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                <p className="text-slate-200">
                  Si tu navegador aún no mostró el aviso automático, puedes instalarla directamente desde el menú del navegador:
                </p>
                <ul className="space-y-2 list-disc list-inside bg-[#1a0e35] border border-[#3b1f6d] rounded-xl p-3.5">
                  <li>
                    <strong>Chrome / Edge (PC):</strong> haz clic en el ícono de <strong>Instalar</strong> a la derecha de la barra de direcciones, o abre el menú <strong>⋮ → Instalar «OUR FRIENDSHIP — 2026»</strong>.
                  </li>
                  <li>
                    <strong>Android (Chrome):</strong> abre el menú <strong>⋮ → Instalar aplicación</strong> (o <em>Agregar a pantalla principal</em>).
                  </li>
                </ul>
              </div>
            )}

            <button
              onClick={() => setShowGuideModal(false)}
              className="mt-5 w-full py-2.5 rounded-xl bg-[#231245] hover:bg-[#321a61] border border-[#4c1d95] text-xs font-semibold text-purple-100 transition-colors cursor-pointer"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </>
  );
};

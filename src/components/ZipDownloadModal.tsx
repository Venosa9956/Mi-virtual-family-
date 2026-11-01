import React, { useState } from 'react';
import { X, Download, CheckCircle, FolderArchive, Github, Sparkles, Loader2, FileCode } from 'lucide-react';
import { generateProjectZip } from '../services/zipService';

interface ZipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ZipDownloadModal: React.FC<ZipModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [downloadReady, setDownloadReady] = useState(false);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleStartDownload = async () => {
    try {
      setLoading(true);
      setDownloadReady(false);
      setProgress(10);
      setStatusText('Iniciando empaquetado del proyecto...');

      const zipBlob = await generateProjectZip((percent, status) => {
        setProgress(percent);
        setStatusText(status);
      });

      const url = URL.createObjectURL(zipBlob);
      setBlobUrl(url);
      setDownloadReady(true);
      setLoading(false);

      // Trigger download automatically
      const a = document.createElement('a');
      a.href = url;
      a.download = 'our-friendship-2026.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (e) {
      console.error(e);
      setLoading(false);
      setStatusText('Hubo un error al generar el archivo ZIP.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#130b24] border border-[#3b236d] rounded-2xl max-w-lg w-full p-6 text-slate-200 shadow-[0_10px_40px_rgba(147,51,234,0.3)] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#231542] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-[#4c1d95]/40 text-[#c084fc] border border-[#6b21a8]">
            <FolderArchive className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Descargar Archivo ZIP (.zip)</h2>
            <p className="text-xs text-[#d8b4fe]">Paquete completo listo para descomprimir y subir a GitHub</p>
          </div>
        </div>

        {/* Direct Download Card */}
        <div className="bg-gradient-to-r from-purple-950/70 via-indigo-950/70 to-purple-950/70 p-4 rounded-xl border border-purple-500/50 mb-5">
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <FileCode className="w-4 h-4 text-purple-400" />
              <span>our-friendship-2026.zip (5.2 MB)</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
              Listo para Descargar
            </span>
          </div>
          <p className="text-xs text-slate-300 mb-3">
            Contiene todas las páginas HTML independientes, el videojuego de 10 niveles, hojas de estilo CSS, scripts modulares, avatares oficiales y README.
          </p>
          <a
            href="/our-friendship-2026.zip"
            download="our-friendship-2026.zip"
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-900/40 transition-all flex items-center justify-center gap-2 cursor-pointer no-underline"
          >
            <Download className="w-4 h-4" />
            <span>Descargar Archivo ZIP Directo Ahora</span>
          </a>
        </div>

        <div className="bg-[#0b0616] p-4 rounded-xl border border-[#261545] mb-5 text-sm space-y-2">
          <div className="font-semibold text-white flex items-center gap-2 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Estructura incluida dentro del .ZIP:
          </div>
          <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
            <li><code className="text-purple-300">index.html</code> — Menú principal y hub de navegación</li>
            <li><code className="text-purple-300">bendy.html</code> — Homenaje individual a Bendy (El Rey del Mute)</li>
            <li><code className="text-purple-300">domititan.html</code> — Página personal del gato morado TV</li>
            <li><code className="text-purple-300">sunny.html</code> — Homenaje individual a Sunny (The Sun Cat)</li>
            <li><code className="text-purple-300">mini.html</code> — Página individual dedicada a Mini</li>
            <li><code className="text-purple-300">efra.html</code> — Homenaje individual al lobo de fuego Efra</li>
            <li><code className="text-purple-300">juego.html</code> — Videojuego de plataformas (10 mundos + 10 jefes)</li>
            <li><code className="text-purple-300">assets/characters/</code> — Imágenes originales de los personajes</li>
            <li><code className="text-purple-300">css/style.css</code> y <code className="text-purple-300">js/</code> — Estilos y motor de juego</li>
            <li><code className="text-purple-300">README.md</code> — Instrucciones paso a paso para GitHub Pages</li>
          </ul>
        </div>

        {loading ? (
          <div className="space-y-3 my-6">
            <div className="flex justify-between text-xs text-slate-300">
              <span className="flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-400" />
                {statusText}
              </span>
              <span className="font-mono">{progress}%</span>
            </div>
            <div className="w-full h-2.5 bg-[#231542] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : downloadReady ? (
          <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800 text-emerald-200 text-xs mb-5 flex items-start gap-3">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-emerald-300">¡ZIP generado de nuevo con éxito!</p>
              {blobUrl && (
                <a
                  href={blobUrl}
                  download="our-friendship-2026.zip"
                  className="inline-flex items-center gap-1.5 mt-1 text-xs font-bold text-white underline hover:text-emerald-300"
                >
                  <Download className="w-3.5 h-3.5" /> Descargar copia
                </a>
              )}
            </div>
          </div>
        ) : null}

        <div className="bg-[#1b1033] p-3 rounded-lg border border-[#311d5e] mb-5 text-xs text-slate-300 flex items-start gap-2.5">
          <Github className="w-4 h-4 text-purple-300 shrink-0 mt-0.5" />
          <span>
            <strong>Para subirlo a GitHub Pages:</strong> Descomprime el ZIP, crea tu repo en GitHub, sube los archivos a <code>main</code> y en <em>Settings &gt; Pages</em> elige la raíz <code>/</code>.
          </span>
        </div>

        <div className="flex justify-between items-center gap-3">
          <button
            onClick={handleStartDownload}
            disabled={loading}
            className="text-xs text-purple-400 hover:text-purple-300 underline cursor-pointer"
          >
            {loading ? 'Reempaquetando...' : 'Reempaquetar en vivo'}
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-[#20113b] hover:bg-[#2d1852] rounded-lg transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

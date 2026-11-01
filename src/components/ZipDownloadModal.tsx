import React, { useState } from 'react';
import { X, Download, CheckCircle, FolderArchive, Github, Sparkles, Loader2, FileCode, Smartphone, Monitor, Terminal } from 'lucide-react';
import { generateProjectZip } from '../services/zipService';

interface ZipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ZipDownloadModal: React.FC<ZipModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'zip' | 'exe' | 'apk'>('zip');
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
      <div className="bg-[#130b24] border border-[#3b236d] rounded-2xl max-w-xl w-full p-6 text-slate-200 shadow-[0_10px_40px_rgba(147,51,234,0.3)] relative">
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
            <h2 className="text-xl font-bold text-white">Descargas del Proyecto</h2>
            <p className="text-xs text-[#d8b4fe]">Paquete .ZIP, ejecutable de Windows (.EXE) y aplicación Android (.APK)</p>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1.5 p-1 bg-[#0b0517] rounded-xl border border-[#2d1852] mb-5">
          <button
            onClick={() => setActiveTab('zip')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'zip'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FolderArchive className="w-3.5 h-3.5" />
            <span>Paquete .ZIP</span>
          </button>
          <button
            onClick={() => setActiveTab('exe')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'exe'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Windows (.EXE)</span>
          </button>
          <button
            onClick={() => setActiveTab('apk')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'apk'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Android (.APK)</span>
          </button>
        </div>

        {/* TAB 1: ZIP FILE */}
        {activeTab === 'zip' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-950/70 via-indigo-950/70 to-purple-950/70 p-4 rounded-xl border border-purple-500/50">
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <FileCode className="w-4 h-4 text-purple-400" />
                  <span>our-friendship-2026.zip (10 MB)</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                  Listo para Descargar
                </span>
              </div>
              <p className="text-xs text-slate-300 mb-3">
                Incluye todas las páginas HTML independientes, el videojuego completo, estilos CSS, scripts de audio, lanzador de Windows y el flujo de GitHub Actions para compilar el .EXE y .APK.
              </p>
              <a
                href="/our-friendship-2026.zip"
                download="our-friendship-2026.zip"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-900/40 transition-all flex items-center justify-center gap-2 cursor-pointer no-underline"
              >
                <Download className="w-4 h-4" />
                <span>Descargar Archivo ZIP Completo Ahora</span>
              </a>
            </div>

            <div className="bg-[#0b0616] p-3.5 rounded-xl border border-[#261545] text-xs text-slate-400 space-y-1.5">
              <div className="font-semibold text-white flex items-center gap-1.5 text-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Listo para descomprimir y subir a GitHub:
              </div>
              <p>
                Al subir la carpeta a tu repositorio en GitHub, se activará <strong>GitHub Pages</strong> automáticamente y podrás compartir el enlace web con Bendy, Sunny, Mini y Efra.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: WINDOWS (.EXE) */}
        {activeTab === 'exe' && (
          <div className="space-y-4 text-xs">
            <div className="bg-[#120824] p-4 rounded-xl border border-[#3d1969] space-y-3">
              <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
                <Monitor className="w-4 h-4 text-purple-400" />
                <span>Opción 1: Lanzador de Escritorio Inmediato (Sin compilar)</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Dentro del archivo <strong>.ZIP</strong> encontrarás el archivo ejecutable <strong><code>Lanzar-Juego-Windows.bat</code></strong>. Al darle doble clic en cualquier PC con Windows, el juego se abre como una aplicación de escritorio nativa en pantalla completa sin barra de navegación.
              </p>
            </div>

            <div className="bg-[#0e061c] p-4 rounded-xl border border-[#2c144d] space-y-3">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                <Github className="w-4 h-4 text-amber-400" />
                <span>Opción 2: Compilar el instalador .EXE con GitHub Releases</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                El proyecto ya incluye configurado el archivo de flujo de trabajo <strong><code>.github/workflows/build-releases.yml</code></strong>.
              </p>
              <ol className="list-decimal list-inside text-slate-400 space-y-1.5 pl-1">
                <li>Sube el proyecto a tu repositorio de GitHub.</li>
                <li>Ve a la pestaña <strong>Actions</strong> de tu repositorio.</li>
                <li>Verás el flujo <em>«Compilar .EXE y .APK»</em> ejecutándose en los servidores de GitHub.</li>
                <li>Al terminar, encontrarás el archivo <strong><code>OurFriendship-2026-Windows.zip</code> (con el .EXE dentro)</strong> listo para descargar en la sección de <strong>Releases</strong>.</li>
              </ol>
            </div>
          </div>
        )}

        {/* TAB 3: ANDROID (.APK) */}
        {activeTab === 'apk' && (
          <div className="space-y-4 text-xs">
            <div className="bg-gradient-to-r from-emerald-950/60 to-purple-950/60 p-4 rounded-xl border border-emerald-500/40 space-y-2.5">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>Instalación Directa en Android (1 toque)</span>
              </div>
              <p className="text-slate-200 leading-relaxed">
                El proyecto ya incluye <strong>Manifest de Android</strong> e iconos para instalarse como una app nativa en cualquier celular Android:
              </p>
              <ol className="list-decimal list-inside text-slate-300 space-y-1 pl-1">
                <li>Abre el enlace de tu web en Google Chrome desde el celular.</li>
                <li>Toca los tres puntos de menú ⋮ y selecciona <strong>«Instalar aplicación»</strong> o <strong>«Agregar a la pantalla principal»</strong>.</li>
                <li>Se creará el icono de <em>Our Friendship</em> en el menú de aplicaciones de tu móvil y funcionará a pantalla completa como una app nativa.</li>
              </ol>
            </div>

            <div className="bg-[#0e061c] p-4 rounded-xl border border-[#2c144d] space-y-2.5">
              <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
                <Terminal className="w-4 h-4 text-purple-400" />
                <span>Archivo binario .APK para descargar desde GitHub</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                El flujo de <strong>GitHub Actions</strong> incluido (<code>.github/workflows/build-releases.yml</code>) utiliza el SDK de Android y Gradle para compilar el archivo <strong><code>OurFriendship-2026-Android.apk</code></strong> automáticamente y adjuntarlo a tus <em>GitHub Releases</em>.
              </p>
            </div>
          </div>
        )}

        {/* Footer controls */}
        <div className="mt-6 pt-4 border-t border-[#231245] flex items-center justify-between">
          <a
            href="/our-friendship-2026.zip"
            download="our-friendship-2026.zip"
            className="text-xs text-purple-400 hover:text-purple-300 font-semibold underline flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Descargar archivo .ZIP (10 MB)
          </a>

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

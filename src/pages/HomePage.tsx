import React, { useState, useEffect } from 'react';
import { Gamepad2, Download, Lock, Unlock, Heart, Plus, Sparkles, MessageSquare, VolumeX, Shield, Share2, Star } from 'lucide-react';
import { FRIENDS_DATA, storage } from '../services/storageService';
import { MemoryItem, GalleryItem, GameProgress } from '../types';
import { sound } from '../services/soundService';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onOpenZipModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenZipModal }) => {
  const [progress, setProgress] = useState<GameProgress>(storage.getProgress());
  const [freeMode, setFreeMode] = useState<boolean>(storage.isFreeMode());
  const [memories, setMemories] = useState<MemoryItem[]>(storage.getMemories());
  const [gallery, setGallery] = useState<GalleryItem[]>(storage.getGallery());

  // Memory form state
  const [showAddMemory, setShowAddMemory] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('Domititan');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<'muteada' | 'broma' | 'discord' | 'aventura' | 'momento'>('muteada');

  // Mute notification toast
  const [muteToast, setMuteToast] = useState(false);

  useEffect(() => {
    setProgress(storage.getProgress());
    setFreeMode(storage.isFreeMode());
  }, []);

  const handleToggleFreeMode = () => {
    const next = storage.toggleFreeMode();
    setFreeMode(next);
  };

  const handleTriggerMuteSimulator = () => {
    sound.playMuteGong();
    setMuteToast(true);
    setTimeout(() => setMuteToast(false), 4500);
  };

  const handleLikeMemory = (id: string) => {
    storage.likeMemory(id);
    setMemories(storage.getMemories());
    sound.playCoin();
  };

  const handleAddMemorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;
    storage.addMemory({
      author: newAuthor,
      title: newTitle.trim(),
      content: newContent.trim(),
      date: '2026',
      category: newCategory,
    });
    setMemories(storage.getMemories());
    setNewTitle('');
    setNewContent('');
    setShowAddMemory(false);
    sound.playCoin();
  };

  const completedCount = progress.stagesCompleted.filter(Boolean).length;

  return (
    <div className="relative min-h-screen text-slate-100 overflow-hidden pb-20">
      {/* Cosmic background stars */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-12 left-1/4 w-1.5 h-1.5 bg-purple-300 rounded-full animate-twinkle" />
        <div className="absolute top-36 right-1/3 w-2 h-2 bg-pink-300 rounded-full animate-twinkle delay-300" />
        <div className="absolute top-80 left-12 w-1.5 h-1.5 bg-yellow-200 rounded-full animate-twinkle delay-700" />
        <div className="absolute top-96 right-20 w-2 h-2 bg-indigo-300 rounded-full animate-twinkle delay-1000" />
        <div className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-purple-200 rounded-full animate-twinkle" />
      </div>

      {/* Floating Mute Toast */}
      {muteToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1e0d38] border-2 border-[#ea580c] rounded-2xl p-4 shadow-[0_10px_35px_rgba(234,88,12,0.5)] max-w-sm flex items-start gap-3 animate-bounce">
          <div className="p-2 bg-orange-600/30 rounded-xl text-orange-400">
            <VolumeX className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-orange-400 uppercase tracking-wider">¡MUTEADO POR BENDY!</div>
            <p className="text-xs text-slate-200 mt-1">
              Bendy te ha silenciado en el canal de voz... ¡Pero tú te estás muriendo de risa! JAJAJA 🤣
            </p>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#231245] border border-[#4c1d95] text-xs font-semibold text-[#c084fc] mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Homenaje Virtual 2026 — Domititan, Bendy, Sunny, Mini, Efra
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e9d5ff] to-[#c084fc] mb-5 leading-tight">
            OUR FRIENDSHIP — 2026
          </h1>

          <p className="text-lg sm:text-2xl text-[#d8b4fe] font-medium italic mb-8 max-w-2xl mx-auto">
            «Un año de risas, muteadas, locuras y una amistad que sigue viva»
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <button
              onClick={() => onNavigate('juego')}
              className="px-7 py-3.5 rounded-xl font-extrabold text-sm sm:text-base text-white bg-gradient-to-r from-[#9333ea] via-[#7c3aed] to-[#6366f1] hover:from-[#a855f7] hover:to-[#7c3aed] shadow-[0_8px_30px_rgba(147,51,234,0.45)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2.5"
            >
              <Gamepad2 className="w-5 h-5" />
              <span>JUGAR NUESTRA AVENTURA 🎮</span>
            </button>

            <button
              onClick={onOpenZipModal}
              className="px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base text-slate-200 bg-[#1c1035] hover:bg-[#2a174f] border border-[#3f2075] hover:border-[#6b21a8] transition-all cursor-pointer flex items-center gap-2 shadow-lg"
            >
              <Download className="w-5 h-5 text-[#c084fc]" />
              <span>Descargar Proyecto ZIP (.zip)</span>
            </button>
          </div>

          {/* Progress / Free Mode Bar */}
          <div className="bg-[#120926] border border-[#2d1754] rounded-xl p-3.5 max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Star className="w-4 h-4 text-amber-400" />
              <span>Progreso del Videojuego: <strong>{completedCount} / 10 Etapas</strong></span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400">Modo Libre:</span>
              <button
                onClick={handleToggleFreeMode}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                  freeMode ? 'bg-purple-600 text-white' : 'bg-[#251347] text-slate-400 hover:text-white'
                }`}
              >
                {freeMode ? 'ACTIVADO (Todo Desbloqueado)' : 'Modo Aventura'}
              </button>
            </div>
          </div>
        </div>

        {/* Individual Friends Cards Section */}
        <section className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Nuestra Familia Virtual</h2>
              <p className="text-sm text-slate-400 mt-1">
                Haz clic en cada amigo para explorar su página independiente con sus anécdotas y personalidad.
              </p>
            </div>
            <div className="text-xs text-[#c084fc] font-mono">
              5 Integrantes Oficiales 2026
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(FRIENDS_DATA).map((friend) => {
              const isUnlocked = storage.isPageUnlocked(friend.id);

              return (
                <div
                  key={friend.id}
                  className={`group relative bg-[#130b26] border rounded-2xl overflow-hidden flex flex-col transition-all duration-300 ${
                    isUnlocked
                      ? 'border-[#2f1b57] hover:border-[#9333ea] hover:-translate-y-1.5 shadow-lg hover:shadow-[0_12px_30px_rgba(147,51,234,0.25)]'
                      : 'border-slate-800/80 opacity-75'
                  }`}
                >
                  {/* Avatar Container */}
                  <div className="relative h-64 bg-[#0a0515] flex items-center justify-center overflow-hidden border-b border-[#231245]">
                    <img
                      src={friend.avatar}
                      alt={friend.name}
                      className="h-full w-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Stage lock badge */}
                    <div className="absolute top-3 right-3">
                      {isUnlocked ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 border border-emerald-600 text-emerald-300">
                          <Unlock className="w-3 h-3" /> Desbloqueado
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-950/90 border border-purple-500 text-purple-300">
                          <Lock className="w-3 h-3" /> Nivel {friend.unlockStage}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-[#c084fc] transition-colors">
                        {friend.name}
                      </h3>
                      <span className="text-xs font-mono text-slate-400">{friend.nickname}</span>
                    </div>

                    <div className="text-xs font-semibold mb-3" style={{ color: friend.accentColor }}>
                      {friend.role}
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-3 mb-4 leading-relaxed italic bg-[#0c0618] p-2.5 rounded-lg border border-[#20103e]">
                      «{friend.quote}»
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {friend.tags.map((t) => (
                        <span key={t} className="text-[11px] px-2 py-0.5 rounded bg-[#1e0f3b] text-purple-200 border border-[#331863]">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-3 border-t border-[#1e1039]">
                      <button
                        onClick={() => onNavigate(friend.id)}
                        className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white transition-all cursor-pointer flex items-center justify-center gap-2"
                        style={{
                          backgroundColor: isUnlocked ? friend.color : '#2d1852',
                        }}
                      >
                        <span>Visitar Página Independiente</span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Special Memories & Humor Section */}
        <section className="mb-20 bg-gradient-to-b from-[#160c2e] to-[#100722] border border-[#371d66] rounded-3xl p-6 sm:p-10 shadow-xl">
          <div className="max-w-3xl mb-8">
            <div className="text-xs font-mono text-[#c084fc] tracking-wider uppercase mb-2">
              SECCIÓN DE RECUERDOS Y HUMOR
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
              Nuestras Experiencias & Muteadas en Discord
            </h2>
            
            {/* Highlighted Quote from User */}
            <blockquote className="my-6 p-5 rounded-2xl bg-[#241147]/80 border-l-4 border-[#ea580c] shadow-inner">
              <p className="text-base sm:text-xl font-bold text-amber-200 italic leading-relaxed">
                «Me muteaban y yo me cagaba de risa. Creo que nunca entendieron que era parte de la diversión JAJAJA».
              </p>
              <div className="text-xs text-orange-300 font-mono mt-2 text-right">
                — Domititan transmitiendo en Discord 📺
              </div>
            </blockquote>

            <p className="text-sm text-slate-300 leading-relaxed">
              Las veces que me muteaban en el servidor de Bendy, mis risas descontroladas cada vez que me silenciaban, las conversaciones absurdas a las 3 de la mañana, los troleos inocentes y el orgullo de haber compartido todo el año 2026 juntos sin perder la chispa.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={handleTriggerMuteSimulator}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 transition-all flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <VolumeX className="w-4 h-4" />
                <span>Simular Muteada de Bendy 🔊</span>
              </button>

              <button
                onClick={() => setShowAddMemory(!showAddMemory)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-purple-200 bg-[#28134d] hover:bg-[#3b1d70] border border-[#50288f] transition-all flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4 text-purple-400" />
                <span>{showAddMemory ? 'Cancelar' : 'Agregar Anécdota / Recuerdo'}</span>
              </button>
            </div>
          </div>

          {/* Add Memory Form */}
          {showAddMemory && (
            <form onSubmit={handleAddMemorySubmit} className="mb-8 p-5 bg-[#0e071c] border border-[#3b1f6d] rounded-2xl animate-fadeIn space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#c084fc]" />
                Registrar nuevo momento memorable de 2026
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Título de la anécdota (ej. La gran caída en llamada)"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="px-3.5 py-2 text-xs bg-[#170c2d] border border-[#371b69] rounded-lg text-white focus:outline-none focus:border-purple-400"
                  required
                />
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="px-3.5 py-2 text-xs bg-[#170c2d] border border-[#371b69] rounded-lg text-white focus:outline-none focus:border-purple-400"
                >
                  <option value="muteada">Muteada Épica</option>
                  <option value="discord">Llamada de Discord</option>
                  <option value="broma">Broma o Troleo</option>
                  <option value="aventura">Aventura en Videojuego</option>
                  <option value="momento">Momento Emotivo</option>
                </select>
              </div>
              <textarea
                placeholder="Escribe lo que pasó, quién se rió y por qué fue tan inolvidable..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                rows={3}
                className="w-full px-3.5 py-2 text-xs bg-[#170c2d] border border-[#371b69] rounded-lg text-white focus:outline-none focus:border-purple-400"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddMemory(false)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cerrar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 rounded-lg cursor-pointer"
                >
                  Guardar Recuerdo
                </button>
              </div>
            </form>
          )}

          {/* Memories Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {memories.map((m) => (
              <div
                key={m.id}
                className="bg-[#0f071f] border border-[#2b1654] hover:border-[#5a2ea6] p-4 rounded-xl flex flex-col justify-between transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-purple-300 font-mono mb-2">
                    <span className="uppercase px-2 py-0.5 rounded bg-[#200f3d]">#{m.category}</span>
                    <span>{m.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2">{m.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{m.content}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#1f103b] flex items-center justify-between text-xs text-slate-400">
                  <span className="font-medium text-[#d8b4fe]">Por {m.author}</span>
                  <button
                    onClick={() => handleLikeMemory(m.id)}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-[#251247] text-rose-300 transition-colors cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    <span className="font-mono text-xs">{m.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery Section */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Galería de Recuerdos</h2>
              <p className="text-sm text-slate-400 mt-1">Arte, avatares y momentos de nuestra aventura en 2026.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {gallery.map((g) => (
              <div
                key={g.id}
                className="group relative bg-[#130b26] border border-[#2f1b57] rounded-xl overflow-hidden shadow-md flex flex-col"
              >
                <div className="h-44 bg-[#0a0515] flex items-center justify-center p-2 overflow-hidden">
                  <img
                    src={g.imageUrl}
                    alt={g.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-3 bg-[#110922] flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white truncate">{g.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2 leading-tight">{g.caption}</p>
                  </div>
                  <span className="text-[10px] text-[#c084fc] font-mono mt-2">{g.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final Message of 2026 */}
        <section className="relative rounded-3xl p-8 sm:p-12 text-center bg-gradient-to-r from-[#210d47] via-[#36136e] to-[#1e0b3d] border border-[#6b21a8] shadow-[0_0_50px_rgba(147,51,234,0.3)]">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-mono text-purple-300 tracking-widest uppercase">
              MENSAJE DE CIERRE DE AÑO
            </span>
            <p className="text-lg sm:text-xl font-medium text-slate-100 leading-relaxed">
              «2026 está llegando a su final, pero nuestra historia no. Gracias por cada risa, cada broma, cada muteada y cada momento que compartimos. No sé qué nos espera en 2027, pero espero que sigamos siendo los mismos bros de siempre. Los quiero muchísimo.»
            </p>
            <div className="text-base sm:text-lg font-bold text-[#fde047] pt-2">
              — Domititan 💤🌙📺
            </div>
            <div className="text-sm font-extrabold text-[#e9d5ff] tracking-wide pt-4 border-t border-purple-500/30">
              FIN DEL AÑO 2026. CONTINUARÁ EN 2027... 💜
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

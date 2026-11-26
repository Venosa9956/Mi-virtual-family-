import React, { useState, useEffect } from 'react';
import { Cookie, Heart, Sparkles, ArrowLeft, MessageSquare, Plus, Trash2, Edit3, Check } from 'lucide-react';
import { sound } from '../services/soundService';

interface GalletitaPageProps {
  onNavigate: (page: string) => void;
}

const GALLETITA_MEMORIES_KEY = 'our_friendship_2026_galletita_memories';
const GALLETITA_BIO_KEY = 'our_friendship_2026_galletita_bio';

const DEFAULT_BIO =
  'Esta página está dedicada especialmente a Galletita dentro de nuestra familia virtual 2026. Puedes editar esta descripción y añadir tus propios recuerdos reales, capturas o momentos compartidos cuando quieras.';

export const GalletitaPage: React.FC<GalletitaPageProps> = ({ onNavigate }) => {
  const [memories, setMemories] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(GALLETITA_MEMORIES_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  const [bio, setBio] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(GALLETITA_BIO_KEY);
      if (saved) return saved;
    } catch {}
    return DEFAULT_BIO;
  });

  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioDraft, setBioDraft] = useState(bio);
  const [newMemory, setNewMemory] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(GALLETITA_MEMORIES_KEY, JSON.stringify(memories));
    } catch {}
  }, [memories]);

  const handleSaveBio = () => {
    const trimmed = bioDraft.trim() || DEFAULT_BIO;
    setBio(trimmed);
    setBioDraft(trimmed);
    setIsEditingBio(false);
    try {
      localStorage.setItem(GALLETITA_BIO_KEY, trimmed);
    } catch {}
    sound.playCoin();
  };

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemory.trim()) return;
    setMemories((prev) => [...prev, newMemory.trim()]);
    setNewMemory('');
    sound.playCoin();
  };

  const handleDeleteMemory = (idx: number) => {
    setMemories((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="min-h-screen text-slate-100 pb-20 pt-8 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Return button */}
      <div className="mb-6">
        <button
          onClick={() => onNavigate('index')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al Menú Principal
        </button>
      </div>

      {/* Profile Header */}
      <div className="bg-gradient-to-r from-[#1c0912] via-[#2a0c19] to-[#130718] border-2 border-[#e11d48]/60 rounded-3xl p-6 sm:p-10 shadow-[0_10px_40px_rgba(225,29,72,0.25)] mb-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl bg-[#0e050a] border-2 border-[#e11d48] flex items-center justify-center overflow-hidden shrink-0 shadow-2xl">
            <img
              src="/assets/characters/galletita.png"
              alt="Galletita"
              className="h-full w-full object-contain p-2 hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 left-3 bg-rose-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
              <Heart className="w-3.5 h-3.5 fill-white text-white" /> Galletita
            </div>
          </div>

          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-950/80 border border-rose-500/40 text-xs font-bold text-rose-300">
              <Cookie className="w-3.5 h-3.5 text-rose-400" />
              Homenaje Individual · 2026
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-200 to-purple-300">
              GALLETITA
            </h1>

            <p className="text-sm sm:text-base text-rose-100/90 leading-relaxed">
              Parte de nuestra familia virtual en 2026. Con su estilo inconfundible de gatita oscura y bufanda roja, este espacio está pensado para guardar cada recuerdo real vivido juntos.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
              <span className="text-xs px-3 py-1 rounded-lg bg-rose-950/60 text-rose-300 border border-rose-800">
                #Galletita
              </span>
              <span className="text-xs px-3 py-1 rounded-lg bg-rose-950/60 text-rose-300 border border-rose-800">
                #BufandaRoja
              </span>
              <span className="text-xs px-3 py-1 rounded-lg bg-rose-950/60 text-rose-300 border border-rose-800">
                #Familia2026
              </span>
              <span className="text-xs px-3 py-1 rounded-lg bg-rose-950/60 text-rose-300 border border-rose-800">
                #SecciónEditable
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Editable Bio / Personality Section */}
      <section className="bg-[#180a13] border border-[#3d1428] rounded-3xl p-6 sm:p-10 mb-12 shadow-lg">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h2 className="text-2xl font-black text-rose-400 flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            Sobre Galletita (Editable)
          </h2>
          {!isEditingBio ? (
            <button
              onClick={() => {
                setBioDraft(bio);
                setIsEditingBio(true);
              }}
              className="px-3 py-1.5 rounded-lg bg-rose-950/70 hover:bg-rose-900/80 border border-rose-700/60 text-xs font-semibold text-rose-200 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" /> Editar texto
            </button>
          ) : (
            <button
              onClick={handleSaveBio}
              className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Check className="w-3.5 h-3.5" /> Guardar
            </button>
          )}
        </div>

        {isEditingBio ? (
          <textarea
            value={bioDraft}
            onChange={(e) => setBioDraft(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 text-sm bg-[#0f060b] border border-rose-500/60 rounded-2xl text-white focus:outline-none focus:border-rose-400"
            placeholder="Escribe aquí sobre la personalidad, bromas o papel de Galletita..."
          />
        ) : (
          <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
            {bio}
          </p>
        )}
      </section>

      {/* Editable Memories Section */}
      <section className="bg-[#150811] border border-[#331122] rounded-2xl p-6 sm:p-8 mb-12">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-rose-400" />
          Recuerdos y Momentos con Galletita
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          Sección abierta y guardada automáticamente en tu navegador para agregar anécdotas reales, bromas y momentos vividos con Galletita durante 2026.
        </p>

        {memories.length === 0 ? (
          <div className="p-5 bg-[#0c0409] border border-dashed border-[#3b1528] rounded-xl text-center text-xs text-slate-400 mb-6">
            Aún no hay recuerdos agregados aquí. ¡Escribe abajo tu primer recuerdo real con Galletita!
          </div>
        ) : (
          <div className="space-y-3 mb-6">
            {memories.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-[#0b0408] border border-[#2d1020] rounded-xl text-xs sm:text-sm text-slate-200 flex items-start gap-3"
              >
                <span className="font-mono text-rose-400 font-bold shrink-0">#{idx + 1}</span>
                <p className="leading-relaxed flex-1">{item}</p>
                <button
                  onClick={() => handleDeleteMemory(idx)}
                  title="Eliminar recuerdo"
                  className="text-slate-500 hover:text-rose-400 transition-colors cursor-pointer shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleAddMemory} className="flex gap-2">
          <input
            type="text"
            placeholder="Añade un recuerdo, broma o momento real con Galletita..."
            value={newMemory}
            onChange={(e) => setNewMemory(e.target.value)}
            className="flex-1 px-4 py-2.5 text-xs bg-[#0b0408] border border-[#3b1528] rounded-xl text-white focus:outline-none focus:border-rose-400"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4" /> Añadir
          </button>
        </form>
      </section>

      {/* Gratitude */}
      <div className="text-center bg-gradient-to-r from-rose-950/40 via-pink-950/40 to-purple-950/40 border border-rose-500/30 rounded-2xl p-8">
        <h3 className="text-xl font-black text-rose-300 mb-2">¡Gracias por Ser Parte de 2026, Galletita! 🍪❤️</h3>
        <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Gracias por acompañarnos en nuestra familia virtual este año. Que 2027 nos traiga muchos más momentos, risas y aventuras juntos.
        </p>
      </div>
    </div>
  );
};

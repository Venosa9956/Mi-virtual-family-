import React, { useState } from 'react';
import { Sun, Palette, Sparkles, ArrowLeft, Heart, MessageSquare, Plus } from 'lucide-react';
import { sound } from '../services/soundService';

interface SunnyPageProps {
  onNavigate: (page: string) => void;
}

export const SunnyPage: React.FC<SunnyPageProps> = ({ onNavigate }) => {
  const [sunnyMemories, setSunnyMemories] = useState<string[]>([
    'Sunny mostrando los primeros bocetos de "The Sun Cat" en Discord y todos maravillados con su talento.',
    'Sus ataques de risa contagiosos que hacían que toda la llamada terminara llorando de risa.',
    'Las charlas relajadas en las tardes donde Sunny siempre aportaba la energía más luminosa y positiva.',
    'Cuando Sunny defendía sus ideas artísticas con toda la pasión del mundo.',
  ]);
  const [newMemory, setNewMemory] = useState('');

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemory.trim()) return;
    setSunnyMemories([...sunnyMemories, newMemory.trim()]);
    setNewMemory('');
    sound.playCoin();
  };

  return (
    <div className="min-h-screen text-slate-100 pb-20 pt-8 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Return button */}
      <div className="mb-6">
        <button
          onClick={() => onNavigate('index')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al Menú Principal
        </button>
      </div>

      {/* Profile Header */}
      <div className="bg-gradient-to-r from-[#1c1605] via-[#2a2007] to-[#160f04] border-2 border-[#eab308]/60 rounded-3xl p-6 sm:p-10 shadow-[0_10px_40px_rgba(234,179,8,0.25)] mb-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl bg-[#0d0903] border-2 border-[#eab308] flex items-center justify-center overflow-hidden shrink-0 shadow-2xl">
            <img
              src="/assets/characters/sunny.png"
              alt="Sunny - The Sun Cat"
              className="h-full w-full object-contain p-2 hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 left-3 bg-yellow-500 text-black text-[10px] font-black uppercase px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
              <Sun className="w-3.5 h-3.5 text-black" /> The Sun Cat
            </div>
          </div>

          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-950/80 border border-yellow-500/40 text-xs font-bold text-yellow-300">
              <Sun className="w-3.5 h-3.5 text-yellow-400 animate-spin" />
              Luz Solar, Arte & Energía Cálida
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-orange-400">
              SUNNY (SUN)
            </h1>

            <p className="text-sm sm:text-base text-yellow-100/90 leading-relaxed">
              «The Sun Cat». Una presencia llena de luz, creatividad y risas que iluminó cada llamada de Discord durante 2026. Sus dibujos y su calidez hicieron de nuestro servidor un hogar.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
              <span className="text-xs px-3 py-1 rounded-lg bg-yellow-950/60 text-yellow-300 border border-yellow-800">
                #TheSunCat
              </span>
              <span className="text-xs px-3 py-1 rounded-lg bg-yellow-950/60 text-yellow-300 border border-yellow-800">
                #Artista
              </span>
              <span className="text-xs px-3 py-1 rounded-lg bg-yellow-950/60 text-yellow-300 border border-yellow-800">
                #EnergiaPositiva
              </span>
              <span className="text-xs px-3 py-1 rounded-lg bg-yellow-950/60 text-yellow-300 border border-yellow-800">
                #Familia2026
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Art & Creativity Section */}
      <section className="bg-[#171105] border border-[#3d2d0c] rounded-3xl p-6 sm:p-10 mb-12 shadow-lg">
        <h2 className="text-2xl font-black text-yellow-400 mb-4 flex items-center gap-2">
          <Palette className="w-6 h-6" />
          El Arte y la Esencia de Sunny
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          Sunny no solo trajo carisma al grupo, sino también una pasión inmensa por el dibujo y el diseño de personajes. La creación de "The Sun Cat" se convirtió en un símbolo de nuestra amistad: un felino brillante con un medallón de sol que representa la energía que nos mantuvo motivados durante todo el año.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#0e0a02] rounded-2xl border border-yellow-900/50">
            <h4 className="text-sm font-bold text-yellow-300 mb-1">Personalidad Radiante</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Siempre atenta, comprensiva y con una chispa única. En los días en que el canal estaba apagado, la llegada de Sunny garantizaba una sonrisa para todos.
            </p>
          </div>
          <div className="p-4 bg-[#0e0a02] rounded-2xl border border-yellow-900/50">
            <h4 className="text-sm font-bold text-yellow-300 mb-1">Compañía en Discord</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Horas y horas compartiendo pantallas, viendo series, jugando y comentando anécdotas. Sunny hizo del 2026 un año infinitamente más cálido.
            </p>
          </div>
        </div>
      </section>

      {/* Memories & Editable Notes */}
      <section className="bg-[#150f04] border border-[#33230a] rounded-2xl p-6 sm:p-8 mb-12">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-yellow-400" />
          Momentos Especiales con Sunny
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          Espacio abierto para registrar anécdotas y momentos vividos junto a Sunny.
        </p>

        <div className="space-y-3 mb-6">
          {sunnyMemories.map((item, idx) => (
            <div key={idx} className="p-3.5 bg-[#0a0702] border border-[#261906] rounded-xl text-xs sm:text-sm text-slate-200 flex items-start gap-3">
              <span className="font-mono text-yellow-400 font-bold shrink-0">#{idx + 1}</span>
              <p className="leading-relaxed flex-1">{item}</p>
            </div>
          ))}
        </div>

        {/* Add Memory Form */}
        <form onSubmit={handleAddMemory} className="flex gap-2">
          <input
            type="text"
            placeholder="Añade otro recuerdo o detalle sobre Sunny..."
            value={newMemory}
            onChange={(e) => setNewMemory(e.target.value)}
            className="flex-1 px-4 py-2.5 text-xs bg-[#0a0702] border border-[#2d1c07] rounded-xl text-white focus:outline-none focus:border-yellow-400"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-yellow-600 hover:bg-yellow-500 text-xs font-bold text-black transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4" /> Añadir
          </button>
        </form>
      </section>

      {/* Gratitude */}
      <div className="text-center bg-gradient-to-r from-yellow-950/40 via-amber-950/40 to-yellow-950/40 border border-yellow-500/30 rounded-2xl p-8">
        <h3 className="text-xl font-black text-yellow-300 mb-2">¡Gracias por Todo, Sunny! ☀️</h3>
        <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Gracias por tu creatividad, por tus risas genuinas y por ser un sol en nuestras vidas virtuales este 2026. ¡Vamos por un 2027 lleno de más arte y aventuras!
        </p>
      </div>
    </div>
  );
};

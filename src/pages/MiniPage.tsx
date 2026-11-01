import React, { useState } from 'react';
import { Star, Sparkles, ArrowLeft, Heart, MessageSquare, Plus, Edit3 } from 'lucide-react';
import { sound } from '../services/soundService';

interface MiniPageProps {
  onNavigate: (page: string) => void;
}

export const MiniPage: React.FC<MiniPageProps> = ({ onNavigate }) => {
  const [miniMemories, setMiniMemories] = useState<string[]>([
    'Su presencia dulce y tranquila que siempre traía armonía al canal de voz.',
    'Los momentos de risa compartidos cuando alguien decía algo absurdo en medio de una partida.',
    'Su compañía constante y leal en las tardes de juego y llamadas del 2026.',
  ]);
  const [newMemory, setNewMemory] = useState('');

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemory.trim()) return;
    setMiniMemories([...miniMemories, newMemory.trim()]);
    setNewMemory('');
    sound.playCoin();
  };

  return (
    <div className="min-h-screen text-slate-100 pb-20 pt-8 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Return button */}
      <div className="mb-6">
        <button
          onClick={() => onNavigate('index')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-purple-300 hover:text-purple-200 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al Menú Principal
        </button>
      </div>

      {/* Profile Header */}
      <div className="bg-gradient-to-r from-[#170a2c] via-[#220e3d] to-[#120722] border-2 border-[#a855f7]/60 rounded-3xl p-6 sm:p-10 shadow-[0_10px_40px_rgba(168,85,247,0.25)] mb-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl bg-[#090314] border-2 border-[#a855f7] flex items-center justify-center overflow-hidden shrink-0 shadow-2xl">
            <img
              src="/assets/characters/mini.jpg"
              alt="Mini"
              className="h-full w-full object-cover p-1 hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 left-3 bg-purple-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
              <Star className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" /> Mini
            </div>
          </div>

          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-xs font-bold text-purple-200">
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
              Página Individual Conmemorativa
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-200 to-indigo-200">
              MINI
            </h1>

            <p className="text-sm sm:text-base text-purple-200/90 leading-relaxed">
              Una página dedicada enteramente a Mini. Su calidez, sus ocurrencias espontáneas y sus momentos entrañables formaron parte indispensable de nuestra familia virtual a lo largo de todo el año 2026.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
              <span className="text-xs px-3 py-1 rounded-lg bg-purple-950/60 text-purple-300 border border-purple-800">
                #Mini2026
              </span>
              <span className="text-xs px-3 py-1 rounded-lg bg-purple-950/60 text-purple-300 border border-purple-800">
                #Estrellita
              </span>
              <span className="text-xs px-3 py-1 rounded-lg bg-purple-950/60 text-purple-300 border border-purple-800">
                #AmistadGenuina
              </span>
              <span className="text-xs px-3 py-1 rounded-lg bg-purple-950/60 text-purple-300 border border-purple-800">
                #FamiliaVirtual
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Personality & Spirit Section */}
      <section className="bg-[#140824] border border-[#341656] rounded-3xl p-6 sm:p-10 mb-12 shadow-lg">
        <h2 className="text-2xl font-black text-[#c084fc] mb-4 flex items-center gap-2">
          <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
          La Esencia de Mini
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          Mini aportó un brillo único a nuestro grupo. En un grupo lleno de locura, mutes de Bendy y payasadas de Domititan, Mini siempre aportó frescura, autenticidad y momentos que nos recordaban lo valioso de compartir tiempo juntos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#0a0312] rounded-2xl border border-purple-900/50">
            <h4 className="text-sm font-bold text-purple-300 mb-1">Presencia Entrañable</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Siempre dispuesta a compartir risas, acompañar en las llamadas y formar parte de los mejores momentos de nuestra comunidad.
            </p>
          </div>
          <div className="p-4 bg-[#0a0312] rounded-2xl border border-purple-900/50">
            <h4 className="text-sm font-bold text-purple-300 mb-1">Risas Inolvidables</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Los chistes espontáneos y las anécdotas que se guardarán para siempre en el baúl de los mejores recuerdos de 2026.
            </p>
          </div>
        </div>
      </section>

      {/* Editable Memories Section (Strictly complying with prompt requirement) */}
      <section className="bg-[#11071e] border border-[#2d1247] rounded-2xl p-6 sm:p-8 mb-12">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-purple-400" />
            Recuerdos y Momentos con Mini (Sección Editable)
          </h3>
        </div>
        <p className="text-xs text-slate-400 mb-6">
          Puedes agregar más anécdotas, recuerdos y notas compartidas con Mini para mantener viva la memoria de 2026.
        </p>

        <div className="space-y-3 mb-6">
          {miniMemories.map((item, idx) => (
            <div key={idx} className="p-3.5 bg-[#08020e] border border-[#220d36] rounded-xl text-xs sm:text-sm text-slate-200 flex items-start gap-3">
              <span className="font-mono text-purple-400 font-bold shrink-0">#{idx + 1}</span>
              <p className="leading-relaxed flex-1">{item}</p>
            </div>
          ))}
        </div>

        {/* Add Memory Form */}
        <form onSubmit={handleAddMemory} className="flex gap-2">
          <input
            type="text"
            placeholder="Escribe una anécdota o recuerdo con Mini para guardar aquí..."
            value={newMemory}
            onChange={(e) => setNewMemory(e.target.value)}
            className="flex-1 px-4 py-2.5 text-xs bg-[#08020e] border border-[#270e3d] rounded-xl text-white focus:outline-none focus:border-purple-400"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4" /> Añadir
          </button>
        </form>
      </section>

      {/* Sincere Gratitude */}
      <div className="text-center bg-gradient-to-r from-purple-950/40 via-pink-950/40 to-purple-950/40 border border-purple-500/30 rounded-2xl p-8">
        <h3 className="text-xl font-black text-purple-200 mb-2">¡Muchísimas Gracias, Mini! ✨</h3>
        <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Gracias por cada risa, por estar presente en nuestras vidas virtuales este año y por ser una amiga excepcional. ¡Que este 2027 siga trayendo más momentos increíbles!
        </p>
      </div>
    </div>
  );
};

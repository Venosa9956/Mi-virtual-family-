import React, { useState } from 'react';
import { Flame, Shield, ArrowLeft, Heart, MessageSquare, Plus, Swords } from 'lucide-react';
import { sound } from '../services/soundService';

interface EfraPageProps {
  onNavigate: (page: string) => void;
}

export const EfraPage: React.FC<EfraPageProps> = ({ onNavigate }) => {
  const [efraMemories, setEfraMemories] = useState<string[]>([
    'Efra prometiendo que iba a carrilear la partida y cayéndose por un precipicio en los primeros 10 segundos.',
    'Su energía incombustible a las 4 de la mañana animando a todos a no desconectarse todavía.',
    'Las bromas pesadas de broma entre Domititan y Efra donde terminaban gritando de risa en Discord.',
    'Su lealtad total: siempre el primero en saltar si alguien necesitaba apoyo en el grupo.',
  ]);
  const [newMemory, setNewMemory] = useState('');

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemory.trim()) return;
    setEfraMemories([...efraMemories, newMemory.trim()]);
    setNewMemory('');
    sound.playCoin();
  };

  return (
    <div className="min-h-screen text-slate-100 pb-20 pt-8 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Return button */}
      <div className="mb-6">
        <button
          onClick={() => onNavigate('index')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-red-400 hover:text-red-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al Menú Principal
        </button>
      </div>

      {/* Profile Header */}
      <div className="bg-gradient-to-r from-[#210707] via-[#2f0c0c] to-[#170505] border-2 border-[#dc2626]/60 rounded-3xl p-6 sm:p-10 shadow-[0_10px_40px_rgba(220,38,38,0.25)] mb-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl bg-[#0d0202] border-2 border-[#dc2626] flex items-center justify-center overflow-hidden shrink-0 shadow-2xl">
            <img
              src="/assets/characters/efra.png"
              alt="Efra - Lobo de Fuego"
              className="h-full w-full object-contain p-2 hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
              <Flame className="w-3.5 h-3.5 text-yellow-300" /> Guerrero Ígneo
            </div>
          </div>

          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-xs font-bold text-red-300">
              <Flame className="w-3.5 h-3.5 text-red-400 animate-pulse" />
              Lobo de Fuego, Bromista & Guerrero Leal
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-300 to-amber-300">
              EFRA
            </h1>

            <p className="text-sm sm:text-base text-red-100/90 leading-relaxed">
              El lobo de fuego con melena ardiente y espíritu inquebrantable. Fiero por fuera pero con el corazón más leal y bromista del grupo. Jamás faltó a una noche de risas descontroladas en 2026.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
              <span className="text-xs px-3 py-1 rounded-lg bg-red-950/60 text-red-300 border border-red-800">
                #LoboDeFuego
              </span>
              <span className="text-xs px-3 py-1 rounded-lg bg-red-950/60 text-red-300 border border-red-800">
                #LealtadTotal
              </span>
              <span className="text-xs px-3 py-1 rounded-lg bg-red-950/60 text-red-300 border border-red-800">
                #Guerrero2026
              </span>
              <span className="text-xs px-3 py-1 rounded-lg bg-red-950/60 text-red-300 border border-red-800">
                #DesmadreNocturno
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Spirit & Brotherhood Section */}
      <section className="bg-[#1a0606] border border-[#441111] rounded-3xl p-6 sm:p-10 mb-12 shadow-lg">
        <h2 className="text-2xl font-black text-red-400 mb-4 flex items-center gap-2">
          <Swords className="w-6 h-6" />
          El Espíritu Guerrero y la Lealtad de Efra
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          Efra es la energía de batalla que nunca se apaga. Su presencia en las llamadas significaba acción garantizada: bromas que subían de tono con risas imparables, retos en videojuegos y la seguridad de que, pase lo que pase, él siempre respaldaría a cualquiera de sus bros.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#0d0303] rounded-2xl border border-red-900/50">
            <h4 className="text-sm font-bold text-red-300 mb-1">Bromas Legendarias</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Las mejores anécdotas de Discord tienen a Efra involucrado, siempre con respuestas rápidas que nos dejaban sin aire de la risa.
            </p>
          </div>
          <div className="p-4 bg-[#0d0303] rounded-2xl border border-red-900/50">
            <h4 className="text-sm font-bold text-red-300 mb-1">Hermano de Batalla</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              En cada momento difícil o cuando alguien necesitaba desahogarse, Efra demostró que su fuego no es solo para pelear, sino para abrigar a su gente.
            </p>
          </div>
        </div>
      </section>

      {/* Editable Memories Section */}
      <section className="bg-[#150505] border border-[#350d0d] rounded-2xl p-6 sm:p-8 mb-12">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-red-400" />
          Momentos y Anécdotas con Efra (Editable)
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          Guarda aquí las mejores partidas, bromas y frases célebres de Efra en 2026.
        </p>

        <div className="space-y-3 mb-6">
          {efraMemories.map((item, idx) => (
            <div key={idx} className="p-3.5 bg-[#0a0202] border border-[#260909] rounded-xl text-xs sm:text-sm text-slate-200 flex items-start gap-3">
              <span className="font-mono text-red-400 font-bold shrink-0">#{idx + 1}</span>
              <p className="leading-relaxed flex-1">{item}</p>
            </div>
          ))}
        </div>

        {/* Add Memory Form */}
        <form onSubmit={handleAddMemory} className="flex gap-2">
          <input
            type="text"
            placeholder="Añade otra batalla, broma o recuerdo con Efra..."
            value={newMemory}
            onChange={(e) => setNewMemory(e.target.value)}
            className="flex-1 px-4 py-2.5 text-xs bg-[#0a0202] border border-[#2b0c0c] rounded-xl text-white focus:outline-none focus:border-red-400"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-bold text-white transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4" /> Añadir
          </button>
        </form>
      </section>

      {/* Sincere Gratitude */}
      <div className="text-center bg-gradient-to-r from-red-950/40 via-orange-950/40 to-red-950/40 border border-red-500/30 rounded-2xl p-8">
        <h3 className="text-xl font-black text-red-300 mb-2">¡Grande Efra! 🔥</h3>
        <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Gracias por cada carcajada, por estar al pie del cañón en cada llamada y por ser un amigo leal de corazón. ¡2026 fue legendario gracias a vos y en 2027 rompemos todo!
        </p>
      </div>
    </div>
  );
};

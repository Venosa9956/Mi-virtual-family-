import React, { useState } from 'react';
import { VolumeX, Shield, Crown, MessageSquare, ArrowLeft, Heart, Plus, Sparkles, Radio } from 'lucide-react';
import { sound } from '../services/soundService';

interface BendyPageProps {
  onNavigate: (page: string) => void;
}

export const BendyPage: React.FC<BendyPageProps> = ({ onNavigate }) => {
  const [muteTriggered, setMuteTriggered] = useState(false);
  const [bendyNotes, setBendyNotes] = useState<string[]>([
    'Bendy entrando al canal de voz diciendo "silencio que estoy en llamada importante" y Domititan empezando a poner ruidos raros.',
    'El récord de mute más rápido: 1.4 segundos después de que Domititan dijo "hola bros".',
    'Cuando todos se confabularon para hablar al mismo tiempo y Bendy casi silencia a todo el servidor completo.',
    'Las noches donde nos quedábamos hasta tarde charlando de proyectos, anécdotas y cosas de la vida.',
  ]);
  const [newNote, setNewNote] = useState('');

  const handleSimulateMute = () => {
    sound.playMuteGong();
    setMuteTriggered(true);
    setTimeout(() => setMuteTriggered(false), 3500);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setBendyNotes([...bendyNotes, newNote.trim()]);
    setNewNote('');
    sound.playCoin();
  };

  return (
    <div className="min-h-screen text-slate-100 pb-20 pt-8 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Return button */}
      <div className="mb-6">
        <button
          onClick={() => onNavigate('index')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al Menú Principal
        </button>
      </div>

      {/* Header Profile Section */}
      <div className="bg-gradient-to-r from-[#1f0d05] via-[#2a1307] to-[#170a1e] border-2 border-[#ea580c]/50 rounded-3xl p-6 sm:p-10 shadow-[0_10px_40px_rgba(234,88,12,0.25)] mb-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl bg-[#0c0512] border-2 border-[#ea580c] flex items-center justify-center overflow-hidden shrink-0 shadow-xl">
            <img
              src="/assets/characters/bendy.png"
              alt="Bendy"
              className="h-full w-full object-contain p-2 hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 left-3 bg-orange-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
              <Crown className="w-3.5 h-3.5" /> El Hermano Mayor
            </div>
          </div>

          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-950/80 border border-orange-500/40 text-xs font-bold text-orange-300">
              <Shield className="w-3.5 h-3.5 text-orange-400" />
              Dueño del Servidor & Hermano Mayor
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-200 to-yellow-400">
              BENDY
            </h1>

            <p className="text-sm sm:text-base text-orange-200/90 leading-relaxed">
              El mayor de nuestra familia virtual. Su personalidad firme, su papel como protector del servidor y su gatillo fácil con el botón de silencio convirtieron cada momento en una anécdota épica que jamás olvidaremos.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
              <span className="text-xs px-3 py-1 rounded-lg bg-orange-950/60 text-orange-300 border border-orange-800">
                #ElReyDelMute
              </span>
              <span className="text-xs px-3 py-1 rounded-lg bg-orange-950/60 text-orange-300 border border-orange-800">
                #AdminDiscord
              </span>
              <span className="text-xs px-3 py-1 rounded-lg bg-orange-950/60 text-orange-300 border border-orange-800">
                #HermanoMayor
              </span>
              <span className="text-xs px-3 py-1 rounded-lg bg-orange-950/60 text-orange-300 border border-orange-800">
                #Amistad2026
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN ESPECIAL: EL REY DEL MUTE */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#240c03] to-[#140602] border-2 border-orange-500 rounded-3xl p-8 sm:p-12 text-center mb-12 shadow-[0_0_50px_rgba(234,88,12,0.35)]">
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          {/* Animated Microphone Icon */}
          <div className="w-24 h-24 mx-auto rounded-3xl bg-orange-600/20 border-2 border-orange-500 flex items-center justify-center animate-float-mute shadow-[0_0_30px_rgba(234,88,12,0.6)]">
            <VolumeX className="w-12 h-12 text-orange-400 animate-pulse" />
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-orange-400">
              DISTINCIÓN OFICIAL 2026
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mt-1">
              👑 EL REY DEL MUTE
            </h2>
          </div>

          {/* User's exact requested phrase */}
          <blockquote className="p-6 rounded-2xl bg-black/60 border border-orange-500/40 text-lg sm:text-2xl font-black text-amber-200 italic leading-relaxed shadow-inner">
            «Gracias por todas las muteadas, Bendy. Nunca entendiste que me hacían más gracia que cualquier otra cosa JAJAJA».
          </blockquote>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleSimulateMute}
              className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 shadow-[0_6px_25px_rgba(234,88,12,0.5)] transition-all cursor-pointer flex items-center gap-2"
            >
              <VolumeX className="w-5 h-5" />
              <span>Simular Muteada de Bendy en Vivo</span>
            </button>
          </div>

          {muteTriggered && (
            <div className="p-4 rounded-xl bg-red-950/80 border border-red-500 text-red-200 text-xs sm:text-sm animate-bounce">
              ⚠️ <strong>¡HAS SIDO SILENCIADO POR BENDY!</strong> Canal bloqueado por exceso de risas.
            </div>
          )}
        </div>
      </section>

      {/* Detailed Tribute Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Personality & Role */}
        <div className="bg-[#150a1e] border border-[#3b194f] rounded-2xl p-6">
          <h3 className="text-lg font-bold text-orange-400 mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Personalidad & Papel en la Familia
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Bendy representa la autoridad divertida de la familia virtual. Aunque amenazaba con mutear a la mínima provocación, siempre estuvo ahí cuando alguien necesitaba hablar o cuando organizábamos sesiones de juego nocturnas. Fue el hermano mayor que nos mantuvo organizados en el caos de 2026.
          </p>
        </div>

        {/* The Discord Server */}
        <div className="bg-[#150a1e] border border-[#3b194f] rounded-2xl p-6">
          <h3 className="text-lg font-bold text-orange-400 mb-3 flex items-center gap-2">
            <Radio className="w-5 h-5" />
            El Servidor de Discord
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Su servidor de Discord fue nuestro cuartel general durante todo el 2026. Ahí se gestaron los chistes internos, las transmisiones de pantalla, las charlas sobre la vida y los momentos más divertidos del año. Sin su servidor, esta aventura no existiría.
          </p>
        </div>
      </div>

      {/* Shared Memories / Editable Section */}
      <section className="bg-[#130722] border border-[#30164c] rounded-2xl p-6 sm:p-8 mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-orange-400" />
              Momentos Inolvidables con Bendy
            </h3>
            <p className="text-xs text-slate-400 mt-1">Sección viva para guardar y recordar anécdotas con el hermano mayor.</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {bendyNotes.map((note, idx) => (
            <div key={idx} className="p-3.5 bg-[#0b0413] border border-[#26103b] rounded-xl text-xs sm:text-sm text-slate-200 flex items-start gap-3">
              <span className="font-mono text-orange-400 font-bold shrink-0">#{idx + 1}</span>
              <p className="leading-relaxed flex-1">{note}</p>
            </div>
          ))}
        </div>

        {/* Add Note Form */}
        <form onSubmit={handleAddNote} className="flex gap-2">
          <input
            type="text"
            placeholder="Añade otra anécdota o recuerdo con Bendy..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="flex-1 px-4 py-2.5 text-xs bg-[#0b0413] border border-[#2d1447] rounded-xl text-white focus:outline-none focus:border-orange-500"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-xs font-bold text-white transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4" /> Añadir
          </button>
        </form>
      </section>

      {/* Sincere Gratitude */}
      <div className="text-center bg-gradient-to-r from-orange-950/40 via-purple-950/40 to-orange-950/40 border border-orange-500/30 rounded-2xl p-8">
        <h3 className="text-xl font-black text-amber-300 mb-2">Un Agradecimiento Inmenso</h3>
        <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Gracias por cada momento, Bendy. Por abrirnos las puertas de tu servidor, por las risas cada vez que el micrófono se ponía rojo y por ser un amigo incondicional. ¡Seguiremos juntos en 2027!
        </p>
      </div>
    </div>
  );
};

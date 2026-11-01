import React, { useState } from 'react';
import { Tv, Moon, Sparkles, ArrowLeft, Heart, Smile, Monitor, Film } from 'lucide-react';
import { sound } from '../services/soundService';

interface DomititanPageProps {
  onNavigate: (page: string) => void;
}

export const DomititanPage: React.FC<DomititanPageProps> = ({ onNavigate }) => {
  const [currentChannel, setCurrentChannel] = useState(0);

  const TV_CHANNELS = [
    {
      channel: 'CANAL 01: IDENTIDAD',
      title: 'El Gato Morado con Cabeza de TV',
      text: 'Un gato morado con cabeza de monitor CRT retro, un collar de luna dorada y una actitud relajada que no se estresa por nada. Duermo de día, vivo en Discord de noche.',
      color: '#c084fc',
    },
    {
      channel: 'CANAL 02: INMUNE AL MUTE',
      title: 'Filosofía: Reírse de Todo',
      text: '«Me muteaban y yo me cagaba de risa. Creo que nunca entendieron que era parte de la diversión JAJAJA». Cuando Bendy me silenciaba, yo festejaba porque sabía que había logrado el caos perfecto.',
      color: '#facc15',
    },
    {
      channel: 'CANAL 03: MIS AVENTURAS',
      title: 'Explorando Mundos Virtuales',
      text: 'Recorriendo los 10 mundos de nuestra aventura, recolectando estrellas cósmicas y enfrentando a los jefes que representan nuestras bromas de 2026.',
      color: '#38bdf8',
    },
    {
      channel: 'CANAL 04: GRATITUD',
      title: 'Mi Familia Virtual',
      text: 'No hay mejores compañeros para pasar un año entero. Bendy con sus mutes, Sunny con sus soles y arte, Mini con su dulzura y risas, Efra con su fuego guerrero. Son lo mejor que me pasó en 2026.',
      color: '#f472b6',
    },
  ];

  const handleNextChannel = () => {
    sound.playShoot();
    setCurrentChannel((prev) => (prev + 1) % TV_CHANNELS.length);
  };

  return (
    <div className="min-h-screen text-slate-100 pb-20 pt-8 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Return button */}
      <div className="mb-6">
        <button
          onClick={() => onNavigate('index')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al Menú Principal
        </button>
      </div>

      {/* Main Profile Header */}
      <div className="bg-gradient-to-r from-[#1b0a2e] via-[#240e3f] to-[#120621] border-2 border-[#9333ea]/60 rounded-3xl p-6 sm:p-10 shadow-[0_10px_40px_rgba(147,51,234,0.3)] mb-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl bg-[#0a0412] border-2 border-[#9333ea] flex items-center justify-center overflow-hidden shrink-0 shadow-2xl">
            <img
              src="/assets/characters/domititan.png"
              alt="Domititan"
              className="h-full w-full object-contain p-2 hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 left-3 bg-purple-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
              <Moon className="w-3.5 h-3.5 text-yellow-300" /> Domititan Oficial
            </div>
          </div>

          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-xs font-bold text-purple-300">
              <Tv className="w-3.5 h-3.5 text-purple-400" />
              Gato Morado con Cabeza de Televisor & Collar Lunar
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-200 to-indigo-300">
              DOMITITAN
            </h1>

            <p className="text-sm sm:text-base text-purple-200/90 leading-relaxed">
              «Soy un gato morado con cabeza de televisor. Mi pantalla emite las frecuencias de los mejores recuerdos, las bromas nocturnas y una amistad que no se apaga nunca.»
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
              <span className="text-xs px-3 py-1 rounded-lg bg-purple-950/60 text-purple-300 border border-purple-800">
                #GatoTV
              </span>
              <span className="text-xs px-3 py-1 rounded-lg bg-purple-950/60 text-purple-300 border border-purple-800">
                #CollarLunar
              </span>
              <span className="text-xs px-3 py-1 rounded-lg bg-purple-950/60 text-purple-300 border border-purple-800">
                #InmuneAlMute
              </span>
              <span className="text-xs px-3 py-1 rounded-lg bg-purple-950/60 text-purple-300 border border-purple-800">
                #Nocturno
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Cathode CRT TV Simulator */}
      <section className="mb-12">
        <div className="relative rounded-3xl p-6 sm:p-10 bg-black border-4 border-[#581c87] shadow-[0_0_45px_rgba(147,51,234,0.4)] overflow-hidden">
          {/* CRT scanlines overlay */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-purple-500/5 to-transparent animate-pulse" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[#3b1263]">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-900/40 rounded-xl text-purple-400 border border-purple-700">
                <Monitor className="w-6 h-6" />
              </div>
              <div>
                <span className="font-mono text-xs text-purple-400 font-bold uppercase tracking-widest">
                  TELEVISOR DE DOMITITAN // SEÑAL ESTABLE
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  {TV_CHANNELS[currentChannel].title}
                </h2>
              </div>
            </div>

            <button
              onClick={handleNextChannel}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-700 hover:bg-purple-600 transition-all flex items-center gap-2 shadow-lg shadow-purple-950 cursor-pointer"
            >
              <Film className="w-4 h-4" />
              <span>Cambiar Canal ({currentChannel + 1}/{TV_CHANNELS.length})</span>
            </button>
          </div>

          <div className="relative z-10 py-8 min-h-[140px] flex items-center">
            <p className="text-base sm:text-xl font-medium leading-relaxed" style={{ color: TV_CHANNELS[currentChannel].color }}>
              {TV_CHANNELS[currentChannel].text}
            </p>
          </div>

          <div className="relative z-10 pt-4 border-t border-[#3b1263] flex items-center justify-between text-xs font-mono text-slate-400">
            <span>SINTONIZADOR: CRT-2026</span>
            <span className="text-purple-300 font-bold">{TV_CHANNELS[currentChannel].channel}</span>
          </div>
        </div>
      </section>

      {/* Identity & Humor Detailed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-[#140824] border border-[#37165c] rounded-2xl p-6">
          <h3 className="text-lg font-bold text-purple-300 mb-3 flex items-center gap-2">
            <Moon className="w-5 h-5 text-yellow-300" />
            Mi Identidad Virtual & Estilo
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Nací de las noches largas frente a la pantalla y el cariño por los gatos cósmicos. Mi cabeza de televisor representa que vivo a través de estas conexiones digitales con amigos que, aunque estén lejos físicamente, se sienten al lado mío en cada llamada.
          </p>
        </div>

        <div className="bg-[#140824] border border-[#37165c] rounded-2xl p-6">
          <h3 className="text-lg font-bold text-purple-300 mb-3 flex items-center gap-2">
            <Smile className="w-5 h-5 text-pink-400" />
            El Sentido del Humor
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Nunca me tomé nada personal. Cuando me muteaban, cuando nos troleábamos en los juegos, o cuando todo salía mal en una partida, para mí era motivo de doblarme de la risa. Reírnos juntos fue nuestro superpoder en 2026.
          </p>
        </div>
      </div>

      {/* Gratitude & User Signature */}
      <div className="bg-gradient-to-r from-purple-950/60 via-indigo-950/60 to-purple-950/60 border border-purple-500/40 rounded-3xl p-8 sm:p-12 text-center shadow-xl">
        <h3 className="text-2xl font-black text-white mb-4">
          Agradecimiento a Toda la Familia Virtual
        </h3>
        <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed mb-6">
          Gracias por cada noche desvelándonos, por aguantar mis tonterías, por las risas en el servidor y por ser amigos de verdad. Este proyecto y este juego son para ustedes, para que nunca olvidemos lo que vivimos en 2026.
        </p>

        {/* User's exact signature */}
        <div className="inline-block p-4 bg-black/50 border border-purple-500 rounded-2xl text-xl sm:text-2xl font-extrabold text-[#c084fc] tracking-wider shadow-lg">
          DOMITITAN 💤🌙📺
        </div>
      </div>
    </div>
  );
};

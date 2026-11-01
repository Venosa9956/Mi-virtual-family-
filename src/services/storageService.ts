import { GameProgress, MemoryItem, GalleryItem, FriendProfile } from '../types';

const PROGRESS_KEY = 'our_friendship_2026_progress';
const MEMORIES_KEY = 'our_friendship_2026_memories';
const GALLERY_KEY = 'our_friendship_2026_gallery';
const FREE_MODE_KEY = 'our_friendship_2026_free_mode';

export const FRIENDS_DATA: Record<string, FriendProfile> = {
  domititan: {
    id: 'domititan',
    name: 'Domititan',
    nickname: 'El Gato TV',
    role: 'Creador & Aventurero Cósmico',
    avatar: '/assets/characters/domititan.png',
    quote: 'Me muteaban y yo me cagaba de risa. Creo que nunca entendieron que era parte de la diversión JAJAJA.',
    color: '#9333ea',
    accentColor: '#c084fc',
    unlockStage: 0, // Always unlocked
    description: 'Un gato morado con cabeza de televisor, soñador, amante de las madrugadas en Discord y el cerebro detrás de esta aventura.',
    tags: ['Gato TV', 'Nocturno', 'Inmune al Mute', 'Líder']
  },
  bendy: {
    id: 'bendy',
    name: 'Bendy',
    nickname: 'El Rey del Mute',
    role: 'El Mayor de la Familia & Dueño del Servidor',
    avatar: '/assets/characters/bendy.png',
    quote: 'Gracias por todas las muteadas, Bendy. Nunca entendiste que me hacían más gracia que cualquier otra cosa JAJAJA.',
    color: '#ea580c',
    accentColor: '#fb923c',
    unlockStage: 4,
    description: 'El hermano mayor de nuestro grupo virtual. Administrador supremo del server de Discord y portador del botón de mute más rápido del oeste.',
    tags: ['Rey del Mute', 'Hermano Mayor', 'Admin Discord', 'Legendario']
  },
  sunny: {
    id: 'sunny',
    name: 'Sunny',
    nickname: 'The Sun Cat',
    role: 'Luz y Energía del Grupo',
    avatar: '/assets/characters/sunny.png',
    quote: 'Brillando con toda la buena vibra en los días más locos de 2026.',
    color: '#eab308',
    accentColor: '#fde047',
    unlockStage: 1,
    description: 'The Sun Cat. Pura energía radiante, dibujos geniales, risas compartidas y momentos inolvidables que iluminaron cada llamada.',
    tags: ['The Sun Cat', 'Artista', 'Radiante', 'Buena Vibra']
  },
  mini: {
    id: 'mini',
    name: 'Mini',
    nickname: 'Estrellita',
    role: 'Corazón Dulce de la Familia',
    avatar: '/assets/characters/mini.jpg',
    quote: 'La ternura y las risas espontáneas que unieron a esta familia en 2026.',
    color: '#a855f7',
    accentColor: '#e9d5ff',
    unlockStage: 2,
    description: 'Una integrante única y entrañable. Siempre trayendo momentos divertidos, amabilidad y compañía genuina a nuestras tardes.',
    tags: ['Estrellita', 'Amabilidad', 'Risas', 'Inolvidable']
  },
  efra: {
    id: 'efra',
    name: 'Efra',
    nickname: 'Lobo de Fuego',
    role: 'Guerrero Leal y Bromista',
    avatar: '/assets/characters/efra.png',
    quote: 'Con fuego en el espíritu y siempre al pie del cañón para el desmadre con los panas.',
    color: '#dc2626',
    accentColor: '#f87171',
    unlockStage: 3,
    description: 'El fiero y noble guerrero con melena de fuego. Jamás faltó a una noche de bromas épicas y desvelos inolvidables.',
    tags: ['Lobo Ígneo', 'Leal', 'Bromista Épico', 'Guerrero']
  }
};

export const INITIAL_MEMORIES: MemoryItem[] = [
  {
    id: 'mem-1',
    author: 'Domititan',
    title: 'La Legendaria Racha de Muteadas',
    content: 'Cada vez que Bendy entraba al canal de voz y yo empezaba con mis locuras, me caía un mute en menos de 3 segundos. Lo mejor es que yo me cagaba de risa muteado con la cámara prendida haciendo señas.',
    date: 'Mayo 2026',
    category: 'muteada',
    likes: 42
  },
  {
    id: 'mem-2',
    author: 'Domititan & Bendy',
    title: 'El Micrófono Silenciado del Servidor',
    content: '«Gracias por todas las muteadas, Bendy. Nunca entendiste que me hacían más gracia que cualquier otra cosa JAJAJA». Bendy amenazando con el rol de Castigado y todos riéndose.',
    date: 'Julio 2026',
    category: 'discord',
    likes: 56
  },
  {
    id: 'mem-3',
    author: 'Sunny',
    title: 'Sesiones de Dibujo y Gatos Sol',
    content: 'Las horas compartiendo pantallas mostrando bocetos, Sunny sacando ideas geniales para The Sun Cat y todos comentando tonterías hasta las 4 AM.',
    date: 'Agosto 2026',
    category: 'momento',
    likes: 38
  },
  {
    id: 'mem-4',
    author: 'Efra',
    title: 'Efra y las Fieras Batallas Nocturnas',
    content: 'Efra entrando con toda la energía y diciendo que iba a ganar todas las partidas, para luego caer en la primera trampa y desatar una carcajada general.',
    date: 'Septiembre 2026',
    category: 'broma',
    likes: 29
  },
  {
    id: 'mem-5',
    author: 'Mini',
    title: 'Risas Inesperadas en Grupo',
    content: 'Mini soltando comentarios en el momento más inesperado que hacían que todos tuviéramos que mutearnos del ataque de risa que nos daba.',
    date: 'Octubre 2026',
    category: 'momento',
    likes: 34
  },
  {
    id: 'mem-6',
    author: 'Domititan',
    title: 'Seguimos Juntos al Final de 2026',
    content: 'Un año entero que se fue volando entre juegos, llamadas de Discord, risas compartidas y momentos que nos cambiaron la vida. No cambio a esta familia virtual por nada del mundo.',
    date: 'Noviembre 2026',
    category: 'aventura',
    likes: 77
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Domititan 💤🌙📺',
    caption: 'El gato morado con cabeza de televisor, listo para las transmisiones cósmicas.',
    imageUrl: '/assets/characters/domititan.png',
    date: '2026',
    category: 'Personajes'
  },
  {
    id: 'gal-2',
    title: 'Bendy — El Rey del Mute',
    caption: 'El mayor de la familia virtual, vigilando el servidor de Discord.',
    imageUrl: '/assets/characters/bendy.png',
    date: '2026',
    category: 'Personajes'
  },
  {
    id: 'gal-3',
    title: 'Sunny — The Sun Cat',
    caption: 'Energía radiante y luz cálida para todo el equipo.',
    imageUrl: '/assets/characters/sunny.png',
    date: '2026',
    category: 'Personajes'
  },
  {
    id: 'gal-4',
    title: 'Mini — Dulzura y Alegría',
    caption: 'Nuestra compañera celestial llena de ternura y risas compartidas.',
    imageUrl: '/assets/characters/mini.jpg',
    date: '2026',
    category: 'Personajes'
  },
  {
    id: 'gal-5',
    title: 'Efra — Fuego y Lealtad',
    caption: 'El guerrero de fuego más fiel del grupo, listo para defender la amistad.',
    imageUrl: '/assets/characters/efra.png',
    date: '2026',
    category: 'Personajes'
  }
];

export const storage = {
  getProgress(): GameProgress {
    try {
      const stored = localStorage.getItem(PROGRESS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}
    return {
      currentStage: 1,
      highestStageUnlocked: 1,
      stagesCompleted: new Array(10).fill(false),
      unlockedPages: ['domititan'],
      totalCoins: 0,
      highScore: 0,
      finalBossDefeated: false,
    };
  },

  saveProgress(progress: GameProgress) {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    } catch {}
  },

  unlockStageReward(stageCompleted: number): { unlockedName: string; description: string } {
    const progress = this.getProgress();
    if (!progress.stagesCompleted[stageCompleted - 1]) {
      progress.stagesCompleted[stageCompleted - 1] = true;
    }
    if (stageCompleted < 10 && progress.highestStageUnlocked < stageCompleted + 1) {
      progress.highestStageUnlocked = stageCompleted + 1;
    }

    let reward = { unlockedName: '', description: '' };

    switch (stageCompleted) {
      case 1:
        if (!progress.unlockedPages.includes('sunny')) progress.unlockedPages.push('sunny');
        reward = { unlockedName: 'Página de Sunny (The Sun Cat)', description: '¡Has desbloqueado el homenaje individual de Sunny!' };
        break;
      case 2:
        if (!progress.unlockedPages.includes('mini')) progress.unlockedPages.push('mini');
        reward = { unlockedName: 'Página de Mini', description: '¡Has desbloqueado el homenaje individual de Mini!' };
        break;
      case 3:
        if (!progress.unlockedPages.includes('efra')) progress.unlockedPages.push('efra');
        reward = { unlockedName: 'Página de Efra', description: '¡Has desbloqueado el homenaje al lobo de fuego Efra!' };
        break;
      case 4:
        if (!progress.unlockedPages.includes('bendy')) progress.unlockedPages.push('bendy');
        reward = { unlockedName: 'Página de Bendy (El Rey del Mute)', description: '¡Has desbloqueado el homenaje al mayor de la familia!' };
        break;
      case 5:
        if (!progress.unlockedPages.includes('recuerdos')) progress.unlockedPages.push('recuerdos');
        reward = { unlockedName: 'Colección de Recuerdos 2026', description: '¡Archivo histórico de risas y anécdotas desbloqueado!' };
        break;
      case 6:
        if (!progress.unlockedPages.includes('galeria')) progress.unlockedPages.push('galeria');
        reward = { unlockedName: 'Galería Secreta de Discord', description: '¡Acceso a las fotos y momentos especiales!' };
        break;
      case 7:
        if (!progress.unlockedPages.includes('domititan_secreto')) progress.unlockedPages.push('domititan_secreto');
        reward = { unlockedName: 'Bóveda Secreta de Domititan', description: '¡Secretos del gato morado con cabeza de TV!' };
        break;
      case 8:
        if (!progress.unlockedPages.includes('estrellas')) progress.unlockedPages.push('estrellas');
        reward = { unlockedName: 'Reino Cósmico de la Amistad', description: '¡Mensajes estelares para la posteridad!' };
        break;
      case 9:
        if (!progress.unlockedPages.includes('momentos')) progress.unlockedPages.push('momentos');
        reward = { unlockedName: 'Recopilación Épica de Momentos', description: '¡El resumen de oro de nuestro año!' };
        break;
      case 10:
        progress.finalBossDefeated = true;
        if (!progress.unlockedPages.includes('homenaje_final')) progress.unlockedPages.push('homenaje_final');
        reward = { unlockedName: 'El Homenaje Final 2026 — 2027', description: '¡Felicidades bro! Has completado la aventura entera.' };
        break;
    }

    this.saveProgress(progress);
    return reward;
  },

  isPageUnlocked(pageId: string): boolean {
    if (this.isFreeMode()) return true;
    if (pageId === 'domititan' || pageId === 'index' || pageId === 'juego') return true;
    const progress = this.getProgress();
    return progress.unlockedPages.includes(pageId);
  },

  isFreeMode(): boolean {
    try {
      return localStorage.getItem(FREE_MODE_KEY) === 'true';
    } catch {
      return false;
    }
  },

  toggleFreeMode(): boolean {
    const next = !this.isFreeMode();
    try {
      localStorage.setItem(FREE_MODE_KEY, String(next));
    } catch {}
    return next;
  },

  resetProgress() {
    try {
      localStorage.removeItem(PROGRESS_KEY);
      localStorage.removeItem(FREE_MODE_KEY);
    } catch {}
  },

  getMemories(): MemoryItem[] {
    try {
      const stored = localStorage.getItem(MEMORIES_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return INITIAL_MEMORIES;
  },

  saveMemories(memories: MemoryItem[]) {
    try {
      localStorage.setItem(MEMORIES_KEY, JSON.stringify(memories));
    } catch {}
  },

  addMemory(item: Omit<MemoryItem, 'id' | 'likes'>): MemoryItem {
    const list = this.getMemories();
    const newItem: MemoryItem = {
      ...item,
      id: 'mem-' + Date.now(),
      likes: 1
    };
    const updated = [newItem, ...list];
    this.saveMemories(updated);
    return newItem;
  },

  likeMemory(id: string): number {
    const list = this.getMemories();
    let count = 0;
    const updated = list.map(m => {
      if (m.id === id) {
        count = m.likes + 1;
        return { ...m, likes: count };
      }
      return m;
    });
    this.saveMemories(updated);
    return count;
  },

  deleteMemory(id: string) {
    const list = this.getMemories();
    const updated = list.filter(m => m.id !== id);
    this.saveMemories(updated);
  },

  getGallery(): GalleryItem[] {
    try {
      const stored = localStorage.getItem(GALLERY_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return INITIAL_GALLERY;
  },

  saveGallery(gallery: GalleryItem[]) {
    try {
      localStorage.setItem(GALLERY_KEY, JSON.stringify(gallery));
    } catch {}
  },

  addGalleryItem(item: Omit<GalleryItem, 'id'>): GalleryItem {
    const list = this.getGallery();
    const newItem: GalleryItem = {
      ...item,
      id: 'gal-' + Date.now()
    };
    const updated = [newItem, ...list];
    this.saveGallery(updated);
    return newItem;
  }
};

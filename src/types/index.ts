export interface FriendProfile {
  id: 'bendy' | 'domititan' | 'sunny' | 'mini' | 'efra';
  name: string;
  nickname: string;
  role: string;
  avatar: string;
  quote: string;
  color: string;
  accentColor: string;
  unlockStage: number; // Stage required to unlock in game (0 = available from start for Domititan)
  description: string;
  tags: string[];
}

export interface MemoryItem {
  id: string;
  author: string;
  title: string;
  content: string;
  date: string;
  category: 'muteada' | 'broma' | 'discord' | 'aventura' | 'momento';
  image?: string;
  likes: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  date: string;
  category: string;
}

export interface GameProgress {
  currentStage: number;
  highestStageUnlocked: number;
  stagesCompleted: boolean[];
  unlockedPages: string[];
  totalCoins: number;
  highScore: number;
  finalBossDefeated: boolean;
}

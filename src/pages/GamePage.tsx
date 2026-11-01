import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Volume2, VolumeX, RotateCcw, Award, CheckCircle, Pause, Play, ShieldAlert, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../services/soundService';
import { storage } from '../services/storageService';
import { GameProgress } from '../types';

interface GamePageProps {
  onNavigate: (page: string) => void;
  onOpenZipModal: () => void;
}

interface StageConfig {
  id: number;
  name: string;
  subtitle: string;
  bossName: string;
  bossTitle: string;
  themeColor: string;
  skyColorTop: string;
  skyColorBottom: string;
  rewardKey: string;
  rewardText: string;
}

const STAGES_DATA: StageConfig[] = [
  {
    id: 1,
    name: 'Bosque de la Amistad',
    subtitle: 'Naturaleza viva y los primeros lazos de 2026',
    bossName: 'Sprout Guardian',
    bossTitle: 'Guardián del Brote Ancestral',
    themeColor: '#10b981',
    skyColorTop: '#064e3b',
    skyColorBottom: '#022c22',
    rewardKey: 'sunny',
    rewardText: '¡Página de Sunny (The Sun Cat) Desbloqueada!',
  },
  {
    id: 2,
    name: 'Reino de las Bromas',
    subtitle: 'Plataformas elásticas y risas sin control',
    bossName: 'El Bromista Espectral',
    bossTitle: 'Señor del Caos Festivo',
    themeColor: '#a855f7',
    skyColorTop: '#4c1d95',
    skyColorBottom: '#1e0838',
    rewardKey: 'mini',
    rewardText: '¡Página de Mini Desbloqueada!',
  },
  {
    id: 3,
    name: 'Montañas del Discord',
    subtitle: 'Servidores flotantes y canales de voz desquiciados',
    bossName: 'Glitch Server Bot',
    bossTitle: 'Bot Corrompido del Servidor',
    themeColor: '#3b82f6',
    skyColorTop: '#1e3a8a',
    skyColorBottom: '#0c1a40',
    rewardKey: 'efra',
    rewardText: '¡Página de Efra (Lobo de Fuego) Desbloqueada!',
  },
  {
    id: 4,
    name: 'Castillo del Silencio',
    subtitle: 'La fortaleza donde reinan los micrófonos silenciados',
    bossName: 'El Mute Supremo',
    bossTitle: 'Vanguardia del Silencio Absoluto',
    themeColor: '#ea580c',
    skyColorTop: '#7c2d12',
    skyColorBottom: '#2a0a03',
    rewardKey: 'bendy',
    rewardText: '¡Página de Bendy (El Rey del Mute) Desbloqueada!',
  },
  {
    id: 5,
    name: 'Valle de las Risas',
    subtitle: 'Donde cada carcajada genera energía cósmica',
    bossName: 'Gigante de la Risa',
    bossTitle: 'Coloso de la Carcajada Eterna',
    themeColor: '#eab308',
    skyColorTop: '#713f12',
    skyColorBottom: '#2c1804',
    rewardKey: 'recuerdos',
    rewardText: '¡Colección de Recuerdos 2026 Desbloqueada!',
  },
  {
    id: 6,
    name: 'Ciudad de los Recuerdos',
    subtitle: 'Luces de neón y momentos congelados en el tiempo',
    bossName: 'Memory Phantom',
    bossTitle: 'Espectro de las Noches Desveladas',
    themeColor: '#ec4899',
    skyColorTop: '#831843',
    skyColorBottom: '#2d0617',
    rewardKey: 'galeria',
    rewardText: '¡Galería Secreta de Discord Desbloqueada!',
  },
  {
    id: 7,
    name: 'Caverna de las Aventuras',
    subtitle: 'Cristales subterráneos y secretos del gato TV',
    bossName: 'Dragón de Cristal',
    bossTitle: 'Leviatán de Gemas Subterráneas',
    themeColor: '#06b6d4',
    skyColorTop: '#164e63',
    skyColorBottom: '#04212b',
    rewardKey: 'domititan_secreto',
    rewardText: '¡Bóveda Secreta de Domititan Desbloqueada!',
  },
  {
    id: 8,
    name: 'Reino de las Estrellas',
    subtitle: 'Nebulosas púrpuras y cometas de pura hermandad',
    bossName: 'Titán Estelar',
    bossTitle: 'Avatar Cósmico del Firmamento',
    themeColor: '#8b5cf6',
    skyColorTop: '#3730a3',
    skyColorBottom: '#130e42',
    rewardKey: 'estrellas',
    rewardText: '¡Reino de las Estrellas Desbloqueado!',
  },
  {
    id: 9,
    name: 'Fortaleza del Caos',
    subtitle: 'Lava, desafíos extremos y la penúltima prueba',
    bossName: 'Chaos Overlord',
    bossTitle: 'Tirano del Desmadre Final',
    themeColor: '#ef4444',
    skyColorTop: '#7f1d1d',
    skyColorBottom: '#280606',
    rewardKey: 'momentos',
    rewardText: '¡Recopilación Épica de Momentos Desbloqueada!',
  },
  {
    id: 10,
    name: 'El Último Capítulo',
    subtitle: 'El desenlace del 2026 y la puerta al 2027',
    bossName: 'The 2026 Final Arbiter',
    bossTitle: 'El Guardián del Tiempo y la Amistad',
    themeColor: '#c084fc',
    skyColorTop: '#581c87',
    skyColorBottom: '#1e0538',
    rewardKey: 'homenaje_final',
    rewardText: '¡EL GRAN HOMENAJE FINAL 2026 — 2027 DESBLOQUEADO! 💜',
  },
];

export const GamePage: React.FC<GamePageProps> = ({ onNavigate, onOpenZipModal }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [progress, setProgress] = useState<GameProgress>(storage.getProgress());
  const [currentStageIdx, setCurrentStageIdx] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [score, setScore] = useState<number>(0);
  const [coins, setCoins] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [stageClearedModal, setStageClearedModal] = useState<string | null>(null);
  const [grandVictory, setGrandVictory] = useState<boolean>(false);

  // References for live game loop without re-triggering renders
  const gameStateRef = useRef({
    currentStageIdx: 0,
    lives: 3,
    score: 0,
    coins: 0,
    isPaused: false,
    gameOver: false,
    player: {
      x: 80,
      y: 350,
      vx: 0,
      vy: 0,
      w: 36,
      h: 50,
      grounded: false,
      facing: 1,
      shootCooldown: 0,
      invulnerableTimer: 0,
    },
    keys: { left: false, right: false, jump: false, shoot: false },
    bullets: [] as Array<{ x: number; y: number; vx: number; r: number }>,
    enemyBullets: [] as Array<{ x: number; y: number; vx: number; vy: number; r: number }>,
    platforms: [] as Array<{ x: number; y: number; w: number; h: number; type?: string; moving?: boolean; originX?: number; range?: number; dir?: number }>,
    coinsList: [] as Array<{ x: number; y: number; collected: boolean }>,
    enemiesList: [] as Array<{ x: number; y: number; w: number; h: number; vx: number; minX: number; maxX: number; hp: number }>,
    particlesList: [] as Array<{ x: number; y: number; vx: number; vy: number; color: string; life: number; maxLife: number }>,
    boss: null as {
      name: string;
      x: number;
      y: number;
      w: number;
      h: number;
      hp: number;
      maxHp: number;
      vx: number;
      timer: number;
      phase: number;
    } | null,
  });

  const setupStage = (stageIdx: number) => {
    const s = STAGES_DATA[stageIdx];
    const gs = gameStateRef.current;
    gs.currentStageIdx = stageIdx;
    setCurrentStageIdx(stageIdx);
    setGameOver(false);
    gs.gameOver = false;
    gs.isPaused = false;
    setIsPaused(false);

    // Reset player position
    gs.player.x = 80;
    gs.player.y = 350;
    gs.player.vx = 0;
    gs.player.vy = 0;
    gs.player.shootCooldown = 0;
    gs.player.invulnerableTimer = 30;

    gs.bullets = [];
    gs.enemyBullets = [];
    gs.particlesList = [];

    // Progressive platforming layouts
    const basePlatforms: Array<{ x: number; y: number; w: number; h: number; type?: string; moving?: boolean; originX?: number; range?: number; dir?: number }> = [
      { x: 0, y: 460, w: 960, h: 80 }, // ground floor
      { x: 140, y: 370, w: 120, h: 18 },
      { x: 310, y: 300, w: 140, h: 18 },
      { x: 500, y: 360, w: 130, h: 18 },
      { x: 670, y: 280, w: 120, h: 18 },
      { x: 820, y: 220, w: 110, h: 18 },
    ];

    if (stageIdx >= 2) {
      // Add moving platform
      basePlatforms.push({
        x: 420,
        y: 200,
        w: 100,
        h: 16,
        moving: true,
        originX: 420,
        range: 120,
        dir: 1,
      });
    }

    gs.platforms = basePlatforms;

    // Coins
    gs.coinsList = [
      { x: 190, y: 330, collected: false },
      { x: 370, y: 260, collected: false },
      { x: 560, y: 320, collected: false },
      { x: 730, y: 240, collected: false },
      { x: 880, y: 180, collected: false },
    ];

    // Regular Stage Enemies
    gs.enemiesList = [
      { x: 200, y: 340, w: 28, h: 28, vx: 1.2, minX: 150, maxX: 240, hp: 1 },
      { x: 520, y: 330, w: 28, h: 28, vx: -1.2, minX: 500, maxX: 610, hp: 1 },
      { x: 300, y: 430, w: 28, h: 28, vx: 1.5, minX: 200, maxX: 450, hp: 1 },
    ];

    // Boss configuration (progressively tougher)
    const bossHp = 10 + stageIdx * 4;
    gs.boss = {
      name: s.bossName,
      x: 750,
      y: 310,
      w: 68,
      h: 76,
      hp: bossHp,
      maxHp: bossHp,
      vx: 1.8 + stageIdx * 0.15,
      timer: 0,
      phase: 1,
    };
  };

  useEffect(() => {
    setupStage(0);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const spawnParticles = (x: number, y: number, color: string, count = 12) => {
      const gs = gameStateRef.current;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1;
        gs.particlesList.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          life: 0,
          maxLife: 20 + Math.random() * 15,
        });
      }
    };

    const handleBossDefeat = () => {
      const gs = gameStateRef.current;
      sound.playBossRoar();
      sound.playVictory();

      // Confetti burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      const currentStageNum = gs.currentStageIdx + 1;
      const reward = storage.unlockStageReward(currentStageNum);
      setProgress(storage.getProgress());

      if (currentStageNum < 10) {
        setStageClearedModal(reward.unlockedName);
      } else {
        setGrandVictory(true);
      }
    };

    const update = () => {
      const gs = gameStateRef.current;
      if (gs.isPaused || gs.gameOver) return;

      // Player Movement
      if (gs.keys.left) {
        gs.player.vx = -4.8;
        gs.player.facing = -1;
      } else if (gs.keys.right) {
        gs.player.vx = 4.8;
        gs.player.facing = 1;
      } else {
        gs.player.vx *= 0.78;
      }

      // Gravity
      gs.player.vy += 0.55;
      gs.player.x += gs.player.vx;
      gs.player.y += gs.player.vy;

      if (gs.player.shootCooldown > 0) gs.player.shootCooldown--;
      if (gs.player.invulnerableTimer > 0) gs.player.invulnerableTimer--;

      // Moving platforms update
      for (const p of gs.platforms) {
        if (p.moving && p.originX !== undefined && p.range !== undefined && p.dir !== undefined) {
          p.x += p.dir * 1.5;
          if (p.x > p.originX + p.range) p.dir = -1;
          if (p.x < p.originX - p.range) p.dir = 1;
        }
      }

      // Platform Collision
      gs.player.grounded = false;
      for (const p of gs.platforms) {
        if (
          gs.player.x + gs.player.w > p.x &&
          gs.player.x < p.x + p.w &&
          gs.player.y + gs.player.h >= p.y &&
          gs.player.y + gs.player.h <= p.y + 16 &&
          gs.player.vy >= 0
        ) {
          gs.player.y = p.y - gs.player.h;
          gs.player.vy = 0;
          gs.player.grounded = true;
        }
      }

      // Bounds
      if (gs.player.x < 0) gs.player.x = 0;
      if (gs.player.x + gs.player.w > 960) gs.player.x = 960 - gs.player.w;

      // Fell into pit
      if (gs.player.y > 540) {
        sound.playHurt();
        gs.lives--;
        setLives(gs.lives);
        if (gs.lives <= 0) {
          gs.gameOver = true;
          setGameOver(true);
        } else {
          gs.player.x = 80;
          gs.player.y = 350;
          gs.player.vy = 0;
          gs.player.invulnerableTimer = 40;
        }
      }

      // Bullets Update
      for (let i = gs.bullets.length - 1; i >= 0; i--) {
        const b = gs.bullets[i];
        b.x += b.vx;
        if (b.x < 0 || b.x > 960) {
          gs.bullets.splice(i, 1);
          continue;
        }

        // Hit regular enemies
        for (let eIdx = gs.enemiesList.length - 1; eIdx >= 0; eIdx--) {
          const en = gs.enemiesList[eIdx];
          if (b.x > en.x && b.x < en.x + en.w && b.y > en.y && b.y < en.y + en.h) {
            spawnParticles(en.x + en.w / 2, en.y + en.h / 2, '#10b981', 8);
            gs.bullets.splice(i, 1);
            gs.enemiesList.splice(eIdx, 1);
            gs.score += 150;
            setScore(gs.score);
            sound.playCoin();
            break;
          }
        }

        // Hit Boss
        if (gs.boss && gs.boss.hp > 0) {
          if (b.x > gs.boss.x && b.x < gs.boss.x + gs.boss.w && b.y > gs.boss.y && b.y < gs.boss.y + gs.boss.h) {
            spawnParticles(b.x, b.y, '#f59e0b', 6);
            gs.bullets.splice(i, 1);
            gs.boss.hp--;
            gs.score += 75;
            setScore(gs.score);

            if (gs.boss.hp <= 0) {
              spawnParticles(gs.boss.x + gs.boss.w / 2, gs.boss.y + gs.boss.h / 2, '#c084fc', 35);
              handleBossDefeat();
            }
          }
        }
      }

      // Enemies Logic
      for (const en of gs.enemiesList) {
        en.x += en.vx;
        if (en.x > en.maxX) en.vx = -Math.abs(en.vx);
        if (en.x < en.minX) en.vx = Math.abs(en.vx);

        // Check collision with player
        if (
          gs.player.invulnerableTimer <= 0 &&
          gs.player.x + gs.player.w > en.x &&
          gs.player.x < en.x + en.w &&
          gs.player.y + gs.player.h > en.y &&
          gs.player.y < en.y + en.h
        ) {
          // If jumping on top
          if (gs.player.vy > 0 && gs.player.y + gs.player.h - en.y < 18) {
            gs.player.vy = -9;
            spawnParticles(en.x + en.w / 2, en.y + en.h / 2, '#10b981', 10);
            gs.enemiesList = gs.enemiesList.filter((e) => e !== en);
            gs.score += 200;
            setScore(gs.score);
            sound.playCoin();
          } else {
            sound.playHurt();
            gs.lives--;
            setLives(gs.lives);
            gs.player.invulnerableTimer = 60;
            gs.player.vy = -6;
            gs.player.vx = gs.player.facing * -4;
            if (gs.lives <= 0) {
              gs.gameOver = true;
              setGameOver(true);
            }
          }
        }
      }

      // Boss Behavior
      if (gs.boss && gs.boss.hp > 0) {
        gs.boss.x += gs.boss.vx;
        if (gs.boss.x < 550 || gs.boss.x > 870) gs.boss.vx *= -1;

        gs.boss.timer++;
        const fireRate = Math.max(35, 70 - gs.currentStageIdx * 4);

        if (gs.boss.timer % fireRate === 0) {
          // Boss projectile attack
          gs.enemyBullets.push({
            x: gs.boss.x,
            y: gs.boss.y + gs.boss.h / 2,
            vx: -5.2 - gs.currentStageIdx * 0.2,
            vy: (Math.random() - 0.5) * 2.5,
            r: 7,
          });
        }
      }

      // Enemy Bullets Update
      for (let i = gs.enemyBullets.length - 1; i >= 0; i--) {
        const eb = gs.enemyBullets[i];
        eb.x += eb.vx;
        eb.y += eb.vy;
        if (eb.x < 0) {
          gs.enemyBullets.splice(i, 1);
          continue;
        }

        // Hit player
        if (
          gs.player.invulnerableTimer <= 0 &&
          eb.x > gs.player.x &&
          eb.x < gs.player.x + gs.player.w &&
          eb.y > gs.player.y &&
          eb.y < gs.player.y + gs.player.h
        ) {
          spawnParticles(eb.x, eb.y, '#ef4444', 8);
          gs.enemyBullets.splice(i, 1);
          sound.playHurt();
          gs.lives--;
          setLives(gs.lives);
          gs.player.invulnerableTimer = 60;
          if (gs.lives <= 0) {
            gs.gameOver = true;
            setGameOver(true);
          }
        }
      }

      // Coins Collection
      for (const c of gs.coinsList) {
        if (!c.collected) {
          const dist = Math.hypot(gs.player.x + gs.player.w / 2 - c.x, gs.player.y + gs.player.h / 2 - c.y);
          if (dist < 26) {
            c.collected = true;
            spawnParticles(c.x, c.y, '#facc15', 8);
            gs.coins++;
            gs.score += 100;
            setCoins(gs.coins);
            setScore(gs.score);
            sound.playCoin();
          }
        }
      }

      // Particles Update
      for (let i = gs.particlesList.length - 1; i >= 0; i--) {
        const p = gs.particlesList[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        if (p.life >= p.maxLife) {
          gs.particlesList.splice(i, 1);
        }
      }
    };

    const draw = () => {
      const gs = gameStateRef.current;
      const s = STAGES_DATA[gs.currentStageIdx];

      ctx.clearRect(0, 0, 960, 540);

      // Sky Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, 540);
      skyGrad.addColorStop(0, s.skyColorTop);
      skyGrad.addColorStop(1, s.skyColorBottom);
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, 960, 540);

      // Stars
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      for (let i = 0; i < 45; i++) {
        const sx = (i * 97) % 960;
        const sy = (i * 53) % 400;
        ctx.fillRect(sx, sy, 2, 2);
      }

      // Platforms
      for (const p of gs.platforms) {
        ctx.fillStyle = '#140c26';
        ctx.fillRect(p.x, p.y, p.w, p.h);

        // Platform top border glow
        ctx.strokeStyle = s.themeColor;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.w, p.y);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        ctx.strokeRect(p.x, p.y, p.w, p.h);
      }

      // Coins
      for (const c of gs.coinsList) {
        if (!c.collected) {
          ctx.fillStyle = '#facc15';
          ctx.beginPath();
          ctx.arc(c.x, c.y, 8, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#fef08a';
          ctx.beginPath();
          ctx.arc(c.x - 2, c.y - 2, 3, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = '#ca8a04';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      // Regular Enemies
      ctx.fillStyle = '#10b981';
      for (const en of gs.enemiesList) {
        // Cute bouncing slime
        ctx.fillRect(en.x, en.y, en.w, en.h);
        // Eyes
        ctx.fillStyle = '#fff';
        ctx.fillRect(en.x + 4, en.y + 6, 6, 6);
        ctx.fillRect(en.x + en.w - 10, en.y + 6, 6, 6);
        ctx.fillStyle = '#000';
        ctx.fillRect(en.x + 6, en.y + 8, 3, 3);
        ctx.fillRect(en.x + en.w - 8, en.y + 8, 3, 3);
        ctx.fillStyle = '#10b981';
      }

      // Boss
      if (gs.boss && gs.boss.hp > 0) {
        ctx.fillStyle = s.themeColor;
        ctx.fillRect(gs.boss.x, gs.boss.y, gs.boss.w, gs.boss.h);

        // Boss inner glow
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.strokeRect(gs.boss.x + 2, gs.boss.y + 2, gs.boss.w - 4, gs.boss.h - 4);

        // Eyes
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(gs.boss.x + 12, gs.boss.y + 18, 12, 12);
        ctx.fillRect(gs.boss.x + gs.boss.w - 24, gs.boss.y + 18, 12, 12);
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(gs.boss.x + 15, gs.boss.y + 21, 6, 6);
        ctx.fillRect(gs.boss.x + gs.boss.w - 21, gs.boss.y + 21, 6, 6);

        // Boss Health Bar Header
        const barWidth = 140;
        const barX = gs.boss.x - (barWidth - gs.boss.w) / 2;
        const barY = gs.boss.y - 22;

        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(barX, barY, barWidth, 10);
        const hpPct = Math.max(0, gs.boss.hp / gs.boss.maxHp);
        ctx.fillStyle = s.themeColor;
        ctx.fillRect(barX, barY, barWidth * hpPct, 10);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.strokeRect(barX, barY, barWidth, 10);

        // Boss Name label
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(gs.boss.name, gs.boss.x + gs.boss.w / 2, barY - 4);
      }

      // Player: Domititan (Gato morado con cabeza de TV y collar de luna)
      if (gs.player.invulnerableTimer % 6 < 3) {
        // Cat Body
        ctx.fillStyle = '#9333ea';
        ctx.fillRect(gs.player.x + 6, gs.player.y + 22, gs.player.w - 12, gs.player.h - 22);

        // Crescent moon necklace
        ctx.fillStyle = '#facc15';
        ctx.beginPath();
        ctx.arc(gs.player.x + gs.player.w / 2, gs.player.y + 28, 5, 0, Math.PI * 2);
        ctx.fill();

        // TV Head frame
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(gs.player.x, gs.player.y, gs.player.w, 22);
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(gs.player.x, gs.player.y, gs.player.w, 22);

        // TV Screen
        ctx.fillStyle = '#e9d5ff';
        ctx.fillRect(gs.player.x + 4, gs.player.y + 3, gs.player.w - 8, 16);

        // Cat Ears behind TV
        ctx.fillStyle = '#7e22ce';
        ctx.beginPath();
        ctx.moveTo(gs.player.x + 4, gs.player.y);
        ctx.lineTo(gs.player.x + 8, gs.player.y - 8);
        ctx.lineTo(gs.player.x + 13, gs.player.y);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(gs.player.x + gs.player.w - 13, gs.player.y);
        ctx.lineTo(gs.player.x + gs.player.w - 8, gs.player.y - 8);
        ctx.lineTo(gs.player.x + gs.player.w - 4, gs.player.y);
        ctx.fill();

        // Screen face eyes
        ctx.fillStyle = '#581c87';
        if (gs.player.facing > 0) {
          ctx.fillRect(gs.player.x + 10, gs.player.y + 8, 4, 5);
          ctx.fillRect(gs.player.x + gs.player.w - 10, gs.player.y + 8, 4, 5);
        } else {
          ctx.fillRect(gs.player.x + 6, gs.player.y + 8, 4, 5);
          ctx.fillRect(gs.player.x + gs.player.w - 14, gs.player.y + 8, 4, 5);
        }
      }

      // Player Bullets (Star blast)
      ctx.fillStyle = '#c084fc';
      for (const b of gs.bullets) {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.stroke();
      }

      // Enemy Bullets
      ctx.fillStyle = '#ef4444';
      for (const eb of gs.enemyBullets) {
        ctx.beginPath();
        ctx.arc(eb.x, eb.y, eb.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Particles
      for (const p of gs.particlesList) {
        const alpha = 1 - p.life / p.maxLife;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fillRect(p.x, p.y, 3, 3);
        ctx.globalAlpha = 1;
      }
    };

    const loop = () => {
      update();
      draw();
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    // Keyboard Listeners
    const onKeyDown = (e: KeyboardEvent) => {
      const gs = gameStateRef.current;
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') gs.keys.left = true;
      if (e.code === 'KeyD' || e.code === 'ArrowRight') gs.keys.right = true;
      if (e.code === 'Space' || e.code === 'KeyW' || e.code === 'ArrowUp') {
        gs.keys.jump = true;
        if (gs.player.grounded) {
          gs.player.vy = -12.5;
          gs.player.grounded = false;
          sound.playJump();
        }
      }
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight' || e.code === 'KeyJ') {
        gs.keys.shoot = true;
        handleShootStar();
      }
      if (e.code === 'KeyP' || e.code === 'Escape') {
        gs.isPaused = !gs.isPaused;
        setIsPaused(gs.isPaused);
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      const gs = gameStateRef.current;
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') gs.keys.left = false;
      if (e.code === 'KeyD' || e.code === 'ArrowRight') gs.keys.right = false;
      if (e.code === 'Space' || e.code === 'KeyW' || e.code === 'ArrowUp') gs.keys.jump = false;
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight' || e.code === 'KeyJ') gs.keys.shoot = false;
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  const handleShootStar = () => {
    const gs = gameStateRef.current;
    if (gs.player.shootCooldown <= 0 && !gs.isPaused && !gs.gameOver) {
      sound.playShoot();
      gs.bullets.push({
        x: gs.player.x + (gs.player.facing > 0 ? gs.player.w : 0),
        y: gs.player.y + 14,
        vx: gs.player.facing * 9.5,
        r: 6,
      });
      gs.player.shootCooldown = 16;
    }
  };

  const handleMobileJump = () => {
    const gs = gameStateRef.current;
    if (gs.player.grounded && !gs.isPaused && !gs.gameOver) {
      gs.player.vy = -12.5;
      gs.player.grounded = false;
      sound.playJump();
    }
  };

  const handleRestartStage = () => {
    const gs = gameStateRef.current;
    gs.lives = 3;
    setLives(3);
    setupStage(currentStageIdx);
  };

  const handleSelectStage = (idx: number) => {
    setupStage(idx);
  };

  const handleNextStage = () => {
    setStageClearedModal(null);
    if (currentStageIdx < 9) {
      setupStage(currentStageIdx + 1);
    }
  };

  const currentStage = STAGES_DATA[currentStageIdx];

  return (
    <div className="min-h-screen bg-[#07030e] text-slate-100 flex flex-col justify-between">
      {/* Top Bar for Game */}
      <div className="bg-[#0e071c] border-b border-[#2d1854] px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('index')}
            className="flex items-center gap-1.5 text-xs font-bold text-[#c084fc] hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al Menú
          </button>
          <span className="hidden sm:inline text-xs text-slate-500">|</span>
          <div className="hidden sm:block">
            <span className="text-xs font-bold text-white uppercase">{currentStage.name}</span>
            <span className="text-[11px] text-slate-400 ml-2">Jefe: {currentStage.bossName}</span>
          </div>
        </div>

        {/* Stats strip */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1 text-rose-400">
            <span>VIDAS:</span>
            <span>{'❤️'.repeat(Math.max(0, lives))}</span>
          </div>
          <div className="text-amber-300">
            <span>⭐ {coins}</span>
          </div>
          <div className="text-purple-300">
            <span>PTS: {score}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              gameStateRef.current.isPaused = !gameStateRef.current.isPaused;
              setIsPaused(gameStateRef.current.isPaused);
            }}
            className="p-1.5 rounded-lg bg-[#1f103b] border border-[#3b1d70] hover:bg-[#32175e] text-slate-300 transition-colors cursor-pointer"
            title="Pausar juego"
          >
            {isPaused ? <Play className="w-4 h-4 text-emerald-400" /> : <Pause className="w-4 h-4" />}
          </button>
          <button
            onClick={handleRestartStage}
            className="p-1.5 rounded-lg bg-[#1f103b] border border-[#3b1d70] hover:bg-[#32175e] text-slate-300 transition-colors cursor-pointer"
            title="Reiniciar etapa"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stage Selector Bar */}
      <div className="bg-[#0b0517] border-b border-[#21113d] px-4 py-2 overflow-x-auto flex items-center gap-2 text-xs">
        <span className="text-slate-400 font-semibold uppercase text-[11px] shrink-0 mr-1">Etapas:</span>
        {STAGES_DATA.map((s, idx) => {
          const isCurrent = idx === currentStageIdx;
          const isUnlocked = idx === 0 || progress.stagesCompleted[idx - 1] || storage.isFreeMode();
          return (
            <button
              key={s.id}
              disabled={!isUnlocked}
              onClick={() => handleSelectStage(idx)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                isCurrent
                  ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.5)]'
                  : isUnlocked
                  ? 'bg-[#1b0d36] text-purple-200 hover:bg-[#2b1454]'
                  : 'bg-[#120822] text-slate-600 cursor-not-allowed opacity-50'
              }`}
            >
              {s.id}. {s.name}
            </button>
          );
        })}
      </div>

      {/* Game Viewport Container */}
      <div className="flex-1 relative flex items-center justify-center p-2 sm:p-4 overflow-hidden">
        <div className="relative max-w-4xl w-full aspect-[16/9] rounded-2xl overflow-hidden border-2 border-[#3b1d70] shadow-[0_0_50px_rgba(147,51,234,0.3)] bg-black">
          <canvas
            ref={canvasRef}
            width={960}
            height={540}
            className="w-full h-full block"
          />

          {/* Pause Overlay */}
          {isPaused && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
              <h2 className="text-3xl font-black text-purple-300 mb-2">JUEGO EN PAUSA</h2>
              <p className="text-sm text-slate-300 mb-6">Presiona Continuar o la tecla P / ESC para volver a la acción.</p>
              <button
                onClick={() => {
                  gameStateRef.current.isPaused = false;
                  setIsPaused(false);
                }}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-white text-sm cursor-pointer shadow-lg"
              >
                Continuar Partida
              </button>
            </div>
          )}

          {/* Game Over Overlay */}
          {gameOver && (
            <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
              <div className="w-16 h-16 rounded-2xl bg-red-950/80 border border-red-500 flex items-center justify-center text-red-400 mb-3 animate-bounce">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-red-500 mb-2">
                ¡HAS SIDO MUTEADO!
              </h2>
              <p className="text-sm text-slate-300 mb-6 max-w-sm">
                Te quedaste sin vidas en <strong>{currentStage.name}</strong>. ¡No te rindas, bro!
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleRestartStage}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 font-bold text-white text-sm cursor-pointer shadow-lg"
                >
                  Reintentar Etapa 🔄
                </button>
                <button
                  onClick={() => onNavigate('index')}
                  className="px-5 py-2.5 rounded-xl bg-[#231245] hover:bg-[#341b63] font-bold text-slate-300 text-sm cursor-pointer"
                >
                  Ir al Menú
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stage Cleared Modal */}
      {stageClearedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#170a2c] border-2 border-purple-500 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center shadow-[0_0_50px_rgba(168,85,247,0.5)]">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-600/30 border border-purple-400 flex items-center justify-center text-purple-300 mb-4 animate-bounce">
              <Award className="w-8 h-8 text-amber-300" />
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-purple-400">
              ¡ETAPA {currentStage.id} COMPLETADA!
            </span>
            <h2 className="text-2xl font-black text-white mt-1 mb-2">
              {currentStage.name}
            </h2>
            <p className="text-xs text-slate-300 mb-5">
              Has derrotado a <strong>{currentStage.bossName}</strong> con éxito.
            </p>

            <div className="p-4 rounded-2xl bg-[#0e051c] border border-purple-700/60 mb-6 text-sm text-emerald-300 font-bold flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{stageClearedModal}</span>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={handleNextStage}
                className="w-full py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg cursor-pointer"
              >
                Siguiente Etapa ({currentStage.id + 1}/10) →
              </button>
              <button
                onClick={() => {
                  setStageClearedModal(null);
                  onNavigate(currentStage.rewardKey);
                }}
                className="w-full py-2.5 rounded-xl font-bold text-xs text-purple-200 bg-[#251247] hover:bg-[#381a69] cursor-pointer"
              >
                Ver Contenido Desbloqueado
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grand Final Victory Modal (Stage 10 completed) */}
      {grandVictory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="bg-gradient-to-b from-[#240e45] to-[#110524] border-2 border-[#c084fc] rounded-3xl p-6 sm:p-10 max-w-xl w-full text-center shadow-[0_0_60px_rgba(192,132,252,0.6)]">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-purple-600/40 border-2 border-yellow-300 flex items-center justify-center text-yellow-300 mb-4 animate-bounce">
              <Sparkles className="w-10 h-10" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-200 to-purple-300 mb-3">
              ¡VICTORIA TOTAL 2026! 💜
            </h2>

            <p className="text-sm sm:text-base text-purple-200 font-medium leading-relaxed mb-6">
              Has superado los 10 mundos, vencido a los 10 jefes y completado la gran aventura conmemorativa de nuestra amistad.
            </p>

            <blockquote className="p-4 rounded-2xl bg-black/50 border border-purple-500/40 text-xs sm:text-sm italic text-amber-200 mb-6 leading-relaxed">
              «2026 está llegando a su final, pero nuestra historia no. Gracias por cada risa, cada broma, cada muteada y cada momento que compartimos. No sé qué nos espera en 2027, pero espero que sigamos siendo los mismos bros de siempre. Los quiero muchísimo.<br/>— Domititan 💤🌙📺»
            </blockquote>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  setGrandVictory(false);
                  onOpenZipModal();
                }}
                className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 cursor-pointer shadow-lg"
              >
                Descargar Proyecto ZIP (.zip) 📦
              </button>
              <button
                onClick={() => {
                  setGrandVictory(false);
                  onNavigate('index');
                }}
                className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-200 bg-[#251247] hover:bg-[#381a69] cursor-pointer"
              >
                Volver al Menú Principal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* On-Screen Mobile Touch Controls */}
      <div className="lg:hidden bg-[#0c0517] border-t border-[#231245] p-3 flex items-center justify-between select-none">
        {/* D-Pad Left / Right */}
        <div className="flex gap-3">
          <button
            onTouchStart={() => { gameStateRef.current.keys.left = true; }}
            onTouchEnd={() => { gameStateRef.current.keys.left = false; }}
            onMouseDown={() => { gameStateRef.current.keys.left = true; }}
            onMouseUp={() => { gameStateRef.current.keys.left = false; }}
            className="w-14 h-14 rounded-2xl bg-[#231045] active:bg-[#431f82] border-2 border-purple-500 text-white font-black text-xl flex items-center justify-center cursor-pointer shadow-lg"
          >
            ◀
          </button>
          <button
            onTouchStart={() => { gameStateRef.current.keys.right = true; }}
            onTouchEnd={() => { gameStateRef.current.keys.right = false; }}
            onMouseDown={() => { gameStateRef.current.keys.right = true; }}
            onMouseUp={() => { gameStateRef.current.keys.right = false; }}
            className="w-14 h-14 rounded-2xl bg-[#231045] active:bg-[#431f82] border-2 border-purple-500 text-white font-black text-xl flex items-center justify-center cursor-pointer shadow-lg"
          >
            ▶
          </button>
        </div>

        {/* Action Buttons Shoot / Jump */}
        <div className="flex gap-3">
          <button
            onTouchStart={handleShootStar}
            onMouseDown={handleShootStar}
            className="w-14 h-14 rounded-2xl bg-[#3b1263] active:bg-[#6820ad] border-2 border-pink-400 text-white font-black text-sm flex flex-col items-center justify-center cursor-pointer shadow-lg"
          >
            <span>⚡</span>
            <span className="text-[9px] uppercase">Disparo</span>
          </button>
          <button
            onTouchStart={handleMobileJump}
            onMouseDown={handleMobileJump}
            className="w-14 h-14 rounded-2xl bg-[#4c1d95] active:bg-[#7c3aed] border-2 border-purple-300 text-white font-black text-sm flex flex-col items-center justify-center cursor-pointer shadow-lg"
          >
            <span>▲</span>
            <span className="text-[9px] uppercase">Salto</span>
          </button>
        </div>
      </div>

      {/* Desktop Keyboard Instructions Footer */}
      <div className="hidden lg:flex bg-[#090414] border-t border-[#1d0e38] px-6 py-2.5 items-center justify-between text-[11px] text-slate-400 font-mono">
        <div>
          <span>MOVIMIENTO: <strong>A / D</strong> o <strong>FLECHAS</strong></span>
          <span className="mx-3">·</span>
          <span>SALTAR: <strong>ESPACIO</strong> o <strong>W</strong></span>
          <span className="mx-3">·</span>
          <span>HABILIDAD ESPECIAL: <strong>SHIFT</strong> o <strong>J</strong></span>
          <span className="mx-3">·</span>
          <span>PAUSA: <strong>ESC</strong> o <strong>P</strong></span>
        </div>
        <div className="text-purple-300">
          Domititan: Gato Morado con Cabeza de TV 📺
        </div>
      </div>
    </div>
  );
};

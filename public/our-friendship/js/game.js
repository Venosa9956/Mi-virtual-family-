
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const STAGES = [
  { id: 1, name: 'Bosque de la Amistad', boss: 'Sprout Guardian', unlock: 'sunny', color: '#10b981', sky: '#064e3b' },
  { id: 2, name: 'Reino de las Bromas', boss: 'El Bromista Espectral', unlock: 'mini', color: '#8b5cf6', sky: '#4c1d95' },
  { id: 3, name: 'Montañas del Discord', boss: 'Glitch Server Bot', unlock: 'efra', color: '#3b82f6', sky: '#1e3a8a' },
  { id: 4, name: 'Castillo del Silencio', boss: 'El Mute Supremo', unlock: 'bendy', color: '#ea580c', sky: '#7c2d12' },
  { id: 5, name: 'Valle de las Risas', boss: 'Gigante de la Risa', unlock: 'recuerdos', color: '#f59e0b', sky: '#78350f' },
  { id: 6, name: 'Ciudad de los Recuerdos', boss: 'Memory Phantom', unlock: 'galeria', color: '#ec4899', sky: '#831843' },
  { id: 7, name: 'Caverna de las Aventuras', boss: 'Dragón de Cristal', unlock: 'domititan_secreto', color: '#06b6d4', sky: '#164e63' },
  { id: 8, name: 'Reino de las Estrellas', boss: 'Titán Estelar', unlock: 'estrellas', color: '#6366f1', sky: '#312e81' },
  { id: 9, name: 'Fortaleza del Caos', boss: 'Chaos Overlord', unlock: 'momentos', color: '#ef4444', sky: '#7f1d1d' },
  { id: 10, name: 'El Último Capítulo', boss: 'The 2026 Arbiter', unlock: 'homenaje_final', color: '#a855f7', sky: '#2e1065' }
];

let stageIdx = 0;
let lives = 3;
let score = 0;
let coinsCollected = 0;
let gameOver = false;
let gameWon = false;

const player = {
  x: 80, y: 350, vx: 0, vy: 0, w: 38, h: 52, grounded: false, shootCooldown: 0, facing: 1
};
const keys = { left: false, right: false, jump: false, shoot: false };
let bullets = [];
let enemyBullets = [];
let platforms = [];
let coins = [];
let enemies = [];
let boss = null;

function setupStage(idx) {
  stageIdx = idx;
  const s = STAGES[stageIdx];
  player.x = 80; player.y = 350; player.vx = 0; player.vy = 0;
  bullets = []; enemyBullets = [];

  platforms = [
    { x: 0, y: 460, w: 960, h: 80 },
    { x: 180, y: 360, w: 140, h: 20 },
    { x: 380, y: 280, w: 160, h: 20 },
    { x: 600, y: 350, w: 150, h: 20 },
    { x: 790, y: 240, w: 130, h: 20 }
  ];

  coins = [
    { x: 240, y: 320, collected: false },
    { x: 450, y: 240, collected: false },
    { x: 670, y: 310, collected: false },
    { x: 840, y: 200, collected: false }
  ];

  enemies = [
    { x: 220, y: 330, w: 30, h: 30, vx: 1.2, minX: 180, maxX: 300, hp: 1 },
    { x: 620, y: 320, w: 30, h: 30, vx: -1.2, minX: 600, maxX: 730, hp: 1 }
  ];

  boss = {
    name: s.boss, x: 750, y: 320, w: 64, h: 70, hp: 8 + stageIdx * 3, maxHp: 8 + stageIdx * 3, vx: 1.8, timer: 0
  };

  updateUI();
}

function updateUI() {
  const el = document.getElementById('game-stats');
  if (el) {
    const s = STAGES[stageIdx];
    el.innerText = 'ETAPA ' + s.id + ': ' + s.name + ' | VIDAS: ' + '❤️'.repeat(Math.max(0, lives)) + ' | PUNTOS: ' + score;
  }
}

window.addEventListener('keydown', e => {
  if (e.code === 'KeyA' || e.code === 'ArrowLeft') keys.left = true;
  if (e.code === 'KeyD' || e.code === 'ArrowRight') keys.right = true;
  if (e.code === 'Space' || e.code === 'KeyW' || e.code === 'ArrowUp') {
    keys.jump = true;
    if (player.grounded) {
      player.vy = -12;
      player.grounded = false;
      if (window.audioSFX) window.audioSFX.playCoin();
    }
  }
  if (e.code === 'ShiftLeft' || e.code === 'KeyJ') {
    keys.shoot = true;
    shootStar();
  }
});

window.addEventListener('keyup', e => {
  if (e.code === 'KeyA' || e.code === 'ArrowLeft') keys.left = false;
  if (e.code === 'KeyD' || e.code === 'ArrowRight') keys.right = false;
  if (e.code === 'Space' || e.code === 'KeyW' || e.code === 'ArrowUp') keys.jump = false;
  if (e.code === 'ShiftLeft' || e.code === 'KeyJ') keys.shoot = false;
});

const btnL = document.getElementById('btn-left');
const btnR = document.getElementById('btn-right');
const btnJ = document.getElementById('btn-jump');
const btnS = document.getElementById('btn-shoot');

if (btnL) { btnL.ontouchstart = () => keys.left = true; btnL.ontouchend = () => keys.left = false; }
if (btnR) { btnR.ontouchstart = () => keys.right = true; btnR.ontouchend = () => keys.right = false; }
if (btnJ) {
  btnJ.ontouchstart = () => {
    if (player.grounded) {
      player.vy = -12;
      player.grounded = false;
      if (window.audioSFX) window.audioSFX.playCoin();
    }
  };
}
if (btnS) { btnS.ontouchstart = () => shootStar(); }

function shootStar() {
  if (player.shootCooldown <= 0) {
    bullets.push({
      x: player.x + (player.facing > 0 ? player.w : 0),
      y: player.y + player.h / 2,
      vx: player.facing * 9,
      r: 6
    });
    player.shootCooldown = 18;
  }
}

function update() {
  if (gameOver || gameWon) return;

  if (keys.left) { player.vx = -4.5; player.facing = -1; }
  else if (keys.right) { player.vx = 4.5; player.facing = 1; }
  else player.vx *= 0.75;

  player.vy += 0.55;
  player.x += player.vx;
  player.y += player.vy;

  if (player.shootCooldown > 0) player.shootCooldown--;

  player.grounded = false;
  for (const p of platforms) {
    if (player.x + player.w > p.x && player.x < p.x + p.w &&
        player.y + player.h >= p.y && player.y + player.h <= p.y + 16 &&
        player.vy >= 0) {
      player.y = p.y - player.h;
      player.vy = 0;
      player.grounded = true;
    }
  }

  if (player.x < 0) player.x = 0;
  if (player.x + player.w > canvas.width) player.x = canvas.width - player.w;
  if (player.y > canvas.height) {
    lives--;
    updateUI();
    if (lives <= 0) gameOver = true;
    else { player.x = 80; player.y = 350; player.vy = 0; }
  }

  for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i];
    b.x += b.vx;
    if (b.x < 0 || b.x > canvas.width) {
      bullets.splice(i, 1);
      continue;
    }
    for (let eIdx = enemies.length - 1; eIdx >= 0; eIdx--) {
      const en = enemies[eIdx];
      if (b.x > en.x && b.x < en.x + en.w && b.y > en.y && b.y < en.y + en.h) {
        bullets.splice(i, 1);
        enemies.splice(eIdx, 1);
        score += 150;
        updateUI();
        break;
      }
    }
    if (boss && b.x > boss.x && b.x < boss.x + boss.w && b.y > boss.y && b.y < boss.y + boss.h) {
      bullets.splice(i, 1);
      boss.hp--;
      score += 50;
      if (boss.hp <= 0) {
        score += 1000;
        if (stageIdx < STAGES.length - 1) setupStage(stageIdx + 1);
        else gameWon = true;
      }
      updateUI();
    }
  }

  if (boss && boss.hp > 0) {
    boss.x += boss.vx;
    if (boss.x < 550 || boss.x > 880) boss.vx *= -1;
    boss.timer++;
    if (boss.timer % 65 === 0) {
      enemyBullets.push({
        x: boss.x, y: boss.y + boss.h / 2, vx: -5, vy: (Math.random() - 0.5) * 2, r: 7
      });
    }
  }

  for (let i = enemyBullets.length - 1; i >= 0; i--) {
    const eb = enemyBullets[i];
    eb.x += eb.vx;
    eb.y += eb.vy;
    if (eb.x < 0) { enemyBullets.splice(i, 1); continue; }
    if (eb.x > player.x && eb.x < player.x + player.w &&
        eb.y > player.y && eb.y < player.y + player.h) {
      enemyBullets.splice(i, 1);
      lives--;
      updateUI();
      if (lives <= 0) gameOver = true;
    }
  }

  for (const c of coins) {
    if (!c.collected && Math.hypot(player.x + player.w/2 - c.x, player.y + player.h/2 - c.y) < 28) {
      c.collected = true;
      score += 100;
      coinsCollected++;
      if (window.audioSFX) window.audioSFX.playCoin();
      updateUI();
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const s = STAGES[stageIdx];

  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, s.sky);
  grad.addColorStop(1, '#090514');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#ffffff';
  for (let i = 0; i < 40; i++) {
    const sx = (i * 97) % canvas.width;
    const sy = (i * 61) % (canvas.height - 100);
    ctx.fillRect(sx, sy, 2, 2);
  }

  for (const p of platforms) {
    ctx.fillStyle = '#1e1338';
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.strokeStyle = s.color;
    ctx.lineWidth = 2;
    ctx.strokeRect(p.x, p.y, p.w, p.h);
  }

  for (const c of coins) {
    if (!c.collected) {
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(c.x, c.y, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.stroke();
    }
  }

  // Domititan (Gato morado con TV)
  ctx.fillStyle = '#9333ea';
  ctx.fillRect(player.x + 6, player.y + 20, player.w - 12, player.h - 20);
  ctx.fillStyle = '#facc15';
  ctx.beginPath();
  ctx.arc(player.x + player.w / 2, player.y + 25, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#1f2937';
  ctx.fillRect(player.x, player.y, player.w, 22);
  ctx.fillStyle = '#e9d5ff';
  ctx.fillRect(player.x + 4, player.y + 3, player.w - 8, 16);
  ctx.fillStyle = '#581c87';
  ctx.fillRect(player.x + 8, player.y + 8, 4, 4);
  ctx.fillRect(player.x + player.w - 12, player.y + 8, 4, 4);

  ctx.fillStyle = '#c084fc';
  for (const b of bullets) {
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = '#ef4444';
  for (const eb of enemyBullets) {
    ctx.beginPath();
    ctx.arc(eb.x, eb.y, eb.r, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = '#10b981';
  for (const en of enemies) {
    ctx.fillRect(en.x, en.y, en.w, en.h);
  }

  if (boss && boss.hp > 0) {
    ctx.fillStyle = s.color;
    ctx.fillRect(boss.x, boss.y, boss.w, boss.h);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(boss.x + 12, boss.y + 16, 10, 10);
    ctx.fillRect(boss.x + boss.w - 22, boss.y + 16, 10, 10);

    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(boss.x - 10, boss.y - 18, boss.w + 20, 8);
    const hpPct = Math.max(0, boss.hp / boss.maxHp);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(boss.x - 10, boss.y - 18, (boss.w + 20) * hpPct, 8);
  }

  if (gameOver) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 36px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('¡HAS SIDO MUTEADO! (GAME OVER)', canvas.width / 2, canvas.height / 2 - 20);
    ctx.fillStyle = '#fff';
    ctx.font = '18px sans-serif';
    ctx.fillText('Haz clic o presiona Espacio para reintentar', canvas.width / 2, canvas.height / 2 + 25);
  }

  if (gameWon) {
    ctx.fillStyle = 'rgba(10, 6, 20, 0.9)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#c084fc';
    ctx.font = 'bold 38px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('¡VICTORIA TOTAL! 2026 COMPLETADO 💜', canvas.width / 2, canvas.height / 2 - 40);
    ctx.fillStyle = '#f3e8ff';
    ctx.font = '18px sans-serif';
    ctx.fillText('Has derrotado a los 10 jefes y desbloqueado todas las páginas.', canvas.width / 2, canvas.height / 2 + 10);
    ctx.fillText('«2026 está llegando a su final, pero nuestra historia continuará en 2027...»', canvas.width / 2, canvas.height / 2 + 45);
  }
}

canvas.addEventListener('click', () => {
  if (gameOver) { lives = 3; score = 0; gameOver = false; setupStage(stageIdx); }
  else if (gameWon) { lives = 3; gameWon = false; setupStage(0); }
});

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

setupStage(0);
requestAnimationFrame(loop);

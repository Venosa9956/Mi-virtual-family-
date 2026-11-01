import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

const baseDir = path.resolve('public/our-friendship');

fs.mkdirSync(path.join(baseDir, 'css'), { recursive: true });
fs.mkdirSync(path.join(baseDir, 'js'), { recursive: true });
fs.mkdirSync(path.join(baseDir, 'assets/characters'), { recursive: true });

// Copy character assets if not already there
const charSource = path.resolve('public/assets/characters');
if (fs.existsSync(charSource)) {
  const chars = fs.readdirSync(charSource);
  for (const c of chars) {
    fs.copyFileSync(path.join(charSource, c), path.join(baseDir, 'assets/characters', c));
  }
}

// 1. README.md
const readme = `# OUR FRIENDSHIP — THE 2026 ADVENTURE 💜

Proyecto conmemorativo de nuestra amistad durante el año 2026.
Incluye videojuego de plataformas de 10 etapas con 10 jefes, páginas web individuales para cada amigo, sistema de desbloqueo mediante LocalStorage y galería de recuerdos.

---

## 👥 NUESTRA FAMILIA VIRTUAL
- **Domititan 💤🌙📺**: Gato morado con cabeza de televisor, creador de la aventura y víctima favorita del mute.
- **Bendy 👑🔇**: El mayor de la familia virtual, dueño del server de Discord y "El Rey del Mute".
- **Sunny ☀️🐱**: "The Sun Cat", arte genial, energía positiva y risas interminables.
- **Mini ✨💜**: Integrante dulce, entrañable y divertida con momentos únicos en el grupo.
- **Efra 🐺🔥**: El leal guerrero lobo de fuego, bromas épicas y desvelos inolvidables.

---

## 🎮 EL VIDEOJUEGO (OUR FRIENDSHIP ADVENTURE)
Un juego de plataformas 2D lateral inspirado en los clásicos pero 100% original, sin recursos de Mario Bros.

### 🌟 10 Mundos y 10 Jefes
1. **Bosque de la Amistad** — Jefe: *Sprout Guardian* (Desbloquea la página de Sunny).
2. **Reino de las Bromas** — Jefe: *El Bromista Espectral* (Desbloquea la página de Mini).
3. **Montañas del Discord** — Jefe: *Glitch Server Bot* (Desbloquea la página de Efra).
4. **Castillo del Silencio** — Jefe: *El Mute Supremo* (Desbloquea la página de Bendy).
5. **Valle de las Risas** — Jefe: *Gigante de la Risa* (Desbloquea Colección de Recuerdos).
6. **Ciudad de los Recuerdos** — Jefe: *Memory Phantom* (Desbloquea Galería Secreta).
7. **Caverna de las Aventuras** — Jefe: *Dragón de Cristal* (Desbloquea Bóveda de Domititan).
8. **Reino de las Estrellas** — Jefe: *Titán Estelar* (Desbloquea Mensajes Cósmicos).
9. **Fortaleza del Caos** — Jefe: *Chaos Overlord* (Desbloquea Recopilación Épica).
10. **El Último Capítulo** — Jefe Final: *Arbiter 2026* (Desbloquea el Gran Homenaje Final 2026 -> 2027).

### 🕹️ Controles
- **PC**:
  - \`A / D\` o Flechas: Moverse
  - \`Espacio\` o \`W\`: Saltar
  - \`Shift\` o \`J\`: Habilidad Especial (Disparo de Estrella Cósmica)
  - \`ESC\` o \`P\`: Pausa
- **Móvil / Pantalla Táctil**:
  - D-pad virtual táctil (Izquierda / Derecha)
  - Botón de Salto
  - Botón de Habilidad Especial
  - Botón de Pausa

---

## 🚀 CÓMO SUBIR A GITHUB PAGES (GRATIS)
1. Crea un nuevo repositorio en GitHub (ej. \`our-friendship-2026\`).
2. Sube todos los archivos descomprimidos a la rama principal (\`main\`).
3. Ve a **Settings** -> **Pages**.
4. En **Build and deployment**, selecciona la rama \`main\` y la carpeta \`/ (root)\`.
5. ¡Listo! En 1 minuto tendrás tu enlace público para compartirlo con toda la familia virtual.

---

## 💜 MENSAJE FINAL
«2026 está llegando a su final, pero nuestra historia no.
Gracias por cada risa, cada broma, cada muteada y cada momento que compartimos.
No sé qué nos espera en 2027, pero espero que sigamos siendo los mismos bros de siempre.
Los quiero muchísimo.
— Domititan 💤🌙📺
FIN DEL AÑO 2026. CONTINUARÁ EN 2027... 💜»
`;
fs.writeFileSync(path.join(baseDir, 'README.md'), readme, 'utf-8');

// 2. CSS
const css = `/* OUR FRIENDSHIP 2026 - STANDALONE THEME */
:root {
  --bg-dark: #0a0614;
  --bg-card: #150d2a;
  --bg-card-hover: #1e133c;
  --purple-glow: #9333ea;
  --violet-bright: #c084fc;
  --text-main: #f3f0ff;
  --text-muted: #a79fc2;
  --border-subtle: #2d1f52;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background-color: var(--bg-dark);
  color: var(--text-main);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  min-height: 100vh;
  line-height: 1.6;
  overflow-x: hidden;
  background-image: 
    radial-gradient(ellipse at 20% 20%, rgba(147, 51, 234, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 80%, rgba(192, 132, 252, 0.1) 0%, transparent 50%);
}

.container { max-width: 1200px; margin: 0 auto; padding: 24px 20px; }

header {
  border-bottom: 1px solid var(--border-subtle);
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(10, 6, 20, 0.85);
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.brand-link {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--violet-bright);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
}

nav { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; }
nav a {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.2s;
}
nav a:hover, nav a.active { color: #fff; }

.cta-btn {
  background: linear-gradient(135deg, #9333ea, #7c3aed);
  color: white;
  padding: 8px 18px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(147, 51, 234, 0.3);
  transition: transform 0.15s, box-shadow 0.15s;
}
.cta-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(147, 51, 234, 0.5); }

.hero { text-align: center; padding: 60px 20px 40px; }
.hero h1 {
  font-size: clamp(2.2rem, 5vw, 3.8rem);
  font-weight: 900;
  background: linear-gradient(135deg, #ffffff 30%, #c084fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 16px;
}
.hero p { font-size: clamp(1.1rem, 2.5vw, 1.4rem); color: #d8b4fe; max-width: 750px; margin: 0 auto 30px; }

.friends-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin: 40px 0;
}

.friend-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, border-color 0.2s;
  text-decoration: none;
  color: inherit;
}
.friend-card:hover { transform: translateY(-6px); border-color: var(--purple-glow); }

.card-img-wrap {
  position: relative;
  height: 280px;
  overflow: hidden;
  background: #0d071a;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-img-wrap img { width: 100%; height: 100%; object-fit: contain; transition: transform 0.3s; }
.friend-card:hover .card-img-wrap img { transform: scale(1.05); }

.card-body { padding: 20px; display: flex; flex-direction: column; flex: 1; }
.card-name { font-size: 1.3rem; font-weight: 700; margin-bottom: 4px; }
.card-role { font-size: 0.85rem; color: var(--violet-bright); margin-bottom: 12px; }
.card-quote { font-size: 0.9rem; color: var(--text-muted); font-style: italic; margin-bottom: 16px; flex: 1; }

.mute-box {
  background: rgba(234, 88, 12, 0.15);
  border: 1px solid rgba(234, 88, 12, 0.4);
  padding: 24px;
  border-radius: 16px;
  text-align: center;
  margin: 32px 0;
}
.mic-icon-anim {
  width: 72px;
  height: 72px;
  margin: 0 auto 16px;
  animation: floatMute 3s ease-in-out infinite;
}
@keyframes floatMute {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.tv-screen {
  background: #000;
  border: 8px solid #4c1d95;
  border-radius: 20px;
  padding: 24px;
  position: relative;
  box-shadow: 0 0 30px rgba(147, 51, 234, 0.4);
}
.tv-scanlines {
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%);
  background-size: 100% 4px;
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  pointer-events: none;
  border-radius: 12px;
}

footer {
  border-top: 1px solid var(--border-subtle);
  padding: 40px 20px;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-top: 60px;
}
.footer-quote { max-width: 700px; margin: 0 auto 20px; font-size: 1.1rem; color: #d8b4fe; }
`;
fs.writeFileSync(path.join(baseDir, 'css/style.css'), css, 'utf-8');

// 3. Sound JS
const soundJs = `class WebAudioSFX {
  constructor() { this.ctx = null; }
  init() {
    if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }
  playMute() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [350, 440, 220].forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + i * 0.02);
      gain.gain.setValueAtTime(0.25, now + i * 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.02);
      osc.stop(now + 0.75);
    });
  }
  playCoin() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(987, now);
    osc.frequency.setValueAtTime(1318, now + 0.08);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.26);
  }
}
window.audioSFX = new WebAudioSFX();
`;
fs.writeFileSync(path.join(baseDir, 'js/sound.js'), soundJs, 'utf-8');

// 4. index.html
const indexHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OUR FRIENDSHIP — 2026</title>
  <meta name="description" content="Un año de risas, muteadas, locuras y una amistad que sigue viva. Domititan, Bendy, Sunny, Mini y Efra.">
  <link rel="stylesheet" href="css/style.css">
  <script src="js/sound.js"></script>
</head>
<body>
  <header>
    <div class="header-inner">
      <a href="index.html" class="brand-link">
        <span>OUR FRIENDSHIP 2026 💜</span>
      </a>
      <nav>
        <a href="index.html" class="active">Inicio</a>
        <a href="domititan.html">Domititan</a>
        <a href="bendy.html">Bendy</a>
        <a href="sunny.html">Sunny</a>
        <a href="mini.html">Mini</a>
        <a href="efra.html">Efra</a>
        <a href="juego.html" class="cta-btn">JUGAR NUESTRA AVENTURA 🎮</a>
      </nav>
    </div>
  </header>

  <main class="container">
    <section class="hero">
      <h1>OUR FRIENDSHIP — 2026</h1>
      <p>«Un año de risas, muteadas, locuras y una amistad que sigue viva»</p>
      <div>
        <a href="juego.html" class="cta-btn" style="font-size: 1.1rem; padding: 12px 28px;">
          JUGAR NUESTRA AVENTURA 🎮
        </a>
      </div>
    </section>

    <section>
      <h2 style="font-size: 1.8rem; margin-bottom: 8px;">Nuestra Familia Virtual</h2>
      <p style="color: var(--text-muted); margin-bottom: 24px;">Visita la página independiente de cada uno o supera los niveles del videojuego para descubrir sus secretos.</p>

      <div class="friends-grid">
        <a href="domititan.html" class="friend-card">
          <div class="card-img-wrap">
            <img src="assets/characters/domititan.png" alt="Domititan">
          </div>
          <div class="card-body">
            <div class="card-name">Domititan 💤🌙📺</div>
            <div class="card-role">Creador & Aventurero Cósmico</div>
            <div class="card-quote">«Me muteaban y yo me cagaba de risa. Creo que nunca entendieron que era parte de la diversión JAJAJA».</div>
            <div style="font-weight: 600; color: var(--violet-bright);">Ver Mi Página →</div>
          </div>
        </a>

        <a href="bendy.html" class="friend-card">
          <div class="card-img-wrap">
            <img src="assets/characters/bendy.png" alt="Bendy">
          </div>
          <div class="card-body">
            <div class="card-name">Bendy 👑🔇</div>
            <div class="card-role">El Mayor de la Familia & Servidor Discord</div>
            <div class="card-quote">«El Rey del Mute oficial. Bendy muteaba a todos los que hablaban de más».</div>
            <div style="font-weight: 600; color: #fb923c;">Ver Página de Bendy →</div>
          </div>
        </a>

        <a href="sunny.html" class="friend-card">
          <div class="card-img-wrap">
            <img src="assets/characters/sunny.png" alt="Sunny">
          </div>
          <div class="card-body">
            <div class="card-name">Sunny ☀️🐱</div>
            <div class="card-role">The Sun Cat</div>
            <div class="card-quote">«Luz, dibujos increíbles y energía positiva que iluminó cada llamada de 2026».</div>
            <div style="font-weight: 600; color: #fde047;">Ver Página de Sunny →</div>
          </div>
        </a>

        <a href="mini.html" class="friend-card">
          <div class="card-img-wrap">
            <img src="assets/characters/mini.jpg" alt="Mini">
          </div>
          <div class="card-body">
            <div class="card-name">Mini ✨💜</div>
            <div class="card-role">Corazón Dulce de la Familia</div>
            <div class="card-quote">«Momentos espontáneos, risas y la ternura que une a esta familia».</div>
            <div style="font-weight: 600; color: #e9d5ff;">Ver Página de Mini →</div>
          </div>
        </a>

        <a href="efra.html" class="friend-card">
          <div class="card-img-wrap">
            <img src="assets/characters/efra.png" alt="Efra">
          </div>
          <div class="card-body">
            <div class="card-name">Efra 🐺🔥</div>
            <div class="card-role">Lobo de Fuego & Bromista Leal</div>
            <div class="card-quote">«Fuego en el alma y el más leal al desmadre y risas nocturnas».</div>
            <div style="font-weight: 600; color: #f87171;">Ver Página de Efra →</div>
          </div>
        </a>
      </div>
    </section>

    <section style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 16px; padding: 32px; margin: 40px 0;">
      <h2 style="font-size: 1.8rem; margin-bottom: 12px; color: var(--violet-bright);">Recuerdos y Humor de 2026</h2>
      <blockquote style="font-size: 1.3rem; font-style: italic; color: #f3e8ff; border-left: 4px solid var(--purple-glow); padding-left: 16px; margin: 20px 0;">
        «Me muteaban y yo me cagaba de risa. Creo que nunca entendieron que era parte de la diversión JAJAJA».
      </blockquote>
      <p style="color: var(--text-muted); line-height: 1.7;">
        Las llamadas eternas en el servidor de Bendy, las advertencias con el rol silenciado, las risas contagiosas de Sunny, las bromas de Efra, las ocurrencias de Mini y Domititan transmitiendo locuras con su cabeza de televisor. Todo esto hizo de 2026 un año legendario para nosotros.
      </p>
    </section>
  </main>

  <footer>
    <div class="footer-quote">
      «2026 está llegando a su final, pero nuestra historia no.<br>
      Gracias por cada risa, cada broma, cada muteada y cada momento que compartimos.<br>
      No sé qué nos espera en 2027, pero espero que sigamos siendo los mismos bros de siempre.<br>
      Los quiero muchísimo.<br>
      — Domititan 💤🌙📺<br>
      <strong>FIN DEL AÑO 2026. CONTINUARÁ EN 2027... 💜</strong>»
    </div>
  </footer>
</body>
</html>`;
fs.writeFileSync(path.join(baseDir, 'index.html'), indexHtml, 'utf-8');

// 5. bendy.html
const bendyHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bendy — El Rey del Mute | OUR FRIENDSHIP 2026</title>
  <link rel="stylesheet" href="css/style.css">
  <script src="js/sound.js"></script>
</head>
<body>
  <header>
    <div class="header-inner">
      <a href="index.html" class="brand-link"><span>← Volver al Menú</span></a>
      <nav>
        <a href="domititan.html">Domititan</a>
        <a href="bendy.html" class="active">Bendy</a>
        <a href="sunny.html">Sunny</a>
        <a href="mini.html">Mini</a>
        <a href="efra.html">Efra</a>
        <a href="juego.html" class="cta-btn">JUGAR 🎮</a>
      </nav>
    </div>
  </header>

  <main class="container" style="max-width: 900px;">
    <div style="display: flex; gap: 32px; align-items: center; flex-wrap: wrap; margin-top: 30px;">
      <div style="width: 280px; height: 380px; background: #130a21; border-radius: 16px; border: 2px solid #ea580c; display: flex; align-items: center; justify-content: center; overflow: hidden;">
        <img src="assets/characters/bendy.png" alt="Bendy" style="max-height: 100%; object-fit: contain;">
      </div>
      <div style="flex: 1; min-width: 300px;">
        <span style="color: #fb923c; font-weight: 700; text-transform: uppercase; font-size: 0.85rem;">El Mayor de la Familia Virtual</span>
        <h1 style="font-size: 2.8rem; margin: 6px 0;">Bendy</h1>
        <p style="color: #fed7aa; font-size: 1.15rem; margin-bottom: 16px;">Dueño y Fundador del Servidor de Discord</p>
        <p style="color: var(--text-muted); line-height: 1.7;">
          Bendy es el pilar de este grupo. El mayor de nuestra familia virtual, quien nos brindó el espacio donde nos conocimos, hablamos todas las noches y construimos esta hermosa amistad durante 2026.
        </p>
      </div>
    </div>

    <div class="mute-box">
      <div class="mic-icon-anim">
        <svg viewBox="0 0 24 24" fill="none" stroke="#ea580c" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="width: 100%; height: 100%;">
          <line x1="1" y1="1" x2="23" y2="23"></line>
          <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
          <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
          <line x1="12" y1="19" x2="12" y2="23"></line>
          <line x1="8" y1="23" x2="16" y2="23"></line>
        </svg>
      </div>
      <h2 style="font-size: 2rem; color: #fb923c; margin-bottom: 8px;">👑 SECCIÓN ESPECIAL: «EL REY DEL MUTE»</h2>
      <p style="font-size: 1.25rem; font-style: italic; color: #fff; max-width: 700px; margin: 0 auto 16px;">
        «Gracias por todas las muteadas, Bendy. Nunca entendiste que me hacían más gracia que cualquier otra cosa JAJAJA».
      </p>
      <button onclick="window.audioSFX.playMute()" class="cta-btn" style="background: #ea580c;">
        🔊 Simular Muteada de Bendy
      </button>
    </div>

    <section style="background: var(--bg-card); border-radius: 16px; border: 1px solid var(--border-subtle); padding: 28px; margin-top: 32px;">
      <h3 style="font-size: 1.5rem; margin-bottom: 16px; color: #fb923c;">Agradecimiento a Bendy</h3>
      <p style="color: var(--text-muted); line-height: 1.8;">
        Gracias de verdad, bro. Por abrir tu servidor, por bancarnos en nuestras horas más desquiciadas, por las risas cuando apretabas el botón de mute y por ser el hermano mayor que mantuvo unida esta aventura durante todo el 2026. ¡Te queremos!
      </p>
    </section>
  </main>
</body>
</html>`;
fs.writeFileSync(path.join(baseDir, 'bendy.html'), bendyHtml, 'utf-8');

// 6. domititan.html
const domititanHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Domititan 💤🌙📺 | OUR FRIENDSHIP 2026</title>
  <link rel="stylesheet" href="css/style.css">
  <script src="js/sound.js"></script>
</head>
<body>
  <header>
    <div class="header-inner">
      <a href="index.html" class="brand-link"><span>← Volver al Menú</span></a>
      <nav>
        <a href="domititan.html" class="active">Domititan</a>
        <a href="bendy.html">Bendy</a>
        <a href="sunny.html">Sunny</a>
        <a href="mini.html">Mini</a>
        <a href="efra.html">Efra</a>
        <a href="juego.html" class="cta-btn">JUGAR 🎮</a>
      </nav>
    </div>
  </header>

  <main class="container" style="max-width: 900px;">
    <div style="display: flex; gap: 32px; align-items: center; flex-wrap: wrap; margin-top: 30px;">
      <div style="width: 280px; height: 380px; background: #130a21; border-radius: 16px; border: 2px solid #9333ea; display: flex; align-items: center; justify-content: center; overflow: hidden;">
        <img src="assets/characters/domititan.png" alt="Domititan" style="max-height: 100%; object-fit: contain;">
      </div>
      <div style="flex: 1; min-width: 300px;">
        <span style="color: #c084fc; font-weight: 700; text-transform: uppercase; font-size: 0.85rem;">Mi Página Personal</span>
        <h1 style="font-size: 2.8rem; margin: 6px 0;">Domititan</h1>
        <p style="color: #e9d5ff; font-size: 1.15rem; margin-bottom: 16px;">Gato Morado con Cabeza de Televisor & Collar de Luna</p>
        <p style="color: var(--text-muted); line-height: 1.7;">
          Soy un gato morado con cabeza de televisor. Mi pantalla transmite recuerdos, memes y buenas vibras. Creador de este sitio y del videojuego para inmortalizar nuestra amistad de 2026.
        </p>
      </div>
    </div>

    <div class="tv-screen" style="margin: 40px 0;">
      <div class="tv-scanlines"></div>
      <div style="color: #a855f7; font-family: monospace; font-size: 0.9rem; margin-bottom: 12px;">CANAL: AMISTAD-2026 // ESTADO: EN VIVO</div>
      <h2 style="font-size: 1.8rem; color: #fff; margin-bottom: 12px;">Mi Identidad y Humor</h2>
      <p style="color: #d8b4fe; font-size: 1.1rem; line-height: 1.7; margin-bottom: 16px;">
        «Me muteaban y yo me cagaba de risa. Creo que nunca entendieron que era parte de la diversión JAJAJA».
      </p>
      <p style="color: var(--text-muted); line-height: 1.7;">
        Gracias por acompañarme en cada noche, por soportar mis transmisiones, por no dejarme solo y por hacerme sentir parte de una verdadera familia.
      </p>
      <div style="margin-top: 24px; font-weight: 800; font-size: 1.3rem; color: #c084fc; text-align: right;">
        DOMITITAN 💤🌙📺
      </div>
    </div>
  </main>
</body>
</html>`;
fs.writeFileSync(path.join(baseDir, 'domititan.html'), domititanHtml, 'utf-8');

// 7. sunny.html
const sunnyHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sunny — The Sun Cat | OUR FRIENDSHIP 2026</title>
  <link rel="stylesheet" href="css/style.css">
  <script src="js/sound.js"></script>
</head>
<body>
  <header>
    <div class="header-inner">
      <a href="index.html" class="brand-link"><span>← Volver al Menú</span></a>
      <nav>
        <a href="domititan.html">Domititan</a>
        <a href="bendy.html">Bendy</a>
        <a href="sunny.html" class="active">Sunny</a>
        <a href="mini.html">Mini</a>
        <a href="efra.html">Efra</a>
        <a href="juego.html" class="cta-btn">JUGAR 🎮</a>
      </nav>
    </div>
  </header>

  <main class="container" style="max-width: 900px;">
    <div style="display: flex; gap: 32px; align-items: center; flex-wrap: wrap; margin-top: 30px;">
      <div style="width: 280px; height: 380px; background: #130a21; border-radius: 16px; border: 2px solid #eab308; display: flex; align-items: center; justify-content: center; overflow: hidden;">
        <img src="assets/characters/sunny.png" alt="Sunny" style="max-height: 100%; object-fit: contain;">
      </div>
      <div style="flex: 1; min-width: 300px;">
        <span style="color: #fde047; font-weight: 700; text-transform: uppercase; font-size: 0.85rem;">Homenaje Individual</span>
        <h1 style="font-size: 2.8rem; margin: 6px 0;">Sunny (The Sun Cat)</h1>
        <p style="color: #fef08a; font-size: 1.15rem; margin-bottom: 16px;">Energía Solar, Dibujos y Alegría Radiante</p>
        <p style="color: var(--text-muted); line-height: 1.7;">
          Sunny trajo luz incondicional a nuestro 2026. Sus dibujos, su creatividad, sus risas contagiosas y cada una de sus intervenciones dejaron una huella imborrable en nuestro grupo.
        </p>
      </div>
    </div>

    <section style="background: var(--bg-card); border-radius: 16px; border: 1px solid rgba(234, 179, 8, 0.3); padding: 28px; margin-top: 32px;">
      <h3 style="font-size: 1.5rem; margin-bottom: 16px; color: #fde047;">Recuerdos y Momentos con Sunny</h3>
      <p style="color: var(--text-muted); line-height: 1.8;">
        Desde las tardes de charla hasta los momentos donde nos mostraba nuevos bocetos y el diseño de The Sun Cat. Sunny siempre estuvo ahí con la mejor de las ondas. ¡Gracias por hacer este 2026 mucho más brillante!
      </p>
    </section>
  </main>
</body>
</html>`;
fs.writeFileSync(path.join(baseDir, 'sunny.html'), sunnyHtml, 'utf-8');

// 8. mini.html
const miniHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mini — Corazón Dulce | OUR FRIENDSHIP 2026</title>
  <link rel="stylesheet" href="css/style.css">
  <script src="js/sound.js"></script>
</head>
<body>
  <header>
    <div class="header-inner">
      <a href="index.html" class="brand-link"><span>← Volver al Menú</span></a>
      <nav>
        <a href="domititan.html">Domititan</a>
        <a href="bendy.html">Bendy</a>
        <a href="sunny.html">Sunny</a>
        <a href="mini.html" class="active">Mini</a>
        <a href="efra.html">Efra</a>
        <a href="juego.html" class="cta-btn">JUGAR 🎮</a>
      </nav>
    </div>
  </header>

  <main class="container" style="max-width: 900px;">
    <div style="display: flex; gap: 32px; align-items: center; flex-wrap: wrap; margin-top: 30px;">
      <div style="width: 280px; height: 380px; background: #130a21; border-radius: 16px; border: 2px solid #a855f7; display: flex; align-items: center; justify-content: center; overflow: hidden;">
        <img src="assets/characters/mini.jpg" alt="Mini" style="max-height: 100%; object-fit: contain;">
      </div>
      <div style="flex: 1; min-width: 300px;">
        <span style="color: #c084fc; font-weight: 700; text-transform: uppercase; font-size: 0.85rem;">Página Individual</span>
        <h1 style="font-size: 2.8rem; margin: 6px 0;">Mini</h1>
        <p style="color: #e9d5ff; font-size: 1.15rem; margin-bottom: 16px;">Amabilidad, Dulzura y Risas Compartidas</p>
        <p style="color: var(--text-muted); line-height: 1.7;">
          Una página conmemorativa individual dedicada a Mini. Su humor espontáneo y su presencia siempre nos sacaron sonrisas en los momentos más inesperados del año.
        </p>
      </div>
    </div>

    <section style="background: var(--bg-card); border-radius: 16px; border: 1px solid rgba(168, 85, 247, 0.3); padding: 28px; margin-top: 32px;">
      <h3 style="font-size: 1.5rem; margin-bottom: 16px; color: #c084fc;">Recuerdos y Momentos con Mini</h3>
      <p style="color: var(--text-muted); line-height: 1.8;">
        Esta sección está abierta para seguir sumando anécdotas, capturas y momentos compartidos durante nuestras sesiones de juego y charlas en 2026. ¡Gracias por ser parte indispensable de esta familia!
      </p>
    </section>
  </main>
</body>
</html>`;
fs.writeFileSync(path.join(baseDir, 'mini.html'), miniHtml, 'utf-8');

// 9. efra.html
const efraHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Efra — Guerrero Ígneo | OUR FRIENDSHIP 2026</title>
  <link rel="stylesheet" href="css/style.css">
  <script src="js/sound.js"></script>
</head>
<body>
  <header>
    <div class="header-inner">
      <a href="index.html" class="brand-link"><span>← Volver al Menú</span></a>
      <nav>
        <a href="domititan.html">Domititan</a>
        <a href="bendy.html">Bendy</a>
        <a href="sunny.html">Sunny</a>
        <a href="mini.html">Mini</a>
        <a href="efra.html" class="active">Efra</a>
        <a href="juego.html" class="cta-btn">JUGAR 🎮</a>
      </nav>
    </div>
  </header>

  <main class="container" style="max-width: 900px;">
    <div style="display: flex; gap: 32px; align-items: center; flex-wrap: wrap; margin-top: 30px;">
      <div style="width: 280px; height: 380px; background: #130a21; border-radius: 16px; border: 2px solid #dc2626; display: flex; align-items: center; justify-content: center; overflow: hidden;">
        <img src="assets/characters/efra.png" alt="Efra" style="max-height: 100%; object-fit: contain;">
      </div>
      <div style="flex: 1; min-width: 300px;">
        <span style="color: #f87171; font-weight: 700; text-transform: uppercase; font-size: 0.85rem;">Homenaje Individual</span>
        <h1 style="font-size: 2.8rem; margin: 6px 0;">Efra</h1>
        <p style="color: #fca5a5; font-size: 1.15rem; margin-bottom: 16px;">Lobo de Fuego, Lealtad Inquebrantable y Bromas Épicas</p>
        <p style="color: var(--text-muted); line-height: 1.7;">
          Efra es el guerrero de fuego de la familia. Siempre leal, listo para saltar a cualquier juego, broma o desvelo. Su espíritu fiero y a la vez noble nos acompañó todo el 2026.
        </p>
      </div>
    </div>

    <section style="background: var(--bg-card); border-radius: 16px; border: 1px solid rgba(220, 38, 38, 0.3); padding: 28px; margin-top: 32px;">
      <h3 style="font-size: 1.5rem; margin-bottom: 16px; color: #f87171;">Momentos y Anécdotas de Efra</h3>
      <p style="color: var(--text-muted); line-height: 1.8;">
        Las noches de risas, las bromas en el canal de voz y las ganas de no rendirse nunca en ningún juego. ¡Gracias por cada batalla compartida este año, Efra!
      </p>
    </section>
  </main>
</body>
</html>`;
fs.writeFileSync(path.join(baseDir, 'efra.html'), efraHtml, 'utf-8');

// 10. juego.html
const juegoHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>OUR FRIENDSHIP ADVENTURE 🎮 — Videojuego 2026</title>
  <link rel="stylesheet" href="css/style.css">
  <style>
    body { overflow: hidden; touch-action: none; background: #07030e; }
    #game-canvas { display: block; margin: 0 auto; background: #000; box-shadow: 0 0 40px rgba(147, 51, 234, 0.3); }
    .game-ui-wrap { position: relative; width: 100vw; height: 100vh; display: flex; flex-direction: column; }
    .game-top-bar { padding: 10px 16px; display: flex; justify-content: space-between; align-items: center; background: rgba(10,6,20,0.9); }
    .touch-controls { position: absolute; bottom: 20px; left: 0; right: 0; display: flex; justify-content: space-between; padding: 0 24px; pointer-events: none; }
    .touch-btn { width: 68px; height: 68px; border-radius: 50%; background: rgba(147, 51, 234, 0.35); border: 2px solid #c084fc; color: #fff; font-size: 24px; display: flex; align-items: center; justify-content: center; pointer-events: auto; user-select: none; }
    .touch-btn:active { background: rgba(147, 51, 234, 0.7); transform: scale(0.95); }
    @media (min-width: 850px) { .touch-controls { display: none; } }
  </style>
</head>
<body>
  <div class="game-ui-wrap">
    <div class="game-top-bar">
      <a href="index.html" style="color: #c084fc; text-decoration: none; font-weight: 700;">← Volver al Menú Principal</a>
      <div id="game-stats" style="font-family: monospace; color: #fff; font-size: 1.05rem;">
        ETAPA 1: Bosque de la Amistad | VIDAS: ❤️❤️❤️ | PUNTOS: 0
      </div>
      <div>
        <button onclick="window.audioSFX.init()" class="cta-btn" style="padding: 4px 12px; font-size: 0.8rem;">Activar Audio 🔊</button>
      </div>
    </div>

    <div style="flex: 1; display: flex; align-items: center; justify-content: center; position: relative;">
      <canvas id="game-canvas" width="960" height="540"></canvas>
    </div>

    <div class="touch-controls">
      <div style="display: flex; gap: 16px;">
        <div id="btn-left" class="touch-btn">◀</div>
        <div id="btn-right" class="touch-btn">▶</div>
      </div>
      <div style="display: flex; gap: 16px;">
        <div id="btn-shoot" class="touch-btn" style="background: rgba(234, 88, 12, 0.35); border-color: #fb923c;">⚡</div>
        <div id="btn-jump" class="touch-btn" style="background: rgba(168, 85, 247, 0.5); border-color: #e9d5ff;">▲</div>
      </div>
    </div>
  </div>

  <script src="js/sound.js"></script>
  <script src="js/game.js"></script>
</body>
</html>`;
fs.writeFileSync(path.join(baseDir, 'juego.html'), juegoHtml, 'utf-8');

// 11. js/game.js
const gameJs = `
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
`;
fs.writeFileSync(path.join(baseDir, 'js/game.js'), gameJs, 'utf-8');

// Now package everything in baseDir into our-friendship-2026.zip
async function run() {
  const zip = new JSZip();

  function addDir(dirPath: string, zipFolder: JSZip) {
    const items = fs.readdirSync(dirPath);
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        const sub = zipFolder.folder(item);
        if (sub) addDir(fullPath, sub);
      } else {
        const content = fs.readFileSync(fullPath);
        zipFolder.file(item, content);
      }
    }
  }

  addDir(baseDir, zip);

  console.log('Generating ZIP archive...');
  const buffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });

  const zipTarget = path.resolve('public/our-friendship-2026.zip');
  fs.writeFileSync(zipTarget, buffer);
  fs.writeFileSync(path.resolve('public/our-friendship.zip'), buffer);

  const stats = fs.statSync(zipTarget);
  console.log(`ZIP created successfully at ${zipTarget} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
}

run().catch(console.error);

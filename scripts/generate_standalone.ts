import fs from 'fs';
import path from 'path';

const baseDir = path.resolve('public/our-friendship');

fs.mkdirSync(path.join(baseDir, 'css'), { recursive: true });
fs.mkdirSync(path.join(baseDir, 'js'), { recursive: true });
fs.mkdirSync(path.join(baseDir, 'assets/characters'), { recursive: true });

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

console.log('Static styles & scripts successfully generated.');

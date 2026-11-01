class WebAudioSFX {
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

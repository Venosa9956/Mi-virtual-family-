/**
 * Audio Synthesizer Engine using Web Audio API
 * Generates custom 8-bit SFX and ambient soundtrack with zero external dependencies
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private isMusicPlaying: boolean = false;
  private musicInterval: number | null = null;
  private step: number = 0;
  private muted: boolean = false;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.musicGain = this.ctx.createGain();
      this.sfxGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      this.sfxGain.gain.setValueAtTime(0.28, this.ctx.currentTime);
      this.musicGain.connect(this.ctx.destination);
      this.sfxGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.muted = !this.muted;
    if (this.musicGain && this.sfxGain && this.ctx) {
      const val = this.muted ? 0 : 0.2;
      this.musicGain.gain.setValueAtTime(val, this.ctx.currentTime);
      this.sfxGain.gain.setValueAtTime(this.muted ? 0 : 0.28, this.ctx.currentTime);
    }
    return this.muted;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  // Jump Sound (rising pitch)
  public playJump() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.14);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.14);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch {
      // Audio context might fail on un-interacted page
    }
  }

  // Coin / Star Collected (sparkle chime)
  public playCoin() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;
      const playChime = (freq: number, offset: number) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + offset);
        gain.gain.setValueAtTime(0.22, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.18);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now + offset);
        osc.stop(now + offset + 0.19);
      };
      playChime(987.77, 0); // B5
      playChime(1318.51, 0.08); // E6
    } catch {}
  }

  // Laser / Special Attack (Domititan TV beam)
  public playShoot() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.18);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.18);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch {}
  }

  // Hurt / Hit
  public playHurt() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(60, now + 0.22);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.22);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 0.23);
    } catch {}
  }

  // Discord Mute Gong
  public playMuteGong() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;
      const freqs = [350, 440, 220];
      freqs.forEach((f, idx) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + idx * 0.02);
        gain.gain.setValueAtTime(0.3, now + idx * 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now + idx * 0.02);
        osc.stop(now + 0.85);
      });
    } catch {}
  }

  // Boss Roar
  public playBossRoar() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(90, now);
      osc.frequency.linearRampToValueAtTime(45, now + 0.5);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.5);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 0.52);
    } catch {}
  }

  // Victory Fanfare
  public playVictory() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx || !this.sfxGain) return;
      const notes = [523.25, 659.25, 783.99, 1046.50, 880.00, 1046.50];
      const durations = [0.12, 0.12, 0.12, 0.22, 0.15, 0.45];
      let t = this.ctx.currentTime;
      notes.forEach((freq, i) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + durations[i] - 0.02);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + durations[i]);
        t += durations[i];
      });
    } catch {}
  }

  // Ambient Friendship Music Loop (Smooth retro chiptune / celestial synth)
  public toggleMusic(): boolean {
    if (this.isMusicPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  public isPlayingMusic(): boolean {
    return this.isMusicPlaying;
  }

  public startMusic() {
    try {
      this.init();
      if (this.isMusicPlaying || !this.ctx) return;
      this.isMusicPlaying = true;
      this.step = 0;

      // Chord progression: Am -> F -> C -> G (Classic warm friendship anthem)
      const scale = [
        // Am (A3, C4, E4, A4)
        [220, 261.63, 329.63, 440],
        [220, 329.63, 440, 523.25],
        // F (F3, A3, C4, F4)
        [174.61, 220, 261.63, 349.23],
        [174.61, 261.63, 349.23, 440],
        // C (C3, G3, C4, E4)
        [130.81, 196.0, 261.63, 329.63],
        [130.81, 261.63, 329.63, 392.0],
        // G (G3, B3, D4, G4)
        [196.0, 246.94, 293.66, 392.0],
        [196.0, 293.66, 392.0, 493.88],
      ];

      const playArp = () => {
        if (!this.ctx || !this.musicGain || !this.isMusicPlaying || this.muted) return;
        const currentChord = scale[Math.floor(this.step / 4) % scale.length];
        const note = currentChord[this.step % currentChord.length];
        
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(note, now);
        
        // Gentle bell-like synth
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(this.musicGain);

        osc.start(now);
        osc.stop(now + 0.36);

        this.step = (this.step + 1) % (scale.length * 4);
      };

      this.musicInterval = window.setInterval(playArp, 220);
    } catch {}
  }

  public stopMusic() {
    this.isMusicPlaying = false;
    if (this.musicInterval !== null) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }
}

export const sound = new SoundEngine();

/**
 * Royal Audio Synthesizer Engine (Web Audio API)
 * Zero external MP3 dependency, 100% reliable, zero CORS issues, instant playback
 * Emulates oriental harp, acoustic bells, resonant santoor harmonics, and physical seal break
 */

class SoundService {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.intervalId = null;
    this.subscribers = new Set();
    this.melodyStep = 0;

    // Auspicious Eastern Raag / Pentatonic Scale (F# Hijaz / Bhairav notes in Hz)
    this.scale = [220, 247.5, 277.18, 329.63, 370.0, 440.0, 495.0, 554.37, 659.25, 740.0];
    this.melody = [
      this.scale[2], this.scale[4], this.scale[5], this.scale[7],
      this.scale[5], this.scale[4], this.scale[2], this.scale[0],
      this.scale[3], this.scale[5], this.scale[7], this.scale[8],
      this.scale[6], this.scale[4], this.scale[3], this.scale[1]
    ];
  }

  ensureContext() {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    callback(this.isPlaying);
    return () => this.subscribers.delete(callback);
  }

  notify() {
    this.subscribers.forEach(cb => cb(this.isPlaying));
  }

  /**
   * Resonant acoustic chime with fundamental + overtone harmonics + gentle filter
   */
  playChimeNote(freq, timeOffset = 0, duration = 2.4, gainLevel = 0.09) {
    this.ensureContext();
    if (!this.audioCtx) return;

    try {
      const ctx = this.audioCtx;
      const startTime = ctx.currentTime + timeOffset;

      // Primary tone (warm sine/triangle hybrid)
      const osc1 = ctx.createOscillator();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(freq, startTime);

      // Overtone harmonic (bell sheen)
      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2.01, startTime);

      // Gain envelopes
      const gain1 = ctx.createGain();
      gain1.gain.setValueAtTime(0, startTime);
      gain1.gain.linearRampToValueAtTime(gainLevel, startTime + 0.08);
      gain1.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      const gain2 = ctx.createGain();
      gain2.gain.setValueAtTime(0, startTime);
      gain2.gain.linearRampToValueAtTime(gainLevel * 0.45, startTime + 0.04);
      gain2.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.7);

      // Low-pass warm acoustic filter
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2200, startTime);
      filter.frequency.exponentialRampToValueAtTime(600, startTime + duration);

      osc1.connect(gain1);
      osc2.connect(gain2);
      gain1.connect(filter);
      gain2.connect(filter);
      filter.connect(ctx.destination);

      osc1.start(startTime);
      osc2.start(startTime);
      osc1.stop(startTime + duration);
      osc2.stop(startTime + duration);
    } catch (e) {
      console.warn("Sound error:", e);
    }
  }

  /**
   * Wax Seal Break Sound Effect: crisp snap followed by celestial resonance
   */
  playSealBreakSound() {
    this.ensureContext();
    if (!this.audioCtx) return;

    try {
      const ctx = this.audioCtx;
      const now = ctx.currentTime;

      // 1. Noise snap (wax cracking)
      const bufferSize = ctx.sampleRate * 0.08;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.2, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
      noise.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(now);

      // 2. Majestic royal triple chime chord
      this.playChimeNote(370.0, 0.05, 3.0, 0.12);
      this.playChimeNote(554.37, 0.18, 3.2, 0.11);
      this.playChimeNote(740.0, 0.32, 3.5, 0.13);
    } catch (e) {
      console.warn("Seal sound error:", e);
    }
  }

  /**
   * Button soft crystal tap sound
   */
  playClickSound() {
    this.ensureContext();
    if (!this.audioCtx) return;
    this.playChimeNote(659.25, 0, 0.6, 0.04);
  }

  /**
   * Celebration Fanfare (for dua submission / calendar save)
   */
  playCelebrationSound() {
    this.ensureContext();
    if (!this.audioCtx) return;
    const now = 0;
    this.playChimeNote(440, now, 1.2, 0.06);
    this.playChimeNote(554.37, now + 0.1, 1.4, 0.07);
    this.playChimeNote(659.25, now + 0.2, 1.6, 0.08);
    this.playChimeNote(880, now + 0.32, 2.0, 0.09);
  }

  /**
   * Continuous background ambient melody
   */
  startMelody() {
    this.ensureContext();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.notify();

    // Trigger immediate note
    const now = 0;
    this.playChimeNote(this.melody[0], now, 2.2, 0.06);

    this.intervalId = setInterval(() => {
      if (!this.isPlaying || !this.audioCtx) return;
      this.melodyStep = (this.melodyStep + 1) % this.melody.length;
      const note = this.melody[this.melodyStep];
      this.playChimeNote(note, 0, 2.3, 0.07);

      // Harmonize every 3rd step
      if (this.melodyStep % 3 === 0) {
        this.playChimeNote(note * 1.5, 0.22, 2.0, 0.05);
      }
    }, 1100);
  }

  stopMelody() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.notify();
  }

  toggleMelody() {
    if (this.isPlaying) {
      this.stopMelody();
      return false;
    } else {
      this.startMelody();
      return true;
    }
  }
}

export const soundService = new SoundService();

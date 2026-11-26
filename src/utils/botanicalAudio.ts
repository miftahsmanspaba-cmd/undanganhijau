/**
 * Romantic Indonesian wedding piano ballad engine with clean master bus
 * (smooth DynamicsCompressor + warm lowpass piano voicing) and support
 * for custom MP3 URLs or uploaded local audio files.
 */
class BotanicalAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private timer: number | null = null;
  private audioEl: HTMLAudioElement | null = null;
  private playing = false;
  private step = 0;

  // Expressive romantic pop-ballad progression in C Major / A Minor / F / G (Janji Suci feel)
  // Step duration: 390ms (~77 BPM eighth-notes) for flowing lyrical piano phrasing
  private readonly score: Array<{ m: number | null; c: number[]; bass: number | null }> = [
    // Cmaj7
    { m: 659.25, c: [261.63, 329.63, 392.0], bass: 130.81 },
    { m: 783.99, c: [], bass: null },
    { m: 880.0, c: [493.88], bass: null },
    { m: 783.99, c: [329.63], bass: null },
    { m: 659.25, c: [392.0], bass: null },
    { m: 587.33, c: [], bass: null },
    { m: 659.25, c: [329.63], bass: null },
    { m: null, c: [], bass: null },

    // Em7
    { m: 587.33, c: [246.94, 329.63, 392.0], bass: 164.81 },
    { m: 659.25, c: [], bass: null },
    { m: 783.99, c: [493.88], bass: null },
    { m: 659.25, c: [392.0], bass: null },
    { m: 587.33, c: [329.63], bass: null },
    { m: 493.88, c: [], bass: null },
    { m: 523.25, c: [293.66], bass: null },
    { m: null, c: [], bass: null },

    // Fmaj7
    { m: 523.25, c: [220.0, 261.63, 329.63], bass: 174.61 },
    { m: 587.33, c: [], bass: null },
    { m: 659.25, c: [349.23], bass: null },
    { m: 587.33, c: [329.63], bass: null },
    { m: 523.25, c: [261.63], bass: null },
    { m: 440.0, c: [], bass: null },
    { m: 523.25, c: [329.63], bass: null },
    { m: null, c: [], bass: null },

    // G6 -> G7
    { m: 587.33, c: [246.94, 293.66, 392.0], bass: 196.0 },
    { m: 659.25, c: [], bass: null },
    { m: 587.33, c: [349.23], bass: null },
    { m: 523.25, c: [293.66], bass: null },
    { m: 493.88, c: [246.94], bass: null },
    { m: 440.0, c: [], bass: null },
    { m: 392.0, c: [293.66], bass: null },
    { m: null, c: [], bass: null },
  ];

  private ensureAudioGraph() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      const compressor = this.ctx.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(-18, this.ctx.currentTime);
      compressor.knee.setValueAtTime(16, this.ctx.currentTime);
      compressor.ratio.setValueAtTime(3, this.ctx.currentTime);

      const master = this.ctx.createGain();
      master.gain.setValueAtTime(0.65, this.ctx.currentTime);

      master.connect(compressor);
      compressor.connect(this.ctx.destination);
      this.masterGain = master;
    }
  }

  private strikePianoNote(freq: number, peak: number, decaySec: number, brightness = 1900) {
    if (!this.ctx || !this.masterGain || this.ctx.state !== 'running') return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const overtone = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();
    const overtoneGain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    overtone.type = 'sine';
    overtone.frequency.setValueAtTime(freq * 2, now);
    overtoneGain.gain.setValueAtTime(0.22, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(brightness, now);
    filter.frequency.exponentialRampToValueAtTime(520, now + decaySec);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(peak, now + 0.018);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + decaySec);

    osc.connect(filter);
    overtone.connect(overtoneGain);
    overtoneGain.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    overtone.start(now);
    osc.stop(now + decaySec + 0.05);
    overtone.stop(now + decaySec + 0.05);
  }

  private playStep() {
    const slot = this.score[this.step % this.score.length];
    if (slot.bass !== null) {
      this.strikePianoNote(slot.bass, 0.14, 2.2, 900);
    }
    for (const chordFreq of slot.c) {
      this.strikePianoNote(chordFreq, 0.065, 1.45, 1400);
    }
    if (slot.m !== null) {
      this.strikePianoNote(slot.m, 0.12, 1.5, 2200);
    }
    this.step += 1;
  }

  public async start(customUrl?: string): Promise<boolean> {
    if (this.playing) return true;

    const candidateUrl = customUrl && customUrl.trim().length > 0 ? customUrl.trim() : '';

    if (candidateUrl) {
      try {
        if (!this.audioEl || this.audioEl.src !== candidateUrl) {
          this.audioEl = new Audio(candidateUrl);
          this.audioEl.loop = true;
          this.audioEl.volume = 0.6;
        }
        await this.audioEl.play();
        this.playing = true;
        return true;
      } catch {
        // Fall through cleanly to built-in piano ballad
      }
    }

    try {
      this.ensureAudioGraph();
      if (!this.ctx) return false;
      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }
      this.playing = true;
      this.playStep();

      this.timer = window.setInterval(() => {
        if (!this.playing) return;
        this.playStep();
      }, 390);
      return true;
    } catch {
      this.playing = false;
      return false;
    }
  }

  public pause() {
    this.playing = false;
    if (this.timer !== null) {
      window.clearInterval(this.timer);
      this.timer = null;
    }
    if (this.audioEl) {
      this.audioEl.pause();
    }
  }

  public resetSource() {
    this.pause();
    if (this.audioEl) {
      this.audioEl.src = '';
      this.audioEl = null;
    }
  }

  public isPlaying(): boolean {
    return this.playing;
  }
}

export const botanicalAudio = new BotanicalAudioEngine();

// Lightweight sound effects using Web Audio API (no files needed)
const GameSounds = (() => {
  let ctx = null;
  let enabled = localStorage.getItem('gameSounds') !== 'off';

  function getCtx() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function tone(freq, duration, type = 'square', volume = 0.08) {
    if (!enabled) return;
    try {
      const c = getCtx();
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(volume, c.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
      osc.connect(gain);
      gain.connect(c.destination);
      osc.start(c.currentTime);
      osc.stop(c.currentTime + duration);
    } catch (e) {}
  }

  return {
    click()   { tone(600, 0.05, 'square', 0.06); },
    eat()     { tone(520, 0.08, 'square', 0.07); tone(780, 0.1, 'square', 0.05); },
    success() { tone(523, 0.1); setTimeout(() => tone(659, 0.1), 80); setTimeout(() => tone(784, 0.15), 160); },
    fail()    { tone(200, 0.25, 'sawtooth', 0.08); },
    hit()     { tone(180, 0.06, 'square', 0.1); },
    move()    { tone(300, 0.03, 'triangle', 0.04); },
    win()     { tone(523, 0.12); setTimeout(() => tone(659, 0.12), 100); setTimeout(() => tone(784, 0.12), 200); setTimeout(() => tone(1046, 0.2), 300); },
    tick()    { tone(800, 0.03, 'square', 0.04); },
    toggle()  {
      enabled = !enabled;
      localStorage.setItem('gameSounds', enabled ? 'on' : 'off');
      if (enabled) this.click();
      return enabled;
    },
    isEnabled() { return enabled; }
  };
})();

// Simple sound effects for the game.
// These use the browser's built-in audio tools,
// so we do not need to add separate sound files.

let audioContext;

function getAudioContext() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;

  if (!AudioContext) {
    return null;
  }

  if (!audioContext) {
    audioContext = new AudioContext();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  return audioContext;
}

function playTone(frequency, duration, type = "sine", volume = 0.06) {
  const context = getAudioContext();

  if (!context) {
    return;
  }

  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, context.currentTime);

  gain.gain.setValueAtTime(0.001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(volume, context.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    context.currentTime + duration
  );

  oscillator.connect(gain);
  gain.connect(context.destination);

  oscillator.start();
  oscillator.stop(context.currentTime + duration);
}

export function playDropSound(soundOn) {
  if (!soundOn) {
    return;
  }

  playTone(700, 0.035, "square", 0.035);

  setTimeout(() => {
    playTone(520, 0.04, "triangle", 0.025);
  }, 35);
}

export function playWinSound(soundOn) {
  if (!soundOn) {
    return;
  }

  playTone(330, 0.12, "sine", 0.05);

  setTimeout(() => {
    playTone(440, 0.12, "sine", 0.05);
  }, 120);

  setTimeout(() => {
    playTone(550, 0.18, "sine", 0.05);
  }, 240);
}

export function playDrawSound(soundOn) {
  if (!soundOn) {
    return;
  }

  playTone(220, 0.15, "sine", 0.04);
}
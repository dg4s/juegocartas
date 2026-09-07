type Tone = {
  frequency: number
  durationMs: number
  type: OscillatorType
  gain: number
}

let context: AudioContext | null = null
let failed = false

function getContext(): AudioContext | null {
  if (failed) return null
  const Ctor = window.AudioContext ?? window.webkitAudioContext
  if (!Ctor) {
    failed = true
    return null
  }
  if (!context) {
    try {
      context = new Ctor()
    } catch {
      failed = true
      return null
    }
  }
  return context
}

export async function unlockAudio(): Promise<void> {
  const ctx = getContext()
  if (!ctx) return
  try {
    if (ctx.state === 'suspended') {
      await ctx.resume()
    }
  } catch {
    failed = true
  }
}

function playTone(tone: Tone): void {
  const ctx = getContext()
  if (!ctx || ctx.state !== 'running') return
  try {
    const oscillator = ctx.createOscillator()
    const gain = ctx.createGain()
    oscillator.type = tone.type
    oscillator.frequency.value = tone.frequency
    gain.gain.value = tone.gain
    oscillator.connect(gain)
    gain.connect(ctx.destination)
    const now = ctx.currentTime
    gain.gain.setValueAtTime(tone.gain, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + tone.durationMs / 1000)
    oscillator.start(now)
    oscillator.stop(now + tone.durationMs / 1000)
  } catch {
    /* el juego continúa sin audio */
  }
}

export function playCountdownBeep(): void {
  playTone({ frequency: 660, durationMs: 90, type: 'sine', gain: 0.08 })
}

export function playGoSignal(): void {
  playTone({ frequency: 880, durationMs: 180, type: 'triangle', gain: 0.1 })
}

export function playCorrect(): void {
  playTone({ frequency: 784, durationMs: 140, type: 'sine', gain: 0.09 })
}

export function playIncorrect(): void {
  playTone({ frequency: 330, durationMs: 120, type: 'sine', gain: 0.05 })
}

export function playMatchEnd(): void {
  playTone({ frequency: 523, durationMs: 160, type: 'sine', gain: 0.07 })
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext
  }
}

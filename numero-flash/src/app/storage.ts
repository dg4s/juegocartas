const SOUND_KEY = 'numero-flash-sound'

export function readSoundPreference(): boolean {
  try {
    const value = localStorage.getItem(SOUND_KEY)
    if (value === 'off') return false
    if (value === 'on') return true
  } catch {
    /* localStorage puede no estar disponible */
  }
  return true
}

export function writeSoundPreference(on: boolean): void {
  try {
    localStorage.setItem(SOUND_KEY, on ? 'on' : 'off')
  } catch {
    /* preferencia no persistida */
  }
}

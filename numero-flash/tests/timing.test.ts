import { afterEach, describe, expect, it, vi } from 'vitest'
import { visibilityOnHidden } from '../src/game/visibility'
import { TIMING } from '../src/timing/config'
import { TimerRegistry } from '../src/timing/timers'

describe('configuración de tiempos', () => {
  it('centraliza los valores aprobados', () => {
    expect(TIMING.countdownStepMs).toBe(1000)
    expect(TIMING.goSignalMs).toBe(500)
    expect(TIMING.exposureMs.PRACTICA).toBe(10000)
    expect(TIMING.exposureMs.ESTANDAR).toBe(7000)
    expect(TIMING.exposureMs.RETO).toBe(5000)
  })
})

describe('TimerRegistry', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('limpia timers pendientes', () => {
    vi.useFakeTimers()
    const registry = new TimerRegistry()
    let ran = 0
    registry.schedule(() => {
      ran += 1
    }, 1000)
    expect(registry.pending).toBe(1)
    registry.clearAll()
    expect(registry.pending).toBe(0)
    vi.advanceTimersByTime(2000)
    expect(ran).toBe(0)
  })
})

describe('visibilitychange', () => {
  it('cancela en COUNTDOWN, GO_SIGNAL y EXPOSURE', () => {
    expect(visibilityOnHidden('COUNTDOWN')).toBe('cancel')
    expect(visibilityOnHidden('GO_SIGNAL')).toBe('cancel')
    expect(visibilityOnHidden('EXPOSURE')).toBe('cancel-hide')
  })

  it('no cancela en RECONSTRUCT ni estados posteriores', () => {
    expect(visibilityOnHidden('RECONSTRUCT')).toBe('ignore')
    expect(visibilityOnHidden('VERIFY')).toBe('ignore')
    expect(visibilityOnHidden('ROUND_RESULT')).toBe('ignore')
    expect(visibilityOnHidden('MATCH_RESULT')).toBe('ignore')
    expect(visibilityOnHidden('IDLE')).toBe('ignore')
  })
})

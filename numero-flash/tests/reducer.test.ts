import { describe, expect, it } from 'vitest'
import { gameReducer, initialGameState } from '../src/game/reducer'
import type { GameState } from '../src/game/types'

const FIVE = ['295', '604', '731', '908', '120']

function started(): GameState {
  return gameReducer(initialGameState, { type: 'START', numbers: FIVE })
}

function toVerify(state: GameState): GameState {
  let next = state
  next = gameReducer(next, { type: 'COUNTDOWN_TICK' })
  next = gameReducer(next, { type: 'COUNTDOWN_TICK' })
  next = gameReducer(next, { type: 'COUNTDOWN_TICK' })
  next = gameReducer(next, { type: 'GO_SIGNAL_DONE' })
  next = gameReducer(next, { type: 'EXPOSURE_DONE' })
  next = gameReducer(next, { type: 'READY' })
  return next
}

describe('máquina de estados', () => {
  it('inicia COUNTDOWN desde IDLE', () => {
    const state = started()
    expect(state.phase).toBe('COUNTDOWN')
    expect(state.countdownStep).toBe(3)
    expect(state.stimulus).toBe('295')
    expect(state.stimulusVisible).toBe(false)
  })

  it('sigue el flujo legal hasta ROUND_RESULT', () => {
    let state = started()
    state = gameReducer(state, { type: 'COUNTDOWN_TICK' })
    expect(state.countdownStep).toBe(2)
    state = gameReducer(state, { type: 'COUNTDOWN_TICK' })
    expect(state.countdownStep).toBe(1)
    state = gameReducer(state, { type: 'COUNTDOWN_TICK' })
    expect(state.phase).toBe('GO_SIGNAL')
    state = gameReducer(state, { type: 'GO_SIGNAL_DONE' })
    expect(state.phase).toBe('EXPOSURE')
    expect(state.stimulusVisible).toBe(true)
    state = gameReducer(state, { type: 'EXPOSURE_DONE' })
    expect(state.phase).toBe('RECONSTRUCT')
    expect(state.stimulusVisible).toBe(false)
    state = gameReducer(state, { type: 'READY' })
    expect(state.phase).toBe('VERIFY')
    state = gameReducer(state, { type: 'MARK_CORRECT' })
    expect(state.phase).toBe('ROUND_RESULT')
    expect(state.scoredCount).toBe(1)
    expect(state.correctCount).toBe(1)
  })

  it('rechaza transiciones ilegales', () => {
    const idle = initialGameState
    expect(gameReducer(idle, { type: 'READY' })).toEqual(idle)
    expect(gameReducer(idle, { type: 'MARK_CORRECT' })).toEqual(idle)
    expect(gameReducer(idle, { type: 'NEXT' })).toEqual(idle)
    expect(gameReducer(idle, { type: 'CANCEL' })).toEqual(idle)
    const countdown = started()
    expect(gameReducer(countdown, { type: 'SET_LEVEL', level: 'RETO' }).level).toBe('PRACTICA')
    expect(gameReducer(countdown, { type: 'READY' }).phase).toBe('COUNTDOWN')
    expect(gameReducer(countdown, { type: 'MARK_INCORRECT' }).phase).toBe('COUNTDOWN')
  })

  it('SIGUIENTE en rondas 1–4 vuelve a COUNTDOWN', () => {
    let state = toVerify(started())
    state = gameReducer(state, { type: 'MARK_INCORRECT' })
    state = gameReducer(state, { type: 'NEXT' })
    expect(state.phase).toBe('COUNTDOWN')
    expect(state.roundIndex).toBe(1)
    expect(state.stimulus).toBe('604')
    expect(state.scoredCount).toBe(1)
  })

  it('tras cinco rondas puntuadas, SIGUIENTE va a MATCH_RESULT y luego IDLE', () => {
    let state = started()
    for (let i = 0; i < 5; i += 1) {
      state = toVerify(state)
      state = gameReducer(state, { type: 'MARK_CORRECT' })
      if (i < 4) {
        state = gameReducer(state, { type: 'NEXT' })
      }
    }
    expect(state.scoredCount).toBe(5)
    expect(state.phase).toBe('ROUND_RESULT')
    state = gameReducer(state, { type: 'NEXT' })
    expect(state.phase).toBe('MATCH_RESULT')
    expect(state.correctCount).toBe(5)
    state = gameReducer(state, { type: 'RETURN_IDLE' })
    expect(state.phase).toBe('IDLE')
    expect(state.scoredCount).toBe(0)
    expect(state.matchNumbers).toEqual([])
  })

  it('cancelar termina la partida y no puntúa ni consume ronda', () => {
    let state = started()
    state = gameReducer(state, { type: 'CANCEL' })
    expect(state.phase).toBe('IDLE')
    expect(state.scoredCount).toBe(0)
    expect(state.correctCount).toBe(0)
    expect(state.incorrectCount).toBe(0)
    expect(state.matchNumbers).toEqual([])
    expect(state.stimulus).toBeNull()
  })

  it('no muestra DETENER implícito: CANCEL se ignora en VERIFY y resultados', () => {
    let state = toVerify(started())
    expect(gameReducer(state, { type: 'CANCEL' }).phase).toBe('VERIFY')
    state = gameReducer(state, { type: 'MARK_CORRECT' })
    expect(gameReducer(state, { type: 'CANCEL' }).phase).toBe('ROUND_RESULT')
    state = gameReducer(state, { type: 'NEXT' })
    // aún no quinta
    expect(state.phase).toBe('COUNTDOWN')
  })
})

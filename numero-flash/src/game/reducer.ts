import { ROUNDS_PER_MATCH } from '../timing/config'
import { STOP_PHASES, type GameAction, type GameState, type Phase } from './types'

export const initialGameState: GameState = {
  phase: 'IDLE',
  level: 'PRACTICA',
  countdownStep: null,
  stimulus: null,
  stimulusVisible: false,
  matchNumbers: [],
  roundIndex: 0,
  scoredCount: 0,
  lastOutcome: null,
  correctCount: 0,
  incorrectCount: 0,
}

function idleFromCancel(state: GameState): GameState {
  return {
    ...initialGameState,
    level: state.level,
  }
}

function beginRound(state: GameState, roundIndex: number): GameState {
  return {
    ...state,
    phase: 'COUNTDOWN',
    countdownStep: 3,
    stimulus: state.matchNumbers[roundIndex] ?? null,
    stimulusVisible: false,
    roundIndex,
    lastOutcome: null,
  }
}

function canStop(phase: Phase): boolean {
  return STOP_PHASES.includes(phase)
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_LEVEL':
      if (state.phase !== 'IDLE') return state
      return { ...state, level: action.level }

    case 'START':
      if (state.phase !== 'IDLE') return state
      if (action.numbers.length !== ROUNDS_PER_MATCH) return state
      return beginRound(
        {
          ...initialGameState,
          level: state.level,
          matchNumbers: action.numbers,
        },
        0,
      )

    case 'COUNTDOWN_TICK':
      if (state.phase !== 'COUNTDOWN' || state.countdownStep === null) return state
      if (state.countdownStep > 1) {
        return {
          ...state,
          countdownStep: (state.countdownStep - 1) as 2 | 1,
        }
      }
      return {
        ...state,
        phase: 'GO_SIGNAL',
        countdownStep: null,
        stimulusVisible: false,
      }

    case 'GO_SIGNAL_DONE':
      if (state.phase !== 'GO_SIGNAL') return state
      return {
        ...state,
        phase: 'EXPOSURE',
        stimulusVisible: true,
      }

    case 'EXPOSURE_DONE':
      if (state.phase !== 'EXPOSURE') return state
      return {
        ...state,
        phase: 'RECONSTRUCT',
        stimulusVisible: false,
      }

    case 'READY':
      if (state.phase !== 'RECONSTRUCT') return state
      return {
        ...state,
        phase: 'VERIFY',
        stimulusVisible: false,
      }

    case 'MARK_CORRECT':
      if (state.phase !== 'VERIFY') return state
      return {
        ...state,
        phase: 'ROUND_RESULT',
        lastOutcome: 'correct',
        correctCount: state.correctCount + 1,
        scoredCount: state.scoredCount + 1,
      }

    case 'MARK_INCORRECT':
      if (state.phase !== 'VERIFY') return state
      return {
        ...state,
        phase: 'ROUND_RESULT',
        lastOutcome: 'incorrect',
        incorrectCount: state.incorrectCount + 1,
        scoredCount: state.scoredCount + 1,
      }

    case 'NEXT':
      if (state.phase !== 'ROUND_RESULT') return state
      if (state.scoredCount >= ROUNDS_PER_MATCH) {
        return {
          ...state,
          phase: 'MATCH_RESULT',
          stimulus: null,
          stimulusVisible: false,
        }
      }
      return beginRound(state, state.roundIndex + 1)

    case 'RETURN_IDLE':
      if (state.phase !== 'MATCH_RESULT') return state
      return {
        ...initialGameState,
        level: state.level,
      }

    case 'CANCEL':
      if (!canStop(state.phase)) return state
      return idleFromCancel(state)

    default:
      return state
  }
}

export type Phase =
  | 'IDLE'
  | 'COUNTDOWN'
  | 'GO_SIGNAL'
  | 'EXPOSURE'
  | 'RECONSTRUCT'
  | 'VERIFY'
  | 'ROUND_RESULT'
  | 'MATCH_RESULT'

export type LevelId = 'PRACTICA' | 'ESTANDAR' | 'RETO'

export type RoundOutcome = 'correct' | 'incorrect'

export type GameState = {
  phase: Phase
  level: LevelId
  countdownStep: 3 | 2 | 1 | null
  stimulus: string | null
  stimulusVisible: boolean
  matchNumbers: string[]
  roundIndex: number
  scoredCount: number
  lastOutcome: RoundOutcome | null
  correctCount: number
  incorrectCount: number
}

export type GameAction =
  | { type: 'SET_LEVEL'; level: LevelId }
  | { type: 'START'; numbers: string[] }
  | { type: 'COUNTDOWN_TICK' }
  | { type: 'GO_SIGNAL_DONE' }
  | { type: 'EXPOSURE_DONE' }
  | { type: 'READY' }
  | { type: 'MARK_CORRECT' }
  | { type: 'MARK_INCORRECT' }
  | { type: 'NEXT' }
  | { type: 'RETURN_IDLE' }
  | { type: 'CANCEL' }

export const STOP_PHASES: readonly Phase[] = [
  'COUNTDOWN',
  'GO_SIGNAL',
  'EXPOSURE',
  'RECONSTRUCT',
]

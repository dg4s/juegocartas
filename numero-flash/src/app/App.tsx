import { useEffect, useRef } from 'react'
import { STOP_PHASES, type RoundOutcome } from '../game/types'
import { TIMING } from '../timing/config'
import { useGameRuntime } from './useGameRuntime'
import { PlayingCard, SceneDecor } from '../ui/SceneVisuals'

const LEVELS = [
  {
    id: 'PRACTICA' as const,
    label: 'PRÁCTICA',
    hint: `${TIMING.exposureMs.PRACTICA / 1000} segundos`,
    stars: '★',
    tone: 'practice',
  },
  {
    id: 'ESTANDAR' as const,
    label: 'ESTÁNDAR',
    hint: `${TIMING.exposureMs.ESTANDAR / 1000} segundos`,
    stars: '★★',
    tone: 'standard',
  },
  {
    id: 'RETO' as const,
    label: 'RETO',
    hint: `${TIMING.exposureMs.RETO / 1000} segundos`,
    stars: '★★★',
    tone: 'challenge',
  },
]

function GameTitle({ compact }: { compact?: boolean }) {
  return (
    <div className={`game-brand${compact ? ' game-brand--compact' : ''}`}>
      <h1 className="game-title">
        <span className="game-title__numero">NÚMERO</span>{' '}
        <span className="game-title__flash">FLASH</span>
      </h1>
      {!compact && (
        <>
          <div className="game-title__flashes" aria-hidden="true">
            <span className="game-title__flash-line game-title__flash-line--1" />
            <span className="game-title__flash-line game-title__flash-line--2" />
            <span className="game-title__flash-line game-title__flash-line--3" />
          </div>
          <p className="tagline">Observa, recuerda y reconstruye con tus cartas</p>
        </>
      )}
    </div>
  )
}

function LiveRegion({ phase, state }: { phase: string; state: ReturnType<typeof useGameRuntime>['state'] }) {
  return (
    <p className="live" aria-live="polite">
      {phase === 'COUNTDOWN' && `Cuenta atrás: ${state.countdownStep}`}
      {phase === 'GO_SIGNAL' && 'GO'}
      {phase === 'RECONSTRUCT' && 'Arma el número con las cartas.'}
      {phase === 'VERIFY' && 'Elige CORRECTO o INCORRECTO.'}
      {phase === 'ROUND_RESULT' &&
        (state.lastOutcome === 'correct' ? 'Ronda correcta.' : 'Ronda incorrecta.')}
      {phase === 'MATCH_RESULT' &&
        `Partida terminada. Aciertos ${state.correctCount}. Errores ${state.incorrectCount}.`}
    </p>
  )
}

function AppFooter() {
  return (
    <footer className="app-footer">
      <p>
        Sistema desarrollado por{' '}
        <a href="https://dg4s.site" target="_blank" rel="noopener noreferrer">
          dg4s.site
        </a>
        {' '}
        | © 2026 dg4s. Todos los derechos reservados
      </p>
    </footer>
  )
}

export function App() {
  const game = useGameRuntime()
  const { state } = game
  const canStop = STOP_PHASES.includes(state.phase)
  const roundHistory = useRef<RoundOutcome[]>([])

  const isFocusPhase =
    state.phase === 'COUNTDOWN' ||
    state.phase === 'GO_SIGNAL' ||
    state.phase === 'EXPOSURE'

  const showDecor =
    state.phase === 'RECONSTRUCT' ||
    state.phase === 'VERIFY' ||
    state.phase === 'ROUND_RESULT' ||
    state.phase === 'MATCH_RESULT'

  useEffect(() => {
    document.body.dataset.phase = state.phase
  }, [state.phase])

  useEffect(() => {
    if (state.phase === 'IDLE') roundHistory.current = []
  }, [state.phase])

  useEffect(() => {
    if (state.phase === 'ROUND_RESULT' && state.lastOutcome) {
      const idx = state.scoredCount - 1
      if (idx >= 0 && roundHistory.current.length === idx) {
        roundHistory.current.push(state.lastOutcome)
      }
    }
  }, [state.phase, state.scoredCount, state.lastOutcome])

  return (
    <main
      className={`app scene${isFocusPhase ? ' scene--focus' : ''}${state.phase === 'IDLE' ? ' scene--idle' : ''}`}
    >
      <SceneDecor visible={showDecor && !isFocusPhase} />

      <div className="scene__content">
        {state.phase === 'IDLE' && (
          <section className="idle-screen" aria-label="Inicio">
            <img className="idle-screen__art" src="/home-scene.png" alt="" />
            <div className="idle-screen__vignette" aria-hidden="true" />
            <div className="idle-screen__mask" aria-hidden="true" />
            <p className="sr-only">Observa, recuerda y reconstruye con tus cartas.</p>

            <div className="idle-screen__ui">
              <div className="mode-picker" role="group" aria-label="Selección de nivel">
                {LEVELS.map((level) => (
                  <button
                    key={level.id}
                    type="button"
                    className={`mode-card ${level.tone}${state.level === level.id ? ' is-selected' : ''}`}
                    aria-pressed={state.level === level.id}
                    onClick={() => game.setLevel(level.id)}
                  >
                    <span className="stars" aria-hidden="true">
                      {level.stars}
                    </span>
                    <strong>{level.label}</strong>
                    <span>{level.hint}</span>
                  </button>
                ))}
              </div>

              <button className="start-button" type="button" onClick={() => void game.start()}>
                <span className="play-icon" aria-hidden="true">
                  ▶
                </span>
                INICIAR
              </button>

              <div className="utility-row">
                <button
                  type="button"
                  className="utility-button"
                  onClick={game.toggleSound}
                  aria-pressed={game.soundOn}
                >
                  <span className="utility-icon" aria-hidden="true">
                    {game.soundOn ? '◖))' : '◖'}
                  </span>
                  SONIDO {game.soundOn ? 'ON' : 'OFF'}
                </button>
                <button type="button" className="utility-button" onClick={() => void game.enterFullscreen()}>
                  <span className="fullscreen-icon" aria-hidden="true">
                    ⛶
                  </span>
                  PANTALLA COMPLETA
                </button>
              </div>
            </div>
          </section>
        )}

        {state.phase !== 'IDLE' && state.phase !== 'MATCH_RESULT' && (
          <section className="game-screen" aria-label="Partida">
            {!isFocusPhase && <GameTitle compact />}

            <div className="game-screen__stage">
              {state.phase === 'COUNTDOWN' && (
                <p className="cue" aria-hidden="true">
                  {state.countdownStep}
                </p>
              )}

              {state.phase === 'GO_SIGNAL' && (
                <p className="cue cue--go" aria-hidden="true">
                  GO
                </p>
              )}

              {state.phase === 'EXPOSURE' && state.stimulusVisible && state.stimulus && (
                <PlayingCard variant="stimulus" spotlight>
                  {state.stimulus}
                </PlayingCard>
              )}

              {state.phase === 'RECONSTRUCT' && (
                <div className="phase-panel">
                  <p className="instruction instruction--prominent">
                    Arma el número con las cartas
                  </p>
                </div>
              )}

              {state.phase === 'VERIFY' && (
                <div className="phase-panel">
                  <p className="instruction instruction--prominent">
                    ¿Coincide con las cartas?
                  </p>
                </div>
              )}

              {state.phase === 'ROUND_RESULT' && (
                <div className="round-result">
                  <span
                    className={`round-result__badge round-result__badge--${state.lastOutcome === 'correct' ? 'correct' : 'incorrect'}`}
                  >
                    {state.lastOutcome === 'correct' ? 'CORRECTO' : 'INCORRECTO'}
                  </span>
                  <span className="round-result__meta">Ronda {state.scoredCount} de 5</span>
                </div>
              )}
            </div>

            <div className="toolbar">
              {canStop && (
                <button className="btn-stop" type="button" onClick={game.stop}>
                  DETENER
                </button>
              )}
              {state.phase === 'RECONSTRUCT' && (
                <button className="btn-ready" type="button" onClick={game.ready}>
                  ¡LISTO!
                </button>
              )}
              {state.phase === 'VERIFY' && (
                <>
                  <button className="btn-correct" type="button" onClick={game.markCorrect}>
                    CORRECTO
                  </button>
                  <button className="btn-incorrect" type="button" onClick={game.markIncorrect}>
                    INCORRECTO
                  </button>
                </>
              )}
              {state.phase === 'ROUND_RESULT' && (
                <button className="btn-next" type="button" onClick={game.next}>
                  SIGUIENTE
                </button>
              )}
            </div>
          </section>
        )}

        {state.phase === 'MATCH_RESULT' && (
          <section className="match-result" aria-label="Resultados">
            <GameTitle compact />
            <h2 className="match-result__title">¡Partida terminada!</h2>

            <div className="round-dots" aria-label="Resultado por ronda">
              {Array.from({ length: 5 }, (_, i) => {
                const outcome = roundHistory.current[i]
                const cls = outcome ? `round-dot round-dot--${outcome}` : 'round-dot'
                return (
                  <div key={i} className={cls} aria-label={`Ronda ${i + 1}`}>
                    {outcome === 'correct' ? '✓' : outcome === 'incorrect' ? '·' : i + 1}
                  </div>
                )
              })}
            </div>

            <div className="match-result__score">
              <div className="match-result__stat">
                <span className="match-result__stat-value match-result__stat-value--ok">
                  {state.correctCount}
                </span>
                <span className="match-result__stat-label">Aciertos</span>
              </div>
              <div className="match-result__stat">
                <span className="match-result__stat-value match-result__stat-value--miss">
                  {state.incorrectCount}
                </span>
                <span className="match-result__stat-label">Errores</span>
              </div>
            </div>

            <p className="match-result__note">
              Estos datos no se guardan. No son un diagnóstico.
            </p>

            <button className="btn-start btn-home" type="button" onClick={game.returnIdle}>
              Volver al inicio
            </button>
          </section>
        )}

        <LiveRegion phase={state.phase} state={state} />
      </div>

      <AppFooter />
    </main>
  )
}

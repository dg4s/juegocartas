import { useEffect, useReducer, useRef, useState } from 'react'
import {
  playCorrect,
  playCountdownBeep,
  playGoSignal,
  playIncorrect,
  playMatchEnd,
  unlockAudio,
} from '../audio/sounds'
import { gameReducer, initialGameState } from '../game/reducer'
import type { LevelId } from '../game/types'
import { visibilityOnHidden } from '../game/visibility'
import { pickMatchNumbers } from '../numbers/select'
import { ROUNDS_PER_MATCH, TIMING } from '../timing/config'
import { TimerRegistry } from '../timing/timers'
import { releaseWakeLock, requestWakeLock, restoreWakeLockIfActive } from '../wakeLock/wakeLock'
import { readSoundPreference, writeSoundPreference } from './storage'

export function useGameRuntime() {
  const [state, dispatch] = useReducer(gameReducer, initialGameState)
  const [soundOn, setSoundOn] = useState(readSoundPreference)
  const timers = useRef(new TimerRegistry())
  const phaseRef = useRef(state.phase)
  const soundRef = useRef(soundOn)
  const levelRef = useRef(state.level)

  phaseRef.current = state.phase
  soundRef.current = soundOn
  levelRef.current = state.level

  const beep = (fn: () => void) => {
    if (soundRef.current) fn()
  }

  const clearTimers = () => {
    timers.current.clearAll()
  }

  useEffect(() => {
    const registry = timers.current
    return () => {
      registry.clearAll()
      void releaseWakeLock()
    }
  }, [])

  useEffect(() => {
    const active = state.phase !== 'IDLE' && state.phase !== 'MATCH_RESULT'
    if (active) {
      void requestWakeLock()
    } else {
      void releaseWakeLock()
    }
  }, [state.phase])

  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState !== 'hidden') {
        void restoreWakeLockIfActive(
          phaseRef.current !== 'IDLE' && phaseRef.current !== 'MATCH_RESULT',
        )
        return
      }
      const effect = visibilityOnHidden(phaseRef.current)
      if (effect === 'ignore') return
      clearTimers()
      dispatch({ type: 'CANCEL' })
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  const scheduleRoundStart = () => {
    clearTimers()
    beep(playCountdownBeep)
    timers.current.schedule(() => {
      dispatch({ type: 'COUNTDOWN_TICK' })
      beep(playCountdownBeep)
      timers.current.schedule(() => {
        dispatch({ type: 'COUNTDOWN_TICK' })
        beep(playCountdownBeep)
        timers.current.schedule(() => {
          dispatch({ type: 'COUNTDOWN_TICK' })
          beep(playGoSignal)
          timers.current.schedule(() => {
            dispatch({ type: 'GO_SIGNAL_DONE' })
            timers.current.schedule(() => {
              dispatch({ type: 'EXPOSURE_DONE' })
            }, TIMING.exposureMs[levelRef.current])
          }, TIMING.goSignalMs)
        }, TIMING.countdownStepMs)
      }, TIMING.countdownStepMs)
    }, TIMING.countdownStepMs)
  }

  const setLevel = (level: LevelId) => {
    dispatch({ type: 'SET_LEVEL', level })
  }

  const start = async () => {
    await unlockAudio()
    const numbers = pickMatchNumbers()
    dispatch({ type: 'START', numbers })
    scheduleRoundStart()
  }

  const stop = () => {
    clearTimers()
    dispatch({ type: 'CANCEL' })
    void releaseWakeLock()
  }

  const ready = () => {
    dispatch({ type: 'READY' })
  }

  const markCorrect = () => {
    dispatch({ type: 'MARK_CORRECT' })
    beep(playCorrect)
  }

  const markIncorrect = () => {
    dispatch({ type: 'MARK_INCORRECT' })
    beep(playIncorrect)
  }

  const next = () => {
    const goingToMatch = state.scoredCount >= ROUNDS_PER_MATCH
    dispatch({ type: 'NEXT' })
    if (goingToMatch) {
      beep(playMatchEnd)
      return
    }
    scheduleRoundStart()
  }

  const returnIdle = () => {
    dispatch({ type: 'RETURN_IDLE' })
    void releaseWakeLock()
  }

  const toggleSound = () => {
    setSoundOn((current) => {
      const nextValue = !current
      writeSoundPreference(nextValue)
      return nextValue
    })
  }

  const enterFullscreen = async () => {
    try {
      if (!document.fullscreenEnabled || !document.documentElement.requestFullscreen) return
      await document.documentElement.requestFullscreen()
    } catch {
      /* Fullscreen opcional */
    }
  }

  return {
    state,
    soundOn,
    setLevel,
    start,
    stop,
    ready,
    markCorrect,
    markIncorrect,
    next,
    returnIdle,
    toggleSound,
    enterFullscreen,
  }
}

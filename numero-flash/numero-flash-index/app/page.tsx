'use client'

import { useState } from 'react'

const sourceImage =
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%206%20sept%202026%2C%2006_12_00%20p.m.-HXU4I5fKECpGqSerkKlY08o3N0ecTb.png'

const modes = [
  { label: 'PRÁCTICA', time: '10 segundos', stars: '★', tone: 'practice' },
  { label: 'ESTÁNDAR', time: '7 segundos', stars: '★★', tone: 'standard' },
  { label: 'RETO', time: '5 segundos', stars: '★★★', tone: 'challenge' },
]

export default function Page() {
  const [selectedMode, setSelectedMode] = useState('standard')
  const [soundOn, setSoundOn] = useState(true)
  const [started, setStarted] = useState(false)

  return (
    <main className="flash-page">
      <img className="reference-art" src={sourceImage} alt="Número Flash: juego visual de memoria con cartas numéricas" />
      <div className="art-vignette" aria-hidden="true" />
      <section className="game-ui" aria-label="Número Flash">
        <p className="sr-only">Observa, recuerda y reconstruye con tus cartas.</p>
        <div className="mode-picker" role="group" aria-label="Selecciona un modo de juego">
          {modes.map((mode) => (
            <button
              className={`mode-card ${mode.tone} ${selectedMode === mode.tone ? 'is-selected' : ''}`}
              key={mode.tone}
              type="button"
              aria-pressed={selectedMode === mode.tone}
              onClick={() => setSelectedMode(mode.tone)}
            >
              <span className="stars" aria-hidden="true">{mode.stars}</span>
              <strong>{mode.label}</strong>
              <span>{mode.time}</span>
            </button>
          ))}
        </div>
        <button className={`start-button ${started ? 'is-started' : ''}`} type="button" onClick={() => setStarted(true)}>
          <span className="play-icon" aria-hidden="true">{started ? '✓' : '▶'}</span>
          {started ? 'JUGANDO' : 'INICIAR'}
        </button>
        <div className="utility-row">
          <button className="utility-button" type="button" onClick={() => setSoundOn((value) => !value)} aria-pressed={soundOn}>
            <span className="utility-icon" aria-hidden="true">{soundOn ? '◖))' : '◖'}</span>
            SONIDO {soundOn ? 'ON' : 'OFF'}
          </button>
          <button className="utility-button" type="button" onClick={() => document.documentElement.requestFullscreen?.()}>
            <span className="fullscreen-icon" aria-hidden="true">⛶</span>
            PANTALLA COMPLETA
          </button>
        </div>
      </section>
    </main>
  )
}

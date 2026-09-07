import type { CSSProperties, ReactNode } from 'react'

type PlayingCardProps = {
  children: ReactNode
  variant?: 'hero' | 'stimulus' | 'default'
  hidden?: boolean
  spotlight?: boolean
}

export function PlayingCard({
  children,
  variant = 'default',
  hidden,
  spotlight = false,
}: PlayingCardProps) {
  const cls = [
    'playing-card',
    variant === 'hero' && 'playing-card--hero',
    variant === 'stimulus' && 'playing-card--stimulus',
  ]
    .filter(Boolean)
    .join(' ')

  if (hidden) return null

  const card = (
    <div className={cls} aria-hidden={variant === 'stimulus'}>
      <div className="playing-card__shine" aria-hidden="true" />
      <div className="playing-card__rays" aria-hidden="true">
        <svg viewBox="0 0 100 100" className="playing-card__rays-svg">
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="50"
              y1="50"
              x2="50"
              y2="6"
              transform={`rotate(${deg} 50 50)`}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.28"
            />
          ))}
        </svg>
      </div>
      <div className="playing-card__corner playing-card__corner--tl" aria-hidden="true">
        ✦
      </div>
      <div className="playing-card__corner playing-card__corner--tr" aria-hidden="true">
        ✦
      </div>
      <div className="playing-card__corner playing-card__corner--bl" aria-hidden="true">
        ✦
      </div>
      <div className="playing-card__corner playing-card__corner--br" aria-hidden="true">
        ✦
      </div>
      <div className="playing-card__frame-outer" aria-hidden="true" />
      <div className="playing-card__inner">
        <div className="playing-card__content">{children}</div>
      </div>
    </div>
  )

  if (spotlight) {
    return (
      <div className="card-spotlight">
        <div className="card-spotlight__halo" aria-hidden="true" />
        <div className="card-spotlight__glow" aria-hidden="true" />
        {card}
      </div>
    )
  }

  return card
}

const STACK_CARDS = [
  { rot: -6, offset: 0, tint: '#fff8f0' },
  { rot: -2, offset: 5, tint: '#f5faff' },
  { rot: 2, offset: 10, tint: '#fff5f8' },
  { rot: 5, offset: 15, tint: '#f8fff5' },
  { rot: 8, offset: 20, tint: '#ffffff' },
]

export function CardStack({ side }: { side: 'left' | 'right' }) {
  const cards = side === 'left' ? STACK_CARDS : [...STACK_CARDS].reverse()
  const topNumber = side === 'left' ? '7' : '3'
  const numberClass =
    side === 'left' ? 'card-stack__number card-stack__number--red' : 'card-stack__number card-stack__number--blue'

  return (
    <div className={`card-stack card-stack--${side}`} aria-hidden="true">
      <div className="card-stack__pile">
        {cards.map((c, i) => (
          <div
            key={i}
            className={`card-stack__card${i === cards.length - 1 ? ' card-stack__card--top' : ''}`}
            style={
              {
                '--stack-rot': `${side === 'left' ? c.rot - 10 : -c.rot + 10}deg`,
                '--stack-y': `${c.offset}px`,
                '--stack-x': `${side === 'left' ? c.offset * 0.35 : -c.offset * 0.35}px`,
                '--stack-tint': c.tint,
                zIndex: i + 1,
              } as CSSProperties
            }
          >
            {i === cards.length - 1 && <span className={numberClass}>{topNumber}</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

function StickyNote({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`sticky-note${className ? ` ${className}` : ''}`} aria-hidden="true">
      {children}
    </div>
  )
}

export function SceneDecor({ visible }: { visible: boolean }) {
  if (!visible) return null

  return (
    <div className="scene-decor" aria-hidden="true">
      <div className="scene-decor__wall" />
      <div className="scene-decor__glow scene-decor__glow--warm" />
      <div className="scene-decor__glow scene-decor__glow--cool" />
      <div className="scene-decor__glow scene-decor__glow--center" />
      <div className="scene-decor__desk-wood" />
      <div className="scene-decor__desk-edge" />
      <div className="scene-decor__desk-shadow" />

      <p className="scene-decor__phrase scene-decor__phrase--1">
        Pequeños retos,
        <br />
        grandes logros ♡
      </p>

      <p className="scene-decor__phrase scene-decor__phrase--brain">
        <span className="scene-decor__brain" aria-hidden="true">
          🧠
        </span>
        Un juego para mentes curiosas
      </p>

      <p className="scene-decor__phrase scene-decor__phrase--3">
        NÚMEROS DE HOY
        <br />
        HABILIDADES PARA MAÑANA
      </p>

      <StickyNote className="sticky-note--left">
        Con atención
        <br />
        también se aprende ☺
      </StickyNote>
      <StickyNote className="sticky-note--right">
        Juega · Practica
        <br />
        Mejora · Disfruta ♡
      </StickyNote>

      <div className="scene-decor__star scene-decor__star--1">★</div>
      <div className="scene-decor__star scene-decor__star--2">★</div>
      <div className="scene-decor__star scene-decor__star--3">✦</div>
      <div className="scene-decor__star scene-decor__star--4">★</div>
      <div className="scene-decor__star scene-decor__star--5">✦</div>
      <div className="scene-decor__star scene-decor__star--6">★</div>

      <svg className="scene-decor__lamp" viewBox="0 0 56 80" fill="none">
        <ellipse cx="28" cy="72" rx="18" ry="5" fill="rgba(255,180,60,0.25)" />
        <ellipse cx="28" cy="72" rx="32" ry="12" fill="rgba(255,200,80,0.1)" />
        <path d="M24 24 L32 24 L36 48 L20 48 Z" fill="#ffc94d" />
        <rect x="26" y="48" width="4" height="22" rx="1" fill="#a08050" />
        <ellipse cx="28" cy="22" rx="14" ry="8" fill="#ffe566" />
        <ellipse cx="28" cy="19" rx="10" ry="5" fill="#fff8dc" />
      </svg>
      <div className="scene-decor__lamp-beam" />

      <svg className="scene-decor__plant scene-decor__plant--left" viewBox="0 0 48 56" fill="none">
        <rect x="16" y="38" width="16" height="16" rx="3" fill="#7a5520" />
        <ellipse cx="24" cy="32" rx="18" ry="12" fill="#3ecf8e" />
        <ellipse cx="16" cy="24" rx="10" ry="7" fill="#2ecc71" />
        <ellipse cx="32" cy="22" rx="9" ry="6" fill="#27ae60" />
      </svg>

      <div className="scene-decor__pencil-cup" aria-hidden="true">
        <div className="scene-decor__cup" />
        <div className="scene-decor__cup-pencil scene-decor__cup-pencil--1" />
        <div className="scene-decor__cup-pencil scene-decor__cup-pencil--2" />
        <div className="scene-decor__cup-pencil scene-decor__cup-pencil--3" />
      </div>

      <div className="scene-decor__note scene-decor__note--1">♪</div>
      <div className="scene-decor__note scene-decor__note--2">♫</div>

      <div className="scene-decor__spark scene-decor__spark--1" />
      <div className="scene-decor__spark scene-decor__spark--2" />
      <div className="scene-decor__spark scene-decor__spark--3" />
    </div>
  )
}

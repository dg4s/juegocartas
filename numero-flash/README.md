# NÚMERO FLASH

PWA educativa de cartas: el adulto opera la app; el niño reconstruye un número de tres dígitos con cartas físicas 0–9.

## Estado

**Fase 3 — Implementación local cerrada** (2026-09-06). Paquete NAS en `nas-deploy/`; TAR local (`*.tar` excluido de Git).

> Nombre histórico del proyecto: MONTEO NÚMERO (DEC-001). Identidad operativa vigente: **NÚMERO FLASH** (DEC-051).

## Ubicación

```
C:\Dev\juegocartas\numero-flash
```

## Producto

| Aspecto | Decisión |
|---------|----------|
| Nombre visible | **NÚMERO FLASH** |
| Slug técnico | `numero-flash` |
| Números | 648 combinaciones; 5 distintas por partida |
| Niveles | PRÁCTICA 10s · ESTÁNDAR 7s · RETO 5s (tiempos provisionales) |
| Flujo | IDLE → COUNTDOWN → GO_SIGNAL (500 ms) → EXPOSURE → RECONSTRUCT → VERIFY → ROUND_RESULT → … |
| Cancelación | Termina la partida; vuelve a IDLE |
| Stack | React + Vite + TypeScript; useReducer |
| PWA | vite-plugin-pwa, `display: standalone` |
| Docker | nginx; **8095:8080** |
| Entrega | `numero-flash-image.tar` (manual al NAS) |

## Documentación

| Documento | Descripción |
|-----------|-------------|
| [SPECIFICATION.md](SPECIFICATION.md) | Spec funcional + arquitectura |
| [DECISIONS.md](DECISIONS.md) | DEC-001 a DEC-052 |
| [PROJECT_STATUS.md](PROJECT_STATUS.md) | Estado |
| [TODO.md](TODO.md) | Pendientes |
| [RULES.md](RULES.md) | Reglas |
| [CONTEXT.md](CONTEXT.md) | Contexto |

## Decisiones relevantes

- **DEC-026–027:** TypeScript y useReducer
- **DEC-028–032:** Flujo, cancelación, DETENER, visibility, GO_SIGNAL 500 ms
- **DEC-033–035:** Generador, timers, Web Audio API
- **DEC-037–038:** PWA generateSW y standalone
- **DEC-043–046:** Vitest, ESLint, Docker 8095:8080, compose
- **DEC-051:** Renombrado definitivo a NÚMERO FLASH / numero-flash

Repositorio oficial: [https://github.com/dg4s/juegocartas.git](https://github.com/dg4s/juegocartas.git). Commit y push solo a petición expresa del usuario (DEC-050).

## Cómo ejecutarlo

```bash
npm install
npm test
npm run dev
```

Docker (puerto host 8095 → 8080):

```bash
docker compose up --build
```

## Pendiente

- Transferencia manual de `numero-flash-image.tar` al NAS (generar con `docker save`; ver `nas-deploy/`)

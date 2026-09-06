# MONTEO NÚMERO

PWA educativa: el adulto opera la app; el niño reconstruye un número de tres dígitos con cartas físicas 0–9.

## Estado

**Fase 2 — Arquitectura documental cerrada.** Código no iniciado.

## Ubicación

```
C:\Dev\juegocartas\MONTEO-NUMERO
```

## MVP

| Aspecto | Decisión |
|---------|----------|
| Números | 648 combinaciones; 5 distintas por partida |
| Niveles | PRÁCTICA 10s · ESTÁNDAR 7s · RETO 5s (tiempos provisionales) |
| Flujo | IDLE → COUNTDOWN → GO_SIGNAL (500 ms) → EXPOSURE → RECONSTRUCT → VERIFY → ROUND_RESULT → … |
| Cancelación | Termina la partida; vuelve a IDLE |
| Stack | React + Vite + TypeScript; useReducer |
| PWA | vite-plugin-pwa, `display: standalone` |
| Docker | nginx; **8095:8080** |
| Entrega | `monteo-numero-image.tar` (manual al NAS) |

## Documentación

| Documento | Descripción |
|-----------|-------------|
| [SPECIFICATION.md](SPECIFICATION.md) | Spec funcional + arquitectura |
| [DECISIONS.md](DECISIONS.md) | DEC-001 a DEC-050 |
| [PROJECT_STATUS.md](PROJECT_STATUS.md) | Estado |
| [TODO.md](TODO.md) | Pendientes |
| [RULES.md](RULES.md) | Reglas |
| [CONTEXT.md](CONTEXT.md) | Contexto |

## Decisiones de Fase 2 (selección)

- **DEC-026–027:** TypeScript y useReducer
- **DEC-028–032:** Flujo, cancelación, DETENER, visibility, GO_SIGNAL 500 ms
- **DEC-033–035:** Generador, timers, Web Audio API
- **DEC-037–038:** PWA generateSW y standalone
- **DEC-043–046:** Vitest, ESLint, Docker 8095:8080, compose previsto

Repositorio oficial: [https://github.com/dg4s/juegocartas.git](https://github.com/dg4s/juegocartas.git). Commit y push solo a petición expresa del usuario (DEC-050).

## Pendiente

Implementación de código y artefactos Docker. Sin programar hasta autorización explícita. Caddy, DuckDNS y NAS sin cambios.

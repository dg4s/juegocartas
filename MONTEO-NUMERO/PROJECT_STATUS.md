# MONTEO NÚMERO — Estado del Proyecto

**Última actualización:** 2026-09-06 (política Git/GitHub documentada)

## Fase actual

| Campo | Valor |
|-------|-------|
| **Fase** | 2 — Arquitectura documental **cerrada** |
| **Estado general** | Spec + arquitectura documentadas; código no iniciado |
| **Código de aplicación** | No iniciado |
| **Docker / NAS / Caddy / DuckDNS** | Documentados o sin cambios; no implementados / no tocados |

## Resumen de avance

- [x] Fase 0 — preparación y continuidad
- [x] Fase 1 — especificación funcional del MVP
- [x] Fase 2 — arquitectura documental (stack, estados, Docker, PWA, tests)
- [x] Control de versiones Git/GitHub documentado (DEC-050; ID pedido DEC-026 ya ocupado)
- [ ] Implementación PWA (React + Vite + TypeScript)
- [ ] Dockerfile / compose / nginx
- [ ] Imagen Docker y `monteo-numero-image.tar`
- [ ] Despliegue TerraMaster / Caddy / DuckDNS

## Arquitectura documental (Fase 2)

| Elemento | Estado | Decisión |
|----------|--------|----------|
| React + Vite + TypeScript | APROBADO | DEC-026 |
| useReducer (sin Redux/Zustand/XState) | APROBADO | DEC-027 |
| Flujo y transiciones | APROBADO | DEC-028, DEC-041 |
| Cancelación termina partida | APROBADO | DEC-029 |
| DETENER / visibilitychange | APROBADO | DEC-030, DEC-031 |
| GO_SIGNAL 500 ms | APROBADO | DEC-032 |
| Generador 5 distintos / 648 | APROBADO | DEC-033 |
| Timers centralizados | APROBADO | DEC-034 |
| Web Audio API | APROBADO | DEC-035 |
| Wake Lock opcional | APROBADO | DEC-022, DEC-036 |
| vite-plugin-pwa generateSW | APROBADO | DEC-037 |
| standalone + Fullscreen opcional | APROBADO | DEC-038 |
| Responsive / a11y | APROBADO | DEC-039, DEC-040 |
| Mute localStorage | APROBADO | DEC-042 |
| Vitest / ESLint | APROBADO | DEC-043, DEC-044 |
| Docker 8095:8080 | APROBADO (no implementado) | DEC-045, DEC-046 |
| Git/GitHub (origin oficial) | APROBADO; sin commit en esta tarea | DEC-050 |

## Supercedidas en Fase 2

| Anterior | Reemplazo |
|----------|-----------|
| DEC-017 | DEC-031 |
| DEC-023 | DEC-032 |
| DEC-024 | DEC-028, DEC-029, DEC-030, DEC-041 |

## Puertos

| Concepto | Valor | Estado |
|----------|-------|--------|
| Host | 8095 | Aprobado (DEC-011); libre el 2026-09-06 |
| Contenedor | 8080 | Aprobado (DEC-045) |

## Restricciones activas

- No programar hasta autorización explícita
- No crear package.json, src/, Dockerfile, compose, nginx.conf
- No modificar Caddy, DuckDNS ni NAS
- No instalar dependencias
- No commit, no push, no force push, no modificar remote por iniciativa del agente
- Git listo para trazabilidad; esta tarea **no** ejecutó commit ni push

## Próximo hito

Autorización de implementación (Composer u otra instrucción), **después** de revisión de este cierre por GPT.

## Documentos de referencia

- `DECISIONS.md` — DEC-001 a DEC-050
- `SPECIFICATION.md` — spec + arquitectura
- `RULES.md`, `TODO.md`, `CONTEXT.md`

# NÚMERO FLASH — Estado del Proyecto

**Última actualización:** 2026-09-06 19:37 (DEC-052 GO + commit/push GitHub)

## Fase actual

| Campo | Valor |
|-------|-------|
| **Fase** | 3 — Implementación local **cerrada** + IDLE alineado al mock v0 |
| **Estado general** | Fase 3 publicada en GitHub (`main`). NAS/Caddy/DuckDNS sin cambios. |
| **Código** | `C:\Dev\juegocartas\numero-flash\` |
| **Producto** | **NÚMERO FLASH** · slug `numero-flash` (DEC-051) |
| **Último commit en GitHub** | Este commit (2026-09-06 19:37) |
| **Rama / remote** | `main` · `origin` = `https://github.com/dg4s/juegocartas.git` |

## Registro de avance

| Fecha | Hito | Estado |
|-------|------|--------|
| 2026-09-06 | Fases 0–2 — documentación | Completada |
| 2026-09-06 | DEC-050 — Git/GitHub | Completada |
| 2026-09-06 | Commit/push documentación inicial | Hecho (`9d4c84ce` → GitHub) |
| 2026-09-06 | Fase 3 — PWA, tests, Docker, TAR | Completada en local |
| 2026-09-06 | Carpeta renombrada por usuario → `numero-flash` | Hecho |
| 2026-09-06 | DEC-051 — Renombrado definitivo NÚMERO FLASH | Completada |
| 2026-09-06 | Rediseño visual (carta central, pantallas de juego) | Completada |
| 2026-09-06 18:48 | Rediseño visual iteración 2 (escena rica, niveles coloridos) | Completada |
| 2026-09-06 ~19:00 | Fix botones — halos/overlays (`pointer-events: none`; controles `z-index: 20`) | Completada |
| 2026-09-06 19:25 | Auditoría Agent: tests/lint/build + clics en 8095 | Completada |
| 2026-09-06 19:23 | Registro de avance en docs de continuidad | Completada |
| 2026-09-06 19:29 | IDLE: escena local `public/home-scene.png` + botones reales visibles (mock v0) | Completada |
| 2026-09-06 19:35 | DEC-052 — rótulo UI **GO** (estado técnico GO_SIGNAL sin cambio) | Completada |
| 2026-09-06 19:37 | Commit/push Fase 3 + DEC-051/052 → GitHub | Completada |
| — | Reconstruir Docker/TAR para publicar IDLE en `:8095` | Pendiente |
| — | Carga en TerraMaster / Caddy / DuckDNS | Pendiente; no tocar |

## Verificación local (2026-09-06 19:25)

| Comprobación | Resultado |
|--------------|-----------|
| Vitest | 19 tests OK |
| ESLint | OK |
| Typecheck (`tsc -b`) | OK |
| Build Vite + generateSW | OK |
| Docker build | OK |
| Puerto host 8095 | Mapeo `8095:8080` activo |
| Contenedor | `numero-flash` **Up (healthy)** |
| URL local | http://localhost:8095 (HTTP 200) |
| PWA manifest | `name` / `short_name`: NÚMERO FLASH |
| Imagen TAR | `numero-flash-image.tar` (~21 MB) |
| TAR anterior | `monteo-numero-image.tar` eliminado |
| Working tree | `numero-flash/` sin commitear; `MONTEO-NUMERO/` eliminado en working tree |
| Flujo de partida | RETO: INICIAR → COUNTDOWN → EXPOSURE → RECONSTRUCT → VERIFY → ROUND_RESULT → DETENER → IDLE |
| Clics inicio | Niveles OK; INICIAR/SONIDO/PANTALLA COMPLETA OK (landscape requiere scroll) |
| Accesibilidad EXPOSURE | Número `aria-hidden`; `aria-live` vacío (DEC-040) |

## IDLE — mock v0 (2026-09-06 19:29)

Solo apariencia de la pantalla de inicio. Lógica de juego **sin cambios**.

| Campo | Valor |
|-------|-------|
| Asset | `public/home-scene.png` (local; no URL remota) |
| Controles | HTML real, `opacity: 1` — niveles, INICIAR, SONIDO, PANTALLA COMPLETA |
| INICIAR | `game.start()` → COUNTDOWN (flujo vigente) |
| Verificación | Vite `http://127.0.0.1:5173` — 6 controles visibles y clicables; INICIAR → COUNTDOWN |
| Tests | Vitest 19/19 OK |
| No integrado | Next.js, Tailwind, shadcn, `@vercel/analytics` |
| Docker `:8095` | Imagen anterior; no reconstruida |

El fold landscape de INICIAR queda **resuelto en Vite** (controles anclados al borde inferior).

## Mecánica — sin cambios

Estados, reducer, universo 648, 5 rondas, cancelación, timers, audio, PWA y accesibilidad **sin alteración** en el cambio de IDLE.

## Auditoría Agent (2026-09-06 19:25)

Verificación: Vitest 19 OK · ESLint OK · `tsc -b` + Vite + generateSW OK · contenedor `numero-flash` Up (healthy) · http://localhost:8095 200.

Flujo comprobado en el contenedor (RETO): niveles, SONIDO ON/OFF, INICIAR → COUNTDOWN → EXPOSURE (número `aria-hidden`, `aria-live` vacío) → RECONSTRUCT (¡LISTO!) → VERIFY (sin DETENER) → ROUND_RESULT (SIGUIENTE) → DETENER → IDLE. Halos/decoración no bloquean clics (`pointer-events: none` vigente).

**Hallazgo de layout (no mecánica):** en landscape 1280×800, INICIAR y la barra SONIDO/PANTALLA COMPLETA quedan bajo el fold (los niveles sí caben). Los clics funcionan si hay scroll; el CTA principal no es visible sin desplazarse. En portrait 390×844, INICIAR visible; la barra de utilidades queda bajo el fold. No se tocó CSS a la espera de autorización: el rediseño visual acaba de cerrar 3 iteraciones.

**Consultas GPT (no improvisar):**
1. `RULES.md` sigue diciendo «prohibido programar» / «no crear Dockerfile» pese a Fase 3 cerrada.
2. Copy decorativo («Mejora», «HABILIDADES PARA MAÑANA», «Con atención también se aprende») vs DEC-025.

## Siguiente paso

1. Rebuild Docker + `numero-flash-image.tar` si se quiere IDLE/GO en `:8095`.
2. Transferencia manual del TAR al NAS (post-auditoría).

## Restricciones activas

- No Caddy, DuckDNS ni NAS
- No commit/push salvo petición expresa
- No cambiar puerto 8095

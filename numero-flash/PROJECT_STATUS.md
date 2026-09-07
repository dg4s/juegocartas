# NÚMERO FLASH — Estado del Proyecto

**Última actualización:** 2026-09-07 (iconos PWA NF + TAR NAS)

## Fase actual

| Campo | Valor |
|-------|-------|
| **Fase** | 3 — Implementación local **cerrada** + IDLE alineado al mock v0 |
| **Estado general** | Fase 3 en GitHub. Iconos PWA **NF** (sustituyen MN). TAR NAS actualizado en local. Caddy/DuckDNS sin cambios. |
| **Código** | `C:\Dev\juegocartas\numero-flash\` |
| **Producto** | **NÚMERO FLASH** · slug `numero-flash` (DEC-051) |
| **Último commit en GitHub** | `c340a87` (2026-09-07) |
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
| 2026-09-06 19:37 | Commit/push Fase 3 + DEC-051/052 → GitHub (`9004058`) | Completada |
| 2026-09-06 19:59 | Footer global: dg4s.site + © 2026 dg4s | Completada (local; sin commit) |
| 2026-09-06 20:30 | Rebuild Docker + TAR + carpeta `nas-deploy/` para TerraMaster | Completada |
| 2026-09-06 20:35 | Commit/push footer + paquete NAS (`3b3a70f`) | Completada |
| 2026-09-07 | Corrección docs `nas-deploy/` (`673d8b9`) + registro continuidad | Completada |
| 2026-09-07 | Iconos PWA **NF** + commit/push (`c340a87`) | Completada |
| — | Transferencia manual TAR + compose al TerraMaster | Pendiente |

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
| Working tree | Footer en `App.tsx` / `global.css` **sin commitear** (post-`9004058`) |
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

## Footer (2026-09-06 19:59)

Pie fijo en todas las pantallas: «Sistema desarrollado por dg4s.site | © 2026 dg4s. Todos los derechos reservados». Enlace a https://dg4s.site. Solo UI; sin cambio de mecánica.

## Mecánica — sin cambios

Estados, reducer, universo 648, 5 rondas, cancelación, timers, audio, PWA y accesibilidad **sin alteración** en el cambio de IDLE.

## Auditoría Agent (2026-09-06 19:25)

Verificación: Vitest 19 OK · ESLint OK · `tsc -b` + Vite + generateSW OK · contenedor `numero-flash` Up (healthy) · http://localhost:8095 200.

Flujo comprobado en el contenedor (RETO): niveles, SONIDO ON/OFF, INICIAR → COUNTDOWN → EXPOSURE (número `aria-hidden`, `aria-live` vacío) → RECONSTRUCT (¡LISTO!) → VERIFY (sin DETENER) → ROUND_RESULT (SIGUIENTE) → DETENER → IDLE. Halos/decoración no bloquean clics (`pointer-events: none` vigente).

**Hallazgo de layout (no mecánica):** en landscape 1280×800, INICIAR y la barra SONIDO/PANTALLA COMPLETA quedan bajo el fold (los niveles sí caben). Los clics funcionan si hay scroll; el CTA principal no es visible sin desplazarse. En portrait 390×844, INICIAR visible; la barra de utilidades queda bajo el fold. No se tocó CSS a la espera de autorización: el rediseño visual acaba de cerrar 3 iteraciones.

**Consultas GPT (no improvisar):**
1. `RULES.md` sigue diciendo «prohibido programar» / «no crear Dockerfile» pese a Fase 3 cerrada.
2. Copy decorativo («Mejora», «HABILIDADES PARA MAÑANA», «Con atención también se aprende») vs DEC-025.

## Paquete NAS (2026-09-07)

`nas-deploy/` listo para transferencia manual al TerraMaster:

| Archivo | Notas |
|---------|-------|
| `numero-flash-image.tar` | Imagen `numero-flash:latest` (~23 MB; local, gitignored) |
| `docker-compose.yml` | Solo `image:`; **sin** `build:` |
| `INSTALACION-NAS.md` | File Manager → Container Station import → compose |
| `README.md` | Resumen; despliegue vs. fase futura Caddy/DuckDNS |

Flujo: PC Windows → interfaz de archivos TerraMaster → importar TAR → levantar compose. **No** SSH para subir archivos. **No** build ni código fuente en el NAS.

TAR local regenerado **2026-09-07** con iconos NF (gitignored; copiar manualmente a `nas-deploy/`).

## Iconos PWA (2026-09-07)

Sustituido resto **MN** (MONTEO NÚMERO) por identidad **NF** (NÚMERO FLASH):

| Elemento | Valor |
|----------|-------|
| Fondo | `#081a3a` |
| N | `#f8fbff` |
| F | `#ffd033` |
| Assets | `favicon.svg`, `icon-192.png`, `icon-512.png` |
| Manifest / meta | `theme_color` / `background_color` → `#081a3a` |

Verificación: `npm run build` OK · contenedor `:8095` healthy · TAR ~23 MB en `nas-deploy/`.

**Nota Windows PWA:** desinstalar acceso directo antiguo e reinstalar para refrescar icono en caché.

## Siguiente paso

1. Transferencia manual de `nas-deploy/` (TAR + compose) al TerraMaster.
2. Importar imagen y levantar contenedor en Container Station.
3. Caddy/DuckDNS (fase posterior, vía SSH).

## Restricciones activas

- No Caddy, DuckDNS ni NAS
- No commit/push salvo petición expresa
- No cambiar puerto 8095

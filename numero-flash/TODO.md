# NÚMERO FLASH — Tareas Pendientes

**Última actualización:** 2026-09-06 19:59 (footer dg4s.site)

## Fase 0 — Preparación (completada)

- [x] Documentación de continuidad, Docker oficial, puerto 8095, mecánica

## Fase 1 — Especificación funcional (completada)

- [x] Mecánica, niveles, rondas, comprobación, pedagogía

## Fase 2 — Arquitectura documental (completada)

- [x] Stack, estados, timers, PWA, Docker documentados
- [x] Política Git/GitHub (DEC-050)

## Fase 3 — Implementación (completada en local)

- [x] React + Vite + TypeScript
- [x] Universo 648 y selección de cinco números
- [x] Reducer y flujo de estados
- [x] Timers, DETENER, visibilitychange
- [x] UI Principal / Juego / Resultados / mute
- [x] Audio Web Audio API
- [x] Wake Lock opcional
- [x] PWA vite-plugin-pwa generateSW
- [x] Vitest y ESLint
- [x] Dockerfile, nginx, docker-compose
- [x] Prueba local `http://localhost:8095`
- [x] `docker save` → `numero-flash-image.tar`

## Fase 3b — Renombrado + rediseño visual (completada)

- [x] DEC-051 — NÚMERO FLASH / numero-flash
- [x] Identidad Docker, PWA, package.json, localStorage
- [x] Rediseño visual con carta central
- [x] Pantallas: inicio, juego, verificación, resultados
- [x] Contenedor `numero-flash` healthy en 8095
- [x] Registro de avance en docs de continuidad (2026-09-06 18:12)

## Fase 3c — Rediseño visual v2 (completada)

- [x] Interfaz HTML/CSS/React inspirada en imagen de referencia
- [x] Fondo con gradientes, iluminación cálida/fría, mesa de juego
- [x] Carta central con rayos SVG, doble marco, profundidad
- [x] Pilas decorativas de cartas laterales
- [x] Elementos decorativos (estrellas, lámpara, planta, lápiz, notas)
- [x] Botón INICIAR dorado; niveles como tarjetas coloridas
- [x] Modo foco en EXPOSURE/COUNTDOWN/GO_SIGNAL sin decoración
- [x] Docker reconstruido; TAR actualizado

## Fase 3d — Auditoría Agent (2026-09-06 19:25)

- [x] `npm test` (19) · `npm run lint` · `npm run build`
- [x] Contenedor `numero-flash` healthy en 8095
- [x] Clics: niveles, SONIDO, INICIAR, DETENER, ¡LISTO!, CORRECTO, SIGUIENTE
- [x] EXPOSURE: número no en `aria-live`; carta `aria-hidden`
- [x] DETENER ausente en VERIFY y ROUND_RESULT; cancelación → IDLE
- [x] Compactar home landscape — resuelto en IDLE v0 (controles anclados abajo; visibles en 1280×800)
- [ ] CONSULTA GPT: actualizar `RULES.md` (aún habla de Fase 2)
- [ ] CONSULTA GPT: frases decorativas vs DEC-025 (ahora también en `home-scene.png`)

## Fase 3e — Registro de avance (2026-09-06 19:23)

- [x] Handoff Agent leído; origin verificado (`https://github.com/dg4s/juegocartas.git`)
- [x] Avance documentado en PROJECT_STATUS, TODO, CONTEXT y README

## Fase 3f — IDLE = mock v0 (2026-09-06 19:29)

- [x] Copiar escena a `public/home-scene.png`
- [x] Botones reales visibles (no `opacity: 0` sobre PNG remoto)
- [x] INICIAR → COUNTDOWN (lógica intacta)
- [x] Vitest 19/19; clics verificados en Vite `:5173`
- [x] Rebuild Docker / TAR para `:8095` (2026-09-06 20:30)

## Fase 3g — DEC-052 GO (2026-09-06 19:35)

- [x] Texto visible y `aria-live`: **GO** (sustituye «¡FUERA!» en UI)
- [x] Estado técnico `GO_SIGNAL` sin renombrar
- [x] DEC-052 registrado; SPEC/RULES actualizados
- [x] Vitest 19/19

## Fase 4 — Publicación Git (2026-09-06 19:37)

- [x] Commit de `numero-flash/` (sustituye `MONTEO-NUMERO/`) — autorizado por usuario
- [x] Push a `origin/main` — autorizado por usuario

## Fase 3h — Footer dg4s (2026-09-06 19:59)

- [x] Pie global: «Sistema desarrollado por dg4s.site | © 2026 dg4s. Todos los derechos reservados»
- [x] Enlace https://dg4s.site; visible en IDLE, juego y resultados
- [x] Commit/push footer + paquete NAS (autorizado por usuario)
- [x] Rebuild Docker / TAR para `:8095` (2026-09-06 20:30)

## Fase 5 — NAS (artefactos listos; transferencia manual)

- [x] Generar `numero-flash-image.tar` + `nas-deploy/` (compose, instrucciones)
- [ ] Transferencia manual y `docker load`
- [ ] Pruebas en TerraMaster
- [ ] Docs de instalación y rollback
- [ ] Caddy/DuckDNS post-auditoría
- [ ] Verificar `https://juegocartaspwa.duckdns.org`

## Verificaciones de puerto

| Momento | Puerto | Estado |
|---------|--------|--------|
| Local 2026-09-06 19:25 | 8095 → 8080 | Activo; contenedor healthy; flujo auditado |
| NAS | 8095 | Pendiente |

# MONTEO NÚMERO — Tareas Pendientes

**Última actualización:** 2026-09-06 (política Git documentada)

## Fase 0 — Preparación (completada)

- [x] Estructura de documentación y continuidad
- [x] Docker como tecnología oficial
- [x] Despliegue manual al NAS documentado
- [x] Puerto 8095 comprobado (LIBRE)
- [x] Mecánica numérica y dominio futuro

## Fase 1 — Especificación funcional (completada)

- [x] Mecánica, universo 648, niveles PRÁCTICA/ESTÁNDAR/RETO
- [x] Rondas, comprobación, audio, UI mínima, pedagogía
- [x] SPECIFICATION.md funcional cerrada

## Fase 2 — Arquitectura documental (completada)

- [x] Stack React + Vite + TypeScript
- [x] Máquina de estados useReducer
- [x] Cancelación = fin de partida
- [x] DETENER y visibilitychange por estado
- [x] GO_SIGNAL 500 ms
- [x] Generador: 5 distintos / Fisher-Yates
- [x] Timers centralizados
- [x] Web Audio API
- [x] PWA vite-plugin-pwa + standalone
- [x] Responsive, a11y, mute localStorage
- [x] Vitest y ESLint
- [x] Docker multi-stage, mapeo 8095:8080, compose previsto
- [x] Dependencias excluidas y estructura prevista
- [x] Política Git/GitHub documentada (DEC-050; remoto oficial; commit/push solo a petición)

## Fase 3 — Implementación (pendiente; requiere autorización)

- [ ] Inicializar React + Vite + TypeScript (sin hacerlo hasta autorización)
- [ ] Implementar reducer y flujo de estados
- [ ] Generador 648 y selección de cinco números
- [ ] Timers centralizados y limpieza
- [ ] Audio (Web Audio API)
- [ ] UI (4 pantallas, controles, landscape)
- [ ] PWA (vite-plugin-pwa, generateSW)
- [ ] Wake Lock opcional
- [ ] Tests Vitest
- [ ] ESLint mínimo

## Fase 4 — Docker (pendiente de implementación)

- [ ] Dockerfile multi-stage
- [ ] nginx.conf (SPA fallback)
- [ ] docker-compose.yml según DEC-046
- [ ] Verificar 8095 al crear el contenedor
- [ ] Probar el mismo artefacto
- [ ] `docker save` → `monteo-numero-image.tar`

## Fase 5 — NAS (pendiente; no tocar ahora)

- [ ] Transferencia manual y `docker load`
- [ ] Pruebas en TerraMaster
- [ ] Docs de instalación y rollback
- [ ] Caddy/DuckDNS post-auditoría
- [ ] Verificar `https://juegocartaspwa.duckdns.org`

## Verificaciones de puerto

| Momento | Puerto | Estado |
|---------|--------|--------|
| Local 2026-09-06 | 8095 | LIBRE |
| Al crear contenedor | 8095 → 8080 | Pendiente |
| NAS | 8095 | Pendiente |

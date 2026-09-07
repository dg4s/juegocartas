# NÚMERO FLASH — Contexto del Proyecto

## Resumen

**NÚMERO FLASH** es una **PWA educativa** que genera estímulos numéricos para una actividad con cartas físicas. El adulto opera la app; el niño reconstruye con una carta por dígito (0–9, mismo color).

> Nombre histórico: **MONTEO NÚMERO** (DEC-001). Identidad operativa vigente desde DEC-051.

Documentación funcional (Fase 1) y arquitectónica (Fase 2) **cerradas**. Fase 3 **implementada en local** (PWA + Docker + rediseño visual). NAS/Caddy/DuckDNS sin cambios.

### Mecánica numérica (APROBADO)

- Tres dígitos; primer dígito 1–9; sin repetición; 9 × 9 × 8 = **648**.
- Cinco números distintos por partida; universo completo en cada partida nueva.
- Generación válida de origen. Ver DEC-012, DEC-018, DEC-033.

### Niveles (DEC-014)

- **PRÁCTICA** (10000 ms), **ESTÁNDAR** (7000 ms), **RETO** (5000 ms) — nombres aprobados; tiempos provisionales.
- Solo tiempo de exposición. DEC-013 (EXPLORACIÓN / INTEGRACIÓN / DESAFÍO) es histórico.

### Actores

- **Adulto:** opera la PWA.
- **Niño:** usa cartas físicas.

### Stack y estado

- React + Vite + TypeScript (DEC-026).
- Máquina de estados con useReducer (DEC-027).
- Cancelación **termina la partida** (DEC-029).

## Control de versiones (APROBADO)

> DEC-050

| Campo | Valor |
|-------|-------|
| Remote | `origin` |
| URL | `https://github.com/dg4s/juegocartas.git` |

Git/GitHub sirve para historial, trazabilidad, recuperación, respaldo y comparación entre fases. **No hay commit ni push automático.** Commit y push solo con solicitud expresa del usuario. NO force push. NO modificar remote sin autorización.

## Ubicación del proyecto

```
C:\Dev\juegocartas\numero-flash
```

## Identidad operativa (DEC-051)

| Campo | Valor |
|-------|-------|
| Nombre visible | **NÚMERO FLASH** |
| Slug | `numero-flash` |
| Imagen Docker | `numero-flash:latest` |
| Contenedor | `numero-flash` |
| TAR | `numero-flash-image.tar` |
| Host : contenedor | **8095 : 8080** |

## Entornos

| Entorno | Plataforma | Ejecución |
|---------|------------|-----------|
| Desarrollo local | Windows | Docker local (`8095:8080`) |
| Producción | TerraMaster NAS | Docker (despliegue manual) |

## Infraestructura externa (no modificar)

- **Caddy** — reverse proxy (no tocar).
- **DuckDNS** — DNS dinámico (no tocar).

### Dominio futuro (DOCUMENTADO)

| Campo | Valor |
|-------|-------|
| Dominio | `juegocartaspwa.duckdns.org` |
| URL | `https://juegocartaspwa.duckdns.org` |
| Cadena | Internet → DuckDNS → router → Caddy HTTPS → Docker → PWA |
| Cuándo configurar | Tras implementación, pruebas, auditoría y validación del contenedor |

## Arquitectura de ejecución

- Multi-stage: Node + Vite → `dist/` → nginx (DEC-045).
- Host **8095** : contenedor **8080**.
- Imagen `numero-flash:latest`; entrega `numero-flash-image.tar`.
- Compose e imagen locales: `docker-compose.yml`, `numero-flash:latest`, `numero-flash-image.tar`.

## Despliegue

Manual al NAS: `docker save` → transferencia → `docker load`. Sin descompresión automática del proyecto.

## Puertos

| Concepto | Valor | Estado |
|----------|-------|--------|
| Host | **8095** | Aprobado (DEC-011); re-verificar al crear contenedor y en NAS |
| Contenedor | **8080** | Aprobado (DEC-045) |

## Fase actual

**Fase 3 — Implementación local cerrada y publicada en GitHub** (PWA + Docker + DEC-051/052). IDLE con mock v0 (`home-scene.png`); señal de arranque **GO**. Commit/push 2026-09-06 19:37. NAS/Caddy/DuckDNS sin cambios.

**Último registro de avance:** 2026-09-06 19:37.

## Documentos de continuidad

| Documento | Propósito |
|-----------|-----------|
| `PROJECT_STATUS.md` | Estado actual |
| `TODO.md` | Tareas pendientes |
| `RULES.md` | Reglas |
| `DECISIONS.md` | DEC-001 a DEC-052 |
| `SPECIFICATION.md` | Spec funcional + arquitectura |
| `README.md` | Entrada del repositorio |
| `docs/architecture/` | Resumen arquitectónico |
| `docs/testing/` | Alcance de pruebas documentado |
| `docs/deployment/` | Flujo de entrega documentado |

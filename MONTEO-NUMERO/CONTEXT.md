# MONTEO NÚMERO — Contexto del Proyecto

## Resumen

MONTEO NÚMERO es una **PWA educativa** que genera estímulos numéricos para una actividad con cartas físicas. El adulto opera la app; el niño reconstruye con una carta por dígito (0–9, mismo color).

Documentación funcional (Fase 1) y arquitectónica (Fase 2) **cerradas**. No hay código de aplicación.

### Mecánica numérica (APROBADO)

- Tres dígitos; primer dígito 1–9; sin repetición; 9 × 9 × 8 = **648**.
- Cinco números distintos por partida; universo completo en cada partida nueva.
- Generación válida de origen. Ver DEC-012, DEC-018, DEC-033.

### Niveles MVP (DEC-014)

- **PRÁCTICA** (10000 ms), **ESTÁNDAR** (7000 ms), **RETO** (5000 ms) — nombres aprobados; tiempos provisionales.
- Solo tiempo de exposición. DEC-013 (EXPLORACIÓN / INTEGRACIÓN / DESAFÍO) es histórico.

### Actores

- **Adulto:** opera la PWA.
- **Niño:** usa cartas físicas.

### Stack y estado (Fase 2)

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
C:\Dev\juegocartas\MONTEO-NUMERO
```

## Entornos

| Entorno | Plataforma | Ejecución |
|---------|------------|-----------|
| Desarrollo local | Windows | Docker (documentado, no implementado) |
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
- Imagen `monteo-numero:latest`; entrega `monteo-numero-image.tar`.
- Compose previsto (DEC-046); **archivos no creados**.

## Despliegue

Manual al NAS: `docker save` → transferencia → `docker load`. Sin descompresión automática del proyecto.

## Puertos

| Concepto | Valor | Estado |
|----------|-------|--------|
| Host | **8095** | Aprobado (DEC-011); re-verificar al crear contenedor y en NAS |
| Contenedor | **8080** | Aprobado (DEC-045) |

### Comprobación de puerto (2026-09-06)

- TCP 8095 **LIBRE** (`Get-NetTCPConnection`, `netstat -ano`).
- Ningún servicio detenido.

## Fase actual

**Fase 2 — Arquitectura documental cerrada.** Implementación de código pendiente. Docker/NAS/Caddy/DuckDNS sin cambios de infraestructura.

## Documentos de continuidad

| Documento | Propósito |
|-----------|-----------|
| `PROJECT_STATUS.md` | Estado actual |
| `TODO.md` | Tareas pendientes |
| `RULES.md` | Reglas |
| `DECISIONS.md` | DEC-001 a DEC-050 |
| `SPECIFICATION.md` | Spec funcional + arquitectura |
| `README.md` | Entrada del repositorio |
| `docs/architecture/` | Resumen arquitectónico |
| `docs/testing/` | Alcance de pruebas documentado |
| `docs/deployment/` | Flujo de entrega documentado |

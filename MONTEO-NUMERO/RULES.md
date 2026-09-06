# MONTEO NÚMERO — Reglas del Proyecto

## Reglas generales

1. **Fase actual:** Documentación de Fase 1 (funcional) y Fase 2 (arquitectura) **cerradas**. Sigue **prohibido programar** hasta que el usuario lo solicite explícitamente.
2. **Documentación primero:** Toda decisión se registra en `DECISIONS.md` antes de implementarse.
3. **Continuidad:** Actualizar `PROJECT_STATUS.md`, `TODO.md` y `CONTEXT.md` al finalizar cada sesión.
4. **Historial:** No borrar decisiones supercedidas; marcar SUPERSEDIDO y conservar evidencia.

## Restricciones de infraestructura

| Recurso | Regla |
|---------|-------|
| **Caddy** | NO modificar |
| **DuckDNS** | NO modificar |
| **TerraMaster NAS** | NO realizar cambios hasta fase de despliegue |
| **Docker** | Arquitectura documentada; NO crear Dockerfile, compose ni imagen todavía |

## Restricciones de desarrollo

NO crear todavía (hasta autorización explícita):

- package.json, src/, tests de código
- React / Vite / TypeScript instalados
- Dockerfile, docker-compose.yml, nginx.conf
- vite.config.*, tsconfig.*, manifest, Service Worker
- Componentes, hooks, reducer, código del juego

## Stack aprobado (cuando se implemente)

- React + Vite + TypeScript (DEC-026)
- useReducer; **no** Redux, Zustand, XState (DEC-027)
- Web Audio API; **no** Howler ni archivos de audio (DEC-035)
- vite-plugin-pwa + generateSW (DEC-037)
- Vitest (DEC-043), ESLint mínimo (DEC-044)
- Dependencias excluidas: ver DEC-047

## Reglas de juego (MVP)

| Regla | Referencia |
|-------|------------|
| 5 rondas fijas; 5 números distintos por partida | DEC-015, DEC-033 |
| Universo 648; no excluir “fáciles” | DEC-012, DEC-018 |
| Generación válida de origen | DEC-012, DEC-033 |
| Comprobación solo CORRECTO / INCORRECTO | DEC-016 |
| NO capturar número reconstruido | DEC-016 |
| Cancelación termina la partida; no puntúa; no consume turno | DEC-029 |
| NO reanudar el mismo estímulo | DEC-031 |
| GO_SIGNAL 500 ms antes del número | DEC-032 |
| ROUND_RESULT avanza solo con SIGUIENTE | DEC-041 |

## Reglas de interfaz (MVP)

| Regla | Referencia |
|-------|------------|
| DETENER solo en COUNTDOWN, GO_SIGNAL, EXPOSURE, RECONSTRUCT | DEC-030 |
| NO cronómetro visible durante exposición | DEC-021 |
| NO bloquear orientación; prioridad landscape | DEC-020, DEC-039 |
| display standalone; Fullscreen API opcional | DEC-038 |
| Screen Wake Lock opcional, nunca crítico | DEC-022, DEC-036 |
| Sonido ON por defecto; mute puede ir a localStorage | DEC-019, DEC-042 |
| NO anunciar el número por lector de pantalla en EXPOSURE | DEC-040 |

## visibilitychange

| Estado | Acción |
|--------|--------|
| COUNTDOWN, GO_SIGNAL | Cancelar partida → IDLE |
| EXPOSURE | Ocultar número → cancelar partida → IDLE |
| RECONSTRUCT | No cancelar automáticamente |
| VERIFY, ROUND_RESULT, MATCH_RESULT, IDLE | Ignorar |

## Reglas pedagógicas — APROBADO

> DEC-025, DEC-049

**Prohibido afirmar:** prueba neuropsicológica; diagnóstico; medición de TDAH o funciones ejecutivas; mejora de memoria, atención o capacidades cognitivas.

**Descripción permitida:** actividad de observación, retención breve y reconstrucción con cartas.

**Procesos implicados:** memoria de trabajo y secuenciación — no diagnóstico.

## Docker

- Oficial en local y producción (DEC-006).
- Multi-stage: Node+Vite → nginx (DEC-045).
- Host **8095**, contenedor **8080**, mapeo `8095:8080`.
- Entrega: `docker save` → `monteo-numero-image.tar`.
- Compose documentado (DEC-046); **no crear el archivo todavía**.

## Despliegue

- Manual al TerraMaster (DEC-008).
- Caddy/DuckDNS: cadena futura documentada; **sin cambios** hasta post-auditoría.

## Puertos

- Distinguir host y contenedor.
- Host **8095** (DEC-011): no cambiar. Reverificar al crear contenedor y en el NAS.
- Contenedor **8080** (DEC-045).
- Si 8095 estuviera ocupado en una nueva comprobación: no cambiar automático, no detener procesos.

## Tecnología frontend

- PWA React + Vite + TypeScript.
- Implementación pendiente de autorización explícita (Composer u otra instrucción).

## Control de versiones Git/GitHub

> DEC-050 (la instrucción pedía DEC-026; ese ID ya es TypeScript — ver DECISIONS.md)

**Remoto oficial:** `origin` → `https://github.com/dg4s/juegocartas.git`

NO cambiar el remote sin autorización expresa del usuario.

Git/GitHub es historial, trazabilidad, recuperación, respaldo y comparación entre fases. El control de publicación permanece **SIEMPRE** en el usuario.

### Prohibido por iniciativa de AGENT/COMPOSER

- git commit
- git push
- git push --force o equivalentes
- publicar cambios
- modificar remote

### Autorización expresa (únicos ejemplos válidos)

- "haz commit"
- "haz commit de esta fase"
- "haz commit y push"
- "sube los cambios a GitHub"

### NO son autorización

- "termina la fase"
- "ya quedó"
- "continúa"
- el mero hecho de completar implementación o documentación
- terminar una fase

### Antes de un commit solicitado

1. git status
2. git diff
3. git status --short
4. Verificar que NO se incluyan: secretos, tokens, contraseñas, .env sensibles, credenciales, temporales, node_modules, artefactos innecesarios, archivos personales, información sensible
5. Mostrar al usuario un resumen de lo que se pretende incluir
6. git add solo de archivos correspondientes
7. Commit descriptivo (no "update", "changes", "fix", "final" si hay descripción concreta)
8. Mostrar hash y lista de archivos

### Antes de un push solicitado

- Verificar estado, rama, commit a publicar, remote origin
- Confirmar que origin es `https://github.com/dg4s/juegocartas.git`
- Push solo después de la solicitud expresa
- NO force push

### Duda

DETENERSE. Escribir **CONSULTA REQUERIDA A GPT** y explicar el problema (rama, remote, secretos, archivos, merge, conflicto o force push).

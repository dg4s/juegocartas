# NÚMERO FLASH — Especificación Funcional y Arquitectura

**Estado:** Especificación funcional (Fase 1) y arquitectura documental (Fase 2) **cerradas**. Implementación de código **completada en local** (Fase 3). Identidad operativa: **NÚMERO FLASH** (DEC-051).

> Nombre histórico del proyecto: MONTEO NÚMERO (DEC-001). Las referencias históricas en este documento se conservan donde corresponda.

## Descripción general

**NÚMERO FLASH** es una **PWA educativa** que genera estímulos numéricos para una actividad con **cartas físicas**.

| Actor | Rol |
|-------|-----|
| **Adulto** | Opera la PWA (inicia partida, pulsa controles, verifica resultados) |
| **Niño** | Usa cartas físicas para reconstruir el número mostrado |

El niño dispone de una carta por cada dígito (0–9, mismo color) y construye en físico el número que aparece brevemente en pantalla.

## Plataforma

| Aspecto | Valor | Estado |
|---------|-------|--------|
| Tipo | PWA educativa | APROBADO |
| Stack | React + Vite + TypeScript | APROBADO (DEC-002, DEC-026) — no instalado |
| Estado | useReducer, transiciones explícitas | APROBADO (DEC-027) |
| Ejecución | Docker multi-stage (Node/Vite → nginx) | APROBADO (DEC-045) — no implementado |
| Producción | TerraMaster NAS, despliegue manual | APROBADO |

---

## Mecánica numérica — APROBADO

> DEC-012, DEC-018, DEC-033

### Material físico del niño

- Una sola carta de cada dígito: **0 1 2 3 4 5 6 7 8 9**
- Todos los dígitos son del **mismo color**

### Reglas de los números generados

| Regla | Descripción |
|-------|-------------|
| Longitud | Exactamente **tres dígitos** |
| Primer dígito | **1–9** (nunca 0) |
| Segundo y tercero | **0–9** |
| Dígitos repetidos | **No** |
| Construibilidad | Una sola carta física de cada dígito 0–9 |
| Universo completo | **No** excluir números “fáciles” (123, 246, 987, etc.) |

**Demostración del universo:** 9 × 9 × 8 = **648**.

**Válidos:** 295, 604, 731, 908, 120, 123, 246, 987

**Inválidos:** 101, 111, 202, 117, 220, 505, 000

### Generación

- El número debe ser **válido desde el origen**. No generar arbitrarios y filtrar después.
- Estrategia prevista: copia barajada del universo (Fisher-Yates o equivalente probado).
- Cada partida: **cinco números distintos**. Sin repetición intra-partida.
- Cada partida nueva: universo completo de 648 otra vez.

---

## Niveles MVP — NOMBRES APROBADOS; TIEMPOS PROVISIONALES

> DEC-014, DEC-034

| Nivel | Nombre | Tiempo de exposición |
|-------|--------|---------------------|
| 1 | **PRÁCTICA** | 10000 ms |
| 2 | **ESTÁNDAR** | 7000 ms |
| 3 | **RETO** | 5000 ms |

- Representan **solo tiempo de exposición**.
- **NO** son niveles psicológicos, clínicos ni de capacidad.
- Los tiempos 10/7/5 son **provisionales de diseño** y deben poder cambiarse desde una **configuración única** (DEC-034).

> **Histórico:** DEC-013 usaba EXPLORACIÓN / INTEGRACIÓN / DESAFÍO.

---

## Partida — APROBADO

> DEC-015, DEC-033

- **5 rondas fijas** por partida, con cinco estímulos distintos.
- Una cancelación **termina la partida** (DEC-029); no consume turno ni puntúa.

---

## Comprobación — APROBADO

> DEC-016

- El **adulto** pulsa **CORRECTO** o **INCORRECTO**.
- **NO** capturar el número reconstruido.

---

## Secuencia de arranque — APROBADO

> DEC-032 (texto histórico «¡FUERA!»); rótulo vigente en UI: **GO** (DEC-052)

```
3 → 2 → 1 → GO → 500 ms → EXPOSURE → número
```

El tiempo de exposición del número **empieza después** de GO_SIGNAL. Sin sonido extra al aparecer el número.

---

## Flujo de estados — APROBADO

> DEC-027, DEC-028, DEC-041

Estados: IDLE, COUNTDOWN, GO_SIGNAL, EXPOSURE, RECONSTRUCT, VERIFY, ROUND_RESULT, MATCH_RESULT.

```
IDLE → COUNTDOWN → GO_SIGNAL → EXPOSURE → RECONSTRUCT → VERIFY → ROUND_RESULT → COUNTDOWN
```

Tras la quinta ronda:

```
VERIFY → ROUND_RESULT → MATCH_RESULT → IDLE
```

### Descripción de estados

| Estado | Descripción |
|--------|-------------|
| **IDLE** | Selección de nivel e inicio |
| **COUNTDOWN** | 3, 2, 1 — 1000 ms por paso |
| **GO_SIGNAL** | **GO** — 500 ms |
| **EXPOSURE** | Número visible; sin cronómetro visible |
| **RECONSTRUCT** | Número oculto; niño reconstruye; adulto pulsa **¡LISTO!** |
| **VERIFY** | Adulto pulsa CORRECTO o INCORRECTO |
| **ROUND_RESULT** | Resultado de la ronda; avance solo con **SIGUIENTE** |
| **MATCH_RESULT** | Resultado final; retorno a IDLE |

### ¡LISTO! — PROVISIONAL DE IMPLEMENTACIÓN

Derivado del flujo; no es regla pedagógica nueva.

- Solo en RECONSTRUCT.
- RECONSTRUCT → VERIFY.

### SIGUIENTE — APROBADO

> DEC-041

- VERIFY → ROUND_RESULT (tras CORRECTO/INCORRECTO).
- **NO** avanzar por temporizador.
- Rondas 1–4: SIGUIENTE → COUNTDOWN.
- Quinta ronda: SIGUIENTE → MATCH_RESULT.

### DETENER — APROBADO

> DEC-030, DEC-029

Disponible **solo** en COUNTDOWN, GO_SIGNAL, EXPOSURE, RECONSTRUCT.

Efecto: **cancelar la partida completa** → limpiar timers → IDLE.

No mostrar DETENER en VERIFY, ROUND_RESULT, MATCH_RESULT.

### Cancelación — APROBADO

> DEC-029

- No continúa la partida.
- No acierto, no error.
- No consume uno de los cinco turnos.
- Descarta el estímulo; no lo reanuda.
- Limpia temporizadores y recursos temporales.
- Vuelve a IDLE.

NO implementar “ronda anulada y continuar” ni “ronda anulada consume turno”.

### visibilitychange — APROBADO

> DEC-031 (supercede DEC-017)

| Estado | Si `document.visibilityState` pasa a `hidden` |
|--------|-----------------------------------------------|
| COUNTDOWN | Cancelar partida → IDLE |
| GO_SIGNAL | Cancelar partida → IDLE |
| EXPOSURE | Ocultar número de inmediato → cancelar partida → no puntuar → no reanudar estímulo → IDLE |
| RECONSTRUCT | NO cancelar automáticamente |
| VERIFY / ROUND_RESULT / MATCH_RESULT / IDLE | Ignorar |

El número **nunca** permanece visible ni se reanuda automáticamente tras pérdida de visibilidad.

---

## Temporizadores — APROBADO

> DEC-034

Valores en una **única configuración**:

| Clave | Valor |
|-------|-------|
| COUNTDOWN (por paso) | 1000 ms |
| GO_SIGNAL | 500 ms |
| EXPOSURE PRÁCTICA | 10000 ms (provisional) |
| EXPOSURE ESTÁNDAR | 7000 ms (provisional) |
| EXPOSURE RETO | 5000 ms (provisional) |

Implementación prevista: `setTimeout` + limpieza centralizada. No `setInterval` para EXPOSURE. Sin timers huérfanos.

---

## Audio MVP — APROBADO

> DEC-019, DEC-035

Implementación: **Web Audio API**. Sin archivos externos. Sin Howler.

| Evento | Sonido |
|--------|--------|
| 3, 2, 1 | Beep corto cada uno |
| GO (GO_SIGNAL) | Señal distintiva breve |
| Aparición del número | Sin sonido |
| EXPOSURE | Silencio |
| RECONSTRUCT | Silencio |
| CORRECTO | Breve positivo |
| INCORRECTO | Breve neutro / no punitivo |
| MATCH_RESULT | Breve opcional |
| **Por defecto** | Sonido ON |

AudioContext: iniciar/resumir tras interacción del usuario. Si no hay AudioContext, el juego continúa sin audio.

Mute: persistible en `localStorage` (solo preferencia de sonido). NO almacenar datos del niño (DEC-042).

---

## Interfaz de usuario — APROBADO (mínima MVP)

### Pantallas

| Pantalla | Contenido |
|----------|-----------|
| **Principal** | Nivel (PRÁCTICA / ESTÁNDAR / RETO), inicio |
| **Juego** | Flujo de estados |
| **Resultados** | Resumen tras 5 rondas (MATCH_RESULT) |
| **Configuración mínima** | Mute |

### Controles del adulto

| Control | Disponibilidad |
|---------|----------------|
| DETENER | COUNTDOWN, GO_SIGNAL, EXPOSURE, RECONSTRUCT |
| ¡LISTO! | RECONSTRUCT |
| CORRECTO / INCORRECTO | VERIFY |
| SIGUIENTE | ROUND_RESULT |
| Pantalla completa | Opcional (Fullscreen API); si no hay API, el juego sigue |

### UI — APROBADO

> DEC-020, DEC-021, DEC-038, DEC-039

- Prioridad visual **landscape**. NO bloquear orientación. Funciona también en portrait.
- Manifest: `display: standalone`. Fullscreen no es requisito del manifest.
- Estímulo: enorme, alto contraste, sin distractores, adaptable (`clamp()`, `dvh`/`svh`, safe-area).
- **NO** cronómetro visible durante EXPOSURE.

### Accesibilidad — APROBADO

> DEC-040

Contraste, botones táctiles grandes, foco visible, botones semánticos, teclado cuando corresponda, no solo color, `prefers-reduced-motion`.

**NO** anunciar el número por lector de pantalla durante EXPOSURE. `aria-live` sí para cuenta atrás, GO, instrucciones y resultados.

---

## PWA — APROBADO (pendiente de implementación)

> DEC-037, DEC-038

| Requisito | Decisión |
|-----------|----------|
| Herramienta | `vite-plugin-pwa` + `generateSW` |
| Instalable | Sí (manifest) |
| Offline | Tras primera carga; precache de assets de Vite |
| Display | `standalone` |
| Actualización SW | No agresiva; no interrumpir partida |
| Push / backend / auth / BD / sync / analytics | **NO** |
| Screen Wake Lock | Opcional (DEC-022, DEC-036) |

---

## Screen Wake Lock — APROBADO (opcional)

> DEC-022, DEC-036

Nunca requisito. Si no existe, falla o se libera: el juego continúa. Puede pedirse en partida visible; reintentar al volver a visible si la partida sigue; liberar al terminar o en IDLE.

---

## Reglas pedagógicas — APROBADO

> DEC-025, DEC-049

### Prohibido afirmar

- Que es prueba neuropsicológica; que diagnostica; que mide TDAH o funciones ejecutivas; que mejora memoria, atención o capacidades cognitivas.

### Descripción permitida

Actividad de **observación, retención breve y reconstrucción con cartas**.

Memoria de trabajo y secuenciación: procesos implicados, **no** diagnóstico.

### Fuera de alcance

Login, perfiles, estadísticas avanzadas, historial, backend, cámara, reconocimiento de cartas o voz, captura del número armado, gamificación extra, publicidad, monetización.

---

## Arquitectura de implementación prevista — APROBADO

> DEC-027, DEC-047, DEC-048

**Estructura (no crear todavía):**

```
numero-flash/
  src/
    app/
    game/
    numbers/
    timing/
    audio/
    pwa/
    wakeLock/
    styles/
  tests/
  public/
  docs/
```

**NO usar en el MVP:** Redux, Zustand, XState, React Router, Howler, Framer Motion, Tailwind, Next.js, backend, BD, autenticación, analytics, push.

**Calidad:** Vitest (DEC-043), ESLint mínimo (DEC-044). Playwright no obligatorio en el primer corte.

---

## Arquitectura de despliegue — APROBADO (no implementada)

> DEC-006 a DEC-010, DEC-045, DEC-046

| Aspecto | Valor |
|---------|-------|
| Build | Multi-stage: Node + Vite → `dist/` |
| Runtime | nginx (SPA `try_files $uri $uri/ /index.html`) |
| Host | **8095** |
| Contenedor | **8080** |
| Mapeo | `8095:8080` |
| Imagen | `numero-flash:latest` |
| Compose | servicio/contenedor `numero-flash`; restart `unless-stopped`; sin volúmenes; sin env del MVP |
| Entrega | `docker save` → `numero-flash-image.tar` |
| Preferencia | sin root si es viable; healthcheck GET `/` o `/index.html` aceptable |

**NO crear todavía:** Dockerfile, docker-compose.yml, nginx.conf.

### Flujo NAS (manual)

DESARROLLO LOCAL → BUILD → PRUEBAS → DOCKER BUILD → prueba del mismo artefacto → `docker save` → `numero-flash-image.tar` → transferencia manual → `docker load` en TerraMaster → Compose/Docker → pruebas en NAS.

El NAS no depende de descompresión automática.

### Dominio futuro — DOCUMENTADO (sin tocar)

| Campo | Valor |
|-------|-------|
| Dominio | `juegocartaspwa.duckdns.org` |
| URL | `https://juegocartaspwa.duckdns.org` |
| Cadena | Internet → DuckDNS → router → Caddy HTTPS → Docker → PWA |

Caddy y DuckDNS se configuran **después** de implementación, pruebas, auditoría y validación del contenedor. **NO modificar ahora.**

### Control de versiones (proceso, no regla de juego)

> DEC-050

Historial en Git; remoto oficial `https://github.com/dg4s/juegocartas.git`. Commit y push solo a petición expresa del usuario. No es parte de la mecánica del juego.

---

## Criterios de cierre

| Elemento | Estado |
|----------|--------|
| Mecánica, universo 648, cinco distintos | [x] APROBADO |
| Niveles PRÁCTICA/ESTÁNDAR/RETO | [x] Nombres aprobados; tiempos provisionales |
| Flujo, cancelación, visibility, SIGUIENTE | [x] APROBADO |
| Audio Web Audio API | [x] APROBADO |
| PWA / Docker / puertos 8095:8080 | [x] APROBADO en documentación |
| Implementación de código | [x] Completada (Fase 3) |
| Dockerfile / compose / nginx | [x] Completados |
| NAS / Caddy / DuckDNS | [ ] PENDIENTE / sin cambios |

---

## Resumen de estados

| Elemento | Estado |
|----------|--------|
| Spec funcional MVP | Cerrada (Fase 1) |
| Arquitectura documental | Cerrada (Fase 2) |
| Código | Completado (Fase 3) |
| Docker / NAS / Caddy / DuckDNS | PENDIENTE o sin cambios |

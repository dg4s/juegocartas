# MONTEO NÚMERO — Decisiones Arquitectónicas

Registro cronológico de decisiones del proyecto. Cada entrada incluye identificador, fecha, estado y contexto.

---

## DEC-001 — Nombre del proyecto

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | APROBADO |
| **Decisión** | El proyecto se denomina **MONTEO NÚMERO**. Directorio raíz: `MONTEO-NUMERO`. |

---

## DEC-002 — Tecnología frontend

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | APROBADO (pendiente de implementación) |
| **Decisión** | La aplicación será una **PWA** construida con **React + Vite**. TypeScript queda aprobado en DEC-026. No se instala todavía. |

---

## DEC-003 — Plataforma de producción

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | APROBADO |
| **Decisión** | Producción en **TerraMaster NAS**. Caddy como reverse proxy. DuckDNS para DNS dinámico. |

---

## DEC-004 — Fase 0: solo preparación

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | APROBADO |
| **Decisión** | La Fase 0 se limita a documentación y preparación. Sin código, sin dependencias, sin contenedores activos. |

---

## DEC-005 — No modificar infraestructura externa

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | APROBADO |
| **Decisión** | No modificar Caddy, DuckDNS ni configuración del NAS durante la fase de preparación. |

---

## DEC-006 — Docker como tecnología oficial de ejecución

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | APROBADO |
| **Decisión** | MONTEO NÚMERO se ejecutará mediante **Docker** tanto en desarrollo local como en producción (TerraMaster NAS). |

---

## DEC-007 — Exportación de imagen Docker

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | APROBADO (pendiente de implementación) |
| **Decisión** | La imagen final se empaquetará con `docker save` y se entregará como `monteo-numero-image.tar`. El NAS cargará esa imagen manualmente. |

---

## DEC-008 — Despliegue manual en el NAS

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | APROBADO |
| **Decisión** | El despliegue al TerraMaster será **manual**. El NAS no dependerá de descomprimir un paquete ZIP/TAR con todo el proyecto. El usuario subirá manualmente los archivos necesarios (imagen `.tar`, `docker-compose.yml`, configuración, documentación). |

---

## DEC-009 — Artefactos de despliegue diferidos

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | APROBADO |
| **Decisión** | No crear todavía Dockerfile definitivo, `docker-compose.yml`, imagen Docker ni contenedor. La arquitectura Docker definitiva se diseñará después de cerrar la especificación funcional. |

---

## DEC-010 — Entrega futura documentada

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | APROBADO (concepto) |
| **Decisión** | La entrega de producción incluirá: imagen Docker `.tar`, `docker-compose.yml`, archivo de variables de entorno (si aplica), documentación de instalación y documentación de rollback. Solo documentado; no creado todavía. |

---

## DEC-011 — Puerto local/previsto de MONTEO NÚMERO

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **APROBADO PROVISIONALMENTE** |
| **Decisión** | Puerto publicado en el **host: 8095**. |
| **Comprobación** | Realizada el 2026-09-06 en entorno local Windows. |
| **Resultado** | **LIBRE** — ningún proceso escuchando en TCP 8095. |
| **Herramientas** | `Get-NetTCPConnection -LocalPort 8095`, `netstat -ano` |
| **Acción** | Solo comprobación; no se detuvo ningún servicio. |
| **Revisión pendiente** | Verificar nuevamente al crear el contenedor y posteriormente en el NAS. |
| **Puerto interno del contenedor** | Completado en DEC-045: **8080**. Mapeo host:contenedor `8095:8080`. El host 8095 no cambia. |

---

## DEC-012 — Mecánica numérica y restricciones de generación

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **APROBADO** |
| **Decisión** | MONTEO NÚMERO genera estímulos numéricos de **tres dígitos** para actividad con cartas físicas (una carta por dígito 0–9, mismo color). Restricciones: nunca comenzar con 0, sin dígitos repetidos, construibles con las cartas disponibles. Generación válida desde el origen (no generar y corregir). Universo: **648** combinaciones posibles. |
| **Ejemplos válidos** | 295, 604, 731, 908, 120 |
| **Ejemplos inválidos** | 101, 111, 202, 117, 220, 505, 000 |

---

## DEC-013 — Niveles provisionales

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **SUPERSEDIDO** por DEC-014 |
| **Decisión** | Tres niveles con graduación principal por tiempo de exposición: (1) EXPLORACIÓN — 10 s, (2) INTEGRACIÓN — 7 s, (3) DESAFÍO — 5 s. |
| **Restricciones** | Nombres, tiempos y fundamentación pedagógica/psicológica requieren investigación. NO tratar como validados científicamente. NO afirmar diagnóstico psicológico ni mejoras clínicas/cognitivas sin evidencia. |
| **Nota histórica** | Los nombres EXPLORACIÓN / INTEGRACIÓN / DESAFÍO se conservan como evidencia histórica. No usar en documentación vigente. |

---

## DEC-014 — Niveles MVP

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **NOMBRES APROBADOS; TIEMPOS PROVISIONALES DE DISEÑO** |
| **Decisión** | Tres niveles MVP: **PRÁCTICA** (10 s) · **ESTÁNDAR** (7 s) · **RETO** (5 s). Representan solo tiempo de exposición del estímulo numérico. |
| **Supercede** | DEC-013 |
| **Restricciones** | NO son niveles psicológicos, clínicos ni de capacidad. Los tiempos 10/7/5 podrán cambiarse tras pruebas de uso. |

---

## DEC-015 — Rondas

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **APROBADO** |
| **Decisión** | **5 rondas fijas** por partida en el MVP. |

---

## DEC-016 — Comprobación

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **APROBADO** |
| **Decisión** | El adulto pulsa **CORRECTO** o **INCORRECTO**. NO capturar el número reconstruido en el MVP. |

---

## DEC-017 — Pérdida de visibilidad durante EXPOSURE

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **SUPERSEDIDO** por DEC-031 |
| **Decisión** | Si se pierde visibilidad durante EXPOSURE: ocultar estímulo de inmediato; anular ronda; no acierto; no error; no reanudar el mismo estímulo. |
| **Nota histórica** | La regla de ocultar el número y no reanudarlo se conserva. La semántica de “anular ronda y continuar” queda reemplazada: la cancelación termina la partida (DEC-029). El mapa completo por estado está en DEC-031. |

---

## DEC-018 — Universo completo

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **APROBADO** |
| **Decisión** | NO excluir números "fáciles" (123, 246, 987, etc.). Se mantiene el universo completo de **648** combinaciones. |

---

## DEC-019 — Audio MVP

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **APROBADO** |
| **Decisión** | Señales de audio del MVP: |
| **Cuenta atrás** | 3, 2, 1: señal breve cada una |
| **¡FUERA!** | Señal distintiva |
| **Aparición del número** | Sin sonido |
| **Desaparición del número** | Sin sonido obligatorio |
| **Reconstrucción** | Silencio |
| **Correcto** | Breve positivo |
| **Incorrecto** | Breve neutro / no punitivo |
| **Fin de partida** | Breve opcional |
| **Por defecto** | Sonido ON |

---

## DEC-020 — Orientación

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **APROBADO** |
| **Decisión** | Diseño responsive optimizado para **horizontal**. NO bloquear orientación en el MVP. |

---

## DEC-021 — Cronómetro

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **APROBADO** |
| **Decisión** | NO mostrar cronómetro al niño durante la exposición. El tiempo se controla internamente. |

---

## DEC-022 — Screen Wake Lock

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **APROBADO** |
| **Decisión** | Screen Wake Lock es mejora opcional si el navegador lo permite. Si no hay soporte o se rechaza, el juego sigue funcionando. Nunca dependencia crítica. |

---

## DEC-023 — Secuencia de arranque

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **SUPERSEDIDO** por DEC-032 |
| **Decisión** | Secuencia de inicio de ronda: **3 → 2 → 1 → ¡FUERA! → número inmediatamente**. |
| **Nota histórica** | La secuencia 3 → 2 → 1 → ¡FUERA! se conserva. “Inmediatamente” queda reemplazado por **500 ms** de GO_SIGNAL antes de EXPOSURE (DEC-032). |

---

## DEC-024 — Flujo de estados MVP

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **SUPERSEDIDO** por DEC-028, DEC-029, DEC-030 y DEC-041 |
| **Decisión** | Flujo de estados: `IDLE → COUNTDOWN → GO_SIGNAL → EXPOSURE → RECONSTRUCT → VERIFY → ROUND_RESULT → siguiente ronda / MATCH_RESULT` |
| **DETENER en COUNTDOWN** | Anula ronda |
| **DETENER en EXPOSURE** | Oculta estímulo y anula ronda |
| **DETENER en RECONSTRUCT** | Anula ronda |
| **Pérdida de visibilidad en EXPOSURE** | Oculta estímulo y anula ronda (DEC-017) |
| **Ronda anulada** | No acierto, no error |
| **Nota histórica** | Los ocho estados se conservan. Quedan reemplazados: “anular ronda y continuar”, DETENER solo en tres estados, y avance implícito desde ROUND_RESULT. |

---

## DEC-025 — Reglas pedagógicas

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **APROBADO** |
| **Decisión** | Reglas pedagógicas del MVP: |
| **Prohibido afirmar** | Que es prueba neuropsicológica; que diagnostica; que mide TDAH; que mide funciones ejecutivas; que mejora memoria, atención o capacidades cognitivas |
| **Descripción permitida** | Actividad de observación, retención breve y reconstrucción con cartas |
| **Procesos implicados** | Memoria de trabajo y secuenciación — procesos implicados, NO diagnóstico ni resultado clínico |

---

## DEC-026 — Stack TypeScript

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **APROBADO** |
| **Etapa** | Fase 2 — Arquitectura documental |
| **Tema** | Stack de implementación |
| **Decisión** | El MVP se implementará con **React + Vite + TypeScript**. TypeScript queda aprobado para el MVP. Completa DEC-002. |
| **Justificación** | Tipado discriminado de la máquina de estados y menor riesgo en transiciones. |
| **Impacto** | Implementación futura en TypeScript. No se instala todavía. |

---

## DEC-027 — Máquina de estados (useReducer)

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **APROBADO** |
| **Etapa** | Fase 2 |
| **Tema** | Gestión de estado |
| **Decisión** | Máquina de estados explícita con **React + useReducer**, transiciones explícitas y estado discriminado/tipado. |
| **NO usar** | Redux, Zustand, XState |
| **Estados** | IDLE, COUNTDOWN, GO_SIGNAL, EXPOSURE, RECONSTRUCT, VERIFY, ROUND_RESULT, MATCH_RESULT |
| **Justificación** | El flujo es finito y local; no se necesita store global ni librería de máquinas. |
| **Impacto** | Toda la lógica de partida vive en un reducer tipado. |

---

## DEC-028 — Flujo de transiciones MVP

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **APROBADO** |
| **Etapa** | Fase 2 |
| **Tema** | Transiciones de partida |
| **Supercede** | DEC-024 |
| **Flujo normal** | IDLE → COUNTDOWN → GO_SIGNAL → EXPOSURE → RECONSTRUCT → VERIFY → ROUND_RESULT → COUNTDOWN |
| **Tras la quinta ronda** | VERIFY → ROUND_RESULT → MATCH_RESULT (vía SIGUIENTE, DEC-041) |
| **Tras resultado final** | MATCH_RESULT → IDLE |
| **Justificación** | Cierra el ciclo de cinco rondas y el retorno a IDLE. |
| **Impacto** | ROUND_RESULT no avanza solo; ver DEC-041. |

---

## DEC-029 — Cancelación termina la partida

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **APROBADO** |
| **Etapa** | Fase 2 |
| **Tema** | Cancelación |
| **Supercede** | Semántica de “ronda anulada y continuar” en DEC-017 y DEC-024 |
| **Decisión** | Una cancelación **NO continúa la partida**. Termina la partida actual y vuelve a IDLE. |
| **Efectos** | La ronda no se contabiliza como correcta ni incorrecta; no consume uno de los cinco turnos; se descarta el estímulo; se limpian temporizadores; se liberan recursos temporales. |
| **NO implementar** | “Ronda anulada y continuar”; “ronda anulada consume turno”. |
| **Justificación** | Evita estados ambiguos de partida a medias. |
| **Impacto** | DETENER y visibilitychange (cuando aplique) cancelan toda la partida. |

---

## DEC-030 — Disponibilidad de DETENER

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **APROBADO** |
| **Etapa** | Fase 2 |
| **Tema** | Control DETENER |
| **Disponible en** | COUNTDOWN, GO_SIGNAL, EXPOSURE, RECONSTRUCT |
| **Efecto** | Cancelar partida → limpiar timers → IDLE (DEC-029) |
| **NO mostrar en** | VERIFY, ROUND_RESULT, MATCH_RESULT |
| **Justificación** | El adulto puede abortar solo mientras la ronda está en curso. |

---

## DEC-031 — visibilitychange por estado

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **APROBADO** |
| **Etapa** | Fase 2 |
| **Tema** | Pérdida de visibilidad |
| **Supercede** | DEC-017 |
| **COUNTDOWN / GO_SIGNAL** | `hidden` → cancelar partida → IDLE |
| **EXPOSURE** | Ocultar el número de inmediato → cancelar partida → no puntuar → no reanudar el mismo estímulo → IDLE |
| **RECONSTRUCT** | NO cancelar automáticamente |
| **VERIFY / ROUND_RESULT / MATCH_RESULT / IDLE** | Ignorar |
| **Regla crítica** | El número nunca permanece visible ni se reanuda automáticamente tras pérdida de visibilidad. |
| **Justificación** | Protege el estímulo visual sin interrumpir la verificación física. |

---

## DEC-032 — Duración de GO_SIGNAL

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **APROBADO** |
| **Etapa** | Fase 2 |
| **Tema** | Secuencia de arranque |
| **Supercede** | DEC-023 |
| **Decisión** | Secuencia: **3 → 2 → 1 → ¡FUERA! → 500 ms → EXPOSURE → número**. |
| **Audio** | ¡FUERA! tiene señal distintiva. Sin sonido adicional al aparecer el número. |
| **Justificación** | Separa la señal de arranque del inicio del tiempo de exposición. |
| **Impacto** | El tiempo de EXPOSURE empieza después de los 500 ms de GO_SIGNAL. |

---

## DEC-033 — Generador: cinco números distintos por partida

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **APROBADO** |
| **Etapa** | Fase 2 |
| **Tema** | Selección de estímulos |
| **Universo** | 648 = 9 × 9 × 8 (primer dígito 1–9; segundo y tercero 0–9; sin repetición). |
| **Por partida** | Cinco números **distintos**. Sin repetición dentro de las cinco rondas. |
| **Entre partidas** | Cada partida nueva dispone del universo completo de 648. |
| **Exclusiones** | Ninguna por “facilidad” (123, 246, 987 siguen válidos). Completa DEC-012 y DEC-018. |
| **Implementación** | Generar números válidos de origen. Copia barajada del universo (Fisher-Yates o equivalente probado). |
| **Justificación** | Evita repetición intra-partida sin reducir el universo global. |

---

## DEC-034 — Temporizadores centralizados

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **APROBADO** (tiempos de EXPOSURE: provisionales de diseño) |
| **Etapa** | Fase 2 |
| **Tema** | Timing |
| **Decisión** | Todos los tiempos en **una configuración única**. No dispersarlos por componentes. |
| **COUNTDOWN** | 1000 ms por paso |
| **GO_SIGNAL** | 500 ms |
| **EXPOSURE** | PRÁCTICA 10000 ms · ESTÁNDAR 7000 ms · RETO 5000 ms (provisionales) |
| **Implementación** | `setTimeout` + limpieza centralizada. No `setInterval` para EXPOSURE. Sin timers huérfanos. |
| **Justificación** | Permite cambiar 10/7/5 sin tocar la lógica de estados. |

---

## DEC-035 — Web Audio API

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **APROBADO** |
| **Etapa** | Fase 2 |
| **Tema** | Implementación de audio |
| **Decisión** | Usar **Web Audio API**. NO archivos externos. NO Howler ni equivalentes. |
| **Eventos** | Completa DEC-019: 3/2/1 beep corto; ¡FUERA! distintivo breve; número sin sonido; EXPOSURE y RECONSTRUCT silencio; CORRECTO positivo breve; INCORRECTO neutro; MATCH_RESULT opcional. |
| **Por defecto** | Sonido ON |
| **AudioContext** | Iniciar/resumir tras interacción del usuario (restricciones de autoplay). Si no hay AudioContext, el juego continúa sin audio. |
| **Justificación** | Cero assets de audio y degradación segura. |

---

## DEC-036 — Screen Wake Lock (detalle)

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **APROBADO** |
| **Etapa** | Fase 2 |
| **Tema** | Wake Lock |
| **Complementa** | DEC-022 |
| **Decisión** | Opcional; nunca requisito. Si no existe, falla o el navegador lo libera: el juego continúa. |
| **Solicitud** | Durante partida si el documento está visible. Al volver a visible, puede reintentarse si la partida sigue activa. |
| **Liberación** | Al terminar la partida o volver a IDLE. |

---

## DEC-037 — PWA con vite-plugin-pwa

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **APROBADO** (pendiente de implementación) |
| **Etapa** | Fase 2 |
| **Tema** | Service Worker y precache |
| **Decisión** | `vite-plugin-pwa` con **generateSW**. Objetivos: instalación, manifest, SW, offline tras primera carga, assets en precache. |
| **NO incluir** | Push, backend, auth, BD, sync, analytics. |
| **Actualización SW** | No agresiva; no interrumpir partida activa; aplicar en nueva carga o estado seguro. |
| **Justificación** | Encaja con el build de Vite y cubre offline del MVP. |

---

## DEC-038 — Display standalone y Fullscreen opcional

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **APROBADO** |
| **Etapa** | Fase 2 |
| **Tema** | Presentación PWA |
| **Decisión** | Manifest `display: standalone`. Fullscreen **no** es requisito del manifest. Botón de pantalla completa vía Fullscreen API si el navegador lo permite; si no, el juego continúa. |

---

## DEC-039 — Responsive con prioridad landscape

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **APROBADO** |
| **Etapa** | Fase 2 |
| **Tema** | Layout |
| **Complementa** | DEC-020 |
| **Decisión** | Prioridad visual **landscape**. NO bloquear orientación. Debe funcionar también en portrait. |
| **Estímulo** | Enorme, legible, alto contraste, sin distractores, adaptable. |
| **CSS** | Moderno/responsive; `clamp()`, `dvh`/`svh`, safe-area insets según corresponda. |

---

## DEC-040 — Accesibilidad MVP

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **APROBADO** |
| **Etapa** | Fase 2 |
| **Tema** | Accesibilidad |
| **Incluir** | Contraste; botones táctiles grandes; foco visible; botones semánticos; teclado cuando corresponda; no solo color; `prefers-reduced-motion`. |
| **Prohibido** | Anunciar el número por lector de pantalla durante EXPOSURE. |
| **aria-live permitido** | Cuenta atrás, ¡FUERA!, instrucciones, resultados. **NO** el número en exposición. |
| **Justificación** | El número es el estímulo visual; anunciarlo altera la mecánica. |

---

## DEC-041 — ROUND_RESULT y control SIGUIENTE

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **APROBADO** |
| **Etapa** | Fase 2 |
| **Tema** | Avance de ronda |
| **Decisión** | VERIFY → ROUND_RESULT. En ROUND_RESULT hay **SIGUIENTE**. El sistema **NO** avanza por temporizador. |
| **Rondas 1–4** | SIGUIENTE → COUNTDOWN |
| **Quinta ronda** | SIGUIENTE → MATCH_RESULT |
| **Justificación** | El adulto verifica cartas y observa el resultado antes de la siguiente ronda. |

---

## DEC-042 — Mute en localStorage

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **APROBADO** |
| **Etapa** | Fase 2 |
| **Tema** | Preferencia de sonido |
| **Decisión** | Sonido ON por defecto. Mute puede persistirse en `localStorage` como preferencia de interfaz, no dato del niño. |
| **NO almacenar** | Nombre, identidad, resultados, historial, datos del niño, información sensible. |

---

## DEC-043 — Vitest

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **APROBADO** |
| **Etapa** | Fase 2 |
| **Tema** | Testing |
| **Decisión** | **Vitest** para universo 648, generador, 0 inicial, dígitos repetidos, validez de 123/246/987, cinco números distintos, reducer, transiciones (incl. ilegales), cancelación, contador de rondas, MATCH_RESULT tras cinco rondas, limpieza de timers, configuración de tiempos. |
| **Playwright** | No obligatorio en el primer corte; evaluar tras auditoría del MVP. |

---

## DEC-044 — ESLint mínimo

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **APROBADO** |
| **Etapa** | Fase 2 |
| **Tema** | Calidad de código |
| **Decisión** | ESLint mínimo. No infraestructura de linting excesiva. |

---

## DEC-045 — Docker multi-stage y puertos

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **APROBADO** (pendiente de implementación) |
| **Etapa** | Fase 2 |
| **Tema** | Imagen y puertos |
| **Build** | Stage Node + Vite → `dist/` |
| **Runtime** | nginx |
| **Host** | **8095** (DEC-011; no cambiar) |
| **Contenedor** | **8080** |
| **Mapeo** | `8095:8080` |
| **nginx** | SPA fallback `try_files $uri $uri/ /index.html` |
| **Preferencia** | Ejecución sin root cuando sea viable. Sin volúmenes para estáticos del MVP. Healthcheck GET `/` o `/index.html` aceptable. |
| **Justificación** | Separa host e interno; 8095 permanece como puerto publicado. |

---

## DEC-046 — Compose previsto (no crear todavía)

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **APROBADO** (concepto; archivo no creado) |
| **Etapa** | Fase 2 |
| **Tema** | docker-compose |
| **Servicio / contenedor** | `monteo-numero` |
| **Imagen** | `monteo-numero:latest` |
| **Puerto** | `8095:8080` |
| **Restart** | `unless-stopped` |
| **Volúmenes** | ninguno |
| **Environment** | ninguno requerido para el MVP |
| **Healthcheck** | opcional, si no añade complejidad innecesaria |
| **Restricción** | NO crear `docker-compose.yml` en esta fase. |

---

## DEC-047 — Dependencias fuera del MVP

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **APROBADO** |
| **Etapa** | Fase 2 |
| **Tema** | Exclusiones intencionales |
| **NO utilizar** | Redux, Zustand, XState, React Router, Howler, Framer Motion, Tailwind, Next.js, backend, base de datos, autenticación, analytics, push notifications |
| **Justificación** | Mantener el MVP simple. |

---

## DEC-048 — Estructura de implementación prevista

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **APROBADO** (propuesta; carpetas no creadas) |
| **Etapa** | Fase 2 |
| **Tema** | Organización de código |
| **Estructura** | `src/app`, `src/game`, `src/numbers`, `src/timing`, `src/audio`, `src/pwa`, `src/wakeLock`, `src/styles`, más `tests/`, `public/`, `docs/` |
| **Restricción** | No crear estas carpetas hasta la implementación. |

---

## DEC-049 — Fuera de alcance del MVP

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **APROBADO** |
| **Etapa** | Fase 2 |
| **Tema** | Alcance |
| **NO introducir** | Login, perfiles, usuarios, estadísticas avanzadas, historial, BD, backend, cámara, reconocimiento automático de cartas o voz, captura del número armado, gamificación extra, niveles extra, publicidad, monetización |
| **MVP** | Actividad educativa de observación, retención breve y reconstrucción de un número de tres dígitos con cartas físicas. |

---

## DEC-050 — Control de versiones Git/GitHub

| Campo | Valor |
|-------|-------|
| **Fecha** | 2026-09-06 |
| **Estado** | **APROBADO** |
| **Tema** | Control de versiones |
| **ID solicitado** | La instrucción de documentación pedía **DEC-026**. Ese ID ya está ocupado por «Stack TypeScript» (Fase 2). Se registra aquí como **DEC-050** para no borrar ni reescribir DEC-026. **CONSULTA REQUERIDA A GPT** si debe renumerarse. |
| **Decisión** | El proyecto usa Git y el remoto oficial **origin** = `https://github.com/dg4s/juegocartas.git`. Git/GitHub es mecanismo de historial, trazabilidad, recuperación, respaldo y comparación entre fases. El control de publicación permanece **siempre** en el usuario. |
| **Commit y push** | SOLO cuando el usuario lo solicite expresamente. Terminar una fase **NO** autoriza commit ni push. |
| **Prohibido por iniciativa de AGENT/COMPOSER** | `git commit`; `git push`; `git push --force` o equivalentes; publicar cambios; modificar remote. |
| **NO commit automático, NO push automático, NO force push, NO equivalentes destructivos.** | |
| **Duda** | Ante duda de rama, remote, secretos, archivos, merge, conflicto o force push: DETENERSE y **CONSULTA REQUERIDA A GPT**. |
| **Remote** | NO cambiar `origin` sin autorización expresa del usuario. |

---

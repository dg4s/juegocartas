# NÚMERO FLASH — Flujo de trabajo Cursor

Documentación permanente del flujo operativo entre **ASK**, **AGENT**, **COMPOSER** y **GPT**.

> **Objetivo:** recuperar el contexto operativo cuando se abra una nueva ventana de Cursor. Una nueva ventana **NO** debe depender de la conversación anterior. Debe recuperar el contexto leyendo los archivos permanentes del proyecto.

---

## 1. Roles

### ASK

ASK se utiliza para:

- preguntas
- análisis
- investigación
- auditoría
- validación
- revisión documental
- razonamiento profundo
- análisis arquitectónico
- análisis pedagógico/psicológico
- detectar contradicciones
- preparar instrucciones para AGENT

**ASK NO programa.**

**ASK NO crea archivos del producto.**

**ASK NO modifica código.**

ASK debe preparar la instrucción para AGENT en **UN SOLO BLOQUE COPIABLE**.

Cuando una tarea requiera investigación, auditoría, validación o razonamiento profundo, utilizar en ASK un **modelo de razonamiento amplio** disponible en Cursor.

### AGENT

AGENT se utiliza para:

- crear archivos
- modificar archivos
- programar
- implementar
- corregir código
- ejecutar pruebas
- construir
- verificar
- documentar resultados

Cuando AGENT realiza programación/implementación:

**COMPOSER es el MOTOR DE RAZONAMIENTO.**

| Rol | Función |
|-----|---------|
| **AGENT** | ejecutor / programador |
| **COMPOSER** | motor de razonamiento utilizado por AGENT |
| **ASK** | análisis / investigación / preparación |

### GPT (externo)

GPT actúa como instancia externa de **revisión, auditoría y resolución de decisiones** que Cursor no debe inventar.

---

## 2. Flujo normal de trabajo

El flujo recomendado es:

1. Usuario plantea necesidad.
2. ASK analiza/investiga cuando corresponde.
3. ASK lee la documentación vigente del proyecto.
4. ASK prepara una instrucción completa para AGENT.
5. Usuario revisa esa instrucción.
6. Usuario la pasa a AGENT.
7. AGENT utiliza Composer como motor de razonamiento durante programación.
8. AGENT ejecuta la implementación.
9. AGENT prueba y documenta.
10. Usuario lleva el resultado a GPT para revisión/auditoría cuando corresponda.

**No saltarse las etapas cuando la tarea sea compleja.**

---

## 3. Continuidad en nuevas ventanas

Cuando el usuario abra una nueva ventana de ASK o AGENT y solicite continuidad:

**NO asumir** que la conversación anterior está disponible.

### Lectura obligatoria (en este orden)

1. `CURSOR_WORKFLOW.md` (este archivo)
2. `CONTEXT.md`
3. `PROJECT_STATUS.md`
4. `TODO.md`
5. `RULES.md`
6. `DECISIONS.md`
7. `SPECIFICATION.md`
8. `README.md`

Además revisar `docs/` y los archivos técnicos relevantes existentes.

### Comprobación del repositorio

```bash
git status
git remote -v
git branch --show-current
```

Revisar la estructura real del proyecto.

**NO inventar el estado del proyecto.**

---

## 4. Formato obligatorio de los prompts

Cuando el usuario solicite a ASK:

- un prompt para AGENT
- una instrucción para AGENT
- un prompt para una nueva ventana de AGENT
- un prompt para una nueva ventana de ASK
- o cualquier instrucción que el usuario deba copiar y pegar en Cursor

**ASK DEBE ENTREGAR LA INSTRUCCIÓN COMPLETA EN UN ÚNICO BLOQUE DE CÓDIGO COPIABLE.**

Reglas:

- **NO** dividir la instrucción en varios bloques.
- **NO** entregar partes separadas para copiar.
- **NO** colocar instrucciones esenciales fuera del bloque.
- Todo lo necesario para ejecutar la instrucción debe estar **dentro de UN SOLO BLOQUE**.

Antes del bloque se puede indicar brevemente:

- «Esta instrucción es para AGENT + Composer.»
- «Esta instrucción es para ASK.»

Después del bloque se pueden agregar observaciones breves si son necesarias, pero la **instrucción ejecutable** debe estar **COMPLETA** dentro del único bloque.

### Formato para nueva ventana

Cuando el usuario solicite **«prompt para nueva ventana de ASK»** o **«prompt para nueva ventana de AGENT»**, la respuesta debe contener:

1. Una identificación breve de para quién es.
2. **UN SOLO BLOQUE DE CÓDIGO** con el prompt completo.

El prompt debe ser **autocontenido** y permitir que la nueva ventana recupere el contexto leyendo la documentación permanente del proyecto.

**NO asumir** que la nueva ventana tiene acceso a la conversación anterior.

---

## 5. Prompt para nueva ventana de ASK

Cuando el usuario solicite **«prompt para nueva ventana de ASK»**, la instrucción debe indicar que ASK debe:

1. Leer `CURSOR_WORKFLOW.md`.
2. Leer toda la documentación vigente necesaria.
3. Recuperar el estado actual del proyecto desde los archivos.
4. No asumir que conoce la conversación anterior.
5. Analizar la nueva solicitud.
6. Investigar o auditar cuando corresponda.
7. **No modificar archivos.**
8. **No programar.**
9. Preparar una instrucción completa para AGENT.
10. Entregarla en un **único bloque de código copiable** (ver §4).
11. Señalar explícitamente qué **modelo de razonamiento amplio** debe utilizarse cuando la tarea sea de investigación/auditoría/razonamiento profundo.

---

## 6. Prompt para nueva ventana de AGENT

Cuando el usuario solicite **«prompt para nueva ventana de AGENT»**, la instrucción debe indicar que AGENT debe:

1. Leer `CURSOR_WORKFLOW.md`.
2. Leer `CONTEXT.md`.
3. Leer `PROJECT_STATUS.md`.
4. Leer `TODO.md`.
5. Leer `RULES.md`.
6. Leer `DECISIONS.md`.
7. Leer `SPECIFICATION.md`.
8. Leer `README.md`.
9. Revisar `docs/` relevantes.
10. Comprobar el estado real del código.
11. Comprobar `git status`.
12. Recuperar el contexto desde documentación, **no desde suposiciones**.
13. Ejecutar la tarea solicitada.
14. Utilizar **Composer** como motor de razonamiento durante programación.
15. Probar los cambios.
16. Documentar el resultado.
17. **No hacer commit/push** salvo autorización expresa.

---

## 7. CONSULTA REQUERIDA A GPT

Si AGENT encuentra:

- contradicción
- ambigüedad importante
- requisito no definido
- decisión arquitectónica no resuelta
- conflicto entre documentos
- cambio que pueda alterar la mecánica
- decisión pedagógica/psicológica relevante
- decisión de infraestructura no autorizada
- conflicto de Git
- posible exposición de secretos
- necesidad de cambiar una regla aprobada

**NO debe inventar una solución.**

Debe detener esa parte y escribir exactamente:

```
CONSULTA REQUERIDA A GPT
```

Después explicar:

1. qué encontró
2. qué documentos/reglas están involucrados
3. qué opciones existen
4. impacto de cada opción
5. qué decisión necesita

---

## 8. Documentación como fuente de continuidad

El contexto permanente debe mantenerse en archivos.

**No depender de:**

- memoria de una conversación
- historial de Cursor
- instrucciones temporales
- mensajes anteriores

| Evento | Archivo a actualizar |
|--------|----------------------|
| Cambio de decisión importante | `DECISIONS.md` |
| Avance de fase | `PROJECT_STATUS.md` |
| Pendientes | `TODO.md` |
| Regla nueva o cambio de regla | `RULES.md` |
| Cambio de alcance | `SPECIFICATION.md` |
| Contexto general | `CONTEXT.md` |

---

## 9. Git / GitHub

Git está bajo control explícito del usuario (DEC-050).

**NO ejecutar por iniciativa propia:**

- `git add`
- `git commit`
- `git push`

**NO hacer:**

- force push
- reset destructivo
- cambio de remote
- modificación de origin

Un commit/push solamente puede realizarse cuando el usuario lo solicite **expresamente** (p. ej. «haz commit», «haz commit y push», «sube los cambios a GitHub»).

**NO son autorización:** «continúa», «ya quedó», «guarda», un handoff, o terminar una fase.

Remote oficial: `origin` → `https://github.com/dg4s/juegocartas.git`

Si existe duda sobre branch, remote, conflicto, historial, secretos u operación destructiva: **CONSULTA REQUERIDA A GPT**.

---

## 10. Secretos

**NO introducir** tokens, contraseñas, claves privadas o secretos en:

- código
- documentación pública
- commits
- logs innecesarios

No modificar ni exponer credenciales existentes.

Si una operación requiere un secreto y no está claro cómo manejarlo: **CONSULTA REQUERIDA A GPT**.

---

## 11. Infraestructura

No modificar infraestructura externa salvo instrucción expresa. Esto incluye:

- DuckDNS
- Caddy
- router
- TerraMaster NAS
- servicios externos

Dominio futuro documentado: `https://juegocartaspwa.duckdns.org` — **sin cambios** hasta fase posterior autorizada.

---

## 12. Principio de no inventar

No asumir:

- archivos que no existen
- comandos que no existen
- decisiones no documentadas
- funcionalidades no aprobadas
- nombres no aprobados
- puertos diferentes
- arquitectura diferente

**Primero comprobar.**

Si algo no está definido y tiene impacto importante: **CONSULTA REQUERIDA A GPT**.

---

## 13. Identidad operativa del producto

| Campo | Valor |
|-------|-------|
| Nombre visible | **NÚMERO FLASH** |
| Slug | `numero-flash` |
| Carpeta | `C:\Dev\juegocartas\numero-flash` |
| Imagen Docker | `numero-flash:latest` |
| Contenedor | `numero-flash` |
| TAR | `numero-flash-image.tar` |
| Puertos | **8095 : 8080** |

No utilizar **MONTEO NÚMERO** como nombre operativo.

Los nombres históricos se conservan solo para trazabilidad documental (DEC-001, DEC-007, DEC-046, etc.).

---

## 14. Principio general

| Actor | Rol |
|-------|-----|
| **Documentación del proyecto** | memoria operativa |
| **ASK** | analiza y prepara |
| **AGENT** | implementa y ejecuta |
| **COMPOSER** | razona dentro de AGENT durante programación |
| **GPT** | revisión externa y resolución de decisiones no inventables |

Las nuevas ventanas deben poder continuar el trabajo **leyendo los archivos del proyecto**.

---

**Última actualización:** 2026-09-06 (§4 formato obligatorio de prompts)

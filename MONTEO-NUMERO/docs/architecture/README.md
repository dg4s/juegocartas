# docs/architecture/

Arquitectura documental **aprobada** (Fase 2). Sin archivos de implementación.

- Stack: React + Vite + TypeScript; estado con useReducer.
- PWA: vite-plugin-pwa, generateSW, display standalone.
- Docker: multi-stage Node/Vite → nginx; mapeo **8095:8080**.
- Compose previsto: servicio `monteo-numero`, sin volúmenes, sin env del MVP.
- Estructura de `src/` documentada en DEC-048; **no creada**.

Detalle: `SPECIFICATION.md` y `DECISIONS.md` (DEC-026 a DEC-049).

# docs/architecture/

Arquitectura **implementada** en Fase 3. Decisiones vigentes en `DECISIONS.md`.

- Stack: React + Vite + TypeScript; estado con useReducer.
- Código: `src/app`, `src/game`, `src/numbers`, `src/timing`, `src/audio`, `src/pwa`, `src/wakeLock`, `src/styles`.
- PWA: vite-plugin-pwa, generateSW, display standalone.
- Docker: multi-stage Node/Vite → nginx; mapeo **8095:8080**.

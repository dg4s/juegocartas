# docs/deployment/

Flujo de entrega **documentado**. Sin tocar NAS, Caddy ni DuckDNS.

```
desarrollo → build → pruebas → docker build → prueba del artefacto
→ docker save → monteo-numero-image.tar → transferencia manual
→ docker load (TerraMaster) → Compose/Docker → pruebas en NAS
```

Puertos: host 8095, contenedor 8080.

Caddy/DuckDNS: Internet → DuckDNS → router → Caddy HTTPS → Docker → PWA. Configuración **después** de implementación, pruebas, auditoría y validación del contenedor.

Documentación de instalación y rollback: pendiente de la fase de despliegue.

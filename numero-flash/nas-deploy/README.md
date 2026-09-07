# Paquete NAS — NÚMERO FLASH

Sube **toda esta carpeta** al TerraMaster (o solo los archivos listados abajo).

## Contenido

| Archivo | Uso |
|---------|-----|
| `numero-flash-image.tar` | `docker load -i numero-flash-image.tar` |
| `docker-compose.yml` | `docker compose up -d` |
| `INSTALACION-NAS.md` | Pasos detallados, verificación y rollback |

## Inicio rápido (en el NAS)

```bash
docker load -i numero-flash-image.tar
docker compose up -d
```

URL local: **http://IP-DEL-NAS:8095**

Puerto: **8095** (host) → **8080** (contenedor).

Ver `INSTALACION-NAS.md` para el procedimiento completo.

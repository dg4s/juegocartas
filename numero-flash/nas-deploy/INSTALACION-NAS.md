# NÚMERO FLASH — Instalación en TerraMaster NAS

Paquete manual para producción. **No incluye** código fuente ni build en el NAS.

## Archivos a subir

| Archivo | Descripción |
|---------|-------------|
| `numero-flash-image.tar` | Imagen Docker exportada (`numero-flash:latest`) |
| `docker-compose.yml` | Compose de este directorio (solo imagen, sin `build`) |

## Requisitos

- Docker disponible en el TerraMaster (Container Station o equivalente).
- Puerto host **8095** libre (mapeo **8095 → 8080**).
- **No modificar** Caddy, DuckDNS ni router en esta fase.

## Pasos

### 1. Transferir archivos

Copia al NAS (por ejemplo a una carpeta `numero-flash/`):

- `numero-flash-image.tar`
- `docker-compose.yml`

### 2. Cargar la imagen

En el NAS (SSH o terminal del contenedor):

```bash
cd /ruta/a/numero-flash
docker load -i numero-flash-image.tar
```

Comprobar:

```bash
docker images numero-flash
```

Debe aparecer `numero-flash:latest`.

### 3. Levantar el servicio

```bash
docker compose up -d
```

### 4. Verificar

```bash
docker ps --filter name=numero-flash
docker inspect --format='{{.State.Health.Status}}' numero-flash
```

Desde la red del NAS (o el PC en la LAN):

- http://IP-DEL-NAS:8095 — debe responder HTTP 200.
- Probar: elegir nivel → INICIAR → flujo COUNTDOWN → GO → EXPOSURE → RECONSTRUCT → VERIFY.

### 5. Parar / actualizar

Parar:

```bash
docker compose down
```

Actualizar (nueva versión):

```bash
docker compose down
docker load -i numero-flash-image.tar
docker compose up -d
```

## Identidad (DEC-051)

| Campo | Valor |
|-------|-------|
| Producto | NÚMERO FLASH |
| Imagen | `numero-flash:latest` |
| Contenedor | `numero-flash` |
| Host : contenedor | **8095 : 8080** |

## Dominio futuro (sin configurar ahora)

`https://juegocartaspwa.duckdns.org` — Caddy y DuckDNS se configuran **después** de validar el contenedor en el NAS.

## Rollback

Si la nueva imagen falla:

```bash
docker compose down
docker load -i numero-flash-image.tar.anterior   # copia de seguridad previa
docker compose up -d
```

Conserva siempre una copia del TAR anterior antes de actualizar.

---

Generado: 2026-09-06 · incluye IDLE mock v0, señal GO (DEC-052), footer dg4s.site

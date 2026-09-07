# Paquete NAS — NÚMERO FLASH

Paquete de **despliegue por imagen Docker ya construida**. Pensado para transferencia manual al TerraMaster y ejecución sin código fuente.

## Contenido

| Archivo | Uso |
|---------|-----|
| `numero-flash-image.tar` | Importar en Container Station → registra `numero-flash:latest` |
| `docker-compose.yml` | Levantar el contenedor; **no construye** la imagen |
| `INSTALACION-NAS.md` | Procedimiento completo, verificación y rollback |
| `README.md` | Este resumen |

## Despliegue actual (esta fase)

1. **PC Windows** → transferencia manual al NAS (interfaz de archivos del TerraMaster).
2. Subir `numero-flash-image.tar` y `docker-compose.yml`.
3. **Container Station** → importar el TAR (`numero-flash:latest`).
4. **Container Station** → crear/levantar el servicio con `docker-compose.yml`.

**No se usa:** SSH para subir archivos · código fuente · Dockerfile · `docker build` en el NAS · descompresión del TAR como proyecto.

URL tras el despliegue: **http://IP-DEL-NAS:8095**

Puerto: **8095** (host) → **8080** (contenedor).

Ver **`INSTALACION-NAS.md`** para el procedimiento detallado.

## Configuración futura (fase posterior)

**Caddy** + **DuckDNS** + dominio `https://juegocartaspwa.duckdns.org` se configuran **después**, mediante **SSH**, una vez validado el contenedor.

Esa fase **no forma parte** de este paquete ni de las instrucciones de despliegue actuales.

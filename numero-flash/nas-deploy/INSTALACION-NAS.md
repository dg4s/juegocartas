# NÚMERO FLASH — Instalación en TerraMaster NAS

Paquete de **despliegue por imagen preconstruida**. No incluye código fuente, Dockerfile ni instrucciones de build.

## Qué contiene este paquete

| Archivo | Descripción |
|---------|-------------|
| `numero-flash-image.tar` | Imagen Docker exportada (`numero-flash:latest`) |
| `docker-compose.yml` | Define el contenedor; **no construye** la imagen |
| `INSTALACION-NAS.md` | Este documento |
| `README.md` | Resumen del paquete |

## Requisitos

- TerraMaster con **Container Station** (o Docker equivalente).
- Puerto host **8095** libre (mapeo **8095 → 8080**).
- **No modificar** Caddy, DuckDNS ni router en esta fase.

---

## Fase actual: despliegue manual (sin SSH)

### A) Transferir archivos desde el PC al NAS

Desde Windows, copia manualmente al TerraMaster **mediante la interfaz de archivos del NAS** (File Manager / explorador de archivos del TerraMaster):

1. `numero-flash-image.tar`
2. `docker-compose.yml`

Colócalos, por ejemplo, en una carpeta del NAS como `numero-flash/`.

**Importante:**

- **No** uses SSH, SCP ni SFTP para subir estos archivos.
- **No** descomprimas el TAR en el NAS; es un archivo de imagen Docker, no un ZIP de proyecto.
- **No** necesitas código fuente ni Dockerfile en el NAS.

### B) Importar la imagen en Container Station

En el TerraMaster, abre **Container Station** (o la herramienta Docker del NAS) e **importa/carga** el archivo:

`numero-flash-image.tar`

Tras la importación debe quedar registrada la imagen:

`numero-flash:latest`

Comprueba en la lista de imágenes del NAS que aparece `numero-flash:latest` antes de continuar.

**No** ejecutes `docker build` en el NAS. La imagen ya viene construida en el TAR.

### C) Crear o levantar el contenedor con docker-compose.yml

Utiliza el `docker-compose.yml` transferido para crear/levantar el servicio en Container Station.

El compose **solo referencia** la imagen importada; **no contiene** `build:` ni depende de código fuente.

Configuración del servicio:

| Campo | Valor |
|-------|-------|
| Imagen | `numero-flash:latest` |
| Contenedor | `numero-flash` |
| Puertos | **8095** (host) → **8080** (contenedor) |
| Reinicio | `unless-stopped` |

### D) Verificar

Desde un navegador en la red local del NAS:

- **http://IP-DEL-NAS:8095** — debe responder (HTTP 200).

Prueba funcional mínima:

1. Elegir un nivel (PRÁCTICA / ESTÁNDAR / RETO).
2. Pulsar **INICIAR**.
3. Comprobar flujo COUNTDOWN → GO → EXPOSURE → RECONSTRUCT → VERIFY.

Comprueba también en Container Station que el contenedor `numero-flash` está en ejecución.

### E) Parar o actualizar

**Parar el servicio:** detén o elimina el contenedor/servicio `numero-flash` desde Container Station (según la opción que ofrezca la interfaz para un proyecto Compose).

**Actualizar a una versión nueva:**

1. Conserva una copia de seguridad del TAR anterior.
2. Transfiere manualmente el nuevo `numero-flash-image.tar` al NAS (misma vía: interfaz de archivos).
3. Importa el nuevo TAR en Container Station (registra de nuevo `numero-flash:latest`).
4. Vuelve a levantar el servicio con el `docker-compose.yml` actualizado si cambió; si no cambió, reinicia el contenedor con la imagen recién importada.

---

## Fase futura: Caddy + DuckDNS (no incluida aquí)

La configuración de **Caddy**, **DuckDNS** y el dominio `https://juegocartaspwa.duckdns.org` se realizará **después** de validar el contenedor en el NAS.

En esa fase posterior se utilizará **SSH** para la configuración de proxy y DNS. **No mezclar** esa fase con el despliegue actual de imagen + compose.

---

## Identidad (DEC-051)

| Campo | Valor |
|-------|-------|
| Producto | NÚMERO FLASH |
| Imagen | `numero-flash:latest` |
| Contenedor | `numero-flash` |
| Host : contenedor | **8095 : 8080** |

---

## Rollback

Si una actualización falla y conservaste el TAR anterior como respaldo:

1. Detén el contenedor/servicio `numero-flash` en Container Station.
2. Importa de nuevo el TAR de respaldo (p. ej. `numero-flash-image.tar.anterior`) para restaurar `numero-flash:latest`.
3. Levanta de nuevo el servicio con el mismo `docker-compose.yml`.

**Regla:** guarda siempre una copia del TAR anterior antes de importar una versión nueva.

---

Generado: 2026-09-06 · imagen preconstruida · IDLE mock v0 · señal GO (DEC-052) · footer dg4s.site

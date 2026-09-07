# Despliegue — NÚMERO FLASH

## Artefacto Docker

```bash
docker compose up --build -d
docker save numero-flash:latest -o numero-flash-image.tar
```

## Flujo

DESARROLLO LOCAL → BUILD → PRUEBAS → DOCKER BUILD
→ prueba del mismo artefacto
→ docker save → numero-flash-image.tar
→ transferencia manual
→ docker load en TerraMaster
→ Compose/Docker
→ pruebas en NAS

## Puertos

| Host | Contenedor |
|------|------------|
| 8095 | 8080 |

## Identidad (DEC-051)

| Campo | Valor |
|-------|-------|
| Servicio | `numero-flash` |
| Contenedor | `numero-flash` |
| Imagen | `numero-flash:latest` |
| TAR | `numero-flash-image.tar` |

> Nombre histórico del TAR: `monteo-numero-image.tar` (DEC-007).

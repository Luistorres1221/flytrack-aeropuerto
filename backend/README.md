# Backend Spring Boot

## Ejecutar

1. Entra en la carpeta `backend`.
2. Ejecuta `mvn spring-boot:run`.

## Configuración de base de datos

El backend usa MySQL en `localhost:3306` con:

- Base de datos: `aeropuerto_db`
- Usuario: `aeropuerto_user`
- Contraseña: `securepassword`

La configuración está en `src/main/resources/application.properties`.

## Endpoint de prueba

- `GET http://localhost:8080/api/hello`

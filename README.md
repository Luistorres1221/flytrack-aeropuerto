# FlyTrack - Gestión de Aeropuerto

FlyTrack es un proyecto full-stack para gestionar operaciones de aeropuerto con un frontend moderno, un backend REST y una base de datos MySQL.

## Qué incluye este proyecto

- Gestión de pasajeros
- Control de vuelos
- Registro de equipaje
- Notificaciones para usuarios
- Backend en Spring Boot
- Frontend en React + TypeScript
- Persistencia en MySQL
- Contenedores Docker y despliegue opcional en Kubernetes

## Estructura del proyecto

```
.
├── backend/              # API REST en Spring Boot
│   ├── src/main/java/... # controladores, servicios, repositorios y entidades
│   ├── pom.xml          # dependencias y configuración de Maven
│   └── ...
├── frontend/             # Aplicación React + Vite
│   ├── src/             # componentes, páginas y estilos
│   ├── package.json
│   └── ...
├── database/             # script y Docker Compose para MySQL
│   ├── init.sql
│   └── docker-compose.yml
├── k8s/                  # manifiestos de Kubernetes
├── .github/              # workflows de CI/CD
└── README.md             # documentación del proyecto
```

## Tecnologías principales

### Backend
- Java 21
- Spring Boot 3.2.5
- Spring Data JPA
- Validación con Jakarta Bean Validation
- MySQL Connector/J 8.0.33
- Maven

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router v6
- React Hook Form
- TanStack Query

### Infraestructura
- Docker
- Docker Compose
- Kubernetes
- GitHub Actions

## Requisitos previos

Antes de ejecutar el proyecto localmente, instala:
- Java 21
- Maven
- Node.js 18+ y npm
- Docker
- Docker Compose
- kubectl (opcional, solo si vas a usar Kubernetes)

## Ejecución local recomendada

### 1. Levantar MySQL

```bash
cd database
docker compose up -d
```

Esto crea la base de datos `aeropuerto_db`, el usuario `aeropuerto_user` y las tablas necesarias.

### 2. Ejecutar el backend

```bash
cd ../backend
mvn spring-boot:run
```

El backend quedará disponible en `http://localhost:8080`.

### 3. Ejecutar el frontend

```bash
cd ../frontend
npm install
npm run dev
```

El frontend se ejecuta generalmente en `http://localhost:5173`.

## Comandos más usados

### Frontend
- `npm run dev` — inicia el servidor de desarrollo
- `npm run build` — genera la versión de producción
- `npm run lint` — ejecuta ESLint
- `npm test` — ejecuta pruebas con Vitest

### Backend
- `mvn spring-boot:run` — inicia el servidor
- `mvn test` — ejecuta pruebas de backend

## Variables de entorno

### Frontend
Archivo: `.env`

```env
VITE_API_URL="http://localhost:8080/api"
```

### Backend
En `src/main/resources/application.properties` configura:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/aeropuerto_db
spring.datasource.username=aeropuerto_user
spring.datasource.password=securepassword
server.port=8080
```

## Arquitectura del backend

El backend se organiza en capas claras:
- `controller/` — controladores REST
- `services/` — lógica de negocio
- `repository/` — acceso a datos con JPA
- `models/` — entidades del dominio
- `exceptions/` — manejo global de errores
- `config/` — configuración general
- `utils/` — utilidades compartidas

## Ejemplos de endpoints

- `GET /api/pasajeros`
- `POST /api/pasajeros`
- `GET /api/vuelos`
- `POST /api/vuelos`
- `GET /api/equipajes`
- `POST /api/equipajes`
- `GET /api/notificaciones`
- `POST /api/notificaciones`

> Para ver todos los endpoints, revisa `backend/src/main/java/com/example/backend/controller/`.

## Documentación API

La API está completamente documentada con **Swagger/OpenAPI 3.0**.

### Acceder a la documentación:
- **Swagger UI**: `http://localhost:8080/swagger-ui/index.html`
- **OpenAPI JSON**: `http://localhost:8080/v3/api-docs`

### Características de la documentación:
- ✅ **Acceso público** - No requiere autenticación
- ✅ Descripciones detalladas de todos los endpoints
- ✅ Parámetros y respuestas documentadas
- ✅ Códigos de estado HTTP explicados
- ✅ Ejemplos de requests/responses
- ✅ Agrupación por módulos (Pasajeros, Vuelos, Equipaje, Notificaciones)

## Kubernetes

Los manifiestos para despliegue están en `k8s/`.
Para aplicar los recursos:

```bash
kubectl apply -f k8s/
```

## Buenas prácticas

- Mantén el backend y frontend separados durante el desarrollo.
- Usa Docker Compose para levantar la base de datos de forma consistente.
- Ejecuta `npm run lint` y `mvn test` antes de subir cambios.
- Ajusta los valores de `application.properties` al entorno local o de producción.

## Contribuciones

1. Haz fork del repositorio.
2. Crea una rama descriptiva.
3. Envía un pull request con los cambios.

## Contacto

Si tienes dudas, preguntas o sugerencias, abre un issue en el repositorio.

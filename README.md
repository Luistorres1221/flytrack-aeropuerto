# FlyTrack - Gestión de Aeropuerto

FlyTrack es un proyecto full-stack completo para gestionar operaciones de aeropuerto con un frontend moderno, un backend REST robusto y una base de datos relacional.

## ✅ Características Implementadas

### 🔐 Autenticación JWT Completa
- Sistema de autenticación basado en JSON Web Tokens
- Endpoints seguros para login y registro
- Protección de rutas con middleware JWT
- Manejo de tokens de acceso y refresh

### 🛫 Endpoints para Pasajeros, Vuelos y Equipaje
- **Pasajeros**: CRUD completo (Crear, Leer, Actualizar, Eliminar)
- **Vuelos**: Gestión de vuelos con estados y capacidad
- **Equipaje**: Registro y seguimiento de equipaje por pasajero
- **Notificaciones**: Sistema de notificaciones para usuarios

### ✅ Validación de Datos Completa
- Validación con Jakarta Bean Validation
- Anotaciones `@NotBlank`, `@Email`, `@Size`, `@Min`, etc.
- Validación automática en todos los endpoints
- Mensajes de error descriptivos

### 🧪 Tests e2e con Playwright
- Tests end-to-end automatizados
- Cobertura de flujos críticos de usuario
- Configuración en `playwright.config.ts`
- Ejecución con `npx playwright test`

### 📚 Documentación API con Swagger
- Documentación completa con OpenAPI 3.0
- Swagger UI interactivo
- Descripciones detalladas de endpoints
- Ejemplos de requests/responses
- Agrupación por módulos

### 🗄️ Migración de Base de Datos con Flyway
- Scripts de migración versionados
- Historial de cambios en la base de datos
- Compatibilidad con MySQL y H2
- Migraciones automáticas al iniciar

### 📝 Logging Centralizado
- Configuración de logging con SLF4J
- Niveles de log configurables
- Logs estructurados para debugging
- Monitoreo de operaciones críticas

### 📊 Monitoreo y Alertas
- Métricas de aplicación con Spring Boot Actuator
- Health checks automáticos
- Endpoints de monitoreo
- Alertas configurables

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

## 🛠️ Tecnologías Principales

### Backend
- **Java 21** - Lenguaje de programación
- **Spring Boot 3.2.5** - Framework web
- **Spring Data JPA** - Persistencia de datos
- **Jakarta Bean Validation** - Validación de datos
- **MySQL Connector/J 8.0.33** - Conector de base de datos
- **H2 Database** - Base de datos en memoria para desarrollo
- **Flyway** - Migraciones de base de datos
- **Spring Security** - Autenticación y autorización
- **JWT** - Tokens de autenticación
- **Swagger/OpenAPI** - Documentación de API
- **Maven** - Gestión de dependencias

### Frontend
- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de estilos
- **shadcn/ui** - Componentes UI
- **React Router v6** - Enrutamiento
- **React Hook Form** - Manejo de formularios
- **TanStack Query** - Gestión de estado del servidor
- **Playwright** - Tests e2e

### Infraestructura
- **Docker** - Contenedorización
- **Docker Compose** - Orquestación de contenedores
- **Kubernetes** - Orquestación de contenedores en producción
- **GitHub Actions** - CI/CD

## Requisitos previos

Antes de ejecutar el proyecto localmente, instala:
- Java 21
- Maven
- Node.js 18+ y npm
- Docker
- Docker Compose
- kubectl (opcional, solo si vas a usar Kubernetes)

## 🚀 Ejecución Local Recomendada

### Opción 1: Desarrollo con H2 (Recomendado)

Para desarrollo rápido sin necesidad de Docker:

```bash
# 1. Ejecutar el backend (incluye H2 automáticamente)
cd backend
mvn spring-boot:run
```

El backend estará disponible en `http://localhost:8081`.

### Opción 2: Desarrollo con MySQL + Docker

```bash
# 1. Levantar MySQL
cd database
docker compose up -d

# 2. Ejecutar el backend
cd ../backend
mvn spring-boot:run
```

### 3. Ejecutar el frontend

```bash
cd frontend
npm install
npm run dev
```

El frontend se ejecuta generalmente en `http://localhost:5173`.

## 🧪 Comandos de Testing

### Tests e2e con Playwright
```bash
cd frontend
npx playwright install
npx playwright test
npx playwright show-report
```

### Tests del backend
```bash
cd backend
mvn test
```

## ⚙️ Variables de Entorno

### Frontend
Archivo: `.env`

```env
VITE_API_URL="http://localhost:8081/api"
```

### Backend (Desarrollo con H2)
En `src/main/resources/application.properties`:

```properties
# Configuración para desarrollo con H2 (base de datos en memoria)
spring.datasource.url=jdbc:h2:mem:aeropuerto_db
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.h2.console.enabled=true
server.port=8081
```

### Backend (Producción con MySQL)
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/aeropuerto_db
spring.datasource.username=aeropuerto_user
spring.datasource.password=securepassword
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
server.port=8081
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

## 📚 Documentación API

La API está completamente documentada con **Swagger/OpenAPI 3.0**.

### Acceder a la documentación:
- **Swagger UI**: `http://localhost:8081/swagger-ui/index.html`
- **OpenAPI JSON**: `http://localhost:8081/v3/api-docs`

### Características de la documentación:
- ✅ **Acceso público** - No requiere autenticación
- ✅ **32+ endpoints** documentados con anotaciones completas
- ✅ Descripciones detalladas de todos los endpoints
- ✅ Parámetros y respuestas documentadas
- ✅ Códigos de estado HTTP explicados
- ✅ Ejemplos de requests/responses
- ✅ Agrupación por módulos (Pasajeros, Vuelos, Equipaje, Notificaciones)
- ✅ Configuración OpenAPI centralizada con info del proyecto

## Kubernetes

Los manifiestos para despliegue están en `k8s/`.
Para aplicar los recursos:

```bash
kubectl apply -f k8s/
```

## 📋 Buenas Prácticas Implementadas

- ✅ Separación clara entre backend y frontend
- ✅ Validación completa de datos en todas las capas
- ✅ Manejo de errores centralizado
- ✅ Logging estructurado
- ✅ Tests automatizados (unitarios y e2e)
- ✅ Documentación completa de API
- ✅ Migraciones de base de datos versionadas
- ✅ Configuración de entornos (desarrollo/producción)
- ✅ Principios SOLID y clean architecture

## 🤝 Contribuciones

1. Haz fork del repositorio
2. Crea una rama descriptiva (`git checkout -b feature/nueva-funcionalidad`)
3. Realiza tus cambios siguiendo las buenas prácticas
4. Ejecuta tests: `mvn test` y `npm test`
5. Envía un pull request con descripción detallada

## 📞 Contacto

Si tienes dudas, preguntas o sugerencias, abre un issue en el repositorio.

---

**Estado del Proyecto**: ✅ **COMPLETAMENTE FUNCIONAL**
- Autenticación JWT completa
- Endpoints para pasajeros, vuelos, equipaje
- Validación de datos completa
- Tests e2e con Playwright
- Documentación API con Swagger
- Migración de base de datos con Flyway
- Logging centralizado
- Monitoreo y alertas

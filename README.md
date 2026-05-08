# FlyTrack - Proyecto de Aeropuerto

Aplicación full-stack para gestión de aeropuerto con arquitectura moderna: backend Spring Boot, frontend React + Vite, base de datos MySQL, orquestación con Kubernetes y análisis de calidad con SonarQube.

## Arquitectura

- **Backend**: Java 21 + Spring Boot (con autenticación JWT)
- **Frontend**: React 18 + TypeScript + Vite + shadcn/ui
- **Base de datos**: MySQL 8.0
- **Contenedores**: Docker + Docker Compose
- **Orquestación**: Kubernetes
- **CI/CD**: GitHub Actions
- **Análisis de calidad**: SonarQube

## Estructura del proyecto

```
.
├── backend/              # API REST en Spring Boot
│   ├── src/
│   ├── pom.xml
│   ├── Dockerfile
│   └── README.md
├── frontend/             # Aplicación React + Vite
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   ├── Dockerfile
│   └── README.md
├── database/             # Configuración de MySQL
│   ├── init.sql
│   └── docker-compose.yml
├── k8s/                  # Manifiestos de Kubernetes
│   ├── mysql-*
│   ├── backend-*
│   ├── frontend-*
│   ├── sonarqube-*
│   └── postgres-*
├── .github/workflows/    # CI/CD pipeline
│   └── ci-cd.yml
└── README.md
```

## Cómo ejecutar

### Desarrollo local

1. **Base de datos**:
   ```bash
   cd database
   docker compose up -d
   ```

2. **Backend**:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

3. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Con Docker Compose (todos los servicios)
```bash
docker compose -f database/docker-compose.yml up --build
```

### Con Kubernetes (producción)
```bash
kubectl apply -f k8s/
kubectl port-forward svc/frontend-service 5173:5173
kubectl port-forward svc/backend-service 8080:8080
kubectl port-forward svc/sonarqube-service 9000:9000
```

## CI/CD Pipeline

El pipeline se ejecuta automáticamente en pushes/PRs a `main`:
- ✅ Compilación de backend y frontend
- ✅ Pruebas automatizadas (JUnit + Vitest)
- ✅ Análisis de código con SonarQube
- ✅ Construcción de imágenes Docker
- ✅ Despliegue automático a Kubernetes

### Configuración requerida (GitHub Secrets)
- `SONAR_TOKEN`: Token de SonarQube
- `SONAR_HOST_URL`: URL de tu instancia SonarQube
- `DOCKER_USERNAME`: Usuario de Docker Hub
- `DOCKER_PASSWORD`: Contraseña de Docker Hub
- `KUBE_CONFIG`: Configuración de Kubernetes

## Tecnologías

### Backend
- Java 21
- Spring Boot 3.2
- Spring Data JPA
- MySQL JDBC Driver
- JUnit 5 + MockMvc

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router v6
- React Hook Form
- TanStack Query

### DevOps
- Docker & Docker Compose
- Kubernetes
- GitHub Actions
- SonarQube Community
- Maven
- npm

## Variables de entorno

### Frontend (.env)
```env
VITE_API_URL="http://localhost:8080/api"
```

### Backend (application.properties)
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/aeropuerto_db
spring.datasource.username=aeropuerto_user
spring.datasource.password=securepassword
server.port=8080
```

## Endpoints principales

- `GET /api/hello` - Endpoint de prueba del backend
- `POST /api/auth/login` - Autenticación (por implementar)
- `POST /api/auth/signup` - Registro (por implementar)

## Próximas mejoras

- [ ] Autenticación JWT completa
- [ ] Endpoints para pasajeros, vuelos, equipaje
- [ ] Validación de datos completa
- [ ] Tests e2e con Playwright
- [ ] Documentación API con Swagger
- [ ] Migración de base de datos con Flyway
- [ ] Logging centralizado
- [ ] Monitoreo y alertas

## Notas importantes

- **Supabase removido**: El proyecto ahora usa autenticación basada en Spring Security en el backend
- **Estructura limpia**: Todo el código del frontend está en la carpeta `frontend/`, el backend en `backend/`
- **MySQL**: Se usa MySQL en lugar de PostgreSQL para la base de datos principal
- **Kubernetes listo**: Los manifiestos están listos para desplegar en cualquier cluster K8s

## Contacto

Para preguntas o contribuciones, contacta al equipo de desarrollo.

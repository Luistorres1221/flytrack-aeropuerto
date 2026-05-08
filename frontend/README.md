# Frontend - FlyTrack

Aplicación React + TypeScript con Vite para la gestión de aeropuerto.

## Tecnologías

- React 18
- TypeScript
- Vite (build tool)
- Tailwind CSS
- shadcn/ui (componentes)
- React Router v6
- React Hook Form + Zod
- TanStack Query
- Vitest (testing)
- Playwright (e2e testing)

## Cómo ejecutar

### Desarrollo
```bash
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

### Testing
```bash
npm run test
npm run test:watch
```

### Linting
```bash
npm run lint
```

## Estructura

```
src/
├── components/           # Componentes React reutilizables
│   ├── ui/              # Componentes de shadcn/ui
│   ├── Navbar.tsx
│   ├── ProtectedRoute.tsx
│   └── ...
├── pages/               # Páginas/vistas principales
│   ├── Index.tsx
│   ├── Auth.tsx
│   ├── Flights.tsx
│   ├── Baggage.tsx
│   ├── Profile.tsx
│   ├── Admin.tsx
│   └── ...
├── hooks/               # Custom React hooks
│   └── use-mobile.tsx
├── lib/                 # Utilidades y helpers
│   └── utils.ts
├── App.tsx              # Componente raíz
├── main.tsx             # Entry point
└── index.css            # Estilos globales
```

## Configuración

### Variables de entorno (.env)
```env
VITE_API_URL="http://localhost:8080/api"
```

### Conexión con Backend

El frontend se conecta al backend Spring Boot en `http://localhost:8080/api`:

```typescript
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

// Ejemplo de llamada
const response = await fetch(`${apiUrl}/auth/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});
```

## Autenticación

El token de autenticación se almacena en `localStorage`:

```typescript
// Guardar token
localStorage.setItem("authToken", token);

// Obtener token
const token = localStorage.getItem("authToken");

// Eliminar token
localStorage.removeItem("authToken");
```

Las rutas protegidas usan el componente `ProtectedRoute`:

```tsx
<Route path="/perfil" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
```

## Docker

### Build
```bash
docker build -t aeropuerto-frontend .
```

### Run
```bash
docker run -p 5173:5173 aeropuerto-frontend
```

## Deploy en Kubernetes

Ver manifiestos en `../k8s/frontend-*`

## Próximos pasos

- [ ] Integrar con API de autenticación
- [ ] Implementar validaciones completas
- [ ] Agregar más tests
- [ ] Mejorar UX/UI
- [ ] Agregar más páginas funcionales

/**
 * URL base del backend (variable VITE_API_URL). Quita barras finales para armar rutas estables en local y en Vercel.
 */
export function getApiBaseUrl(): string {
  const raw = import.meta.env.VITE_API_URL;
  if (raw == null || String(raw).trim() === "") {
    return "";
  }
  return String(raw).replace(/\/+$/, "");
}

/** Ejemplo: apiUrl("/api/vuelos") */
export function apiUrl(path: string): string {
  const base = getApiBaseUrl();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

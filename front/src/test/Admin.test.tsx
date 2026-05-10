import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi } from "vitest";
import type { ReactNode } from "react";
import Admin from "@/pages/Admin";

const fetchMock = vi.fn();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.fetch = fetchMock as any;

const createQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={createQueryClient()}>
    {children}
  </QueryClientProvider>
);

describe("Admin", () => {
  beforeEach(() => {
    fetchMock.mockClear();
    vi.clearAllMocks();
    fetchMock.mockResolvedValue({ ok: true, json: async () => [] });
  });

  it("should render admin panel with tabs", () => {
    render(<Admin />, { wrapper });

    expect(screen.getByText("Administración")).toBeInTheDocument();
    expect(screen.getByText("Vuelos")).toBeInTheDocument();
    expect(screen.getByText("Reportes equipaje")).toBeInTheDocument();
    expect(screen.getByText("Pasajeros")).toBeInTheDocument();
  });

  it("should load flights on mount", async () => {
    const mockFlights = [
      {
        id: 1,
        codigoVuelo: "ABC123",
        origen: "Madrid",
        destino: "Barcelona",
        fechaSalida: "2024-01-01T10:00:00",
        fechaLlegada: "2024-01-01T11:30:00",
        estado: "PROGRAMADO",
        puerta: "A1",
        terminal: "T1",
        aerolinea: "Iberia"
      }
    ];

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockFlights,
    });

    render(<Admin />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText("ABC123")).toBeInTheDocument();
      expect(screen.getByText("Iberia")).toBeInTheDocument();
    });

    expect(fetchMock).toHaveBeenCalledWith("http://localhost:8090/api/vuelos");
  });

  it("should load baggage on mount", async () => {
    const mockBaggage = [
      {
        id: "1",
        numeroEtiqueta: "EQ123",
        descripcion: "Maleta negra",
        estado: "PERDIDO",
        vueloId: "1",
        pasajeroId: "1",
        fechaCreacion: "2024-01-01T00:00:00Z",
        fechaActualizacion: "2024-01-01T00:00:00Z"
      }
    ];

    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockBaggage,
      });

    render(<Admin />, { wrapper });

    // Switch to baggage tab
    fireEvent.click(screen.getByRole("tab", { name: /equipaje/i }));

    await waitFor(() => {
      expect(screen.getByText("EQ123")).toBeInTheDocument();
    });

    expect(fetchMock).toHaveBeenCalledWith("http://localhost:8090/api/equipajes");
  });

  it("should handle API errors", async () => {
    fetchMock.mockRejectedValueOnce(new Error("Network error"));

    render(<Admin />, { wrapper });

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    });
  });
});
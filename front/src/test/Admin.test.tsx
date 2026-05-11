import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("should render admin panel with tabs", async () => {
    render(<Admin />, { wrapper });

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    });

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

    fetchMock.mockImplementation((url: string) => {
      if (typeof url === "string" && url.includes("/api/equipajes")) {
        return Promise.resolve({ ok: true, json: async () => mockBaggage });
      }
      return Promise.resolve({ ok: true, json: async () => [] });
    });

    const user = userEvent.setup();
    render(<Admin />, { wrapper });

    await user.click(screen.getByRole("tab", { name: "Reportes equipaje" }));

    await waitFor(() => {
      expect(screen.getByText("EQ123")).toBeInTheDocument();
    });

    expect(fetchMock).toHaveBeenCalledWith("http://localhost:8090/api/equipajes");
  });

  it("should handle API errors", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    try {
      fetchMock.mockRejectedValueOnce(new Error("Network error"));

      render(<Admin />, { wrapper });

      await waitFor(() => {
        expect(fetchMock).toHaveBeenCalled();
      });
    } finally {
      consoleError.mockRestore();
    }
  });
});
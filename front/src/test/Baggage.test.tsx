import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi } from "vitest";
import type { ReactNode } from "react";
import Baggage from "@/pages/Baggage";

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

describe("Baggage", () => {
  beforeEach(() => {
    fetchMock.mockClear();
    vi.clearAllMocks();
    fetchMock.mockResolvedValue({ ok: true, json: async () => [] });
  });

  it("should render baggage tracking form", () => {
    render(<Baggage />, { wrapper });

    expect(screen.getByText("Rastreo de Equipaje")).toBeInTheDocument();
    expect(screen.getByLabelText(/número de etiqueta/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descripción/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/id del vuelo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/id del pasajero/i)).toBeInTheDocument();
  });

  it("should load baggage list on mount", async () => {
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

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockBaggage,
    });

    render(<Baggage />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText("EQ123")).toBeInTheDocument();
    });

    expect(fetchMock).toHaveBeenCalledWith("http://localhost:8090/api/equipajes");
  });

  it("should submit baggage registration form", async () => {
    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: "1" }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

    render(<Baggage />, { wrapper });

    fireEvent.change(screen.getByLabelText(/número de etiqueta/i), {
      target: { value: "EQ123" },
    });
    fireEvent.change(screen.getByLabelText(/descripción/i), {
      target: { value: "Maleta negra con ruedas" },
    });
    fireEvent.change(screen.getByLabelText(/id del vuelo/i), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByLabelText(/id del pasajero/i), {
      target: { value: "1" },
    });

    fireEvent.click(screen.getByRole("button", { name: /registrar equipaje/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(3);
    });

    expect(fetchMock).toHaveBeenCalledWith("http://localhost:8090/api/equipajes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        numeroEtiqueta: "EQ123",
        descripcion: "Maleta negra con ruedas",
        vueloId: 1,
        pasajeroId: 1,
        estado: "PERDIDO",
      }),
    });
  });

  it("should not submit the form when validation fails", async () => {
    fetchMock.mockResolvedValueOnce({ ok: true, json: async () => [] });

    render(<Baggage />, { wrapper });

    fireEvent.click(screen.getByRole("button", { name: /registrar equipaje/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });
  });

  it("should handle API errors gracefully", async () => {
    fetchMock
      .mockResolvedValueOnce({ ok: true, json: async () => [] })
      .mockResolvedValueOnce({ ok: false, json: async () => ({ message: "Error del servidor" }) });

    render(<Baggage />, { wrapper });

    fireEvent.change(screen.getByLabelText(/número de etiqueta/i), {
      target: { value: "EQ123" },
    });
    fireEvent.change(screen.getByLabelText(/descripción/i), {
      target: { value: "Maleta negra" },
    });
    fireEvent.change(screen.getByLabelText(/id del vuelo/i), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByLabelText(/id del pasajero/i), {
      target: { value: "1" },
    });

    fireEvent.click(screen.getByRole("button", { name: /registrar equipaje/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });
  });
});
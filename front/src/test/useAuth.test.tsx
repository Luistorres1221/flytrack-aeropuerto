import { renderHook, act, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { AuthProvider, useAuth } from "@/hooks/useAuth";

const authMocks = vi.hoisted(() => {
  const getSession = vi.fn().mockResolvedValue({ data: { session: null } });
  const signOut = vi.fn().mockResolvedValue(undefined);
  const unsubscribe = vi.fn();
  const onAuthStateChange = vi.fn(() => ({
    data: { subscription: { unsubscribe } },
  }));
  return { getSession, signOut, unsubscribe, onAuthStateChange };
});

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: {
      getSession: authMocks.getSession,
      onAuthStateChange: authMocks.onAuthStateChange,
      signOut: authMocks.signOut,
    },
  },
}));

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
  writable: true,
});

describe("useAuth", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    authMocks.getSession.mockResolvedValue({ data: { session: null } });
  });

  it("should initialize with loading state", async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.user).toBe(null);
    expect(result.current.session).toBe(null);
    expect(result.current.isAdmin).toBe(false);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it("should handle local admin login", async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.loginLocalAdmin();
    });

    await waitFor(() => {
      expect(result.current.user).not.toBe(null);
      expect(result.current.user?.email).toBe("admin@flytrack.com");
      expect(result.current.isAdmin).toBe(true);
      expect(result.current.loading).toBe(false);
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith("flytrack_local_admin", "true");
  });

  it("should restore local admin on initialization", () => {
    localStorageMock.getItem.mockReturnValue("true");

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user?.email).toBe("admin@flytrack.com");
    expect(result.current.isAdmin).toBe(true);
  });

  it("should handle sign out", async () => {
    localStorageMock.getItem.mockReturnValue("true");

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(async () => {
      await result.current.signOut();
    });

    expect(localStorageMock.removeItem).toHaveBeenCalledWith("flytrack_local_admin");
    expect(result.current.user).toBe(null);
    expect(result.current.isAdmin).toBe(false);
  });
});

import { renderHook, act, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

// Mock Supabase
jest.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: {
      getSession: jest.fn(),
      onAuthStateChange: jest.fn(() => ({
        data: { subscription: { unsubscribe: jest.fn() } }
      })),
      signOut: jest.fn()
    }
  }
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe("useAuth", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it("should initialize with loading state", () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.user).toBe(null);
    expect(result.current.session).toBe(null);
    expect(result.current.isAdmin).toBe(false);
  });

  it("should handle local admin login", async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
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
      wrapper: AuthProvider
    });

    expect(result.current.user?.email).toBe("admin@flytrack.com");
    expect(result.current.isAdmin).toBe(true);
  });

  it("should handle sign out", async () => {
    localStorageMock.getItem.mockReturnValue("true");

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(async () => {
      await result.current.signOut();
    });

    expect(localStorageMock.removeItem).toHaveBeenCalledWith("flytrack_local_admin");
    expect(result.current.user).toBe(null);
    expect(result.current.isAdmin).toBe(false);
  });
});
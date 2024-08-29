import create from "zustand";

const useAuthStore = create((set) => ({
  token: null,
  isAuthenticated: false,
  authLoading: false,
  setToken: (token) => set({ token, isAuthenticated: !!token }),
  setAuthLoading: (loading) => set({ authLoading: loading }),
  logout: () => set({ token: null, isAuthenticated: false }),
}));

export default useAuthStore;

import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const useAuthStore = create((set) => ({
  token: null,
  isAuthenticated: false,
  authLoading: false,

  setToken: async (token) => {
    if (Platform.OS === "web") {
      if (token) {
        localStorage.setItem("authToken", token);
      } else {
        localStorage.removeItem("authToken");
      }
    } else {
      if (token) {
        await SecureStore.setItemAsync("authToken", token);
      } else {
        await SecureStore.deleteItemAsync("authToken");
      }
    }
    set({ token, isAuthenticated: !!token });
  },

  initializeAuth: async () => {
    let token;
    if (Platform.OS === "web") {
      token = localStorage.getItem("authToken");
    } else {
      token = await SecureStore.getItemAsync("authToken");
    }
    set({ token, isAuthenticated: !!token });
  },

  setAuthLoading: (loading) => set({ authLoading: loading }),

  logout: async () => {
    if (Platform.OS === "web") {
      localStorage.removeItem("authToken");
    } else {
      await SecureStore.deleteItemAsync("authToken");
    }
    set({ token: null, isAuthenticated: false });
  },
}));

export default useAuthStore;

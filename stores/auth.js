import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { jwtDecode } from "jwt-decode";

const useAuthStore = create((set) => ({
  token: null,
  isAuthenticated: false,
  authLoading: false,
  isAdmin: false,
  user: null,

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

    let decodedToken = null;
    if (token) {
      decodedToken = jwtDecode(token); // Decode the JWT
      set({ isAdmin: decodedToken.isAdmin, user: decodedToken });
    }

    set({ token, isAuthenticated: !!token });
  },

  setAdmin: (isAdmin) => set({ isAdmin }),

  initializeAuth: async () => {
    let token;
    if (Platform.OS === "web") {
      token = localStorage.getItem("authToken");
    } else {
      token = await SecureStore.getItemAsync("authToken");
    }

    let decodedToken = null;
    if (token) {
      console.log("THIS IS THE TOKEN: ", token);
      console.log("HERE");
      try {
        decodedToken = jwtDecode(token); // Decode the JWT
        console.log("DECODE TOKEN:", decodedToken);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
      set({ isAdmin: decodedToken.isAdmin, user: decodedToken });
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
    set({ token: null, isAuthenticated: false, isAdmin: false, user: null });
  },
}));

export default useAuthStore;

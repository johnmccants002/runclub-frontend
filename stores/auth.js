import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "@/constants";

const useAuthStore = create((set) => ({
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  authLoading: false,
  isAdmin: false,
  user: null,

  setToken: async (token, refreshToken) => {
    console.log("Setting token:", token, refreshToken);

    if (Platform.OS === "web") {
      if (token) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("refreshToken", refreshToken);
      } else {
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
      }
    } else {
      if (token) {
        await SecureStore.setItemAsync("authToken", token);
        await SecureStore.setItemAsync("refreshToken", refreshToken);
      } else {
        await SecureStore.deleteItemAsync("authToken");
        await SecureStore.deleteItemAsync("refreshToken");
      }
    }

    let decodedToken = null;
    if (token) {
      decodedToken = jwtDecode(token); // Decode the JWT
      console.log("Decoded Token:", decodedToken);

      set({ isAdmin: decodedToken.isAdmin, user: decodedToken });
    }

    set({ token, refreshToken, isAuthenticated: !!token });
  },

  setAdmin: (isAdmin) => {
    console.log("Setting isAdmin:", isAdmin);

    set({ isAdmin });
  },

  initializeAuth: async () => {
    let token, refreshToken;

    if (Platform.OS === "web") {
      token = localStorage.getItem("authToken");
      refreshToken = localStorage.getItem("refreshToken");
    } else {
      token = await SecureStore.getItemAsync("authToken");
      refreshToken = await SecureStore.getItemAsync("refreshToken");
    }

    let decodedToken = null;
    if (token) {
      console.log("IF TOKEN STATEMENT");
      try {
        decodedToken = jwtDecode(token); // Decode the JWT
        const currentTime = Date.now() / 1000; // Current time in seconds
        // Check if the access token is expired
        if (decodedToken.exp < currentTime) {
          console.log("Access token expired. Attempting to refresh...");

          if (refreshToken) {
            // Call refreshAuthToken to get a new token
            await useAuthStore.getState().refreshAuthToken();
            return; // Exit the function as refreshAuthToken will handle setting the new tokens
          } else {
            console.log("No refresh token available. Logging out...");
            await useAuthStore.getState().logout();
            return;
          }
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        await useAuthStore.getState().logout(); // Log out on error
      }
      set({ isAdmin: decodedToken.isAdmin, user: decodedToken });
    }

    set({ token, refreshToken, isAuthenticated: !!token });
    console.log("Updated Auth Store:", {
      token,
      refreshToken,
      isAuthenticated: !!token,
      user: decodedToken,
    });
  },

  setAuthLoading: (loading) => {
    console.log("Setting authLoading:", loading);

    set({ authLoading: loading });
  },

  logout: async () => {
    if (Platform.OS === "web") {
      localStorage.removeItem("authToken");
    } else {
      await SecureStore.deleteItemAsync("authToken");
    }
    set({
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isAdmin: false,
      user: null,
    });
  },
  refreshAuthToken: async () => {
    let refreshToken;
    if (Platform.OS === "web") {
      refreshToken = localStorage.getItem("refreshToken");
    } else {
      refreshToken = await SecureStore.getItemAsync("refreshToken");
    }

    if (refreshToken) {
      try {
        // Make a request to your backend to refresh the token
        console.log("REFRESHING THE TOKEN");
        const response = await fetch(`${BASE_URL}/auth/token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        });

        if (response.ok) {
          const data = await response.json();
          const { token: newToken, refreshToken: newRefreshToken } = data;

          // Store the new tokens
          await useAuthStore.getState().setToken(newToken, newRefreshToken);
        } else {
          console.log("Failed to refresh token. Logging out...");
          await useAuthStore.getState().logout();
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
        await useAuthStore.getState().logout();
      }
    }
  },
  setAuthState: ({ token, refreshToken, isAdmin, authLoading, user }) => {
    set((state) => ({
      ...state,
      token,
      refreshToken,
      isAdmin,
      authLoading,
      user,
      isAuthenticated: !!token,
    }));
  },
}));

export default useAuthStore;

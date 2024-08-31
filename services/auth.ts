import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useAuthStore from "../stores/auth";

// Define a type for the login parameters
interface LoginParams {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  token: string;
  refreshToken: string;
  user: User;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
}

// Define a type for the login response data
interface LoginResponse {
  token: string;
}

// Define a type for the logout response data (optional, adjust based on your backend)
interface LogoutResponse {
  message: string;
}

export const useLoginMutation = () => {
  const { setToken, setAuthLoading, setAdmin } = useAuthStore();

  return useMutation<LoginResponse, Error, LoginParams>({
    mutationFn: async ({ email, password }: LoginParams) => {
      setAuthLoading(true);
      const { data } = await axios.post<LoginResponse>(
        "http://localhost:5050/auth/signin",
        {
          email,
          password,
        }
      );
      return data;
    },
    onSuccess: (data) => {
      setToken(data.token);
      setAdmin(data.user.isAdmin);
      setAuthLoading(false);
    },
    onError: (error) => {
      setAuthLoading(false);
      console.error("Login failed", error);
      // Optionally, you can add a toast notification here
    },
  });
};

export const useRegisterMutation = () => {
  const { setAuthLoading } = useAuthStore();

  return useMutation({
    mutationFn: async (userData) => {
      setAuthLoading(true);
      await axios.post("http://localhost:5050/auth/signup", userData);
    },
    onSuccess: () => {
      setAuthLoading(false);
    },
    onError: (error) => {
      setAuthLoading(false);
      console.error("Registration failed", error);
      // Optionally, you can add a toast notification here
    },
  });
};

export const useLogoutMutation = () => {
  const { logout } = useAuthStore();

  return useMutation<LogoutResponse, Error>({
    mutationFn: async () => {
      const { data } = await axios.post<LogoutResponse>(
        "http://localhost:5050/auth/logout"
      );
      return data;
    },
    onSuccess: () => {
      logout(); // Clear the authentication state
    },
    onError: (error) => {
      console.error("Logout failed", error);
      // Optionally, you can add a toast notification here
    },
  });
};

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useAuthStore from "../stores/auth";
import { BASE_URL } from "@/constants";

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

interface SignUpResponse {
  message: string;
  token: string;
  refreshToken: string;
  user: User;
}
interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  tosAccepted: boolean; // Added
  emailList: boolean; // Added
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
        `${BASE_URL}/auth/signin`,
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
  const { setToken, setAuthLoading, setAdmin } = useAuthStore();

  return useMutation<SignUpResponse, Error, SignUpParams>({
    mutationFn: async (userData: SignUpParams): Promise<SignUpResponse> => {
      setAuthLoading(true);

      // Send the registration data including tosAccepted and emailList
      const { data } = await axios.post<SignUpResponse>(
        `${BASE_URL}/auth/signup`,
        userData
      );

      return data;
    },
    onSuccess: (data) => {
      setAuthLoading(false);
      setToken(data.token);
      setAdmin(data.user.isAdmin);
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
        `${BASE_URL}/auth/logout`
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

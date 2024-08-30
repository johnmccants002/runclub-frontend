import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useAuthStore from "../stores/auth";

export const useLoginMutation = () => {
  const { setToken, setAuthLoading } = useAuthStore();

  return useMutation(
    async ({ email, password }) => {
      setAuthLoading(true);
      const { data } = await axios.post("http://localhost:5050/auth/login", {
        email,
        password,
      });
      return data;
    },
    {
      onSuccess: (data) => {
        setToken(data.token);
        setAuthLoading(false);
      },
      onError: () => {
        setAuthLoading(false);
        console.error("Login failed");
      },
    }
  );
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
    onError: () => {
      setAuthLoading(false);
      console.error("Registration failed");
    },
  });
};

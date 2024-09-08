import { create } from "zustand";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Define a type for the user's information
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  membershipStatus: string;
  createdAt: string;
  updatedAt: string;
  isAdmin: boolean;
}

// Zustand store definition
interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null, // Default state is null to indicate no user data initially
  setUser: (user: User) => set({ user }),
  clearUser: () => set({ user: null }), // Clear user data when needed
}));

// Function to fetch the user data
const fetchUser = async (userId: string): Promise<User> => {
  const { data } = await axios.get<User>(`${BASE_URL}/users/${userId}`);
  return data;
};

// Custom hook to use the user query
export const useUserQuery = (userId: string) => {
  const { setUser } = useUserStore();

  return useQuery<User, Error>({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
    onSuccess: (data) => {
      setUser(data); // Store the fetched user data in Zustand store
    },
    onError: () => {
      console.error("Failed to fetch user data");
    },
  });
};

export default useUserStore;

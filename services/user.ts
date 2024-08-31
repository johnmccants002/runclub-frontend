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

// Function to fetch the user data
const fetchUser = async (userId: string): Promise<User> => {
  const { data } = await axios.get<User>(
    `http://localhost:5050/users/${userId}`
  );
  return data;
};

// Custom hook to use the user query
export const useUserQuery = (userId: string) => {
  return useQuery<User, Error>({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
  });
};

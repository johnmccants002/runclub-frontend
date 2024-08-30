import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "@/types/types"; // Assuming Member is the same as User. Adjust if necessary.

const fetchMembers = async (): Promise<User[]> => {
  const { data } = await axios.get("http://localhost:5050/members");
  return data;
};

export const useMembersQuery = () => {
  return useQuery<User[]>({
    queryKey: ["members"],
    queryFn: fetchMembers,
  });
};

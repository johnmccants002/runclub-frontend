import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

export const useAcceptMemberMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) =>
      axios.put(`http://localhost:5050/admin/accept/${userId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] }); // Wrap the string in an array
      queryClient.invalidateQueries({ queryKey: ["pendingMembers"] }); // Wrap the string in an array
    },
    onError: () => {
      alert("Error accepting member");
    },
  });
};
export const useDenyMemberMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) =>
      axios.put(`http://localhost:5050/admin/deny/${userId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] }); // Wrap the string in an array
      queryClient.invalidateQueries({ queryKey: ["pendingMembers"] }); // Wrap the string in an array
    },
    onError: () => {
      alert("Error denying member");
    },
  });
};

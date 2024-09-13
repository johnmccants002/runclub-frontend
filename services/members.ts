import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/middleware/axios";
import { User } from "@/types/types"; // Assuming Member is the same as User. Adjust if necessary.
import { BASE_URL } from "@/constants";
import useAuthStore from "@/stores/auth"; // Import the auth store for the token

// Fetch members with the token in the header
const fetchMembers = async (): Promise<User[]> => {
  const token = useAuthStore.getState().token; // Get the token from the auth store
  const { data } = await axios.get(`${BASE_URL}/members`, {
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in the header
    },
  });
  return data;
};

// Fetch the number of members accepted this week with the token
const fetchAcceptedThisWeek = async (): Promise<number> => {
  const token = useAuthStore.getState().token; // Get the token from the auth store
  const { data } = await axios.get(
    `${BASE_URL}/admin/accepted-members/this-week`,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the header
      },
    }
  );
  return data.acceptedThisWeek;
};

// Fetch the number of members accepted this month with the token
const fetchAcceptedThisMonth = async (): Promise<number> => {
  const token = useAuthStore.getState().token; // Get the token from the auth store
  const { data } = await axios.get(
    `${BASE_URL}/admin/accepted-members/this-month`,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the header
      },
    }
  );
  return data.acceptedThisMonth;
};

// Queries for accepted members
export const useAcceptedThisWeekQuery = () => {
  return useQuery<number>({
    queryKey: ["acceptedThisWeek"],
    queryFn: fetchAcceptedThisWeek,
  });
};

export const useAcceptedThisMonthQuery = () => {
  return useQuery<number>({
    queryKey: ["acceptedThisMonth"],
    queryFn: fetchAcceptedThisMonth,
  });
};

// Query to fetch all members
export const useMembersQuery = () => {
  return useQuery<User[]>({
    queryKey: ["members"],
    queryFn: fetchMembers,
  });
};

// Mutation to accept a member with the token
export const useAcceptMemberMutation = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore.getState().token; // Get the token from the auth store

  return useMutation({
    mutationFn: (userId: string) =>
      axios.put(
        `${BASE_URL}/admin/accept/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      queryClient.invalidateQueries({ queryKey: ["pendingMembers"] });
      queryClient.invalidateQueries({ queryKey: ["acceptedThisWeek"] });
      queryClient.invalidateQueries({ queryKey: ["acceptedThisMonth"] });
    },
    onError: () => {
      alert("Error accepting member");
    },
  });
};

// Mutation to deny a member with the token
export const useDenyMemberMutation = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore.getState().token; // Get the token from the auth store

  return useMutation({
    mutationFn: (userId: string) =>
      axios.put(
        `${BASE_URL}/admin/deny/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      queryClient.invalidateQueries({ queryKey: ["pendingMembers"] });
      queryClient.invalidateQueries({ queryKey: ["acceptedThisWeek"] });
      queryClient.invalidateQueries({ queryKey: ["acceptedThisMonth"] });
    },
    onError: () => {
      alert("Error denying member");
    },
  });
};

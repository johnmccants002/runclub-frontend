import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { User } from "@/types/types"; // Assuming Member is the same as User. Adjust if necessary.
import { BASE_URL } from "@/constants";

const fetchMembers = async (): Promise<User[]> => {
  const { data } = await axios.get(`${BASE_URL}/members`);
  return data;
};

// Fetch the number of members accepted this week
const fetchAcceptedThisWeek = async (): Promise<number> => {
  const { data } = await axios.get(
    `${BASE_URL}/admin/accepted-members/this-week`
  );
  return data.acceptedThisWeek;
};

// Fetch the number of members accepted this month
const fetchAcceptedThisMonth = async (): Promise<number> => {
  const { data } = await axios.get(
    `${BASE_URL}/admin/accepted-members/this-month`
  );
  return data.acceptedThisMonth;
};

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
      axios.put(`${BASE_URL}/admin/accept/${userId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      queryClient.invalidateQueries({ queryKey: ["pendingMembers"] });
      queryClient.invalidateQueries({ queryKey: ["acceptedThisWeek"] }); // Invalidate the query for accepted members this week
      queryClient.invalidateQueries({ queryKey: ["acceptedThisMonth"] });
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
      axios.put(`${BASE_URL}/admin/deny/${userId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      queryClient.invalidateQueries({ queryKey: ["pendingMembers"] });
      queryClient.invalidateQueries({ queryKey: ["acceptedThisWeek"] }); // Invalidate the query for accepted members this week
      queryClient.invalidateQueries({ queryKey: ["acceptedThisMonth"] });
    },
    onError: () => {
      alert("Error denying member");
    },
  });
};

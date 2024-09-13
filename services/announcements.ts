import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/middleware/axios";
import { Announcement, CreateAnnouncementInput } from "../types/types";
import { BASE_URL } from "@/constants";
import useAuthStore from "@/stores/auth"; // Import the auth store to get the token

// Fetch all announcements with token in header
const fetchAnnouncements = async (): Promise<Announcement[]> => {
  const token = useAuthStore.getState().token; // Get the token from the auth store

  const { data } = await axios.get(`${BASE_URL}/announcements/all`, {
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in the header
    },
  });
  return data;
};

export const useAnnouncementsQuery = () => {
  return useQuery<Announcement[]>({
    queryKey: ["announcements"],
    queryFn: fetchAnnouncements,
  });
};

export const useAddAnnouncementMutation = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore.getState().token; // Get the token from the auth store

  return useMutation<Announcement, Error, CreateAnnouncementInput>({
    mutationFn: async (newAnnouncement: CreateAnnouncementInput) => {
      const { data } = await axios.post<Announcement>(
        `${BASE_URL}/announcements/create`,
        newAnnouncement,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
          },
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
};

export const useDeleteAnnouncementMutation = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore.getState().token; // Get the token from the auth store

  return useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      await axios.delete(`${BASE_URL}/announcements/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
};

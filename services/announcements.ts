import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Announcement, CreateAnnouncementInput } from "../types/types";
import { BASE_URL } from "@/constants";

const fetchAnnouncements = async (): Promise<Announcement[]> => {
  const { data } = await axios.get(`${BASE_URL}/announcements/all`);
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

  return useMutation<Announcement, Error, CreateAnnouncementInput>({
    mutationFn: async (newAnnouncement: CreateAnnouncementInput) => {
      const { data } = await axios.post<Announcement>(
        `${BASE_URL}/announcements/create`,
        newAnnouncement
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

  return useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      await axios.delete(`${BASE_URL}/announcements/delete/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
};

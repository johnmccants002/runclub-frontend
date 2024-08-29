import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetchAnnouncements = async () => {
  const { data } = await axios.get("http://localhost:3000/announcements/all");
  return data;
};

export const useAnnouncementsQuery = () => {
  return useQuery(["announcements"], fetchAnnouncements);
};

export const useAddAnnouncementMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (newAnnouncement) => {
      const { data } = await axios.post(
        "http://localhost:3000/announcements/create",
        newAnnouncement
      );
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["announcements"]);
      },
    }
  );
};

export const useDeleteAnnouncementMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id) => {
      await axios.delete(`http://localhost:3000/announcements/delete/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["announcements"]);
      },
    }
  );
};

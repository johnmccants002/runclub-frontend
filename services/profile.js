import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useProfileStore from "../stores/profile";

export const useProfileQuery = (userId) => {
  const { setProfile } = useProfileStore();

  return useQuery(
    ["profile", userId],
    async () => {
      const { data } = await axios.get(`${BASE_URL}/users/profile/${userId}`);
      return data;
    },
    {
      onSuccess: (data) => {
        setProfile(data);
      },
      onError: () => {
        console.error("Failed to fetch profile");
      },
    }
  );
};

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  const { setProfile } = useProfileStore();

  return useMutation(
    async ({ userId, profileData }) => {
      const { data } = await axios.put(
        `${BASE_URL}/users/profile/${userId}`,
        profileData
      );
      return data;
    },
    {
      onSuccess: (data, { userId }) => {
        queryClient.invalidateQueries(["profile", userId]);
        setProfile(data);
      },
      onError: () => {
        console.error("Failed to update profile");
      },
    }
  );
};

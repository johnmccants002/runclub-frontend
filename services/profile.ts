import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/middleware/axios";
import useProfileStore from "../stores/profile";
import useAuthStore from "../stores/auth"; // Import auth store to get the token
import { BASE_URL } from "@/constants"; // Assuming BASE_URL is defined in constants

export const useProfileQuery = (userId) => {
  const { setProfile } = useProfileStore();
  const token = useAuthStore.getState().token; // Get the token from the auth store

  return useQuery(
    ["profile", userId],
    async () => {
      const { data } = await axios.get(`${BASE_URL}/users/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
      });
      return data;
    },
    {
      onSuccess: (data) => {
        setProfile(data); // Set profile in store on success
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
  const token = useAuthStore.getState().token; // Get the token from the auth store

  return useMutation(
    async ({ userId, profileData }) => {
      const { data } = await axios.put(
        `${BASE_URL}/users/profile/${userId}`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
          },
        }
      );
      return data;
    },
    {
      onSuccess: (data, { userId }) => {
        queryClient.invalidateQueries(["profile", userId]); // Invalidate the profile query
        setProfile(data); // Update the profile in the store
      },
      onError: () => {
        console.error("Failed to update profile");
      },
    }
  );
};

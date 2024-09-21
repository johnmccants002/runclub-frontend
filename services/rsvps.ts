import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import axios from "@/middleware/axios";
import { BASE_URL } from "@/constants";
import useAuthStore from "@/stores/auth"; // Import the auth store to access the token

// Fetch RSVPs for a specific event
const fetchRsvps = async (eventId: string): Promise<any[]> => {
  const token = useAuthStore.getState().token; // Get the token from the auth store
  const { data } = await axios.get(`${BASE_URL}/rsvps/${eventId}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in the header
    },
  });
  return data.rsvps; // Assuming the response contains RSVPs in an array
};

// Query to fetch RSVPs for an event
export const useFetchRsvpsQuery = (eventId: string) => {
  return useQuery<any[]>({
    queryKey: ["rsvps", eventId], // Unique query key for RSVPs for a specific event
    queryFn: () => fetchRsvps(eventId), // The function that fetches RSVPs for this event
    enabled: !!eventId, // Only run this query if eventId is available
  });
};

// Mutation to RSVP to an event
export const useCreateRsvpMutation = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore.getState().token; // Get the token from the auth store

  return useMutation<any, Error, { userId: string; eventId: string }>({
    mutationFn: async ({ userId, eventId }) => {
      console.log("userId: ", userId, "eventId: ", eventId);
      const { data } = await axios.post(
        `${BASE_URL}/rsvps`,
        {
          userId,
          eventId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
          },
        }
      );
      return data;
    },
    onSuccess: (_, { eventId }) => {
      // Refetch the RSVPs for this event after a successful RSVP
      queryClient.invalidateQueries({ queryKey: ["rsvps"] });
    },
  });
};
export const useDeleteRsvpMutation = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore.getState().token; // Get the token from the auth store

  return useMutation<any, Error, { userId: string; eventId: string }>({
    mutationFn: async ({ userId, eventId }) => {
      const response = await fetch(`${BASE_URL}/rsvps/${eventId}/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the header
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete RSVP");
      }

      console.log("HERE WE ARE");

      const data = await response.json();
      return data;
    },
    onSuccess: (_, { eventId }) => {
      console.log("ON SUCCESS");
      // Refetch the RSVPs for this event after a successful RSVP deletion
      queryClient.invalidateQueries({ queryKey: ["rsvps"] });
    },
    onError: (error) => {
      console.error("Error deleting RSVP:", error);
    },
  });
};

// Fetch RSVPs for all events
const fetchAllRsvps = async (): Promise<
  { eventId: string; userId: string }[]
> => {
  console.log("FETCHING RSVPS AGAIN");
  const token = useAuthStore.getState().token; // Get the token from the auth store
  const { data } = await axios.get(`${BASE_URL}/rsvps`, {
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in the header
    },
  });

  console.log("THESE ARE THE RSVPS: ", data.rsvps);

  return data.rsvps; // Assuming the response contains an array of RSVPs
};

// Query to fetch all RSVPs
export const useAllRsvpsQuery = () => {
  return useQuery({
    queryKey: ["rsvps"],
    queryFn: fetchAllRsvps,
  });
};

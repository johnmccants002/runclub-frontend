import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import axios from "@/middleware/axios";
import { BASE_URL } from "@/constants";
import useEventsStore from "@/stores/events";
import useAuthStore from "@/stores/auth"; // Import the auth store for the token
import React from "react";

export interface EventInput {
  id: string;
  title: string;
  details: string;
  startTime: string;
  endTime: string;
  photo?: string;
  createdBy: string;
}

export interface Event {
  _id: string;
  createdBy: string;
  title: string;
  details: string;
  startTime: string;
  endTime: string;
  photo?: string;
  createdAt: string;
}

export interface CreateEventInput {
  title: string;
  details: string;
  startTime: string;
  endTime: string;
  photo?: string;
  adminId: string;
  location: {
    place_id: string;
    name: string;
    formatted_address: string;
    lat: number;
    lng: number;
  };
}

// Fetch future events from the API
const fetchFutureEvents = async (): Promise<Event[]> => {
  const token = useAuthStore.getState().token; // Get the token from the auth store

  const { data } = await axios.get(`${BASE_URL}/events/future`, {
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in the header
    },
  });
  return data.events; // Assuming the response contains events in an array
};

// Mutation to add a new event
export const useAddEventMutation = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore.getState().token; // Get the token from the auth store

  return useMutation<Event, Error, CreateEventInput>({
    mutationFn: async (newEvent: CreateEventInput) => {
      const { data } = await axios.post<Event>(
        `${BASE_URL}/events/create`,
        newEvent,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
          },
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["future-events"] }); // Invalidate 'future-events' to refetch after mutation
    },
  });
};

// Mutation to fetch all future events and store them in Zustand
export const useFutureEventsMutation = () => {
  const { setEvents } = useEventsStore();
  const token = useAuthStore.getState().token; // Get the token from the auth store
  console.log("THIS IS THE TOKEN: ", token);

  return useMutation<Event[], Error, void>({
    mutationFn: async () => {
      const { data } = await axios.get(`${BASE_URL}/events/future`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
      });
      return data.events;
    }, // The function that fetches future events
    onSuccess: (events: Event[]) => {
      console.log("SUCCESS");
      setEvents(events); // Update Zustand store with future events
    },
    onError: () => {
      console.log("ERROR");
      setEvents(null); // Clear events in Zustand store if there's an error
    },
  });
};

// Query to fetch all future events and store them in Zustand
export const useFutureEventsQuery = () => {
  console.log("GRABBING FUTURE EVENTS");
  const token = React.useMemo(
    () => useAuthStore.getState().token,
    [useAuthStore]
  );

  return useQuery<Event[]>({
    queryKey: ["future-events"], // Include token in the key to track uniqueness
    queryFn: async () => {
      if (!token) {
        throw new Error("No token provided");
      }
      const response = await axios.get(`${BASE_URL}/events/future`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
      });

      return response.data.events;
    },
  });
};

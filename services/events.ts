import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/constants";
import useEventsStore from "@/stores/events";

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
}

// Fetch future events from the API
const fetchFutureEvents = async (): Promise<Event[]> => {
  const { data } = await axios.get(`${BASE_URL}/events/future`);
  console.log(JSON.stringify("THIS IS THE DATA", data));
  return data.events; // Assuming the response contains events in an array
};

// Mutation to add a new event
export const useAddEventMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Event, Error, CreateEventInput>({
    mutationFn: async (newEvent: CreateEventInput) => {
      const { data } = await axios.post<Event>(
        `${BASE_URL}/events/create`,
        newEvent
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

  return useMutation<Event[], Error, void>({
    mutationFn: fetchFutureEvents, // The function that fetches future events
    onSuccess: (events: Event[]) => {
      console.log(events, "THESE ARE THE EVENTS");
      setEvents(events); // Update Zustand store with future events
    },
    onError: () => {
      console.log("ERROR FETCHING FUTURE EVENTS");
      setEvents(null); // Clear events in Zustand store if there's an error
    },
  });
};

// Query to fetch all future events and store them in Zustand
export const useFutureEventsQuery = () => {
  return useQuery<Event[]>({
    queryKey: ["future-events"], // The unique key for this query
    queryFn: fetchFutureEvents, // The function that fetches future events
  });
};

import create from "zustand";
import { Event } from "../types/types"; // Assuming the Event interface is defined here

interface EventsStore {
  selectedEvent: Event | null; // Currently selected event
  events: Event[] | null; // All future events
  setSelectedEvent: (event: Event | null) => void; // Function to set the selected event
  clearSelectedEvent: () => void; // Function to clear the selected event
  setEvents: (events: Event[] | null) => void; // Function to set all future events
}

const useEventsStore = create<EventsStore>((set) => ({
  selectedEvent: null, // Initially no event is selected
  events: null, // Initially no future events are set

  // Set a selected event
  setSelectedEvent: (event) => set({ selectedEvent: event }),

  // Clear the selected event
  clearSelectedEvent: () => set({ selectedEvent: null }),

  // Set all future events
  setEvents: (events) => set({ events: events }),
}));

export default useEventsStore;

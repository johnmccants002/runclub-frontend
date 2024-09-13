import create from "zustand";

interface Rsvp {
  _id: string;
  userId: string;
  eventId: string;
  timestamp: string;
}

interface RsvpStore {
  rsvps: Rsvp[] | null; // List of RSVPs for a selected event
  setRsvps: (rsvps: Rsvp[] | null) => void; // Function to set the RSVPs
  clearRsvps: () => void; // Function to clear RSVPs
}

const useRsvpStore = create<RsvpStore>((set) => ({
  rsvps: null, // Initially no RSVPs are loaded

  // Set the RSVPs for a selected event
  setRsvps: (rsvps) => set({ rsvps }),

  // Clear RSVPs when necessary (e.g., when the event is unselected)
  clearRsvps: () => set({ rsvps: null }),
}));

export default useRsvpStore;

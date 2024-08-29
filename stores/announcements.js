import create from "zustand";

const useAnnouncementsStore = create((set) => ({
  selectedAnnouncement: null,
  setSelectedAnnouncement: (announcement) =>
    set({ selectedAnnouncement: announcement }),
  clearSelectedAnnouncement: () => set({ selectedAnnouncement: null }),
}));

export default useAnnouncementsStore;

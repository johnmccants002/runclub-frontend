import { create } from "zustand";

const useProfileStore = create((set) => ({
  profile: {},
  setProfile: (profile) => set({ profile }),
  clearProfile: () => set({ profile: {} }),
}));

export default useProfileStore;

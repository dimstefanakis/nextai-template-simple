import { create } from "zustand";

export const useGenerationStore = create((set) => ({
  data: null,
  setGeneratedData: (data: number) => set({ data }),
}));

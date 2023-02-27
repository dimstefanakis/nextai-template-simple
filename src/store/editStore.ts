import { create } from "zustand";

export const useEditStore = create((set) => ({
  data: null,
  setEditData: (key: string, data: any) => {
    const object = key
      .split(".")
      .reduceRight((acc, key) => ({ [key]: acc } as any), data);
    return set({ data });
  },
}));

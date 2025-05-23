import { create } from "zustand";
import CutList from "@/types/cut-list";
import axios from "@/lib/axios";

interface CutListStore {
  cutLists: CutList[];
  setCutLists: (cutLists: CutList[]) => void;
  fetchCutLists: (token: string | null) => Promise<void>;
}

const useCutListStore = create<CutListStore>((set) => ({
  cutLists: [
    {
      index: 1,
      patoc: "Patoc 1",
      time: "10:00",
      type: "Kesim",
      action: "Düzenle",
    },
    {
      index: 2,
      patoc: "Patoc 2",
      time: "10:00",
      type: "Kesim",
      action: "Düzenle",
    },
    {
      index: 3,
      patoc: "Patoc 3",
      time: "10:00",
      type: "Kesim",
      action: "Düzenle",
    },
  ],
  setCutLists: (cutLists) => set({ cutLists }),
  fetchCutLists: async (token: string | null) => {
    if (!token) {
      return;
    }
    const response = await axios.get("/api/cut-lists", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    set({ cutLists: response.data });
  },
}));

export default useCutListStore;

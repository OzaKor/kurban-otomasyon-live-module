import { create } from "zustand";
import CutList from "@/types/cut-list";
import axios from "@/lib/axios";

interface CutListStore {
  cutLists: CutList[];
  setCutLists: (cutLists: CutList[]) => void;
  fetchCutLists: () => Promise<void>;
}

const useCutListStore = create<CutListStore>((set) => ({
  cutLists: [],
  setCutLists: (cutLists) => set({ cutLists }),
  fetchCutLists: async () => {
    const response = await axios.get("/api/cuts/lists");

    set({ cutLists: response.data });
  },
}));

export default useCutListStore;

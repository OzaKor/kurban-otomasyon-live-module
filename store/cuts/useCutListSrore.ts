import { create } from "zustand";
import CutList from "@/types/cut-list";
import axios from "@/lib/axios";

interface CutListStore {
  cutLists: CutList[];
  setCutLists: (cutLists: CutList[]) => void;
  fetchCutLists: (limit: number) => Promise<void>;
}

const useCutListStore = create<CutListStore>((set) => ({
  cutLists: [],
  setCutLists: (cutLists) => set({ cutLists }),
  fetchCutLists: async (limit: number = 10) => {
    const tableList: CutList[] = [];
    const response = await axios.get("/api/cuts/lists", {
      params: {
        limit,
      },
    });
    if (response.data.length > 0) {
      response.data.map((item: any, index: number) => {
        const tbody = item.tbody;
        const modal = item.modal;
        tableList.push({
          index: index,
          patoc: tbody.patoc,
          time: tbody.slaughter_date,
          type: tbody.cut_type,
          modal: {
            cut_info: {
              id: modal.cut_info.id,
              cutting_sequence: modal.cut_info.cutting_sequence,
              patoc: modal.cut_info.patoc,
              cut_type: modal.cut_info.cut_type,
              slaughter_date: modal.cut_info.slaughter_date,
            },
            animal_info: {
              ear_tag: modal.animal_info.ear_tag,
              animal_type: modal.animal_info.animal_type,
              patoc: modal.animal_info.patoc,
              weight: modal.animal_info.weight,
              gender: modal.animal_info.gender,
            },
            customers: modal.customers,
          },
        });
      });
      set({ cutLists: tableList });
    }
  },
}));

export default useCutListStore;

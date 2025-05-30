import axios, { AxiosResponse } from "axios";
import { create } from "zustand";

export interface ApiDialogItem {
  cut_info: {
    id: string | number;
    cutting_sequence: string;
    patoc: string;
    cut_type: string;
    slaughter_date: string;
  };
  animal_info: {
    ear_tag: string;
    animal_type: string;
    patoc: string;
    weight: string;
    gender: string;
  };
  customers: Array<{
    full_name: string;
    share_count: number;
    share_price: string;
    price: string;
    payment_remaining: string;
    payment_status: string;
    sub_shareholders: Array<{
      full_name: string;
      share_count: string;
    }>;
  }>;
}

interface CutDialogStore {
  currentCutDialog: ApiDialogItem | null;
  cutDialog: ApiDialogItem | null;
  isModalOpen: boolean;
  isUniqueRegistration: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  setIsUniqueRegistration: (isUniqueRegistration: boolean) => void;
  setCutDialog: (cutDialog: ApiDialogItem) => void;
  setCurrentCutDialog: (currentCutDialog: ApiDialogItem | null) => void;
  fetchCut: (cutId: string | number) => Promise<AxiosResponse>;
  fetchCutDialog: () => Promise<boolean>;
}

const useCutDialogStore = create<CutDialogStore>((set, get) => ({
  currentCutDialog: null,
  cutDialog: null,
  isModalOpen: false,
  isUniqueRegistration: true,
  setIsModalOpen: (isModalOpen: boolean) => set({ isModalOpen }),
  setIsUniqueRegistration: (isUniqueRegistration: boolean) =>
    set({ isUniqueRegistration }),
  setCutDialog: (cutDialog: ApiDialogItem) => set({ cutDialog }),
  setCurrentCutDialog: (currentCutDialog: ApiDialogItem | null) =>
    set({ currentCutDialog }),
  fetchCut: async (cutId: string | number) => {
    try {
      const response = await axios.post(`/api/cuts/slaughter-animal`, {
        cut_id: cutId,
      });

      if (response.status !== 200) {
        throw new Error("Error fetching cut");
      }

      return response;
    } catch (error) {
      console.error("Error fetching cut:", error);
      throw error;
    }
  },
  fetchCutDialog: async () => {
    try {
      const response = await axios.get<AxiosResponse>("/api/cuts/dialog", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.status !== 200) {
        throw new Error("Error fetching cut dialog");
      }

      const dt = response.data;
      const dialogItem: ApiDialogItem = dt.data;
      if (get().currentCutDialog===null) {
        set({
          currentCutDialog:dialogItem
        })
        
      }
      set({
        cutDialog: dialogItem,
      });

      return true;
    } catch (error) {
      console.error("Error fetching cut dialog:", error);
      return false;
    }
  },
}));

export default useCutDialogStore;

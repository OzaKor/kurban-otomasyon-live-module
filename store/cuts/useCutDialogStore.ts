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
  cutDialog: ApiDialogItem | null;
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  setCutDialog: (cutDialog: ApiDialogItem) => void;
  fetchCut: (cutId: string | number) => Promise<AxiosResponse>;
  fetchCutDialog: () => Promise<AxiosResponse>;
}

const useCutDialogStore = create<CutDialogStore>((set,get) => ({
  cutDialog: null,
  isModalOpen: false,
  setIsModalOpen: (isModalOpen: boolean) => set({ isModalOpen }),
  setCutDialog: (cutDialog: ApiDialogItem) => set({ cutDialog }),
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
      const currentCutDialog = get().cutDialog;
      console.log("currentCutDialog: ", currentCutDialog);
      const response = await axios.get("/api/cuts/dialog",{
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      console.log("response: ", response);

      if (response.status !== 200) {
        throw new Error("Error fetching cut dialog");
      }

      return response;
    } catch (error) {
      console.error("Error fetching cut dialog:", error);
      throw error;
    }
  },
}));

export default useCutDialogStore;

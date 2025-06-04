import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios, { AxiosResponse } from "axios";

interface CutDialogApiResponse {
  process: boolean;
  message: string;
  data: ApiDialogItem;
}

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
  fetchCut: (cutId: string | number) => Promise<AxiosResponse<CutDialogApiResponse>>;
  fetchCutSkip: (cutId: number) => Promise<AxiosResponse<CutDialogApiResponse>>;
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
      console.error("Kesim detayları alınırken hata:", error);
      throw error;
    }
  },

  fetchCutSkip: async (cutId:  number) => {
    try {
      const response = await axios.post('/api/cuts/slaughter-animal-skip', {
        cut_id: cutId,
      });

      if (response.status !== 200) {
        throw new Error("Error fetching cut skip");
      }

      return response;
    } catch (error) {
      console.error("Kesim atla alınırken hata:", error);
      throw error;
    }
  },

  fetchCutDialog: async () => {
    try {
      const response = await axios.get<CutDialogApiResponse>('/api/cuts/dialog', {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.status !== 200) {
        throw new Error("Kesim detayları alınırken hata oluştu");
      }

      const { data,process } = response.data;

      if (process) {
           if (get().currentCutDialog === null) {
        set({
          currentCutDialog: data
        });
      }
      
      set({
        cutDialog: data,
      });
      }
   

      return process;
    } catch (error) {
      console.error("Kesim detayları alınamadı:", error);
      return false;
    }
  },
}));

export default useCutDialogStore;

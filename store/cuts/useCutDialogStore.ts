import { create } from "zustand";
import axios from "@/lib/axios";
import logger from "@/lib/logger";
import { getErrorStatus } from "@/lib/apiError";

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
  fetchCut: (cutId: string | number) => Promise<unknown>;
  fetchCutSkip: (cutId: number) => Promise<unknown>;
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
  // Jeton lib/axios yakalayıcısında eklenir; 401 girişe yönlendirir.
  // Hatalar çağırana fırlatılır, mesajı/403 uyarısını bileşen gösterir.
  fetchCut: async (cutId: string | number) => {
    return axios.post("/api/cuts/slaughter-animal", { cut_id: cutId });
  },

  fetchCutSkip: async (cutId: number) => {
    return axios.post("/api/cuts/slaughter-animal-skip", { cut_id: cutId });
  },

  fetchCutDialog: async () => {
    try {
      const body = (await axios.get(
        "/api/cuts/dialog",
      )) as unknown as CutDialogApiResponse;

      const { data, process } = body;

      if (process) {
        if (get().currentCutDialog === null) {
          set({
            currentCutDialog: data,
          });
        }

        set({
          cutDialog: data,
        });
      }

      return process;
    } catch (error) {
      logger("Kesim detayları alınamadı:", getErrorStatus(error));
      return false;
    }
  },
}));

export default useCutDialogStore;

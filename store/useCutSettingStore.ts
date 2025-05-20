import { create } from "zustand";
import axios from "@/lib/axios";
import useUserStore from "./useUserStore";

export type CutSettingStoreType = {
  proccessStart: boolean;
  proccessEnd: boolean;
  processContiune: boolean;
  processStop: boolean;
};
interface CutSettingStore {
  state: CutSettingStoreType;
  setState: (state: CutSettingStoreType) => void;
  fetchCutSetting: () => Promise<void>;
  clear: () => void;
}

const initialState: CutSettingStoreType = {
  proccessStart: false,
  proccessEnd: false,
  processContiune: false,
  processStop: false,
};

export const useCutSettingStore = create<CutSettingStore>()((set) => ({
  state: initialState,
  setState: (state: CutSettingStoreType) => set({ state }),
  fetchCutSetting: async () => {
    const { userToken } = useUserStore.getState();
    if (!userToken) {
      return;
    }
    const response = await axios.get("/api/cut-settings");
    console.log("setting response: ", response);
    set({
      state: {
        proccessStart: response.data.proccessStart,
        proccessEnd: response.data.proccessEnd,
        processContiune: response.data.processContiune,
        processStop: response.data.processStop,
      },
    });
  },
  clear: () => set({ state: initialState }),
}));

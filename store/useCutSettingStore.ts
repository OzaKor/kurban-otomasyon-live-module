import { create } from "zustand";
import axios from "@/lib/axios";

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

const useCutSettingStore = create<CutSettingStore>()((set) => ({
  state: initialState,
  setState: (state: CutSettingStoreType) => set({ state }),
  fetchCutSetting: async () => {

    const response = await axios.get("/api/cut-settings");
    const process= await response.data;   
    
    set({
      state: {
        proccessStart: process.process_start,
        proccessEnd: process.process_end,
        processContiune: process.process_continue,
        processStop: process.process_stop,
      },
    });
    
  },
  clear: () => set({ state: initialState }),
}));

export default useCutSettingStore;

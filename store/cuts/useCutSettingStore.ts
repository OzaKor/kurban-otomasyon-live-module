import { create } from "zustand";
import axios from "@/lib/axios";
import { cutSettingInterface } from "@/types/cut-setting";

interface CutSettingStore {
  state: cutSettingInterface;
  setState: (
    state:
      | cutSettingInterface
      | ((prev: cutSettingInterface) => cutSettingInterface)
  ) => void;
  fetchCutSetting: () => Promise<void>;
  clear: () => void;
}

const initialState: cutSettingInterface = {
  proccessStart: false,
  proccessEnd: false,
  processContinue: false,
  processStop: false,
};

const useCutSettingStore = create<CutSettingStore>()((set) => ({
  state: initialState,
  setState: (state) =>
    set((store) => ({
      state: typeof state === "function" ? state(store.state) : state,
    })),
  fetchCutSetting: async () => {
    const response = await axios.get("/api/cuts/settings");
    const process = await response.data;

    set({
      state: {
        proccessStart: process.process_start,
        proccessEnd: process.process_end,
        processContinue: process.process_continue,
        processStop: process.process_stop,
      },
    });
  },
  clear: () => set({ state: initialState }),
}));

export default useCutSettingStore;

import { create } from "zustand";
import CutList, { Tbody } from "@/types/cut-list";
import axios from "@/lib/axios";

interface RawApiCutItem {
  tbody: Tbody
  modal: {
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
  };
}

interface ApiCutListsParentResponse {
  cutLists: {
    cut_lists: RawApiCutItem[];
    cut_total_count: number;
  };
}

interface CutListStore {
  cutLists: CutList[];
  setCutLists: (cutLists: CutList[]) => void;
  fetchCutLists: (limit?: number) => Promise<void>;
}

const useCutListStore = create<CutListStore>((set, get) => ({
  cutLists: [],
  setCutLists: (cutLists) => {
    return set({ cutLists });
  },
  fetchCutLists: async (limit: number = 10) => {
    try {
      const response = await axios.get<ApiCutListsParentResponse>(
        "/api/cuts/lists",
        {
          params: {
            limit,
          },
        }
      );

      const rawApiItems: RawApiCutItem[] = response.data.cutLists.cut_lists;

      if(!rawApiItems){
        set({cutLists: []});
        return;
      }
      

      const processedFetchedItems: CutList[] = rawApiItems
        .map((item: RawApiCutItem): CutList => {
          const tbody = item.tbody;
          const modal = item.modal;

          if (!tbody || !modal || !modal.cut_info || !modal.animal_info) {
            console.warn(
              "API'den eksik öğe verisi alındı, öğe atlanıyor:",
              item
            );
          }

          return {
            tbody: {
              id: tbody?.id,
              cutting_sequence: Number(tbody?.cutting_sequence),
              customer: tbody.customer,
              cut_type: tbody?.cut_type,
            },
            modal: {
              cut_info: {
                id: modal?.cut_info?.id,
                cutting_sequence: modal?.cut_info?.cutting_sequence,
                patoc: modal?.cut_info?.patoc,
                cut_type: modal?.cut_info?.cut_type,
                slaughter_date: modal?.cut_info?.slaughter_date,
              },
              animal_info: {
                ear_tag: modal?.animal_info?.ear_tag,
                animal_type: modal?.animal_info?.animal_type,
                patoc: modal?.animal_info?.patoc,
                weight: modal?.animal_info?.weight,
                gender: modal?.animal_info?.gender,
              },
              customers: modal?.customers || [],
            },
          };
        })
        .filter((item) => item.tbody?.id != null);

      const currentState = get();
      const currentCutLists = currentState.cutLists;

      let cutListsDataChanged = false;
      if (currentCutLists.length !== processedFetchedItems.length) {
        cutListsDataChanged = true;
      } else {
        for (let i = 0; i < processedFetchedItems.length; i++) {
          if (
            currentCutLists[i].tbody.id !== processedFetchedItems[i].tbody.id
          ) {
            cutListsDataChanged = true;
            break;
          }
        }
      }

      if (cutListsDataChanged) {
        const updates: Partial<CutListStore> = {};
        if (cutListsDataChanged) {
          updates.cutLists = processedFetchedItems;
        }
        set(updates);
      }
    } catch (error) {
      console.error("Kesim listeleri alınırken hata oluştu:", error);
    }
  },
}));

export default useCutListStore;

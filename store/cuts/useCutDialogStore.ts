import {create} from "zustand";

interface ApiDialogItem {
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
   }
};

interface ApiDialogParentResponse {
    cutDialog: ApiDialogItem;
}

interface CutDialogStore {
    cutDialog: ApiDialogItem;
    isModalOpen: boolean;
    setIsModalOpen: (isModalOpen: boolean) => void;
    setCutDialog: (cutDialog: ApiDialogItem) => void;
    fetchCutDialog: () => Promise<void>;
}
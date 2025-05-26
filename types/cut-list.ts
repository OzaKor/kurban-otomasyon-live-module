export interface Modal {
    cut_info: {
        id: number;
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

export default interface CutList {
    index: number;
    patoc: string;
    time: string;
    type: string;
    modal: Modal;
}
import { create } from "zustand";
import axios from "@/lib/axios";
import { useUserStore } from "./userStore";

export type CutSettingStoreType = {
   proccessStart:boolean,
   proccessEnd:boolean,
   processContiune:boolean,
   processStop:boolean    
}
interface CutSettingStore {
    state:CutSettingStoreType,
    setState:(state:CutSettingStoreType)=>void,
    fetchCutSetting:()=>void,
    clear:()=>void
}

const initialState: CutSettingStoreType = {
    proccessStart: false,
    proccessEnd: false,
    processContiune: false,
    processStop: false
};

export const useCutSettingStore = create<CutSettingStore>()(
    (set) => ({
        state: initialState,
        setState:(state:CutSettingStoreType)=>set({state}),
        fetchCutSetting:()=>{
            const {userToken} = useUserStore.getState();
            if(!userToken){
                return;
            }
            axios.get("/api/cut-setting",{
                headers:{
                    Authorization:`Bearer ${userToken}`,
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                }
            })
            .then((response)=>{
                set({state:response.data})
            })
            .catch((error)=>{
                console.log(error)
            })
        },
        clear: () => set({ state: initialState })
    })
)
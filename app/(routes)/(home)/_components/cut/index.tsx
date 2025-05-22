"use client";
import CutInfo from "@/app/(routes)/(home)/_components/cut/cut-info";
import CutTable from "@/app/(routes)/(home)/_components/cut/cut-table";
import useCutSettingStore from "@/store/useCutSettingStore";
const Cut = () => {
  const { state } = useCutSettingStore();
  if (state.proccessStart || state.processContiune) {
    return <CutInfo />;
  }

  if (state.proccessEnd || state.processStop) {
    return <CutTable />;
  }

  return <CutInfo />;
};

export default Cut;

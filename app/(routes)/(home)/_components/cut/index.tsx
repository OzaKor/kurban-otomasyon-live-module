"use client";

import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion"; 
import useCutSettingStore from "@/store/useCutSettingStore";

const CutLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-gray-600 font-medium">Yükleniyor...</p>
    </div>
  );
};

const DynamicCutInfo = dynamic(
  () => import("@/app/(routes)/(home)/_components/cut/cut-info"),
  {
    loading: () => <CutLoading />,
    ssr: true,
  }
);
const DynamicCutTable = dynamic(
  () => import("@/app/(routes)/(home)/_components/cut/cut-table"),
  {
    loading: () => <CutLoading />,
    ssr: true,
  }
);

const Cut = () => {
  const { state } = useCutSettingStore();

  let ComponentToRender = null;
  let componentKey = "cut-info-default"; 

  if (state.proccessStart || state.processContiune) {
    ComponentToRender = DynamicCutInfo;
    componentKey = "cut-info-active"; 
  } else if (state.proccessEnd || state.processStop) {
    ComponentToRender = DynamicCutTable;
    componentKey = "cut-table-active"; 
  } else {
    ComponentToRender = DynamicCutInfo;
    componentKey = "cut-info-default"; 
  }

  const variants = {
    initial: { opacity: 0, y: 20 }, 
    animate: { opacity: 1, y: 0 }, 
    exit: { opacity: 0, y: -20 }, 
  };

  return (
    <AnimatePresence mode="wait">
      {ComponentToRender && (
        <motion.div
          key={componentKey} 
          initial="initial"   
          animate="animate"   
          exit="exit"         
          variants={variants} 
          transition={{ duration: 0.3 }} 
        >
          <ComponentToRender />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Cut;
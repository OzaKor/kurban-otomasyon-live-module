"use client";
import React from "react";
import CutInfo from "@/app/(routes)/(home)/_components/cut/cut-info";

// Misafir (girişsiz veya canlı kesim izni olmayan hesap) yalnız bilgi ekranını görür;
// kesim listesi ve hissedar bilgisi yalnız yetkili hesapta gösterilir (tespit J, karar 1a).
const Guest = () => {
  return <CutInfo />;
};

export default Guest;

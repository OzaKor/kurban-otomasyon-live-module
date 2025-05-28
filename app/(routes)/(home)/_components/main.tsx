"use client";
import React, { useEffect, useCallback, useRef } from "react";
import useUserStore from "@/store/useUserStore";
import Manager from "@/app/(routes)/(home)/_components/manager";
import Guest from "@/app/(routes)/(home)/_components/guest";
import useCutSettingStore from "@/store/cuts/useCutSettingStore";
import useCutListStore from "@/store/cuts/useCutListSrore";
import CutDialog from "@/app/(routes)/(home)/_components/cut/cut-dialog";

const Main = () => {
  const { user } = useUserStore();
  const { fetchCutSetting, state } = useCutSettingStore();
  const { fetchCutLists } = useCutListStore();
  const isInitialMount = useRef(true);
  const settingSetInterval = useRef<NodeJS.Timeout | null | number>(null);

  const fetchDt = useCallback((limit:number = 20) => {
    fetchCutSetting();

    if (state.proccessEnd && state.processStop) {
      fetchCutLists(limit);
    }

  }, [fetchCutSetting, fetchCutLists]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      fetchDt();
    }

    if (user?.role !== "super_admin") {
      settingSetInterval.current = window.setInterval(() => {
        fetchDt(10);
      }, 5000);
    }

    return () => {
      if (settingSetInterval.current) {
        clearInterval(settingSetInterval.current);
      }
    };
  }, [fetchDt, user?.role]);

  return (
    <>
      {user && user.role === "super_admin" && <Manager />}
      {(!user || user.role !== "super_admin") && <Guest />}
      <CutDialog />
    </>
  );
};

export default Main;

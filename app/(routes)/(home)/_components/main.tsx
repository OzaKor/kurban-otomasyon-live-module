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

  const fetchDt = useCallback(
    async (limit: number = 20) => {
      await fetchCutSetting();

      if (state.proccessEnd && state.processStop) {
        await fetchCutLists(limit);
      }
    },
    [fetchCutSetting, fetchCutLists, state]
  );

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      const limit = user?.role === "super_admin" ? 20 : 10;
      fetchDt(limit);
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

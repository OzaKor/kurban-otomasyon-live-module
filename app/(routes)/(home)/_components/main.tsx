"use client";
import React, { useEffect, useCallback, useRef } from "react";
import useUserStore from "@/store/useUserStore";
import Manager from "@/app/(routes)/(home)/_components/manager";
import Guest from "@/app/(routes)/(home)/_components/guest";
import useCutSettingStore from "@/store/cuts/useCutSettingStore";
import useCutListStore from "@/store/cuts/useCutListSrore";

const Main = () => {
  const { user, userToken } = useUserStore();
  const { fetchCutSetting } = useCutSettingStore();
  const { fetchCutLists } = useCutListStore();
  const isInitialMount = useRef(true);
  const settingSetInterval = useRef<NodeJS.Timeout | null | number>(null);

  const fetchDt = useCallback(() => {
    fetchCutSetting();
    fetchCutLists();
  }, [fetchCutSetting, fetchCutLists, userToken]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      fetchDt();
    }

    if (user?.role !== "super_admin") {
      settingSetInterval.current = window.setInterval(() => {
        fetchDt();
      }, 15000);
    }

    return () => {
      if (settingSetInterval.current) {
        clearInterval(settingSetInterval.current);
      }
    };
  }, [fetchDt, user?.role, userToken]);

  return (
    <>
      {user && user.role === "super_admin" && <Manager />}
      {(!user || user.role !== "super_admin") && <Guest />}
    </>
  );
};

export default Main;

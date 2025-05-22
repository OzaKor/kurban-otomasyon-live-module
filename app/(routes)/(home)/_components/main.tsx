"use client";
import React, { useEffect, useCallback, useRef } from "react";
import useUserStore from "@/store/useUserStore";
import Manager from "@/app/(routes)/(home)/_components/manager";
import Guest from "@/app/(routes)/(home)/_components/guest";
import useCutSettingStore from "@/store/useCutSettingStore";

const Main = () => {
  const { user } = useUserStore();
  const { fetchCutSetting, state } = useCutSettingStore();
  const isInitialMount = useRef(true);
  const settingSetInterval = useRef<NodeJS.Timeout | null | number>(null);

  const fetchData = useCallback(() => {
    fetchCutSetting();
  }, [fetchCutSetting]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      fetchData();
    }

    if (user?.role !== "super_admin") {
      settingSetInterval.current = window.setInterval(() => {
        fetchData();
      }, 3000);
    }

    return () => {
      if (settingSetInterval.current) {
        clearInterval(settingSetInterval.current);
      }
    };
  }, [fetchData]);

  return (
    <>
      {user && user.role === "super_admin" && <Manager />}
      {(!user || user.role !== "super_admin") && <Guest />}
      {JSON.stringify(state, null, 2)}
    </>
  );
};

export default Main;

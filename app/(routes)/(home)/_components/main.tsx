"use client";
import React, { useEffect, useCallback, useRef } from "react";
import useUserStore from "@/store/useUserStore";
import Manager from "@/app/(routes)/(home)/_components/manager";
import Guest from "@/app/(routes)/(home)/_components/guest";
import useCutSettingStore from "@/store/cuts/useCutSettingStore";
import useCutListStore from "@/store/cuts/useCutListSrore";
import CutDialog from "@/app/(routes)/(home)/_components/cut/cut-dialog";
import {
  NoLiveAccessNotice,
  SessionExpiryNotice,
} from "@/app/(routes)/(home)/_components/live-access-notices";
import logger from "@/lib/logger";

const POLL_INTERVAL_MS = 10000;
const LIST_LIMIT = 20;

const Main = () => {
  const { userToken, canLiveOperate } = useUserStore();
  const { fetchCutSetting, state } = useCutSettingStore();
  const { fetchCutLists } = useCutListStore();

  // Erişim role değil cuttings.live-operate iznine bağlı (bkz. useUserStore.fetchLiveAccess).
  const canOperate = !!userToken && canLiveOperate === true;

  const fetchDt = useCallback(
    async (limit: number = LIST_LIMIT) => {
      try {
        await fetchCutSetting();
      } catch (error) {
        logger("Kesim ayarları alınamadı:", error);
      }

      if (state.proccessEnd && state.processStop) {
        await fetchCutLists(limit);
      }
    },
    [fetchCutSetting, fetchCutLists, state],
  );

  // Aralık her durum değişiminde yeniden kurulmasın diye en güncel fetchDt ref'te tutulur.
  const fetchDtRef = useRef(fetchDt);
  useEffect(() => {
    fetchDtRef.current = fetchDt;
  }, [fetchDt]);

  useEffect(() => {
    // Misafir ve yetkisiz hesap korumalı uçları hiç çağırmaz (tespit J).
    if (!canOperate) {
      return;
    }

    fetchDtRef.current(LIST_LIMIT);
    const interval = window.setInterval(() => {
      fetchDtRef.current(LIST_LIMIT);
    }, POLL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [canOperate]);

  if (canOperate) {
    return (
      <>
        <SessionExpiryNotice />
        <Manager />
        <CutDialog />
      </>
    );
  }

  return (
    <>
      {userToken && canLiveOperate === false && <NoLiveAccessNotice />}
      <Guest />
    </>
  );
};

export default Main;

"use client";
import OverallStatus from "@/components/OverallStatus";
import { useWindowVisibility } from "@/hooks/use-window-visibility";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useLayout } from "./layout-provider";
import DefaultLayout from "./monitor/DefaultLayout";

const CardLayout = dynamic(() => import("@/components/monitor/CardLayout"));

const Home: React.FC<{
  state: MonitorState | null;
  monitors: MonitorTarget[];
}> = ({ state: _state, monitors: _monitors }) => {
  const { layout } = useLayout();
  const [isMounted, setIsMounted] = useState(false);
  const [monitors, setMonitors] = useState<MonitorTarget[]>(_monitors);
  const [state, setState] = useState<MonitorState | null>(_state);
  const fetchData = async () => {
    const response = await fetch("/api/data");
    const { state = null, monitors = [] } = await response.json();
    setState(state);
    setMonitors(monitors);
  };
  const now = Math.round(Date.now() / 1000);
  const currentTime = useRef(now);
  const isWindowVisible = useWindowVisibility();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isWindowVisible) {
        console.log("页面已隐藏，不要更新");
        return;
      }
      fetchData();
      currentTime.current = Math.round(Date.now() / 1000);
    }, 5000);
    return () => clearInterval(interval);
  }, [isWindowVisible]);

  return (
    <>
      {isMounted && (
        <div className="container my-[60px] flex items-center justify-between lg:px-48">
          {state == null ? (
            <div className="w-full text-center text-2xl text-primary">
              监控状态目前尚未定义，请检查你的接口
            </div>
          ) : (
            <div className="flex w-full flex-col gap-4 md:px-8">
              <OverallStatus state={state} currentTime={currentTime.current} />
              {layout === "default" ? (
                <DefaultLayout monitors={monitors} state={state} />
              ) : (
                <CardLayout monitors={monitors} state={state} />
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Home;

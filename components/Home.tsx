"use client";
import Header from "@/components/Header";
import OverallStatus from "@/components/OverallStatus";
import MonitorList from "@/components/monitor/List";
import { useEffect, useRef, useState } from "react";

function useWindowVisibility() {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const handleVisibilityChange = () => {
      console.log("visibility change", document.visibilityState);
      setIsVisible(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
  return isVisible;
}

const Home: React.FC<{
  state: MonitorState | null;
  monitors: MonitorTarget[];
}> = ({ state: _state, monitors: _monitors }) => {
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
    <div className="h-full select-none">
      <Header />
      <div className="my-[60px] container lg:px-48  flex justify-between items-center">
        {state == null ? (
          <div className="text-primary text-center w-full text-2xl">
            监控状态目前尚未定义，请检查你的接口
          </div>
        ) : (
          <div className=" flex flex-col gap-4 w-full md:px-8">
            <OverallStatus state={state} currentTime={currentTime.current} />
            <MonitorList monitors={monitors} state={state} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

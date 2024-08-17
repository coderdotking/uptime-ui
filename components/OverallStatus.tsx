import { IconAlertCircle, IconCircleCheck } from "@tabler/icons-react";
import React from "react";

const StatusLabel: React.FC<{
  overallUp: number;
  overallDown: number;
}> = ({ overallUp, overallDown }) => {
  if (overallUp === 0 && overallDown === 0) {
    return <>暂无数据</>;
  }
  if (overallUp === 0) {
    return <>所有系统均无法运行</>;
  }
  if (overallDown === 0) {
    return <>所有系统均正常运行</>;
  }
  return (
    <p>
      部分系统无法正常运行 (
      <span style={{ color: "#b91c1c" }}>{overallDown}</span>/
      <span style={{ color: "#059669" }}>{overallUp}</span>)
    </p>
  );
};

const OverallStatus: React.FC<{ state: MonitorState; currentTime: number }> = ({
  state,
  currentTime,
}) => {
  const t = new Date(state.lastUpdate * 1000).toLocaleString();
  return (
    <div className="flex justify-center flex-col items-center w-full gap-2">
      <div>
        {state.overallDown === 0 ? (
          <IconCircleCheck
            style={{ width: 64, height: 64, color: "#059669" }}
          />
        ) : (
          <IconAlertCircle
            style={{ width: 64, height: 64, color: "#b91c1c" }}
          />
        )}
      </div>
      <div className="text-3xl">
        <StatusLabel
          overallUp={state.overallUp}
          overallDown={state.overallDown}
        />
      </div>
      <div
        className="text-sm"
        style={{ textAlign: "center", color: "#70778c" }}>
        最后更新于:
        <span suppressHydrationWarning>{`${t} (${
          currentTime - state.lastUpdate
        } 秒之前)`}</span>
      </div>
    </div>
  );
};

export default OverallStatus;

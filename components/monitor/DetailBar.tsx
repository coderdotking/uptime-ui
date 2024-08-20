import { getColor } from "@/lib/color";
import { useResizeObserver } from "@mantine/hooks";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import moment from "moment";
import "moment-precise-range-plugin";
import React, { memo, useMemo } from "react";

const overlapLen = (x1: number, x2: number, y1: number, y2: number) => {
  return Math.max(0, Math.min(x2, y2) - Math.max(x1, y1));
};

const BarItem: React.FC<{
  incident: IncidentItem[];
  index: number;
}> = ({ incident, index }) => {
  const currentTime = Math.round(Date.now() / 1000);
  const montiorStartTime = incident[0].start[0];
  // 获取零点时间
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const dayStart = Math.round(todayStart.getTime() / 1000) - index * 86400;
  const dayEnd = dayStart + 86400;
  // 已经监控的时间
  const dayMonitorTime = overlapLen(
    dayStart,
    dayEnd,
    montiorStartTime,
    currentTime
  );
  // 统计故障时间
  const dayDownTime = incident.reduce((acc, cur) => {
    const incidentStart = cur.start[0];
    const incidentEnd = cur.end ?? currentTime;
    acc += overlapLen(dayStart, dayEnd, incidentStart, incidentEnd);
    return acc;
  }, 0);
  // 计算正常占比
  const dayPercent = (
    ((dayMonitorTime - dayDownTime) / dayMonitorTime) *
    100
  ).toPrecision(4);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className="flex-1 cursor-pointer h-[20px] rounded-[2px]"
          style={{
            background: getColor(dayPercent, false),
          }}
        />
      </TooltipTrigger>
      <TooltipContent>
        <div className=" flex flex-col">
          {Number.isNaN(Number(dayPercent)) ? (
            "暂无数据"
          ) : (
            <>
              <span>{dayPercent + "%"}</span>
              {dayDownTime > 0 && (
                <span>{`故障时间 ${moment.preciseDiff(
                  moment(0),
                  moment(dayDownTime * 1000)
                )}`}</span>
              )}
            </>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default function DetailBar({
  monitor,
  state,
}: {
  monitor: MonitorTarget;
  state: MonitorState;
}) {
  const [barRef, barRect] = useResizeObserver();
  const totalBar = useMemo(() => {
    const t = Math.floor(Math.max(9 * 90 - barRect.width, 0) / 9);
    return Array.from({ length: 90 })
      .slice(t, 90)
      .map((_, i) => t);
  }, [barRect]);

  return (
    <div className=" flex flex-nowrap gap-[2px] mt-2 mb-1" ref={barRef}>
      {totalBar.map((t, i) => (
        <BarItem
          key={i}
          incident={state.incident[monitor.id]}
          index={89 - (t + i)}
        />
      ))}
    </div>
  );
}

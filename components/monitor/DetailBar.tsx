import { getColor } from "@/lib/color";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import moment from "moment";
import "moment-precise-range-plugin";
import React, { useMemo } from "react";
import Divider from "@/components/Divider";
import { cn } from "@/lib/utils";

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
    currentTime,
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
          className={cn(
            "h-[20px] flex-1 cursor-pointer rounded-[2px]",
            getColor(dayPercent),
          )}
        />
      </TooltipTrigger>
      <TooltipContent>
        <div className="flex flex-col">
          {Number.isNaN(Number(dayPercent)) ? (
            "暂无数据"
          ) : (
            <>
              <span>{dayPercent + "%"}</span>
              {dayDownTime > 0 && (
                <span>{`故障时间 ${moment.preciseDiff(
                  moment(0),
                  moment(dayDownTime * 1000),
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
  const totalBar = useMemo(() => {
    return Array.from({ length: 90 });
  }, []);
  return (
    <div>
      <div className="mb-1 mt-2 flex flex-nowrap gap-[2px]">
        {totalBar.map((t, i) => (
          <BarItem
            key={i}
            incident={state.incident[monitor.id]}
            index={89 - i}
          />
        ))}
      </div>
      <div className="flex items-center justify-between gap-4 text-[12px] text-gray-400">
        <span className="shrink-0">90 days ago</span>
        <Divider className="h-px" />
        <span className="shrink-0"> {100}% uptime</span>
        <Divider className="h-px" />
        <span className="shrink-0">today</span>
      </div>
    </div>
  );
}

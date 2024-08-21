"use client";
import {
  IconAlertCircle,
  IconCircleCheck,
  IconLink,
} from "@tabler/icons-react";
import DetailChart from "./DetailChart";
import DetailBar from "./DetailBar";
import { getColor, getTextColor } from "@/lib/color";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function MonitorDetail({
  monitor,
  state,
}: {
  monitor: MonitorTarget;
  state: MonitorState;
}) {
  if (!state.latency[monitor.id]) {
    return (
      <>
        <span className="font-[700]">{monitor.name}</span>
        <span className="font-[700]">
          无可用数据，请确保你提供的接口返回了正确数据据
        </span>
      </>
    );
  }

  const totalTime = Date.now() / 1000 - state.incident[monitor.id][0].start[0];
  let downTime = 0;
  for (let incident of state.incident[monitor.id]) {
    downTime += (incident.end ?? Date.now() / 1000) - incident.start[0];
  }

  const uptimePercent = (
    ((totalTime - downTime) / totalTime) *
    100
  ).toPrecision(4);

  return (
    <TooltipProvider>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {monitor.tooltip ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 font-[700]">
                  {monitor.name}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{monitor.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <div className="flex gap-1 font-[700]">{monitor.name}</div>
          )}
          {monitor.statusPageLink && (
            <Link href={monitor.statusPageLink} target="_blank">
              <IconLink className="h-5 w-5" />
            </Link>
          )}
        </div>
        <span
          className={cn("text-sm font-bold", getTextColor(uptimePercent))}
          style={{ display: "inline" }}
        >
          当天可用性: {uptimePercent}%
        </span>
      </div>
    </TooltipProvider>
  );
}

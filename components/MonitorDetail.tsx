"use client";
import { IconAlertCircle, IconCircleCheck } from "@tabler/icons-react";
import DetailChart from "./DetailChart";
import DetailBar from "./DetailBar";
import { getColor } from "@/lib/color";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

  const statusIcon =
    state.incident[monitor.id].slice(-1)[0].end === undefined ? (
      <IconAlertCircle
        style={{ width: "1.25em", height: "1.25em", color: "#b91c1c" }}
      />
    ) : (
      <IconCircleCheck
        style={{ width: "1.25em", height: "1.25em", color: "#059669" }}
      />
    );

  const totalTime = Date.now() / 1000 - state.incident[monitor.id][0].start[0];
  let downTime = 0;
  for (let incident of state.incident[monitor.id]) {
    downTime += (incident.end ?? Date.now() / 1000) - incident.start[0];
  }

  const uptimePercent = (
    ((totalTime - downTime) / totalTime) *
    100
  ).toPrecision(4);

  // Conditionally render monitor name with or without hyperlink based on monitor.url presence
  const monitorNameElement = (
    <div
      className="font-[700]"
      style={{ display: "inline-flex", alignItems: "center" }}>
      {monitor.statusPageLink ? (
        <a
          href={monitor.statusPageLink}
          target="_blank"
          className="flex gap-1"
          style={{
            display: "inline-flex",
            alignItems: "center",
            color: "inherit",
            textDecoration: "none",
          }}>
          {statusIcon} {monitor.name}
        </a>
      ) : (
        <>
          {statusIcon} {monitor.name}
        </>
      )}
    </div>
  );

  return (
    <TooltipProvider>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {monitor.tooltip ? (
          <Tooltip>
            <TooltipTrigger asChild>{monitorNameElement}</TooltipTrigger>
            <TooltipContent>
              <p>{monitor.tooltip}</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          monitorNameElement
        )}
        <span
          className="font-[700]"
          style={{ display: "inline", color: getColor(uptimePercent, true) }}>
          当天可用性: {uptimePercent}%
        </span>
      </div>
      <DetailBar monitor={monitor} state={state} />
      <DetailChart monitor={monitor} state={state} />
    </TooltipProvider>
  );
}

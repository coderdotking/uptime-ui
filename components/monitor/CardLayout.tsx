import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import DetailChart from "./DetailChart";
import DetailBar from "./DetailBar";
import MonitorDetail from "./Detail";

const MonitorList: React.FC<{
  state: MonitorState;
  monitors: MonitorTarget[];
}> = ({ state, monitors }) => {
  return (
    <div className="flex flex-col gap-4">
      {monitors.map((monitor: MonitorTarget, index: number) => (
        <Card key={monitor.id} className="w-full">
          <CardHeader>
            <MonitorDetail monitor={monitor} state={state} />
          </CardHeader>
          <CardContent className="select-none">
            <DetailBar monitor={monitor} state={state} />
            <DetailChart monitor={monitor} state={state} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MonitorList;

import * as React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import MonitorDetail from "@/components/monitor/Detail";
import DetailBar from "./DetailBar";
import DetailChart from "./DetailChart";

const Divider: React.FC = () => {
  return <div className="my-4 h-[2px] w-full bg-border"></div>;
};

const DefaultLayout: React.FC<{
  state: MonitorState;
  monitors: MonitorTarget[];
}> = ({ state, monitors }) => {
  return (
    <Card className="w-full">
      <CardHeader></CardHeader>
      <CardContent className="select-none">
        {monitors.map((monitor: MonitorTarget, index: number) => (
          <div key={monitor.id}>
            <MonitorDetail monitor={monitor} state={state} />
            <DetailBar monitor={monitor} state={state} />
            <DetailChart monitor={monitor} state={state} />
            {index < monitors.length - 1 && <Divider />}
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
};

export default DefaultLayout;

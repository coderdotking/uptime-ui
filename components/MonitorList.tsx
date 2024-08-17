import * as React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import MonitorDetail from "@/components/MonitorDetail";

const Divider: React.FC = () => {
  return <div className="h-[2px] w-full bg-border my-4"></div>;
};

const MonitorList: React.FC<{
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
            {index < monitors.length - 1 && <Divider />}
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
};

export default MonitorList;

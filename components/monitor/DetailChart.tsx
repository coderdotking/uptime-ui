import { iataToCountry } from "@/lib/iata";
import moment from "moment";
import { LineChart, CartesianGrid, XAxis, YAxis, Line } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

export default function DetailChart({
  monitor,
  state,
}: {
  monitor: MonitorTarget;
  state: MonitorState;
}) {
  const latencyData = state.latency[monitor.id].recent.map((point) => ({
    time: point.time * 1000,
    ping: point.ping,
    loc: point.loc,
  }));

  return (
    <div className="h-[150px]">
      <ChartContainer
        className="aspect-auto h-full w-full"
        config={
          {
            reponse: {
              label: "Reponse Time",
            },
            ping: {
              label: "Ping",
              color: "hsl(var(--chart-1))",
            },
          } satisfies ChartConfig
        }
        title="Latency"
      >
        <LineChart
          className="h-full w-full"
          accessibilityLayer
          data={latencyData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="time"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={(value) => {
              return moment(value).format("LT");
            }}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                className=""
                nameKey="reponse"
                labelFormatter={(_, payload) => {
                  const [item1] = payload;
                  const {
                    payload: { ping, time },
                  } = item1;
                  return moment(time).format("YYYY-MM-DD kk:mm:ss");
                }}
                formatter={(value, name, props) => {
                  const {
                    payload: { loc },
                  } = props;
                  return (
                    <div className="flex flex-col gap-1">
                      <div>{`PING: ${value}ms `}</div>
                      <div>{`LOC: ${iataToCountry(loc)}`}</div>
                    </div>
                  );
                }}
              />
            }
          />
          <Line
            dataKey={"ping"}
            type="monotone"
            stroke={`var(--color-ping)`}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

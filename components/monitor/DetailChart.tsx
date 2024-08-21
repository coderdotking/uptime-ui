import "chartjs-adapter-moment";
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
    <ChartContainer
      className="h-[150px] w-full"
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
    >
      <LineChart
        accessibilityLayer
        data={latencyData}
        margin={{
          left: 0,
          right: 0,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="time"
          tickLine={true}
          axisLine={false}
          tickMargin={8}
          minTickGap={10}
          tickFormatter={(value) => {
            return moment(value).format("LT");
          }}
        />
        <YAxis
          dataKey="ping"
          tickLine={false}
          axisLine={false}
          tickMargin={0}
          minTickGap={10}
          tickFormatter={(value) => {
            return `${value}`;
          }}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              className=""
              nameKey="reponse"
              labelFormatter={(value, payload) => {
                console.log(payload);
                const [item1] = payload;
                const {
                  payload: { ping, x },
                } = item1;
                return moment(x).format();
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
  );
}

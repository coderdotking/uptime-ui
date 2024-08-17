import type { Metadata } from "next";
import { pageConfig } from "@/uptime.config";
import { getMonitors, getState } from "@/lib/request";
import Home from "@/components/Home";

export const runtime = "edge";

export const metadata: Metadata = {
  title: pageConfig.title,
};

export default async function HomePage() {
  const { state = null } = await getState();
  const { list: monitors = [] }: { list: MonitorTarget[] } =
    await getMonitors();
  return <Home state={state} monitors={monitors} />;
}

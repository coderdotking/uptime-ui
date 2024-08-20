import type { Metadata } from "next";
import { pageConfig } from "@/uptime.config";
import { getMonitors, getState } from "@/lib/request";
import Home from "@/components/Home";
import Header from "@/components/header";

export const runtime = "edge";

export const metadata: Metadata = {
  title: pageConfig.title,
};

export default async function HomePage() {
  const { state = null } = await getState();
  const { list: monitors = [] }: { list: MonitorTarget[] } =
    await getMonitors();

  return (
    <div className="h-full select-none">
      <Header />
      <Home state={state} monitors={monitors} />
    </div>
  );
}

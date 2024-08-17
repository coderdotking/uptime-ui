import { getMonitors, getState } from "@/lib/request";

import { NextResponse } from "next/server";

export const runtime = "edge";

export const GET = async () => {
  const { state = null } = await getState();
  const { list: monitors = [] }: { list: MonitorTarget[] } =
    await getMonitors();
  return NextResponse.json({ state, monitors });
};

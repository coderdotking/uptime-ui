"use client"
import Head from "next/head";

import { Inter } from "next/font/google";
import { pageConfig, workerConfig } from "@/uptime.config";
import OverallStatus from "@/components/OverallStatus";
import Header from "@/components/Header";
import MonitorList from "@/components/MonitorList";
import { Center, Divider, Text } from "@mantine/core";
import MonitorDetail from "@/components/MonitorDetail";
import { MonitorState, MonitorTarget } from "@/uptime";

export const runtime = "experimental-edge";
const inter = Inter({ subsets: ["latin"] });

export default function Home({
  state: stateStr,
  monitors,
}: {
  state: string;
  monitors: MonitorTarget[];
  tooltip?: string;
  statusPageLink?: string;
}) {
  let state;

  if (stateStr !== undefined) {
    state = JSON.parse(stateStr) as MonitorState;
  }

  // 在 URL 的哈希中指定 monitorId 查看特定监控器（可以在 iframe 中使用）
  const monitorId = window.location.hash.substring(1);
  if (monitorId) {
    const monitor = monitors.find((monitor) => monitor.id === monitorId);
    if (!monitor || !state) {
      return <Text fw={700}>Monitor with id {monitorId} not found!</Text>;
    }
    return (
      <div style={{ maxWidth: "810px" }}>
        <MonitorDetail monitor={monitor} state={state} />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{pageConfig.title}</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <main className={inter.className}>
        <Header />

        {state === undefined ? (
          <Center>
            <Text fw={700}>
              Monitor State is not defined now, please check your worker&apos;s
              status and KV binding!
            </Text>
          </Center>
        ) : (
          <div>
            <OverallStatus state={state} />
            <MonitorList monitors={monitors} state={state} />
          </div>
        )}
        {/* <Divider mt="lg" />
         */}
      </main>
    </>
  );
}

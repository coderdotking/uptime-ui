interface IncidentItem {
  start: number[];
  end: number | undefined; // undefined if it's still open
  error: string[];
}

interface MonitorState {
  lastUpdate: number;
  overallUp: number;
  overallDown: number;
  incident: Record<string, IncidentItem[]>;

  latency: Record<
    string,
    {
      recent: {
        loc: string;
        ping: number;
        time: number;
      }[]; // recent 12 hour data, 2 min interval
      all: {
        loc: string;
        ping: number;
        time: number;
      }[]; // all data in 90 days, 1 hour interval
    }
  >;
}

interface MonitorTarget {
  id: string;
  name: string;
  method: string; // "TCP_PING" or Http Method (e.g. GET, POST, OPTIONS, etc.)
  target: string; // url for http, hostname:port for tcp
  tooltip?: string;
  statusPageLink?: string;
  checkLocationWorkerRoute?: string;

  // HTTP Code
  expectedCodes?: number[];
  timeout?: number;
  headers?: Record<string, string | undefined>;
  body?: BodyInit;
  responseKeyword?: string;
}

declare module "chartjs-adapter-moment";
declare module "chartjs-adapter-date-fns";

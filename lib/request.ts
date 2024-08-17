const BASE_URL = "https://monitors.1024210.xyz";
export const getMonitors = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/monitor/list`);
    const res_1 = await res.json();
    return res_1;
  } catch (e) {
    console.log(e);
    return {};
  }
};

export const getState = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/state`);
    const res_1 = await res.json();
    return res_1;
  } catch (e) {
    console.log(e);
    return {};
  }
};

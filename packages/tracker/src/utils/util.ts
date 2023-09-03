import { ServerEvents } from "../types";

export function getVisitorId() {
  const getId = () => localStorage.getItem("loglib-id");
  if (window.llc.consent === "denied" && !getId()) {
    return "";
  } else {
    window.llc.consent = "granted";
    if (!getId()) {
      window.localStorage.setItem("loglib-id", guid());
    }
    return getId();
  }
}

export function flush() {
  window.lli.eventsBank = [];
}

export function checkDoNotTrackClass(e: Event) {
  const target = e.target as HTMLButtonElement;
  if (target.hasAttribute("doNotTrack")) {
    return true;
  }
  return false;
}

export const getUrlParams = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return Object.fromEntries(urlSearchParams.entries());
};

export const isUndefined = function (obj: any): obj is undefined {
  return obj === void 0;
};

export function isProduction() {
  return window.llc.env === "prod";
}

export function isDevelopment() {
  return window.llc.env === "dev";
}

export function guid(): string {
  let d = new Date().getTime();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export function detectEnvironment() {
  try {
    const env = process.env.NODE_ENV;
    if (env === "development" || env === "test") {
      return "dev";
    }
  } catch {
    return "prod";
  }
  return "prod";
}

export const getPath = (url: string) => {
  if (url.substring(0, 4) === "http") {
    return `/${url.split("/").splice(3).join("/")}`;
  }
  return url;
};

export const hook = (
  _this: History,
  method: keyof History,
  callback: (...args: string[]) => void,
) => {
  const orig = _this[method];
  return (...args: string[]) => {
    callback(...args);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return orig.apply(_this, args);
  };
};

export const clearIntervals = () => {
  window.lli.intervals.forEach((intervalId) => clearInterval(intervalId));
};
export const addInterval = (interval: NodeJS.Timer) => {
  window.lli.intervals.push(interval);
};

export function q(e: ServerEvents) {
  window.lli.eventsBank.push(e);
}

export function getUrl() {
  if (typeof process === "undefined") {
    return "https://api.heimdall.francismasha.com";
  }
  if (process.env.NEXT_PUBLIC_LOGLIB_URL || process.env.LOGLIB_URL) {
    const url = process.env.NEXT_PUBLIC_LOGLIB_URL ?? process.env.LOGLIB_URL;
    return `${url}/api/heimdall`;
  }
  return "https://api.heimdall.francismasha.com";
}

export const parseHost = (url: string) => {
  //this is incase they update the tracker but didn't remove the host
  if (
    url === "https://heimdall.francismasha.com" ||
    url === "https://www.heimdall.francismasha.com"
  ) {
    return "https://heimdall.francismasha.com/api/loglib";
  } else {
    return url;
  }
};

export const setSessionStartTime = (time: number) => {
  sessionStorage.setItem("heimdall-session-start-time", time.toString());
};

export const getSessionDuration = () => {
  const startTime = sessionStorage.getItem("heimdall-session-start-time");
  if (startTime) {
    return (Date.now() - parseInt(startTime)) / 1000;
  }
  return 0;
};

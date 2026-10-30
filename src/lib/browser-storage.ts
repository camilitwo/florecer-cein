"use client";
import { useSyncExternalStore } from "react";
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("florecer-storage", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("florecer-storage", callback);
  };
}
export function useBrowserStorage(
  key: string,
  fallback: string,
  session = false,
) {
  const value = useSyncExternalStore(
    subscribe,
    () => {
      try {
        return (
          (session ? sessionStorage : localStorage).getItem(key) || fallback
        );
      } catch {
        return fallback;
      }
    },
    () => fallback,
  );
  function setValue(next: string) {
    try {
      (session ? sessionStorage : localStorage).setItem(key, next);
      window.dispatchEvent(new Event("florecer-storage"));
    } catch {
      /* Storage can be disabled by the browser; the demo remains navigable. */
    }
  }
  return [value, setValue] as const;
}

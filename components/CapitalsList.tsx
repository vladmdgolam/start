"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { Capital } from "@/data/capitals";

type CapitalsResponse = {
  capitals: Capital[];
};

type CapitalsListProps = {
  initialCapitals: Capital[];
};

const MIN_REFRESH_DELAY = 3_000;
const MAX_REFRESH_DELAY = 11_000;

const fetchOptions: RequestInit = {
  cache: "no-store",
};

export function CapitalsList({ initialCapitals }: CapitalsListProps) {
  const [capitals, setCapitals] = useState(initialCapitals);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sortedCapitals = useMemo(
    () => [...capitals].sort((a, b) => b.temperature - a.temperature),
    [capitals],
  );

  useEffect(() => {
    let isActive = true;

    const scheduleRefresh = () => {
      if (!isActive) return;
      timerRef.current = setTimeout(refreshCapitals, randomRefreshDelay());
    };

    const refreshCapitals = async () => {
      try {
        const response = await fetch("/api/capitals", fetchOptions);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const payload = (await response.json()) as CapitalsResponse;
        if (!isActive) return;
        setCapitals(payload.capitals);
        setError(null);
      } catch (err) {
        console.error("Failed to refresh capitals", err);
        if (isActive) {
          setError("Unable to update the list right now. Retrying…");
        }
      } finally {
        scheduleRefresh();
      }
    };

    scheduleRefresh();

    return () => {
      isActive = false;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <>
      {error ? <p className="notice">{error}</p> : null}
      <ol className="capitals">
        {sortedCapitals.map((capital) => (
          <li key={capital.name} data-temperature={capital.temperature}>
            {capital.name}
          </li>
        ))}
      </ol>
    </>
  );
}

function randomRefreshDelay() {
  return Math.floor(Math.random() * (MAX_REFRESH_DELAY - MIN_REFRESH_DELAY + 1)) + MIN_REFRESH_DELAY;
}

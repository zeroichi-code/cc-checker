"use client";

import useSWR from "swr";
import { useMemo, useState } from "react";
import Header from "@/components/Header";
import CircularGauge from "@/components/CircularGauge";
import StatusGrid, { formatHHMM, formatResetIn } from "@/components/StatusGrid";
import DailyChart from "@/components/DailyChart";
import SessionTable from "@/components/SessionTable";
import type {
  BlocksResponse,
  DailyResponse,
  SessionResponse,
} from "@/lib/types";

const JPY_RATE = 155;

const fetcher = async (url: string) => {
  const r = await fetch(url);
  if (!r.ok) {
    const t = await r.text();
    throw new Error(t || `HTTP ${r.status}`);
  }
  return r.json();
};

export default function Page() {
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const blocks = useSWR<BlocksResponse>("/api/blocks", fetcher, {
    refreshInterval: 30_000,
    onSuccess: () => setLastUpdated(new Date()),
  });
  const daily = useSWR<DailyResponse>("/api/daily", fetcher, {
    refreshInterval: 60_000,
  });
  const session = useSWR<SessionResponse>("/api/session", fetcher, {
    refreshInterval: 60_000,
  });

  const isLoading = blocks.isLoading || daily.isLoading || session.isLoading;
  const error = blocks.error || daily.error || session.error;

  const refresh = () => {
    blocks.mutate();
    daily.mutate();
    session.mutate();
  };

  const view = useMemo(() => {
    const active = blocks.data?.blocks?.find((b) => b.isActive && !b.isGap);

    if (!active) {
      return {
        remainingPercent: 100,
        remainingMinutes: null as number | null,
        used: 0,
        limit: 0,
        resetIn: "—",
        resetAt: "—",
        inputTokens: 0,
        outputTokens: 0,
        burnRate: null as number | null,
        minutesToLimit: null as number | null,
      };
    }

    const end = new Date(active.endTime);
    const now = new Date();
    const remainingMs = end.getTime() - now.getTime();
    const remainingMinutes = Math.max(0, remainingMs / 60_000);

    const limit =
      active.tokenLimitStatus?.limit ??
      active.projection?.totalTokens ??
      Math.max(active.totalTokens * 1.5, 35_000);

    const used = active.totalTokens;
    const usedPct = limit > 0 ? Math.min(100, (used / limit) * 100) : 0;
    const remainingPercent = Math.max(0, 100 - usedPct);

    const burn = active.burnRate?.tokensPerMinute ?? null;
    const minutesToLimit =
      burn && burn > 0 && limit > used ? (limit - used) / burn : null;

    return {
      remainingPercent,
      remainingMinutes,
      used,
      limit: Math.round(limit),
      resetIn: formatResetIn(remainingMinutes),
      resetAt: formatHHMM(end),
      inputTokens: active.tokenCounts?.inputTokens ?? 0,
      outputTokens: active.tokenCounts?.outputTokens ?? 0,
      burnRate: burn,
      minutesToLimit,
    };
  }, [blocks.data]);

  const todayStr = new Date().toISOString().slice(0, 10);
  const todayEntry = daily.data?.daily?.find((d) => d.date === todayStr);
  const sortedDaily = [...(daily.data?.daily ?? [])].sort((a, b) =>
    a.date.localeCompare(b.date)
  );
  const yesterdayEntry = sortedDaily[sortedDaily.length - 2] ?? null;

  const todayCostUSD = todayEntry?.totalCost ?? 0;
  const todayCostJPY = Math.round(todayCostUSD * JPY_RATE);
  const yesterdayCostUSD = yesterdayEntry?.totalCost ?? null;

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-8 py-8">
      <Header
        lastUpdated={lastUpdated}
        isLoading={isLoading}
        onRefresh={refresh}
      />

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-950/40 border border-rose-700/60 text-sm text-rose-200">
          <div className="font-semibold mb-1">エラー: ccusage の実行に失敗しました</div>
          <div className="text-xs opacity-80 break-words">
            {error instanceof Error ? error.message : String(error)}
          </div>
          <div className="text-xs opacity-70 mt-2">
            初回起動時は `npx ccusage@latest` のダウンロードに数十秒かかることがあります。「更新」ボタンで再試行してください。
          </div>
        </div>
      )}

      <section className="grid lg:grid-cols-[auto_1fr] gap-6 mb-6">
        <div className="flex justify-center">
          <CircularGauge
            remainingPercent={view.remainingPercent}
            remainingMinutes={view.remainingMinutes}
            used={view.used}
            limit={view.limit}
          />
        </div>
        <div className="flex flex-col gap-4">
          <StatusGrid
            resetIn={view.resetIn}
            resetAt={view.resetAt}
            usedTokens={view.used}
            inputTokens={view.inputTokens}
            outputTokens={view.outputTokens}
            burnRate={view.burnRate}
            minutesToLimit={view.minutesToLimit}
            todayCostUSD={todayCostUSD}
            todayCostJPY={todayCostJPY}
            yesterdayCostUSD={yesterdayCostUSD}
          />
          <DailyChart daily={daily.data?.daily ?? []} />
        </div>
      </section>

      <section>
        <SessionTable sessions={session.data?.sessions ?? []} />
      </section>

      <footer className="mt-12 text-center text-xs text-slate-500">
        Powered by <a href="https://github.com/ryoppippi/ccusage" className="underline hover:text-slate-300">ccusage</a> ・ 30秒ごとに自動更新
      </footer>
    </main>
  );
}

"use client";

import useSWR from "swr";
import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import CircularGauge from "@/components/CircularGauge";
import MetricCard from "@/components/MetricCard";
import WeeklyView, { type WeekDay } from "@/components/WeeklyView";
import PlanToggle from "@/components/PlanToggle";
import { PLAN_FACTOR, PLAN_LABEL, PLAN_STORAGE_KEY, isPlan, type Plan } from "@/lib/plan";
import type { BlocksResponse, DailyResponse } from "@/lib/types";

const JPY_RATE = 155;

const fetcher = async (url: string) => {
  const r = await fetch(url);
  if (!r.ok) throw new Error((await r.text()) || `HTTP ${r.status}`);
  return r.json();
};

const fmtTokens = (n: number) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(2)}M` : n.toLocaleString();

// CircularGauge と同じ閾値の代表色
function remainColor(remaining: number) {
  if (remaining >= 70) return "#30d158";
  if (remaining >= 30) return "#ff9f0a";
  return "#ff375f";
}

function formatRemain(min: number | null) {
  if (min === null || !isFinite(min) || min <= 0) return "—";
  const h = Math.floor(min / 60);
  const m = Math.round(min % 60);
  return h > 0 ? `${h}時間${m}分` : `${m}分`;
}

export default function Page() {
  const blocks = useSWR<BlocksResponse>("/api/blocks", fetcher, {
    refreshInterval: 30_000,
  });
  const daily = useSWR<DailyResponse>("/api/daily", fetcher, {
    refreshInterval: 60_000,
  });
  const isLoading = blocks.isLoading || daily.isLoading;
  const error = blocks.error || daily.error;

  // プラン選択（localStorage 永続化）
  const [plan, setPlan] = useState<Plan>("max5");
  useEffect(() => {
    const saved = localStorage.getItem(PLAN_STORAGE_KEY);
    if (isPlan(saved)) setPlan(saved);
  }, []);
  const changePlan = (p: Plan) => {
    setPlan(p);
    localStorage.setItem(PLAN_STORAGE_KEY, p);
  };

  const refresh = () => {
    blocks.mutate();
    daily.mutate();
  };

  const view = useMemo(() => {
    const list = blocks.data?.blocks ?? [];
    const active = list.find((b) => b.isActive && !b.isGap);
    // 過去ブロックの最大消費量を上限の baseline とみなす（実績ベース自動推定）
    const baseline = Math.max(
      0,
      ...list.filter((b) => !b.isGap).map((b) => b.totalTokens)
    );
    if (!active) {
      return {
        remainingPercent: 100,
        remainingMinutes: null as number | null,
        used: 0,
        limit: 0,
        resetAt: "—",
        burnRate: null as number | null,
      };
    }
    const end = new Date(active.endTime);
    const remainingMinutes = Math.max(0, (end.getTime() - Date.now()) / 60_000);
    const used = active.totalTokens;
    // プラン係数を掛けた推定上限。実測やprojectionを下回らないよう max を取る。
    const limit = Math.max(
      baseline * PLAN_FACTOR[plan],
      active.projection?.totalTokens ?? 0,
      used,
      35_000
    );
    const remainingPercent = limit > 0 ? Math.max(0, 100 - (used / limit) * 100) : 0;
    const pad = (n: number) => String(n).padStart(2, "0");
    return {
      remainingPercent,
      remainingMinutes,
      used,
      limit: Math.round(limit),
      resetAt: `${pad(end.getHours())}:${pad(end.getMinutes())}`,
      burnRate: active.burnRate?.tokensPerMinute ?? null,
    };
  }, [blocks.data, plan]);

  const todayStr = new Date().toISOString().slice(0, 10);
  const sortedDaily = [...(daily.data?.daily ?? [])].sort((a, b) =>
    (a.period ?? "").localeCompare(b.period ?? "")
  );
  const last14 = sortedDaily.slice(-14);
  const todayEntry = sortedDaily.find((d) => d.period === todayStr);

  const todayTokens = todayEntry?.totalTokens ?? 0;
  const todayCostUSD = todayEntry?.totalCost ?? 0;
  const todayCostJPY = Math.round(todayCostUSD * JPY_RATE);

  const tokenBars = {
    values: last14.map((d) => d.totalTokens),
    labels: last14.map((d) => (d.period ?? "").slice(5)),
  };
  const costBars = {
    values: last14.map((d) => d.totalCost),
    labels: last14.map((d) => (d.period ?? "").slice(5)),
  };

  // 過去7日（カレンダー基準、データ無い日は0）
  const dayJp = ["日", "月", "火", "水", "木", "金", "土"];
  const pad = (n: number) => String(n).padStart(2, "0");
  const week: WeekDay[] = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const key = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    const e = daily.data?.daily?.find((x) => x.period === key);
    return {
      day: dayJp[d.getDay()],
      date: `${d.getMonth() + 1}/${d.getDate()}`,
      tokens: e?.totalTokens ?? 0,
      cost: e?.totalCost ?? 0,
      isToday: i === 6,
    };
  });

  return (
    <main className="max-w-2xl mx-auto px-4 pt-12 pb-16">
      <Header isLoading={isLoading} onRefresh={refresh} />

      <div className="flex justify-end mb-4 -mt-1">
        <PlanToggle plan={plan} onChange={changePlan} />
      </div>

      {error && (
        <div className="mb-4 rounded-2xl bg-white dark:bg-[#1c1c1e] p-4 text-sm text-[#ff453a] shadow-sm dark:shadow-none">
          <div className="font-semibold mb-1">ccusage の実行に失敗しました</div>
          <div className="text-xs text-[#6c6c70] dark:text-[#8e8e93] break-words">
            {error instanceof Error ? error.message : String(error)}
          </div>
          <div className="text-xs text-[#6c6c70] dark:text-[#8e8e93] mt-2">
            初回は npx ccusage のダウンロードに時間がかかります。右上の更新で再試行してください。
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {/* アクティビティリング */}
        <div className="rounded-2xl bg-white dark:bg-[#1c1c1e] p-5 shadow-sm dark:shadow-none">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[16px] font-semibold text-black dark:text-white">残量リング</h3>
            <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#e5e5ea] dark:bg-[#2c2c2e] text-[#6c6c70] dark:text-[#8e8e93] text-[11px]">
              →
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="pl-8">
              <CircularGauge remainingPercent={view.remainingPercent} size={160} />
            </div>
            <div className="flex-1 flex flex-col items-center pl-4">
              <div className="text-[#6c6c70] dark:text-[#8e8e93] text-sm">残量</div>
              <div
                className="flex items-baseline gap-1"
                style={{ color: remainColor(view.remainingPercent) }}
              >
                <span className="text-5xl font-bold tabular-nums">
                  {view.remainingPercent.toFixed(0)}
                </span>
                <span className="text-2xl font-semibold">%</span>
              </div>
              <div className="text-sm text-black dark:text-white mt-2">
                推定残り {formatRemain(view.remainingMinutes)}
              </div>
              <div className="text-xs text-[#6c6c70] dark:text-[#8e8e93] mt-0.5">
                リセット {view.resetAt}
              </div>
              <div className="text-xs text-[#6c6c70] dark:text-[#8e8e93] mt-1">
                使用 {fmtTokens(view.used)} / {fmtTokens(view.limit)}
                <span className="text-[#8e8e93] dark:text-[#636366]"> ({PLAN_LABEL[plan]}基準)</span>
              </div>
            </div>
          </div>
        </div>

        {/* メトリクス 2列 */}
        <div className="grid grid-cols-2 gap-4">
          <MetricCard
            title="使用量"
            value={fmtTokens(todayTokens)}
            unit="tk"
            color="#bf5af2"
            bars={tokenBars}
          />
          <MetricCard
            title="コスト"
            value={`$${todayCostUSD.toFixed(2)}`}
            unit={`¥${todayCostJPY.toLocaleString()}`}
            color="#64d2ff"
            bars={costBars}
          />
          <MetricCard
            title="使用量/分"
            subLabel="現在"
            value={Math.round(view.burnRate ?? 0).toLocaleString()}
            unit="tk/min"
            color="#ff9f0a"
          />
          <MetricCard
            title="推定残り時間"
            subLabel="このブロック"
            value={formatRemain(view.remainingMinutes)}
            color="#30d158"
          />
        </div>

        {/* 過去1週間 */}
        <WeeklyView week={week} />
      </div>

      <footer className="mt-8 text-center text-xs text-[#8e8e93] dark:text-[#636366]">
        Powered by ccusage ・ 30秒ごとに自動更新
      </footer>
    </main>
  );
}

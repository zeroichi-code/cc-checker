"use client";

import type { ModelBreakdown } from "@/lib/types";

type Props = {
  breakdowns: ModelBreakdown[];
};

const fmtTokens = (n: number) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n >= 1_000 ? `${Math.round(n / 1000)}k` : String(n);

// モデル名を短く表示
function shortName(name: string) {
  if (name.includes("opus"))   return "Opus";
  if (name.includes("sonnet")) return "Sonnet";
  if (name.includes("haiku"))  return "Haiku";
  return name.split("-").slice(1, 3).join(" ");
}

// モデルごとのアクセントカラー
function modelColor(name: string) {
  if (name.includes("opus"))   return "#bf5af2"; // 紫
  if (name.includes("sonnet")) return "#64d2ff"; // 青
  if (name.includes("haiku"))  return "#30d158"; // 緑
  return "#ff9f0a";
}

export default function ModelBreakdownCard({ breakdowns }: Props) {
  if (!breakdowns || breakdowns.length === 0) {
    return null;
  }

  const total = breakdowns.reduce((s, m) => s + m.inputTokens + m.outputTokens + (m.cacheReadTokens ?? 0), 0);

  return (
    <div className="rounded-2xl bg-white dark:bg-[#1c1c1e] p-4 shadow-sm dark:shadow-none">
      <div className="mb-3">
        <h3 className="text-[15px] font-semibold text-black dark:text-white">モデル別使用量</h3>
        <p className="text-xs text-[#6c6c70] dark:text-[#8e8e93] mt-0.5">過去1週間</p>
      </div>

      <div className="flex flex-col gap-3">
        {breakdowns.map((m) => {
          const tokens = m.inputTokens + m.outputTokens + (m.cacheReadTokens ?? 0);
          const pct = total > 0 ? (tokens / total) * 100 : 0;
          const color = modelColor(m.modelName);
          return (
            <div key={m.modelName}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                  <span className="text-sm font-semibold text-black dark:text-white">
                    {shortName(m.modelName)}
                  </span>
                  <span className="text-xs text-[#8e8e93]">{m.modelName}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold tabular-nums text-black dark:text-white">
                    {fmtTokens(tokens)}
                  </span>
                  <span className="text-xs text-[#8e8e93] ml-1">tk</span>
                  <span className="text-xs text-[#8e8e93] ml-2">${m.cost.toFixed(2)}</span>
                </div>
              </div>
              {/* プログレスバー */}
              <div className="h-1.5 rounded-full bg-[#e5e5ea] dark:bg-[#2c2c2e] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${pct}%`, background: color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

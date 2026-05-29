"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DailyEntry } from "@/lib/types";

type Props = {
  daily: DailyEntry[];
};

export default function DailyChart({ daily }: Props) {
  const today = new Date().toISOString().slice(0, 10);
  const data = daily
    .slice(-14)
    .map((d) => ({
      date: (d.period ?? "").slice(5),
      tokens: d.totalTokens,
      cost: d.totalCost,
      isToday: d.period === today,
    }));

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-slate-900/40 backdrop-blur p-5 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
          直近14日のトークン消費
        </h2>
        <span className="text-xs text-slate-400">tokens / day</span>
      </div>
      <div style={{ width: "100%", height: 240 }}>
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.7} />
                <stop offset="60%" stopColor="#22d3ee" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#94a3b8" tick={{ fontSize: 11 }} />
            <YAxis
              stroke="#94a3b8"
              tick={{ fontSize: 11 }}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border: "1px solid #475569",
                borderRadius: 8,
                fontSize: 12,
              }}
              formatter={(v: number) => [`${v.toLocaleString()} tk`, "Tokens"]}
            />
            <Area
              type="monotone"
              dataKey="tokens"
              stroke="url(#lineGrad)"
              strokeWidth={3}
              fill="url(#grad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

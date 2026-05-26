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
      date: d.date.slice(5),
      tokens: d.totalTokens,
      cost: d.totalCost,
      isToday: d.date === today,
    }));

  return (
    <div className="rounded-2xl bg-slate-800/60 backdrop-blur border border-slate-700/60 p-5 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-slate-200">直近14日のトークン消費</h2>
        <span className="text-xs text-slate-400">tokens / day</span>
      </div>
      <div style={{ width: "100%", height: 240 }}>
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 11 }} />
            <YAxis
              stroke="#64748b"
              tick={{ fontSize: 11 }}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border: "1px solid #334155",
                borderRadius: 8,
                fontSize: 12,
              }}
              formatter={(v: number) => [`${v.toLocaleString()} tk`, "Tokens"]}
            />
            <Area
              type="monotone"
              dataKey="tokens"
              stroke="#38bdf8"
              strokeWidth={2}
              fill="url(#grad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

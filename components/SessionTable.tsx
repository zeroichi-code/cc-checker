"use client";

import type { SessionEntry } from "@/lib/types";

type Props = {
  sessions: SessionEntry[];
};

export default function SessionTable({ sessions }: Props) {
  const rows = [...sessions]
    .sort((a, b) => b.totalTokens - a.totalTokens)
    .slice(0, 10);

  return (
    <div className="rounded-2xl bg-slate-800/60 backdrop-blur border border-slate-700/60 p-5 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-slate-200">直近セッション TOP 10</h2>
        <span className="text-xs text-slate-400">by tokens</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-slate-400 border-b border-slate-700/60">
              <th className="py-2 font-normal">セッション</th>
              <th className="py-2 font-normal text-right">トークン</th>
              <th className="py-2 font-normal text-right">コスト</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={3} className="py-6 text-center text-slate-500 text-xs">
                  データなし
                </td>
              </tr>
            )}
            {rows.map((s) => (
              <tr
                key={s.sessionId}
                className="border-b border-slate-800/60 hover:bg-slate-700/30 transition"
              >
                <td className="py-2 pr-2 truncate max-w-[280px] text-slate-200">
                  {s.sessionId}
                </td>
                <td className="py-2 text-right tabular-nums text-slate-300">
                  {s.totalTokens.toLocaleString()}
                </td>
                <td className="py-2 text-right tabular-nums text-slate-300">
                  ${s.totalCost.toFixed(3)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

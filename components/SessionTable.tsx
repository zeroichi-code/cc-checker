"use client";

import type { SessionEntry } from "@/lib/types";

type Props = {
  sessions: SessionEntry[];
};

export default function SessionTable({ sessions }: Props) {
  const rows = [...sessions]
    .sort((a, b) => b.totalTokens - a.totalTokens)
    .slice(0, 10);

  const shortId = (id: string) => (id.length > 12 ? `${id.slice(0, 8)}…` : id);

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-slate-900/40 backdrop-blur p-5 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
          直近セッション TOP 10
        </h2>
        <span className="text-xs text-slate-400">by tokens</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-slate-400 border-b border-slate-700/60">
              <th className="py-2 font-normal">セッション</th>
              <th className="py-2 font-normal">最終利用</th>
              <th className="py-2 font-normal text-right">トークン</th>
              <th className="py-2 font-normal text-right">コスト</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="py-6 text-center text-slate-500 text-xs">
                  データなし
                </td>
              </tr>
            )}
            {rows.map((s) => (
              <tr
                key={s.period}
                className="border-b border-slate-800/60 hover:bg-slate-700/30 transition"
              >
                <td className="py-2 pr-2 font-mono text-xs text-slate-300" title={s.period}>
                  {shortId(s.period)}
                </td>
                <td className="py-2 pr-2 text-xs text-slate-400">
                  {s.metadata?.lastActivity ?? "—"}
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

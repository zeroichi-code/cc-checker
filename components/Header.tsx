"use client";

type Props = {
  lastUpdated: Date | null;
  isLoading: boolean;
  onRefresh: () => void;
};

function fmt(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export default function Header({ lastUpdated, isLoading, onRefresh }: Props) {
  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-emerald-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
          Claude Code 残量チェッカー
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          最終更新: {lastUpdated ? fmt(lastUpdated) : "—"}
        </p>
      </div>
      <button
        onClick={onRefresh}
        disabled={isLoading}
        className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/70 hover:bg-slate-700/70 border border-slate-700 shadow-lg disabled:opacity-50 transition"
      >
        <span
          className={`inline-block ${isLoading ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}`}
        >
          🔄
        </span>
        <span className="text-sm">更新</span>
      </button>
    </header>
  );
}

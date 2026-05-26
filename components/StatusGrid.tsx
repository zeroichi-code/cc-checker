"use client";

type Card = {
  icon: string;
  label: string;
  value: string;
  sub?: string;
  accent?: string;
};

function Cell({ icon, label, value, sub, accent }: Card) {
  return (
    <div className="rounded-2xl bg-slate-800/60 backdrop-blur border border-slate-700/60 p-5 shadow-lg hover:bg-slate-800/80 transition">
      <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
        <span className="text-lg">{icon}</span>
        <span>{label}</span>
      </div>
      <div
        className="text-2xl md:text-3xl font-bold tabular-nums"
        style={accent ? { color: accent } : undefined}
      >
        {value}
      </div>
      {sub && <div className="text-xs text-slate-400 mt-1">{sub}</div>}
    </div>
  );
}

type Props = {
  resetIn: string;
  resetAt: string;
  usedTokens: number;
  inputTokens: number;
  outputTokens: number;
  burnRate: number | null;
  minutesToLimit: number | null;
  todayCostUSD: number;
  todayCostJPY: number;
  yesterdayCostUSD: number | null;
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function StatusGrid({
  resetIn,
  resetAt,
  usedTokens,
  inputTokens,
  outputTokens,
  burnRate,
  minutesToLimit,
  todayCostUSD,
  todayCostJPY,
  yesterdayCostUSD,
}: Props) {
  let diff: string | undefined;
  if (yesterdayCostUSD !== null && yesterdayCostUSD > 0) {
    const ratio = ((todayCostUSD - yesterdayCostUSD) / yesterdayCostUSD) * 100;
    const arrow = ratio >= 0 ? "▲" : "▼";
    const col = ratio >= 0 ? "text-rose-400" : "text-emerald-400";
    diff = `前日比 ${arrow} ${Math.abs(ratio).toFixed(1)}%`;
    return renderGrid({
      resetIn,
      resetAt,
      usedTokens,
      inputTokens,
      outputTokens,
      burnRate,
      minutesToLimit,
      todayCostUSD,
      todayCostJPY,
      diff,
      diffClass: col,
    });
  }

  return renderGrid({
    resetIn,
    resetAt,
    usedTokens,
    inputTokens,
    outputTokens,
    burnRate,
    minutesToLimit,
    todayCostUSD,
    todayCostJPY,
    diff: undefined,
    diffClass: "",
  });
}

function renderGrid(p: {
  resetIn: string;
  resetAt: string;
  usedTokens: number;
  inputTokens: number;
  outputTokens: number;
  burnRate: number | null;
  minutesToLimit: number | null;
  todayCostUSD: number;
  todayCostJPY: number;
  diff?: string;
  diffClass: string;
}) {
  const burn = p.burnRate ?? 0;
  const burnSub =
    p.minutesToLimit !== null && isFinite(p.minutesToLimit) && p.minutesToLimit > 0
      ? `このペースで ${Math.round(p.minutesToLimit)} 分後に上限`
      : "—";

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Cell
        icon="⏱"
        label="リセットまで"
        value={p.resetIn}
        sub={`終了 ${p.resetAt}`}
      />
      <Cell
        icon="📈"
        label="現在の使用量"
        value={`${p.usedTokens.toLocaleString()} tk`}
        sub={`入 ${p.inputTokens.toLocaleString()} / 出 ${p.outputTokens.toLocaleString()}`}
      />
      <Cell
        icon="🔥"
        label="Burn rate"
        value={`${burn.toFixed(0)} tk/min`}
        sub={burnSub}
      />
      <Cell
        icon="💴"
        label="本日のコスト"
        value={`$${p.todayCostUSD.toFixed(2)}`}
        sub={`¥${p.todayCostJPY.toLocaleString()}${p.diff ? ` ・ ${p.diff}` : ""}`}
      />
    </div>
  );
}

export function formatResetIn(min: number) {
  if (min <= 0) return "0分";
  const h = Math.floor(min / 60);
  const m = Math.round(min % 60);
  return h > 0 ? `${h}時間 ${m}分` : `${m}分`;
}

export function formatHHMM(d: Date) {
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

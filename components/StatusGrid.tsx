"use client";

type Theme = {
  ring: string; // border + glow color
  from: string;
  to: string;
  text: string;
  chipBg: string;
};

const THEMES: Record<string, Theme> = {
  violet: {
    ring: "rgba(139,92,246,.45)",
    from: "from-violet-500/20",
    to: "to-fuchsia-500/5",
    text: "text-violet-300",
    chipBg: "bg-violet-500/20",
  },
  cyan: {
    ring: "rgba(34,211,238,.45)",
    from: "from-cyan-500/20",
    to: "to-sky-500/5",
    text: "text-cyan-300",
    chipBg: "bg-cyan-500/20",
  },
  amber: {
    ring: "rgba(251,146,60,.5)",
    from: "from-orange-500/20",
    to: "to-amber-500/5",
    text: "text-orange-300",
    chipBg: "bg-orange-500/20",
  },
  pink: {
    ring: "rgba(236,72,153,.5)",
    from: "from-pink-500/20",
    to: "to-rose-500/5",
    text: "text-pink-300",
    chipBg: "bg-pink-500/20",
  },
};

type Card = {
  icon: string;
  label: string;
  value: string;
  unit?: string;
  sub?: string;
  theme: keyof typeof THEMES;
};

function Cell({ icon, label, value, unit, sub, theme }: Card) {
  const t = THEMES[theme];
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${t.from} ${t.to} backdrop-blur p-5 shadow-lg transition hover:scale-[1.02] hover:border-white/20`}
      style={{ boxShadow: `0 0 24px ${t.ring}` }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-xl text-base ${t.chipBg}`}
        >
          {icon}
        </span>
        <span className="text-xs text-slate-300">{label}</span>
      </div>
      <div className={`flex flex-wrap items-baseline gap-x-1 leading-tight ${t.text}`}>
        <span className="text-2xl font-bold tabular-nums">{value}</span>
        {unit && <span className="text-xs font-medium text-slate-400">{unit}</span>}
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
        theme="violet"
        icon="⏱"
        label="リセットまで"
        value={p.resetIn}
        sub={`終了 ${p.resetAt}`}
      />
      <Cell
        theme="cyan"
        icon="📈"
        label="現在の使用量"
        value={p.usedTokens.toLocaleString()}
        unit="tk"
        sub={`入 ${p.inputTokens.toLocaleString()} / 出 ${p.outputTokens.toLocaleString()}`}
      />
      <Cell
        theme="amber"
        icon="🔥"
        label="Burn rate"
        value={Math.round(burn).toLocaleString()}
        unit="tk/min"
        sub={burnSub}
      />
      <Cell
        theme="pink"
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

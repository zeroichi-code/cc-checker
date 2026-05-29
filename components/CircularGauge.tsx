"use client";

type Props = {
  remainingPercent: number; // 0–100 (残量%)
  remainingMinutes: number | null;
  used: number;
  limit: number;
};

function color(remaining: number) {
  if (remaining >= 70)
    return {
      stroke: "#34d399",
      gradFrom: "#22d3ee",
      gradTo: "#34d399",
      glow: "rgba(52,211,153,.5)",
      label: "余裕あり",
    };
  if (remaining >= 30)
    return {
      stroke: "#fbbf24",
      gradFrom: "#fb923c",
      gradTo: "#facc15",
      glow: "rgba(251,191,36,.5)",
      label: "中盤",
    };
  return {
    stroke: "#f43f5e",
    gradFrom: "#ec4899",
    gradTo: "#f43f5e",
    glow: "rgba(244,63,94,.55)",
    label: "残りわずか",
  };
}

function formatHours(min: number | null) {
  if (min === null || !isFinite(min)) return "—";
  if (min <= 0) return "0分";
  const h = Math.floor(min / 60);
  const m = Math.round(min % 60);
  return h > 0 ? `${h}時間 ${m}分` : `${m}分`;
}

export default function CircularGauge({
  remainingPercent,
  remainingMinutes,
  used,
  limit,
}: Props) {
  const pct = Math.max(0, Math.min(100, remainingPercent));
  const c = color(pct);
  const radius = 110;
  const stroke = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - pct / 100);
  const isCritical = pct < 30;

  return (
    <div
      className={`relative flex flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-white/10 to-slate-900/40 border border-white/15 backdrop-blur p-8 shadow-2xl ${
        isCritical ? "animate-pulse" : ""
      }`}
      style={{ boxShadow: `0 0 60px ${c.glow}` }}
    >
      <svg width="280" height="280" viewBox="0 0 280 280" className="-rotate-90">
        <defs>
          <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={c.gradFrom} />
            <stop offset="100%" stopColor={c.gradTo} />
          </linearGradient>
        </defs>
        <circle
          cx="140"
          cy="140"
          r={radius}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx="140"
          cy="140"
          r={radius}
          stroke="url(#gaugeGrad)"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 0.8s ease",
            filter: `drop-shadow(0 0 8px ${c.glow})`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-xs text-slate-400 mb-1">残量</div>
        <div
          className="text-6xl font-bold tabular-nums"
          style={{ color: c.stroke }}
        >
          {pct.toFixed(0)}
          <span className="text-2xl text-slate-400 ml-1">%</span>
        </div>
        <div className="mt-1 text-sm text-slate-300">
          残り {formatHours(remainingMinutes)}
        </div>
        <div
          className="mt-1 text-[10px] px-2 py-0.5 rounded-full"
          style={{ background: c.glow, color: c.stroke }}
        >
          {c.label}
        </div>
      </div>
      <div className="mt-6 text-xs text-slate-400">
        使用 <span className="text-slate-200 font-medium tabular-nums">{used.toLocaleString()}</span>
        {" / "}
        推定上限 <span className="text-slate-200 font-medium tabular-nums">{limit.toLocaleString()}</span> tokens
      </div>
    </div>
  );
}

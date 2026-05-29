"use client";

type Props = {
  remainingPercent: number; // 0–100 (残量%)
  size?: number;
};

// 残量に応じた Apple リング風グラデーション
function ringColors(remaining: number) {
  if (remaining >= 70) return { from: "#30d158", to: "#a3f7bf" }; // green
  if (remaining >= 30) return { from: "#ff9f0a", to: "#ffd60a" }; // orange→yellow
  return { from: "#ff375f", to: "#ff6482" }; // red→pink
}

export default function CircularGauge({ remainingPercent, size = 150 }: Props) {
  const pct = Math.max(0, Math.min(100, remainingPercent));
  const c = ringColors(pct);
  const stroke = size * 0.16;
  const radius = (size - stroke) / 2;
  const cx = size / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - pct / 100);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <defs>
        <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c.from} />
          <stop offset="100%" stopColor={c.to} />
        </linearGradient>
      </defs>
      {/* track */}
      <circle
        cx={cx}
        cy={cx}
        r={radius}
        stroke={c.from}
        strokeOpacity={0.2}
        strokeWidth={stroke}
        fill="none"
      />
      {/* progress */}
      <circle
        cx={cx}
        cy={cx}
        r={radius}
        stroke="url(#ringGrad)"
        strokeWidth={stroke}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 0.8s ease" }}
      />
    </svg>
  );
}
